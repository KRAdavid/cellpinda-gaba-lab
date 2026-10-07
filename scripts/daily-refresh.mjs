import { spawnSync } from "node:child_process";

const root = process.cwd();
const skipDiscovery = process.argv.includes("--skip-discovery");
const results = [];

function run(label, script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
    windowsHide: true
  });
  const output = `${result.stdout || ""}${result.stderr || ""}`.trim();
  results.push({ label, code: result.status ?? 1, output: output.slice(-3000) });
  return result.status ?? 1;
}

if (!skipDiscovery) run("discover-literature", "scripts/discover-literature.mjs", ["--max-candidates=1000"]);
const attemptCode = run("record-discovery-attempt", "scripts/record-discovery-attempt.mjs");
const promotionCode = run("generate-data", "scripts/generate-data.mjs");
const validationReadyCode = promotionCode === 0
  ? run("record-discovery-validation-ready", "scripts/record-discovery-attempt.mjs", ["--ready-for-validation"])
  : 0;
const pendingBuildCode = run("build-pending-sheet-sync", "scripts/build-pending-sheet-sync.mjs");
const pendingCheckCode = run("validate-pending-sheet-sync", "scripts/validate-pending-sheet-sync.mjs");

const partial = promotionCode !== 0;
const status = partial ? "PARTIAL_NOT_PROMOTED" : "READY_FOR_VALIDATION";
console.log(JSON.stringify({
  status,
  skipDiscovery,
  promotionCode,
  validationReadyCode,
  attemptCode,
  pendingBuildCode,
  pendingCheckCode,
  next: partial
    ? "원천 오류를 해결한 뒤 pnpm data·build·preflight·QA를 수행하고, 현재 검증 스냅샷은 유지합니다."
    : "데이터 승격 후 build·preflight·QA를 통과한 경우에만 공개 배포합니다.",
  results
}, null, 2));

if (attemptCode !== 0 || validationReadyCode !== 0 || pendingBuildCode !== 0 || pendingCheckCode !== 0) process.exitCode = 1;
else if (partial) process.exitCode = 2;
