import { readFile } from "node:fs/promises";

const sourcePath = new URL("../worker/template.js", import.meta.url);
const source = await readFile(sourcePath, "utf8");

const required = [
  ["Intelligence section", 'id="intelligence"'],
  ["Intelligence type filter", "data-intelligence-kind"],
  ["Intelligence detail dialog", 'id="intelligence-detail"'],
  ["Detail facts", 'id="intelligence-detail-facts"'],
  ["Verification summary", 'id="intelligence-detail-verification"'],
  ["Verification summary renderer", "function verificationSummary"],
  ["Detail record freshness", "function recordFreshness"],
  ["Detail study design facts", "fact(\"연구 설계\", record.design)"],
  ["Detail meaning", 'id="intelligence-detail-meaning"'],
  ["Evidence boundary", 'id="intelligence-detail-boundary"'],
  ["Marketing utilization", 'id="intelligence-detail-marketing"'],
  ["Related evidence", 'id="intelligence-detail-related"'],
  ["Portal exploration lanes", 'id="portal-lanes-list"'],
  ["Portal lane model", "var PORTAL_LANES"],
  ["Portal lane overview", 'id="portal-lane-overview"'],
  ["Portal lane overview renderer", "function renderPortalLaneOverview"],
  ["Portal lane insight", 'id="portal-lane-insight"'],
  ["Regulatory comparison renderer", "function renderPortalLaneInsight"],
  ["Product comparison table", "product-matrix"],
  ["Technology comparison table", "technology-matrix"],
  ["Review-state filters", "data-intelligence-review"],
  ["Review checklist", 'id="intelligence-detail-checklist"'],
  ["Review queue", 'id="review-queue-list"'],
  ["Result card detail review action", 'class="paper-review"'],
  ["Review queue local-only scope", 'id="review-queue-scope"'],
  ["Review queue renderer", "function renderReviewQueue"],
  ["Review queue action hierarchy", "review-card-primary"],
  ["Review queue source action", "review-card-source"],
  ["Primary source label", "function primarySourceLabel"],
  ["Review queue filters", "data-review-filter"],
  ["Review queue audit filter", 'data-review-filter="audit"'],
  ["Review queue audit summary", "원문 접근 제한"],
  ["Review queue audit count", "auditGapCount.toLocaleString"],
  ["Review queue summary", 'id="review-queue-summary"'],
  ["Review queue completion rate", "전체 큐 완료율"],
  ["Review queue expansion", "전체 큐 표시"],
  ["Review queue priority", "function reviewPriority"],
  ["Advanced filter grouping", "filter-subgroup-heading"],
  ["Advanced filter research group", "연구·원문 확인"],
  ["Route group filter", 'id="route-group"'],
  ["Saved search storage", "gaba-saved-searches-v1"],
  ["Saved search renderer", "function renderSavedSearches"],
  ["Saved search share link", "data-saved-search-share"],
  ["Brief primary source link", "대표 원문:"],
  ["App ready marker", "dataset.gabaReady"],
  ["Personal workspace reset", 'id="personal-workspace-clear"'],
  ["Result next-action routes", "data-result-preset"],
  ["Result next-action renderer", "result-interpretation-actions"],
  ["Result recommended first step", "권장 첫 단계"],
  ["Result primary next-action style", "result-interpretation-route-primary"],
  ["Result action groups", "result-interpretation-action-group"],
  ["Result marketing-use scope", "result-interpretation-marketing"],
  ["Result marketing-use guard", "광고 허가·효능 입증·규제 승인을 뜻하지 않습니다"],
  ["Result marketing-use disclosure", 'id="result-marketing-disclosure"'],
  ["Oral route next action", 'data-result-preset="oral"'],
  ["Review priority rationale", "review-priority-reason"],
  ["Local review decision panel", 'id="review-decision-controls"'],
  ["Local review note", 'id="intelligence-detail-note"'],
  ["Local review save", 'id="intelligence-detail-save"'],
  ["Local review completion", "data-review-done"],
  ["Review queue export", 'id="review-queue-export"'],
  ["Review queue export renderer", "function exportReviewQueue"],
  ["Review queue Markdown export", 'id="review-queue-markdown"'],
  ["Review queue Markdown renderer", "function reviewQueueMarkdownText"],
  ["Review queue tools disclosure", 'id="review-queue-tools"'],
  ["Review queue tools label", "data-review-tools-summary"],
  ["Review queue import", 'id="review-queue-import"'],
  ["Review queue import renderer", "function importReviewQueue"],
  ["Freshness indicator", 'id="freshness-label"'],
  ["Discovery attempt status", 'id="discovery-attempt-note"'],
  ["Discovery next action", 'id="discovery-next-action"'],
  ["Discovery next action renderer", "다음 조치:"],
  ["Discovery validation-ready status", "READY_FOR_VALIDATION"],
  ["Discovery state badge", 'id="discovery-state-badge"'],
  ["Discovery state badge sync", "function syncDiscoveryStateBadge"],
  ["Discovery freshness distinction", "자동 탐색"],
  ["Candidate preview", 'id="candidate-preview"'],
  ["Candidate preview renderer", "function renderCandidatePreview"],
  ["Candidate preview scope", "전체 후보"],
  ["Candidate GABA signal gate", "신규 후보 게이트"],
  ["Candidate gate explanation", "GABA 신호 또는 GABA 후속조치 검색 신호가 확인된 자료만 큐"],
  ["Candidate entry reason", "큐 진입 신호"],
  ["Candidate CSV entry reason", '"큐 진입 신호"'],
  ["Candidate CSV source lane", '"출처 레인"'],
  ["Candidate CSV source label", '"출처 라벨"'],
  ["Candidate CSV scope label", "현재 필터 후보 CSV"],
  ["Candidate recommendation summary", "검토 권고"],
  ["Candidate source link guard", "function candidateSourceUrl"],
  ["Candidate source label", "function candidateSourceLabel"],
  ["Candidate preview expansion", 'id="candidate-preview-more"'],
  ["Candidate preview filters", "data-candidate-filter"],
  ["Candidate review-status filters", 'data-candidate-filter="reviewed"'],
  ["Candidate review status", "screeningStatus"],
  ["Candidate queue scope", "전체 큐:"],
  ["Candidate full export", "candidateExport"],
  ["Candidate export health", "candidateExportCount"],
  ["Candidate source-lane health", "candidateSourceLaneCounts"],
  ["Candidate source-lane summary", "후보 출처 레인"],
  ["Candidate screening signals", "routeSignals"],
  ["Candidate human signal labels", "candidateHumanSignals"],
  ["Candidate review URL regression", 'requestedCandidateFilter'],
  ["Candidate detail dialog", 'id="candidate-detail-dialog"'],
  ["Candidate screening signals", 'id="candidate-detail-screening"'],
  ["Candidate detail renderer", "function openCandidateDetail"],
  ["Candidate detail close", "function closeCandidateDetail"],
  ["Candidate preview export", 'id="candidate-preview-export"'],
  ["Candidate export filter parity", "function filterCandidatePreviewRecords"],
  ["Candidate filter URL state", "candidatePreviewFilter"],
  ["Candidate filter share parameter", 'params.set("candidate"'],
  ["Candidate detail URL state", "urlCandidateId"],
  ["Candidate detail share parameter", 'params.set("candidateId"'],
  ["Candidate detail deep-link restore", "openCandidateDetail(urlCandidateId"],
  ["Candidate link copy", "data-copy-candidate-link"],
  ["Candidate link copy fallback", "copyCandidateLink"],
  ["Candidate deep-link focus", "candidatePreviewNeedsFocus"],
  ["Candidate filter counts", "candidateFilterLabels"],
  ["Candidate direct-signal filter", 'data-candidate-filter="entry-direct"'],
  ["Candidate text-signal wording", "GABA 언급 신호"],
  ["Candidate follow-up-signal filter", 'data-candidate-filter="entry-followup"'],
  ["Candidate registry filter", 'data-candidate-filter="registry"'],
  ["Candidate preprint filter", 'data-candidate-filter="preprint"'],
  ["Candidate shareable source filters", '"registry", "preprint", "reviewed"'],
  ["Candidate source-lane link priority", "candidate.sourceLane === \"registry\""],
  ["Candidate registry URL priority", "candidate.sourceUrl || (candidate.registryId ? \"https://clinicaltrials.gov/study/\""],
  ["Candidate preprint URL priority", "sourceLane === \"preprint\" || sources.includes(\"preprint\")"],
  ["Candidate filtered empty state", "candidate-preview-empty"],
  ["Immunity search suggestions", "면역 타액 IgA"],
  ["Canada monograph search suggestion", "캐나다 모노그래프"],
  ["Progressive search suggestions", "search-suggestions-more"],
  ["Search suggestion expansion label", "추천 검색어 더보기"],
  ["Korean title provenance label", "koreanTitleLabel"],
  ["Korean type-aware title fallback", "문헌 고찰"],
  ["Marketing badge filter", "marketing-filter-badge"],
  ["CSV title provenance", "한국어 제목/분류 요약"],
  ["Marketing filter counts", "data-marketing-count"],
  ["Server marketing counts", "serverMarketingLabel"],
  ["Accessible active toggles", "function setActiveToggle"],
  ["Evidence compare tray", 'id="compare-tray"'],
  ["Evidence compare dialog", 'id="compare-dialog"'],
  ["Evidence compare renderer", "function renderCompareTable"],
  ["Comparison study design", '["연구 설계", "design"]'],
  ["Comparison result direction", '["결과 방향", "direction"]'],
  ["Comparison interpretation note", 'id="compare-dialog-insight"'],
  ["Comparison CSV export", 'id="compare-export"'],
  ["Search result brief", 'id="result-brief"'],
  ["Filtered brief Markdown export", 'id="result-brief-download"'],
  ["Filtered brief Markdown renderer", "function exportFilteredBrief"],
  ["Brief reproducible link", "조건 링크:"],
  ["Brief condition summary", "현재 조건: "],
  ["Candidate promotion checklist", 'id="candidate-detail-checklist"'],
  ["Discovery health metrics", "discoveryMergedUnique"],
  ["Discovery source transparency", '["Crossref", Number(discovery.crossrefRetrieved'],
  ["Discovery screening status", "discovery.screeningCounts"],
  ["Discovery matched manual decisions", "manualDecisionsMatched"],
  ["Freshness explanation action", 'id="freshness-label" type="button"'],
  ["Shareable compare state", 'params.set("compare"'],
  ["Comparison copy action", 'id="compare-copy"'],
  ["Comparison focus return", "compareReturnFocus"],
  ["Result evidence composition", 'id="result-interpretation"'],
  ["Result next review action", 'id="result-review-jump"'],
  ["Shareable record deep link", "urlRecordId"],
  ["Citation copy action", "data-copy-citation"],
  ["Record link copy action", "data-copy-record-link"],
  ["Evidence brief copy action", "data-copy-brief"],
  ["Hero search entry", "hero-primary"],
  ["Market-use navigation target", 'href="#market-use"'],
  ["Anchor offset for sticky header", "scroll-margin-top: 84px"],
  ["Anchor destination focus", "function focusAnchorHeading"],
  ["Mobile portal navigation", 'class="mobile-portal-jump"'],
  ["Mobile Intelligence navigation", 'href="#intelligence">Intelligence'],
  ["Compact view key facts", "compact-facts"],
  ["Brief marketing distribution", "활용 검토: 직접 근거 검토"],
  ["Per-card freshness badge", "function freshnessBadge"],
  ["Per-card deep-link copy", "data-copy-record-link=\"' + esc(record.id) + '\""],
  ["Deep-link label boundary", "사이트 상세 링크 복사"],
  ["Deep-link context boundary", 'params.delete(key)'],
  ["Progressive badge metadata", "function paperSecondaryBadges"],
  ["Progressive badge disclosure label", "서지·추출 정보"],
  ["Freshness interpretation guard", "근거의 질·효능·규제 승인을 평가하지 않습니다"],
  ["Reduced-motion scroll behavior", "function preferredScrollBehavior"],
  ["Exploration presets", "data-preset"],
  ["Detail opener", "function openIntelligenceDetail"],
  ["Dynamic event delegation", 'event.target.closest("[data-intelligence-id]")']
  ,["Reading list dialog", 'id="reading-list-dialog"']
  ,["Reading list state", "gaba-reading-ids"]
  ,["Reading list toggle", "data-reading-toggle"]
  ,["Reading list focus return", "readingReturnFocus"]
  ,["Reading list brief copy", 'id="reading-list-copy"']
  ,["Reading list Markdown export", 'id="reading-list-download"']
  ,["Reading list Markdown renderer", "function readingListMarkdownText"]
  ,["Reading list clear", 'id="reading-list-clear"']
  ,["Reading list brief renderer", "function readingListBriefText"]
  ,["Reading list share", 'id="reading-list-share"']
  ,["Shareable reading state", 'params.set("read"']
  ,["Filtered result export", 'id="result-export"']
  ,["Filtered result share", 'id="result-share"']
  ,["Filtered result export menu", 'id="result-export-menu"']
  ,["Filtered result export options", "result-export-options"]
  ,["Filtered result export close", "function closeResultExportMenu"]
  ,["Filtered result CSV renderer", "function exportFilteredResults"]
  ,["Filtered result JSON export", 'id="result-json"']
  ,["Filtered result JSON renderer", "function exportFilteredJson"]
  ,["Filtered result RIS export", 'id="result-ris"']
  ,["Filtered result RIS renderer", "function exportFilteredRis"]
  ,["Publication follow-up signal", "function publicationFollowupLabel"]
  ,["CSV evidence boundaries", "SCI/SCIE"]
  ,["CSV extraction and review date", "추출 상태"]
  ,["CSV snapshot provenance", "검증 스냅샷"]
  ,["Discovery snapshot provenance", "자동 탐색 기준일"]
  ,["Discovery snapshot export value", "function discoverySnapshotValue"]
  ,["Discovery attempt export value", "function discoveryAttemptLabel"]
  ,["Export condition provenance", "currentConditionSummary()"]
  ,["Comparison provenance", '"검증 스냅샷"']
  ,["Marketing utilization filter", "data-marketing"]
  ,["Marketing utilization URL state", "state.marketing"]
  ,["Intervention classification filter", "data-intervention"]
  ,["Intervention classification counts", "data-intervention-count"]
  ,["Server-rendered intervention counts", "serverInterventionClass"]
  ,["Verified snapshot label", "검증 스냅샷"]
  ,["Collapsed filter state labels", "data-quick-summary"]
  ,["Human-source review sort", 'value="human-source"']
  ,["Human-source review sort logic", "function humanSourcePriority"]
  ,["Human-source sort explanation", 'id="sort-help"']
  ,["Human-source sort explanation sync", "function syncSortHelp"]
  ,["Review queue share link", "review-queue-share"]
  ,["Review queue URL state", "sharedReviewIds"]
  ,["Review queue filter share state", "reviewFilter"]
  ,["Review queue filter labels", "reviewQueueFilterLabels"]
  ,["Curated note extraction", "function labeledNote"]
  ,["Curated research meaning priority", 'var curated = labeledNote(record, "연구의 의미", "마케팅 활용 방안")']
  ,["Curated marketing direction priority", 'var curated = labeledNote(record, "마케팅 활용 방안")']
  ,["Marketing boundary note", "활용 방향 제시 · 광고 허가·효능 입증 아님 · 외부 검토 필요"]
  ,["External review gate", 'id="external-review-gate" role="note"']
  ,["External review gate copy", "독립 외부 검토 전 확정하지 않습니다"]
  ,["Focus mode control", 'id="focus-mode-toggle"']
  ,["Focus mode accessibility state", 'aria-controls="distribution-disclosure search-suggestions explorer-intents quick-advanced"']
  ,["Focus mode personal boundary", "개인 브라우저 설정"]
  ,["Intervention breakdown disclosure", 'id="result-intervention-disclosure"']
  ,["Intervention breakdown actions", 'result-interpretation-intervention']
  ,["Intervention boundary note", "효능·안전성·규제 적합성의 우열을 뜻하지 않습니다"]
  ,["Brief intervention breakdown", "GABA 개입 유형: 순수 GABA"]
  ,["Review share dialog", "review-share-dialog"]
  ,["Review share copy action", "copyReviewShareUrl"]
  ,["Shared queue exit", "clearSharedReviewQueue"]
  ,["Shared queue focus", "sharedReviewNeedsFocus"]
  ,["Stale shared queue notice", "sharedReviewMissingCount"]
  ,["Intervention badge", "interventionShortLabel"]
  ,["Intervention badge filter", "intervention-filter-badge"]
  ,["Structured search metadata", "application/ld+json"]
  ,["Unified copy dialog", "copy-dialog"]
  ,["Unified copy fallback", "openCopyDialog"]
  ,["Intervention classification", "function interventionClass"]
  ,["Intervention classification URL state", "state.intervention"]
  ,["Intervention classification URL restoration", '\"intervention\", \"routeGroup\", \"followup\", \"grade\"']
  ,["Oral intake quick-filter count", 'data-route-count=\"경구·섭취\"']
  ,["Evidence-kind quick-filter counts", "data-kind-count"]
  ,["Total quick-filter count", "data-total-count"]
  ,["Safety quick-filter count", 'data-category-count=\"안전성\"']
  ,["Quick-filter evidence scope label", "근거 범위"]
  ,["Quick-filter exploration axis label", "탐색 축"]
  ,["Responsive toast width", "max-width: calc(100vw - 32px)"]
  ,["Result evidence composition group", 'class=\"result-interpretation-stats\" role=\"group\"']
  ,["Result next-action group", 'class=\"result-interpretation-actions\" role=\"group\"']
  ,["Result interpretation region", 'id=\"result-interpretation\" role=\"region\"']
  ,["Quick-filter count scope note", "빠른 필터의 숫자는 전체 검증 인덱스 기준"]
  ,["Quick-filter scope accessibility relation", 'aria-describedby=\"quick-scope-note\"']
  ,["Quick-filter semantic group", 'class=\"quick-filter-group\" role=\"group\" aria-label=\"연구구분 빠른 필터\"']
  ,["Publication follow-up filter", 'data-followup="signal"']
  ,["Publication follow-up URL state", "state.followup"]
  ,["Result follow-up signal count", "var followup = list.filter(function (record) { return Boolean(publicationFollowupLabel(record)); }).length"]
  ,["Result follow-up signal route", 'data-result-preset="followup"']
  ,["Result follow-up preset", 'if (name === "followup") state.followup = "signal"']
  ,["Link audit transparency", "DB.meta.linkAudit"]
  ,["Link audit interpretation guard", 'id="link-audit-note"']
  ,["Link audit methodology action", 'id="link-audit-methodology"']
  ,["Per-record link audit status", "function sourceAuditRecord"]
  ,["Per-record link audit guard", "sourceAuditDescription"]
  ,["Link audit KST date", "function koreanDateTime"]
  ,["Link audit freshness", "function linkAuditFreshnessLabel"]
  ,["Link audit freshness timezone", 'timeZone: "Asia/Seoul"']
  ,["Link audit freshness interpretation", "감사 신선도"]
  ,["Snapshot freshness KST", "function updateFreshnessLabel"]
  ,["Comparison sticky context", "position: sticky; left: 0"]
  ,["Discovery delta helper", "function discoveryDeltaLabel"]
  ,["Snapshot provenance", "검증 스냅샷"]
  ,["Release traceability", "현재 운영 코드 기준(런타임)"]
  ,["Current code deployment provenance", "release.currentCodeDeployment"]
  ,["Health latest attempt provenance", "discoveryLastAttempt"]
  ,["Release provenance distinction note", 'id="release-provenance-note"']
  ,["Per-record audit filter", 'id="audit"']
  ,["Audit filter counts", "function syncAuditFilterOptions"]
  ,["Freshness filter", 'id="freshness"']
  ,["Freshness filter buckets", "function freshnessBucket"]
  ,["Freshness filter timezone", "var checked = kstDayStart(record.checked)"]
  ,["Freshness filter interpretation guard", "확인일 경과만 표시하며 근거의 질을 평가하지 않습니다."]
  ,["Freshness result interpretation guard", "최신 원문과 출판 후속 공지를 다시 확인하세요."]
  ,["Freshness review queue filter", 'data-review-filter="freshness"']
  ,["Freshness review queue count", "freshnessGapCount.toLocaleString"]
  ,["Freshness review queue action", "최신 원문·후속 공지"]
  ,["Audit follow-up preset", 'data-preset="audit-unavailable"']
  ,["Audit interpretation guard", "원문 재확인·대체 경로 검토 대상"]
  ,["Methodology dialog", "id=\"methodology-dialog\""]
  ,["Methodology rules", "출판 후속조치를 확인합니다"]
  ,["Methodology candidate entry boundary", "제목·초록의 GABA 언급 신호"]
  ,["Methodology export scope", "현재 필터 후보 CSV"]
  ,["Methodology refresh and sync policy", "공개·갱신·동기화 원칙"]
  ,["Methodology Sheets 403 policy", "403이면 재시도하지 않고 동기화 대기목록"]
  ,["Orientation review step", "다음 검토를 기록하세요"]
  ,["Portal review navigation", 'href="#review-queue"']
  ,["Portal review queue count", 'id="portal-review-count"']
  ,["Mobile review queue count", 'id="mobile-review-count"']
  ,["Result review queue route", 'data-result-preset="review"']
  ,["Review queue filter counts", "reviewFilterCounts"]
  ,["Result review queue alignment", "reviewQueueIds"]
  ,["Review decision timestamp display", "개인 검토</strong> · 완료"]
  ,["Review decision local timestamp", "decision.completedAt"]
  ,["Review decision semantic class", "review-decision-meta"]
  ,["Result candidate action alignment", "candidateResultCount"]
  ,["Distribution progressive disclosure", "id=\"distribution-disclosure\""]
  ,["Distribution disclosure label", "분포 열기 ＋"]
  ,["Candidate progressive disclosure", "id=\"candidate-preview-disclosure\""]
  ,["Candidate separation label", "검증 근거와 별도 관리"]
  ,["Candidate scope summary", "candidate-preview-disclosure-count"]
  ,["Pure GABA primary quick filter", 'data-intervention="순수 GABA 섭취"']
  ,["Oral intake primary quick filter", 'data-preset="oral"']
  ,["Copy dialog accessible name", 'id="copy-dialog-value" aria-labelledby="copy-dialog-title"']
  ,["Empty result recovery suggestions", 'data-empty-query="수면"']
  ,["Pagination status announcement", 'id="page-status" role="status" aria-live="polite"']
  ,["Candidate personal review actions", "data-candidate-review-status=\"검토 완료\""]
  ,["Candidate review timestamp", "function candidateReviewUpdatedAt"]
  ,["Candidate review timestamp display", "확인 시각"]
  ,["Candidate CSV review timestamp", "개인 검토 확인 시각"]
  ,["Candidate review progress summary", 'id="candidate-review-progress"']
  ,["Candidate status separation", "자동 선별 상태"]
  ,["Brief verification status", "원문 접근:"]
  ,["Candidate detail focus return", "candidateDetailReturnFocus"]
  ,["Review priority sort", 'value="review-priority"']
  ,["Sort guidance association", 'id="sort" aria-describedby="sort-help"']
  ,["Sort condition visibility", "sortLabel"]
  ,["Page size condition visibility", "pageSizeLabel"]
  ,["Default sort condition guard", 'state.sort === "latest"']
  ,["Empty result recovery", "data-empty-reset"]
  ,["Empty result condition context", "data-empty-context"]
  ,["Empty result condition status", 'data-empty-context role="status" aria-live="polite"']
  ,["Empty result interpretation", "result-interpretation-empty"]
  ,["Desktop filter collapse", 'id="filter-collapse"']
  ,["Desktop filter collapse control", 'aria-controls="filter-panel"']
  ,["Desktop filter reopen", 'id="filter-reopen"']
  ,["Result snapshot dates", "검증 스냅샷"]
  ,["Semantic result snapshot dates", "<time datetime=\""]
  ,["Visible filter status", 'id="filter-status-strip"']
  ,["Filter status summary", 'id="filter-status-text"']
  ,["Filter status reset", 'id="filter-status-reset"']
  ,["Dose query interpretation", "function queryFilterLabel"]
  ,["Mobile filter result action", 'id="filter-mobile-apply"']
  ,["Empty mobile filter count hidden", ".mobile-filter-count[hidden]"]
  ,["Reading list accessible count", 'aria-label="읽기 목록, 0개 저장됨"']
  ,["Reading list live count", 'id="reading-list-count" aria-live="polite"']
  ,["Reading list accessible state sync", 'openButton.setAttribute("aria-label", "읽기 목록, " + selected.length + "개 저장됨")']
  ,["Saved search accessible count", 'aria-label="저장 검색, 0개 저장됨"']
  ,["Saved search live count", 'id="saved-search-count" aria-live="polite"']
  ,["Saved search accessible state sync", 'summary.setAttribute("aria-label", "저장 검색, " + savedCount + "개 저장됨")']
  ,["Compare live atomic state", 'id="compare-tray" hidden aria-live="polite" aria-atomic="true"']
  ,["Compare summary accessible state", 'compareSummary.setAttribute("aria-label", selected.length + "개 선택됨']
  ,["Compare action accessible state", 'compareOpen.setAttribute("aria-label", selected.length < 2 ? "선택 자료 비교, 2개 이상 선택 필요"']
  ,["Compare share action", 'id="compare-share"']
  ,["Compare share renderer", "function shareCompareSelection"]
  ,["Compare share fallback", 'openCopyDialog("비교 링크"']
  ,["Compare shared-link auto open", "urlCompareRequested && selectedCompareRecords().length >= 2"]
  ,["Compare shared-link missing note", 'id="compare-shared-note"']
  ,["Compare missing count boundary", "urlCompareMissingCount"]
  ,["Compare overflow count boundary", "urlCompareOverflowCount"]
  ,["Compare dialog boundary note", "compareLinkBoundaryNote()"]
  ,["Search slash shortcut", 'event.key !== "/"']
  ,["Search slash shortcut focus", "controls.q.focus();"]
  ,["Result card citation action", 'class="paper-citation" type="button" data-copy-citation=']
  ,["Result card citation fallback", 'openCopyDialog("인용 정보"']
  ,["Reading list citation export", 'id="reading-list-citations"']
  ,["Reading list citation renderer", "function readingListCitationText"]
  ,["Reading list citation fallback", 'openCopyDialog("읽기 목록 인용"']
  ,["Result interpretation guard", "해석 경계"]
  ,["Result evidence scope actions", 'data-result-preset="animal"']
  ,["Result evidence scope preset", 'if (name === "animal") state.kind = "동물"']
  ,["Result audit access composition", "auditOkAction"]
  ,["Result audit follow-up composition", "auditUnavailableAction"]
  ,["Result audit access preset", 'if (name === "audit-ok") state.audit = "ok"']
  ,["Result view mode toggle", "data-view-mode"]
  ,["Result compact view renderer", "compact-card"]
  ,["Result view URL state", "state.view"]
  ,["Intervention boundary guide", "순수 GABA와 복합제"]
  ,["Intervention class boundary guide", "발효·프로바이오틱·수용체 약물"]
  ,["Card study condition summary", 'fact("표본·대조군"']
  ,["Evidence scope selection state", "result-interpretation-stat-action[aria-pressed"]
  ,["Card verification date", "record.checked ? ' · 확인 '"]
  ,["Review queue verification meta", 'class="review-priority-meta"']
  ,["Review checklist action summary", 'id="review-check-summary"']
  ,["Verification next action wording", "원문에서 확인한 뒤 활용 범위를 판단"]
  ,["Balanced direction quick filter", 'data-direction="무효"']
  ,["Balanced direction disclosure", 'data-quick-summary="direction"']
  ,["Quick filter progressive disclosure", 'id="quick-advanced"']
  ,["Quick filter active summary", "data-quick-advanced-summary"]
  ,["Quick filter active count sync", "activeAdvanced"]
  ,["Reading list source action", "원문 확인"]
  ,["Reading list compare action", 'data-compare-toggle=']
  ,["Evidence distribution expansion", "function renderDistribution"]
  ,["Evidence distribution complete list", "var extra = items.slice(4)"]
  ,["Evidence distribution hidden state", ".distribution-item[hidden]"]
  ,["Evidence distribution selected state", "function syncDistributionSelection"]
  ,["Evidence distribution pressed state", "aria-pressed"]
  ,["Evidence distribution toggle", "state[field] === value ? \"\" : value"]
  ,["Evidence distribution focus return", 'id="result-count" tabindex="-1"']
];

const missing = required.filter(([, marker]) => !source.includes(marker));
if (missing.length) {
  console.error(JSON.stringify({ valid: false, missing: missing.map(([name]) => name) }));
  process.exit(1);
}

console.log(JSON.stringify({ valid: true, checked: required.length, source: "worker/template.js" }));
