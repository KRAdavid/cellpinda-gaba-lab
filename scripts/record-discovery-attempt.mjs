import { readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const outputsRoot = resolve(siteRoot, "..", "outputs");
const dataPath = resolve(siteRoot, "worker", "data.json");

async function findNamedFiles(dir, fileName) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) found.push(...await findNamedFiles(full, fileName));
    else if (entry.isFile() && entry.name === fileName) found.push(full);
  }
  return found;
}

const paths = await findNamedFiles(outputsRoot, "search-summary.json");
if (!paths.length) throw new Error(`No search-summary.json under ${outputsRoot}`);
const dated = await Promise.all(paths.map(async (path) => ({ path, mtime: (await stat(path)).mtimeMs })));
dated.sort((left, right) => right.mtime - left.mtime);
const summaryPath = dated[0].path;
const summary = JSON.parse(await readFile(summaryPath, "utf8"));
const errors = Array.isArray(summary.sourceErrors) ? summary.sourceErrors : [];
const failedSources = [...new Set(errors.map((entry) => String(entry?.source || "unknown").split(":")[0]))];
const openAlexAccessMode = String(summary.openAlex?.accessMode || "unknown");
const hasOpenAlexError = failedSources.includes("OpenAlex");
const openAlexErrors = errors.filter((entry) => String(entry?.source || "").startsWith("OpenAlex:"));
const hasOpenAlexRateLimit = openAlexErrors.some((entry) => /\b429\b|rate limit/i.test(String(entry?.error || "")));
const openAlexRetryAfterSeconds = Math.max(0, ...openAlexErrors.map((entry) => Number(String(entry?.error || "").match(/retryAfter=(\d+)s/i)?.[1] || 0)));
const formatRetryAfter = (seconds) => {
  if (!seconds) return "";
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes >= 60) return `약 ${Math.floor(minutes / 60)}시간 ${minutes % 60}분 후`;
  return `약 ${minutes}분 후`;
};
const retryAfterNote = formatRetryAfter(openAlexRetryAfterSeconds);
const recoveryHint = hasOpenAlexError
  ? openAlexAccessMode === "anonymous"
    ? hasOpenAlexRateLimit
      ? `운영자 조치: OPENALEX_API_KEY 또는 OPENALEX_MAILTO를 설정하거나 OpenAlex rate limit 재설정${retryAfterNote ? `(${retryAfterNote})` : ""} 후 재실행`
      : "운영자 조치: OPENALEX_API_KEY 또는 OPENALEX_MAILTO를 예약 실행 환경에 설정한 뒤 재실행"
    : hasOpenAlexRateLimit
      ? `운영자 조치: OpenAlex rate limit 재설정${retryAfterNote ? `(${retryAfterNote})` : ""} 후 재실행`
      : openAlexAccessMode === "unknown"
        ? "운영자 조치: OpenAlex 인증·응답 상태를 확인한 뒤 재실행"
        : "운영자 조치: OpenAlex 응답 상태를 확인한 뒤 재실행"
  : errors.length
    ? "운영자 조치: 실패 원천의 응답 상태를 확인한 뒤 재실행"
    : "운영자 조치: build·preflight·브라우저 QA 후 공개 반영 검토";
const attempt = {
  snapshotDate: String(summary.snapshotDate || ""),
  generatedAt: String(summary.generatedAt || ""),
  status: errors.length ? "PARTIAL_NOT_PROMOTED" : "READY_FOR_PROMOTION",
  sourceErrorCount: errors.length,
  failedSources: failedSources.slice(0, 8),
  openAlexAccessMode,
  openAlexRateLimited: hasOpenAlexRateLimit,
  openAlexRetryAfterSeconds,
  recoveryHint,
  message: errors.length
    ? "일부 원천 응답 오류로 공개 인덱스 반영을 보류했습니다. 현재 화면은 마지막 완전 검증 스냅샷입니다."
    : "원천 오류 없이 탐색 산출물이 생성되어 검증 대기 중입니다."
};

const database = JSON.parse(await readFile(dataPath, "utf8"));
if (!database.meta?.discovery) throw new Error("worker/data.json has no discovery metadata");
database.meta.discovery.lastAttempt = attempt;
const tempPath = `${dataPath}.attempt.tmp`;
await writeFile(tempPath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
await rename(tempPath, dataPath);
console.log(JSON.stringify({ output: dataPath, summaryPath, ...attempt }));
