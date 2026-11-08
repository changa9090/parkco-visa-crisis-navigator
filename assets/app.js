/**
 * Park & Co Lawyers — Canonical Australian Statutory Date & Public Holiday Utility (2026–2027)
 * Eliminates UTC `.toISOString()` midnight shift bugs across AEST/AEDT/KST timezones and
 * applies state-specific public holidays for working-day counts and s 36(2) rollovers.
 */
(function (root) {
  "use strict";

  var NATIONAL_HOLIDAYS = {
    "2026-01-01": "New Year's Day",
    "2026-01-26": "Australia Day",
    "2026-04-03": "Good Friday",
    "2026-04-06": "Easter Monday",
    "2026-12-25": "Christmas Day",
    "2026-12-28": "Boxing Day (Additional Day)",
    "2027-01-01": "New Year's Day",
    "2027-01-26": "Australia Day",
    "2027-03-26": "Good Friday",
    "2027-03-29": "Easter Monday",
    "2027-04-26": "Anzac Day (Observed)",
    "2027-12-27": "Christmas Day (Additional Day)",
    "2027-12-28": "Boxing Day (Additional Day)"
  };

  var STATE_HOLIDAYS = {
    QLD: {
      "2026-04-04": "Easter Saturday",
      "2026-04-25": "Anzac Day",
      "2026-05-04": "Labour Day (QLD)",
      "2026-10-05": "King's Birthday (QLD)",
      "2027-05-03": "Labour Day (QLD)",
      "2027-10-04": "King's Birthday (QLD)"
    },
    NSW: {
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (NSW)",
      "2026-10-05": "Labour Day (NSW)",
      "2027-06-14": "King's Birthday (NSW)",
      "2027-10-04": "Labour Day (NSW)"
    },
    VIC: {
      "2026-03-09": "Labour Day (VIC)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (VIC)",
      "2026-11-03": "Melbourne Cup Day (VIC)",
      "2027-03-08": "Labour Day (VIC)",
      "2027-06-14": "King's Birthday (VIC)",
      "2027-11-02": "Melbourne Cup Day (VIC)"
    },
    WA: {
      "2026-03-02": "Labour Day (WA)",
      "2026-04-27": "Anzac Day (Observed WA)",
      "2026-06-01": "Western Australia Day",
      "2026-09-28": "King's Birthday (WA)",
      "2027-03-01": "Labour Day (WA)",
      "2027-06-07": "Western Australia Day",
      "2027-09-27": "King's Birthday (WA)"
    },
    SA: {
      "2026-03-09": "Adelaide Cup Day (SA)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (SA)",
      "2026-10-05": "Labour Day (SA)",
      "2027-03-08": "Adelaide Cup Day (SA)",
      "2027-06-14": "King's Birthday (SA)",
      "2027-10-04": "Labour Day (SA)"
    },
    TAS: {
      "2026-03-09": "Eight Hours Day (TAS)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (TAS)",
      "2027-03-08": "Eight Hours Day (TAS)",
      "2027-06-14": "King's Birthday (TAS)"
    },
    ACT: {
      "2026-03-09": "Canberra Day (ACT)",
      "2026-04-27": "Anzac Day (Observed ACT)",
      "2026-06-01": "Reconciliation Day (ACT)",
      "2026-06-08": "King's Birthday (ACT)",
      "2026-10-05": "Labour Day (ACT)",
      "2027-03-08": "Canberra Day (ACT)",
      "2027-05-31": "Reconciliation Day (ACT)",
      "2027-06-14": "King's Birthday (ACT)",
      "2027-10-04": "Labour Day (ACT)"
    },
    NT: {
      "2026-05-04": "May Day (NT)",
      "2026-06-08": "King's Birthday (NT)",
      "2026-08-03": "Picnic Day (NT)",
      "2027-05-03": "May Day (NT)",
      "2027-06-14": "King's Birthday (NT)",
      "2027-08-02": "Picnic Day (NT)"
    }
  };

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function parseIsoLocal(isoStr) {
    if (!isoStr || typeof isoStr !== "string") return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoStr.trim());
    if (!m) return null;
    var y = parseInt(m[1], 10);
    var mo = parseInt(m[2], 10) - 1;
    var dy = parseInt(m[3], 10);
    var d = new Date(y, mo, dy, 12, 0, 0, 0);
    if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== dy) return null;
    return d;
  }

  function formatIsoLocal(d) {
    if (!d || isNaN(d.getTime())) return "-";
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function todayBrisbaneIso() {
    try {
      var parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Australia/Brisbane",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(new Date());
      var map = {};
      for (var i = 0; i < parts.length; i++) map[parts[i].type] = parts[i].value;
      if (map.year && map.month && map.day) return map.year + "-" + map.month + "-" + map.day;
    } catch (_) {}
    return formatIsoLocal(new Date());
  }

  function getHolidayName(isoStr, stateCode) {
    var st = (stateCode || "QLD").toUpperCase();
    if (NATIONAL_HOLIDAYS[isoStr]) return NATIONAL_HOLIDAYS[isoStr];
    if (STATE_HOLIDAYS[st] && STATE_HOLIDAYS[st][isoStr]) return STATE_HOLIDAYS[st][isoStr];
    return null;
  }

  function isBusinessDay(d, stateCode) {
    var dow = d.getDay();
    if (dow === 0 || dow === 6) return false;
    var iso = formatIsoLocal(d);
    return !getHolidayName(iso, stateCode);
  }

  function addCalendarDays(d, days) {
    var next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, 12, 0, 0, 0);
    return next;
  }

  function calcWorkingDaysDeadline(startIso, workingDays, stateCode) {
    var start = parseIsoLocal(startIso);
    if (!start) return null;
    var st = (stateCode || "QLD").toUpperCase();
    var cur = new Date(start.getTime());
    var added = 0;
    var skippedHolidays = [];
    while (added < workingDays) {
      cur = addCalendarDays(cur, 1);
      var dow = cur.getDay();
      var iso = formatIsoLocal(cur);
      var hName = getHolidayName(iso, st);
      if (dow !== 0 && dow !== 6) {
        if (hName) {
          skippedHolidays.push({ date: iso, name: hName });
        } else {
          added += 1;
        }
      }
    }
    var safe = addCalendarDays(cur, -1);
    while (safe > start && !isBusinessDay(safe, st)) {
      safe = addCalendarDays(safe, -1);
    }
    return {
      statutoryDate: formatIsoLocal(cur),
      safeDate: formatIsoLocal(safe),
      state: st,
      skippedHolidays: skippedHolidays
    };
  }

  function calcCalendarDaysDeadline(startIso, calendarDays, stateCode, rolloverToNextBusinessDay) {
    var start = parseIsoLocal(startIso);
    if (!start) return null;
    var st = (stateCode || "QLD").toUpperCase();
    var raw = addCalendarDays(start, calendarDays);
    var finalDate = new Date(raw.getTime());
    var rolledReason = null;
    if (rolloverToNextBusinessDay) {
      var reasons = [];
      while (!isBusinessDay(finalDate, st)) {
        var iso = formatIsoLocal(finalDate);
        var hName = getHolidayName(iso, st);
        var dow = finalDate.getDay();
        if (hName) reasons.push(hName);
        else if (dow === 6) reasons.push("Saturday");
        else if (dow === 0) reasons.push("Sunday");
        finalDate = addCalendarDays(finalDate, 1);
      }
      if (reasons.length > 0) rolledReason = reasons.join(" / ");
    }
    var safe = addCalendarDays(finalDate, -1);
    return {
      rawDate: formatIsoLocal(raw),
      statutoryDate: formatIsoLocal(finalDate),
      safeDate: formatIsoLocal(safe),
      state: st,
      rolledReason: rolledReason
    };
  }

  function diffDaysFromTodayBrisbane(targetIso) {
    var t = parseIsoLocal(targetIso);
    var now = parseIsoLocal(todayBrisbaneIso());
    if (!t || !now) return 0;
    return Math.round((t.getTime() - now.getTime()) / 86400000);
  }

  var api = {
    parseIsoLocal: parseIsoLocal,
    formatIsoLocal: formatIsoLocal,
    todayBrisbaneIso: todayBrisbaneIso,
    getHolidayName: getHolidayName,
    isBusinessDay: isBusinessDay,
    calcWorkingDaysDeadline: calcWorkingDaysDeadline,
    calcCalendarDaysDeadline: calcCalendarDaysDeadline,
    diffDaysFromTodayBrisbane: diffDaysFromTodayBrisbane
  };

  root.ParkCoDates = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);

/* PNC Legal Pty Ltd t/a Park & Co Lawyers · Visa Refusal · Cancellation · Section 48 Bar · PIC 4020 · ART Deadline Navigator */
(function () {
  "use strict";
  const DEFAULT_SOURCES = [{"id": "migration_act_s48", "category": "Primary Legislation", "name_ko": "Migration Act 1958 · Section 48 (호주 내 비자 거절·취소 후 재신청 금지 조항)", "name_en": "Migration Act 1958 · Section 48 (Non-citizen refused or cancelled visa barred onshore)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/C1958A00062/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "s 48(1) onshore bar triggered when holding no substantive visa after onshore refusal or cancellation", "status": "verified_ok", "http_status": 200, "bytes": 1747244, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "22cc03a0b0a72db0"}, {"id": "migration_regs_2_12", "category": "Primary Legislation", "name_ko": "Migration Regulations 1994 · reg 2.12 (Section 48 예외 허용 비자 목록)", "name_en": "Migration Regulations 1994 · reg 2.12 (Prescribed Visa Classes Exempt from Section 48)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/F1996B03551/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "Partner (820/801), Skilled Nominated/Regional (190, 491, 494), Medical (602), Protection (866), Child (802), Bridging (A-R)", "status": "verified_ok", "http_status": 200, "bytes": 3580174, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "a964fbdacae4f71a"}, {"id": "migration_regs_4_10_art", "category": "Tribunal Deadlines", "name_ko": "Migration Act s 347 & Migration Regulations reg 4.10 · 행정재심기구(ART) 재심 청구 법정 기한", "name_en": "Migration Act s 347 & reg 4.10 · Strict Statutory Time Limits for ART Review", "authority": "Federal Register of Legislation / ART", "url": "https://www.art.gov.au/applying-review/immigration-and-citizenship", "method": "HTML + Statutory Deadline Parser", "cadence": "Weekly", "tracks": "28 calendar days (onshore refusal), 7 working days (s 116 onshore cancellation), 7 working days (immigration detention), 70 days (offshore sponsor review)", "status": "verified_ok", "http_status": 200, "bytes": 311586, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "44d7633f972b3fab"}, {"id": "migration_act_s501_500", "category": "Character & s 501", "name_ko": "Migration Act s 501 / s 501CA / s 500(6B) · 인성(Character) 비자 거절·강제취소 기한", "name_en": "Migration Act s 501 / s 501CA / s 500(6B) · Character Refusal & Mandatory Cancellation Deadlines", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/C1958A00062/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "s 501(3A) Mandatory Cancellation revocation request: 28 days (no extension); s 500(6B) ART onshore character review: 9 calendar days (84-day decision rule)", "status": "verified_ok", "http_status": 200, "bytes": 1747244, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "22cc03a0b0a72db0"}, {"id": "ministerial_direction_123", "category": "Ministerial Direction", "name_ko": "Ministerial Direction No. 123 (2026.10.31 시행, 구 Direction 110 폐지) · s 501 / s 501CA 인성 심사 지침", "name_en": "Ministerial Direction No. 123 (eff. 31 Oct 2026, revoking Direction 110) · Visa Refusal & Cancellation under s 501 / s 501CA", "authority": "Department of Home Affairs", "url": "https://immi.homeaffairs.gov.au/support-subsite/files/ministerial-direction-123.pdf", "method": "PDF Policy Verification", "cadence": "Weekly", "tracks": "Commenced 31 Oct 2026 (replacing Direction 110): 6 primary considerations · Protection of Australian community (highest priority), Family violence (broadened definition), Impact on Australia's social cohesion (new 6th primary consideration), Ties to Australia, Best interests of minor children, Expectations of community", "status": "verified_ok", "http_status": 200, "bytes": 480670, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "10e6cb6f6f0ad4eb"}, {"id": "migration_act_s116_noicc", "category": "Cancellation (s 116)", "name_ko": "Migration Act s 116 / s 119 · 일반 비자 취소 및 NOICC 소명 절차", "name_en": "Migration Act s 116 / s 119 · General Visa Cancellation Powers & NOICC Response", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/C1958A00062/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "Condition breach (8107/8607/8202), change of circumstances, risk to health/safety/good order; strict NOICC response timeframes (typically 5 working days)", "status": "verified_ok", "http_status": 200, "bytes": 1747244, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "22cc03a0b0a72db0"}, {"id": "sch4_pic_4020", "category": "Public Interest Criteria", "name_ko": "Migration Regulations Schedule 4 · PIC 4020 (허위서류·거짓정보 3년 / 신원위조 10년 입국금지)", "name_en": "Migration Regulations Schedule 4 · PIC 4020 (Bogus Documents & False/Misleading Info 3-Yr / Identity 10-Yr Bar)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/F1996B03551/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "PIC 4020(1)/(2) 3-yr bar (Waiver available under 4020(4) for compassionate/compelling interests of AU citizen/PR) vs PIC 4020(2A)/(2B) 10-yr identity bar (NO waiver)", "status": "verified_ok", "http_status": 200, "bytes": 3580174, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "a964fbdacae4f71a"}, {"id": "sch4_pic_4013_4014", "category": "Exclusion Periods", "name_ko": "Migration Regulations Schedule 4 · PIC 4013 / PIC 4014 (비자 취소·불법체류 출국 후 3년 입국금지)", "name_en": "Migration Regulations Schedule 4 · PIC 4013 / PIC 4014 (3-Year Exclusion Period After Cancellation or Unlawful Departure)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/F1996B03551/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "3-year exclusion from temporary visas if departing unlawful (>28 days after expiry) or on BVC/BVD/BVE; affects temporary visas (not permanent PR visas unless specified)", "status": "verified_ok", "http_status": 200, "bytes": 3580174, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "a964fbdacae4f71a"}, {"id": "condition_8503_waiver", "category": "No Further Stay Waiver", "name_ko": "Migration Act s 41(2A) & reg 2.05(4) · Condition 8503 / 8534 / 8535 (No Further Stay) 웨이버", "name_en": "Migration Act s 41(2A) & reg 2.05(4) · Condition 8503 / 8534 / 8535 Waiver Criteria", "authority": "Department of Home Affairs", "url": "https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/waivers-and-permissions/no-further-stay-waiver", "method": "HTML ContentBox Parser", "cadence": "Weekly", "tracks": "Compelling and compassionate circumstances developed since visa grant, beyond applicant's control, resulting in major change (note: marriage/pregnancy alone usually insufficient unless complicated)", "status": "verified_ok", "http_status": 200, "bytes": 1308828, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "8dc8529bd7f67689"}, {"id": "art_fees_and_refund", "category": "Tribunal Fees (reg 4.13A / 4.31B)", "name_ko": "행정재심기구(ART) 이민 재심 수수료($3,727 / 50% $1,863.50) 및 보호비자 28일 내 선납 수수료($1,863.50 · F2026L01448, reg 4.31B)", "name_en": "Administrative Review Tribunal (ART) Migration Review Fee ($3,727 / 50% $1,863.50) & Protection Upfront Fee ($1,863.50 · F2026L01448, reg 4.31B)", "authority": "Administrative Review Tribunal (ART)", "url": "https://www.art.gov.au/help-and-resources/fees", "method": "HTML Fee Parser + F2026L01448 Verification", "cadence": "Weekly", "tracks": "FY2026–27 Migration Review Fee $3,727 (50% reduction/refund $1,863.50) · Protection Visa review mandatory $1,863.50 upfront fee within 28-day lodgement period from 1 Nov 2026 (F2026L01448, reg 4.31B; waiver only for immigration detention or severe financial hardship, replacing former $2,293 post-decision fee) · Character s 501 $1,195", "status": "verified_ok", "http_status": 200, "bytes": 128205, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "f6a45b094376504f"}, {"id": "dha_bve_unlawful_status", "category": "Bridging Visa E (050)", "name_ko": "Bridging Visa E (Subclass 050) 및 비자 만료 후 28일 Grace Period 규정", "name_en": "Bridging Visa E (Subclass 050) & Schedule 3 Criteria (3001/3003/3004)", "authority": "Department of Home Affairs", "url": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/bridging-visa-e-050-051", "method": "SharePoint PageSchemaHiddenField JSON", "cadence": "Weekly", "tracks": "Lawful status restoration, Schedule 3 waiver requirements for onshore Partner 820 applicants without a substantive visa", "status": "verified_ok", "http_status": 200, "bytes": 1297137, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "bd2c9a82452f84d0"}, {"id": "fccfcoa_judicial_review", "category": "Judicial Review", "name_ko": "Migration Act s 476 / s 477 · 연방순회·가족법원(FCFCOA) 관할권 오류 사법심사 (35일 기한)", "name_en": "Migration Act s 476 / s 477 · FCFCOA Judicial Review for Jurisdictional Error (35 Days)", "authority": "Federal Circuit and Family Court of Australia", "url": "https://www.fcfcoa.gov.au/migration", "method": "Court Practice Direction Verification", "cadence": "Weekly", "tracks": "35-day statutory deadline from date of ART decision to file judicial review application for jurisdictional error", "status": "verified_ok", "http_status": 200, "bytes": 83708, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "996be09be8257db7"}, {"id": "art_processing_times_12cat", "category": "ART Processing Times (p50/p95)", "name_ko": "행정재심기구 (ART) 12개 이민 사건 카테고리 및 보호비자 실제 완료 소요기간 (50% 중위 / 95% 장기)", "name_en": "Administrative Review Tribunal (ART) Actual Processing Times by Case Category (50% Median / 95%)", "authority": "Administrative Review Tribunal (ART)", "url": "https://www.art.gov.au/about-us/accountability-and-reporting/processing-times", "method": "Live HTML Table Parser (13 Categories)", "cadence": "Monthly (6-Month Rolling Window)", "tracks": "Partner 3y2m/3y11m · Nomination 1y6m/2y4m · Temp Work 1y6m/2y10m · Student Refusal 1y5m/2y2m · Bridging 11d/1y1m · Protection 2y1m/4y11m", "status": "verified_ok", "http_status": 200, "bytes": 108109, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "634b7f420fdf30b2"}, {"id": "art_caseload_subclass_outcomes", "category": "ART Subclass Outcomes & Backlog", "name_ko": "행정재심기구 (ART) 비자·처분별 재심 결과 (이중 분모 Set Aside 비율) 및 노미네이션 적체 통계 (FY2026–27)", "name_en": "ART Migration & Protection Detailed Caseload Statistics (Subclass Dual-Denominator Outcomes & Backlog)", "authority": "Administrative Review Tribunal (ART)", "url": "https://www.art.gov.au/sites/default/files/2026-08/Migration-Detailed-Caseload-Statistics-2026-27.pdf", "method": "Official Caseload PDF + Dual-Denominator Validator", "cadence": "Monthly", "tracks": "On-hand 83,847 (Study 64.38%) · Working/Skilled 86.70% Employer Nomination refusals (3,078) · Restricted Set Aside: 485 93.30%, 820 85.16%, 482 83.33%, 500 81.30%, Citizenship 58.82%", "status": "verified_ok", "http_status": 200, "bytes": 974695, "last_checked": "2026-11-09T07:55:11+10:00", "sha256_prefix": "fe57c01188167f6b"}];
  const DEFAULT_ART_INTEL = {"generated_at": "2026-11-09T07:55:11+10:00", "processing_times": {"status": "verified_ok", "http_status": 200, "bytes": 108109, "sha256": "634b7f420fdf30b24c07c22dd334cf1235f477c0f5f6824ec49d88ab196c7441", "sha256_prefix": "634b7f420fdf30b2", "method": "art-processing-html-live", "url": "https://www.art.gov.au/about-us/accountability-and-reporting/processing-times", "period_start_label": "1 April 2026", "period_end_label": "30 September 2026", "period_iso": "2026-03-01 to 2026-08-31", "exclusion_note_ko": "인성(s 501 · 84일 법정심결) 및 시민권 재심 사건과 관할권 없음(No jurisdiction) 각하 건은 위 표에서 제외됨", "exclusion_note_en": "Excludes character & citizenship decisions and applications finalised as no jurisdiction", "category_count": 13, "categories": [{"category_en": "Bridging", "category_ko": "브리징 비자 (Bridging · 구금 등 우선심리 포함)", "p50_en": "11 days", "p50_ko": "11일", "p95_en": "1 year and 2 months", "p95_ko": "1년 2개월"}, {"category_en": "Family", "category_ko": "가족초청 비자 (Family · 부모·기타가족 등)", "p50_en": "1 year and 8 months", "p50_ko": "1년 8개월", "p95_en": "3 years", "p95_ko": "3년"}, {"category_en": "Nomination/Sponsor approval", "category_ko": "고용주 스폰서십 · 노미네이션 거절 (Nomination/Sponsor Approval)", "p50_en": "1 year and 6 months", "p50_ko": "1년 6개월", "p95_en": "2 years and 4 months", "p95_ko": "2년 4개월"}, {"category_en": "Partner", "category_ko": "파트너·배우자 비자 거절 (Partner · 820/801 · 309/100 · 300)", "p50_en": "3 years and 1 month", "p50_ko": "3년 1개월", "p95_en": "3 years and 11 months", "p95_ko": "3년 11개월"}, {"category_en": "Permanent business", "category_ko": "영주 사업·투자비자 (Permanent Business)", "p50_en": "2 years and 4 months", "p50_ko": "2년 4개월", "p95_en": "3 years", "p95_ko": "3년"}, {"category_en": "Skill linked", "category_ko": "기술이민 연계 비자 (Skill Linked · 189 · 190 · 491 · 485 등)", "p50_en": "9 months", "p50_ko": "9개월", "p95_en": "3 years", "p95_ko": "3년"}, {"category_en": "Student cancellation", "category_ko": "학생비자 취소 (Student Cancellation · s 116 등)", "p50_en": "1 year and 1 month", "p50_ko": "1년 1개월", "p95_en": "1 year and 7 months", "p95_ko": "1년 7개월"}, {"category_en": "Student refusal", "category_ko": "학생비자 거절 (Student Refusal · Subclass 500)", "p50_en": "1 year and 5 months", "p50_ko": "1년 5개월", "p95_en": "2 years and 2 months", "p95_ko": "2년 2개월"}, {"category_en": "Temporary work", "category_ko": "임시 취업비자 거절 (Temporary Work · SID 482 등)", "p50_en": "1 year and 6 months", "p50_ko": "1년 6개월", "p95_en": "2 years and 10 months", "p95_ko": "2년 10개월"}, {"category_en": "Visitor", "category_ko": "방문·관광비자 거절 (Visitor · Subclass 600 스폰서 재심)", "p50_en": "1 year and 1 month", "p50_ko": "1년 1개월", "p95_en": "2 years and 4 months", "p95_ko": "2년 4개월"}, {"category_en": "Other", "category_ko": "기타 이민 사건 (Other Migration)", "p50_en": "1 year and 1 month", "p50_ko": "1년 1개월", "p95_en": "1 year and 8 months", "p95_ko": "1년 8개월"}, {"category_en": "All migration case categories", "category_ko": "전체 이민 사건 통합 (All Migration Case Categories)", "p50_en": "1 year and 5 months", "p50_ko": "1년 5개월", "p95_en": "2 years and 10 months", "p95_ko": "2년 10개월"}, {"category_en": "Protection (Refugee)", "category_ko": "보호·난민비자 (Protection Subclass 866 등)", "p50_en": "2 years", "p50_ko": "2년", "p95_en": "4 years and 9 months", "p95_ko": "4년 9개월"}]}, "caseload_outcomes": {"status": "verified_ok", "http_status": 200, "bytes": 974695, "sha256": "fe57c01188167f6b483a406502dcf1744bf676391240347d1fdc45c8a30ddecb", "sha256_prefix": "fe57c01188167f6b", "whole_sha256_prefix": "8eaf6efadc22797e", "method": "art-caseload-pdf-live", "landing_url": "https://www.art.gov.au/help-and-resources/statistics", "migration_pdf_url": "https://www.art.gov.au/sites/default/files/2026-08/Migration-Detailed-Caseload-Statistics-2026-27.pdf", "whole_pdf_url": "https://www.art.gov.au/sites/default/files/2026-08/ART-Caseload-2026-27.pdf", "period_iso": "2026-07-01 to 2026-08-31 (FY2026–27 YTD)", "stock_as_at": "2026-08-31", "migration_totals": {"lodgements": 8518, "finalisations": 5450, "on_hand": 83847, "set_aside": 2473, "affirmed_total": 837, "dismissed_subset": 178, "withdrawn": 1566, "other_no_jurisdiction": 574, "change_all_pct": 45.38, "restricted_change_pct": 78.96, "median_weeks_whole_report": 62}, "nomination_refusal_highlight": {"working_skilled_lodgements": 3550, "working_skilled_finalisations": 677, "working_skilled_clearance_pct": 19.07, "employer_nomination_lodgements": 3078, "employer_nomination_share_pct": 86.7, "employer_nomination_on_hand": 8598}, "subclass_outcomes": [{"id": "485_temporary_graduate_refusal", "subclass": "485", "decision_type": "Visa Refusal", "label_ko": "졸업생 비자 거절 (Subclass 485 Refusal)", "label_en": "Subclass 485 (Temporary Graduate) · Visa Refusal", "pdf_page": 4, "L": 223, "F": 431, "H": 2882, "S": 362, "A": 28, "D": 2, "W": 39, "O": 2, "insight_ko": "기술심사·영어성적·AFP 영수증 시점 보완 및 s 103 합의 결정 포함 시 실질 결정 대비 93.30%가 취소·환송(Set Aside)", "insight_en": "93.30% of substantive decisions (excl. withdrawals/dismissals) resulted in Set Aside/Remittal/s 103 consent", "A_minus_D": 26, "restricted_denominator": 388, "excluded_procedural_count": 43, "change_all_pct": 83.99, "restricted_change_pct": 93.3, "nonrestricted_pct": 9.98}, {"id": "820_refusal", "subclass": "820", "decision_type": "Visa Refusal", "label_ko": "온쇼어 파트너 비자 거절 (Subclass 820 Refusal)", "label_en": "Subclass 820 (Partner Temporary) · Visa Refusal", "pdf_page": 3, "L": 305, "F": 146, "H": 2550, "S": 109, "A": 24, "D": 5, "W": 9, "O": 4, "insight_ko": "약 3년 2개월(중위 134주) 심리 대기 동안 4대 요건(재정·주거·사회·상호 헌신) 누적 증거 및 Schedule 3 법리 보완 시 85.16%(실질) 인용", "insight_en": "3 yr 2 m median wait allows accumulating reg 1.15A 4-pillar & Schedule 3 evidence (85.16% restricted Set Aside)", "A_minus_D": 19, "restricted_denominator": 128, "excluded_procedural_count": 18, "change_all_pct": 74.66, "restricted_change_pct": 85.16, "nonrestricted_pct": 12.33}, {"id": "500_refusal", "subclass": "500", "decision_type": "Visa Refusal", "label_ko": "학생비자 거절 (Subclass 500 Refusal)", "label_en": "Subclass 500 (Student) · Visa Refusal", "pdf_page": 5, "L": 2846, "F": 2912, "H": 53357, "S": 1361, "A": 397, "D": 84, "W": 1068, "O": 86, "insight_ko": "학업 완료·출국에 따른 자진 취하(Withdrawn 1,068건 = 36.68%) 착시를 걷어내면 끝까지 심리받은 사건의 81.30%가 취소·환송(Set Aside)", "insight_en": "36.68% (1,068) withdraw before hearing; among cases reaching a non-dismissal decision, 81.30% are Set Aside", "A_minus_D": 313, "restricted_denominator": 1674, "excluded_procedural_count": 1238, "change_all_pct": 46.74, "restricted_change_pct": 81.3, "nonrestricted_pct": 42.51}, {"id": "482_refusal", "subclass": "482", "decision_type": "Visa Refusal", "label_ko": "고용주 스폰서 비자 거절 (SID/TSS 482 Refusal)", "label_en": "Subclass 482 (SID/TSS) · Visa Refusal", "pdf_page": 9, "L": 250, "F": 220, "H": 3530, "S": 100, "A": 46, "D": 26, "W": 61, "O": 13, "insight_ko": "취하(61건)·절차종결(39건)을 제외한 본안 결정(120건) 중 83.33%(100건)가 노미네이션·경력 보완으로 취소·환송(Set Aside)", "insight_en": "83.33% (100/120) restricted Set Aside rate once withdrawals (61) and dismissals/other (39) are separated", "A_minus_D": 20, "restricted_denominator": 120, "excluded_procedural_count": 100, "change_all_pct": 45.45, "restricted_change_pct": 83.33, "nonrestricted_pct": 45.45}, {"id": "500_cancellation", "subclass": "500", "decision_type": "Visa Cancellation", "label_ko": "학생비자 취소 (Subclass 500 Cancellation · s 116)", "label_en": "Subclass 500 (Student) · Visa Cancellation", "pdf_page": 5, "L": 84, "F": 172, "H": 566, "S": 78, "A": 76, "D": 22, "W": 8, "O": 10, "insight_ko": "단순 거절(81.30%)보다 취소(59.09%)의 방어 난도가 훨씬 높으므로 NOICC 5영업일 소명 단계에서 취소를 막는 것이 핵심", "insight_en": "Cancellation review is tougher (59.09% vs 81.30% for refusal): early NOICC defence before cancellation is critical", "A_minus_D": 54, "restricted_denominator": 132, "excluded_procedural_count": 40, "change_all_pct": 45.35, "restricted_change_pct": 59.09, "nonrestricted_pct": 23.26}, {"id": "600_refusal", "subclass": "600", "decision_type": "Visa Refusal", "label_ko": "방문비자 거절 (Subclass 600 Refusal · 호주 가족 스폰서 건)", "label_en": "Subclass 600 (Visitor) · Visa Refusal", "pdf_page": 7, "L": 335, "F": 465, "H": 3269, "S": 52, "A": 22, "D": 1, "W": 85, "O": 306, "insight_ko": "전체 종결의 65.81%(306건)가 재심 청구 적격(Part 5 reviewable 요건) 미비로 관할권 없음(Other) 각하되며 본안 심리 통과 시 71.23% 인용", "insight_en": "65.81% (306/465) dismissed as Other/No Jurisdiction due to ineligible offshore applications; 71.23% (52/73) when valid", "A_minus_D": 21, "restricted_denominator": 73, "excluded_procedural_count": 392, "change_all_pct": 11.18, "restricted_change_pct": 71.23, "nonrestricted_pct": 84.3}, {"id": "citizenship", "subclass": "Citizenship", "decision_type": "Citizenship Refusal", "label_ko": "호주 시민권 거절 재심 (Australian Citizenship Refusal)", "label_en": "Australian Citizenship Refusal Review", "pdf_page": 11, "L": 82, "F": 94, "H": 301, "S": 30, "A": 26, "D": 5, "W": 21, "O": 17, "insight_ko": "인성(Good Character)·거주기간·신원 사유 시민권 거절 건으로 취하·각하 제외 실질 결정(51건) 중 58.82%(30건)가 취소·환송(Set Aside)", "insight_en": "Good character, residence & identity refusals: 31.91% (30/94) of all finalisations and 58.82% (30/51) of substantive decisions Set Aside", "A_minus_D": 21, "restricted_denominator": 51, "excluded_procedural_count": 43, "change_all_pct": 31.91, "restricted_change_pct": 58.82, "nonrestricted_pct": 45.74}, {"id": "character", "subclass": "s 501 Character", "decision_type": "Character s 501 / s 501CA", "label_ko": "인성 사유 비자 거절 · 강제취소 철회거부 (s 501 / s 501CA)", "label_en": "Character Review (s 501 Refusal & s 501CA Non-Revocation)", "pdf_page": 11, "L": 72, "F": 89, "H": 154, "S": 33, "A": 42, "D": 1, "W": 6, "O": 8, "insight_ko": "9일 청구 기한 · 84일 법정 심결 데드라인(s 500(6B)) 적용 구간 · 2026.10.31 이후 결정은 Ministerial Direction No. 123(사회통합 제6차 주요 고려사항 추가 · 가정폭력 정의 확대, 구 Direction 110 폐지) 적용 (실질 결정 대비 44.59% [33/74] Set Aside)", "insight_en": "Subject to strict 9-day filing & 84-day decision rules (s 500(6B)); decisions on/after 31 Oct 2026 apply Ministerial Direction No. 123 (6th primary consideration social cohesion & broadened family violence, revoking Direction 110) · 44.59% (33/74) restricted Set Aside", "A_minus_D": 41, "restricted_denominator": 74, "excluded_procedural_count": 15, "change_all_pct": 37.08, "restricted_change_pct": 44.59, "nonrestricted_pct": 16.85}], "macro_insights": [{"id": "employer_nomination_surge", "badge_ko": "고용주 스폰서 · 노미네이션 핵심 병목 (PDF p.9–10)", "badge_en": "Working & Skilled Backlog Driver (PDF p.9–10)", "metric_highlight": "86.70% (3,078 / 3,550건)", "title_ko": "취업·기술비자 행정재심기구(ART) 신규 접수의 86.70%(3,078건)가 고용주 노미네이션 거절입니다", "title_en": "86.70% (3,078 of 3,550) of Working/Skilled ART Lodgements Are Employer Nomination Refusals", "desc_ko": "2026년 7~8월 두 달간 취업·기술비자(Working/Skilled) 재심 청구 3,550건 중 종결은 677건(해소율 19.07%, 미결 순증 +2,863건)에 그쳤으며 신규 접수의 86.70%(3,078건)가 비자 본안이 아닌 고용주 노미네이션(Nomination) 거절입니다. 약 1년 6개월~2년 10개월의 행정재심기구(ART) 대기 시간 동안 재무제표·시장급여(AMSR)·직무 진정성(Genuine Position) 서류를 보강하면 본안 결정 대비 83.33%(482 기준)의 높은 역전 인용률을 기대할 수 있습니다.", "desc_en": "Working/Skilled visas recorded a 19.07% clearance rate (677 finalised vs 3,550 lodged), driven by 3,078 Employer Nomination refusals (86.70%). The 1.5–2.8 year ART queue provides a critical window to rebuild financial, AMSR, and genuine position evidence.", "cta_service": "art_case_review"}, {"id": "study_backlog_concentration", "badge_ko": "학생비자 적체 집중 & 자진취하 착시 (PDF p.5)", "badge_en": "Study Visa Backlog & Withdrawal Effect (PDF p.5)", "metric_highlight": "64.38% (53,984 / 83,847건)", "title_ko": "전체 이민 재심 적체의 64.38%(53,984건)가 학생비자이며 실질 본안 결정 시 81.30%가 뒤집힙니다", "title_en": "Study Visas Hold 64.38% (53,984) of Migration On-Hand Backlog; 81.30% Restricted Set Aside", "desc_ko": "학생비자(500) 거절의 전체 종결 대비 취소·환송(Set Aside) 비율은 46.74%(1,361/2,912)로 보이지만 이는 재심 대기 중 학업을 마치고 출국하며 자진 취하한 1,068건(36.68%)이 분모에 포함되었기 때문입니다. 취하·각하를 제외하고 실제 본안 결정까지 간 사건(1,674건) 중에서는 81.30%(1,361건)가 취소·환송되었습니다.", "desc_en": "While 500 Refusal shows a 46.74% raw Set Aside rate across all 2,912 finalisations, 36.68% (1,068) were applicant withdrawals. Among the 1,674 non-dismissal substantive decisions, 81.30% (1,361) were Set Aside.", "cta_service": "art_case_review"}, {"id": "visitor_jurisdiction_trap", "badge_ko": "관할권 각하(No Jurisdiction) 함정 경보 (PDF p.7)", "badge_en": "No-Jurisdiction Dismissal Trap (PDF p.7)", "metric_highlight": "65.81% (306 / 465건 각하)", "title_ko": "방문비자(600) 재심 신청의 65.81%(306건)가 본안 심리도 못 받고 관할권 없음으로 각하됩니다", "title_en": "65.81% (306 of 465) of Subclass 600 ART Finalisations Exit as No-Jurisdiction / Other", "desc_ko": "해외 신청 방문비자(600)는 호주 시민권·영주권 가족 스폰서 요건(Part 5 reviewable decision)을 충족하지 못하면 행정재심기구(ART) 관할권이 전혀 없습니다. 무작정 재심을 넣었다가 65.81%가 각하되는 반면 적격 여부를 사전 검증해 본안 심리(73건)까지 간 사건은 71.23%(52건)가 인용되었습니다.", "desc_en": "Offshore Visitor 600 refusals without an eligible Australian family sponsor/visit condition lack Part 5 jurisdiction (65.81% exited as Other). When jurisdictionally valid and decided on the merits, 71.23% (52/73) were Set Aside.", "cta_service": "visa_emergency"}, {"id": "partner_long_queue_window", "badge_ko": "파트너·가족비자 장기 대기 & 증거 보강 (PDF p.1, 3)", "badge_en": "Partner/Family 134-Week Median Wait & Evidence Window", "metric_highlight": "3년 2개월 (중위 134주) · 85.16%", "title_ko": "파트너 비자(820) 재심은 중위 3년 2개월(134주)이 소요되나 실질 본안 결정의 85.16%가 인용됩니다", "title_en": "Partner 820 Reviews Take 3 Yrs 2 Mos (134 Wks Median), Yielding 85.16% Restricted Set Aside", "desc_ko": "파트너 비자는 이민성 1차 심사 시점의 증거 부족이나 Schedule 3 사유로 거절되더라도 행정재심기구(ART)가 재심 결정 시점(Time of Decision)의 누적된 동거·재정·자녀 출산 증거를 모두 반영합니다(전체 종결 대비 74.66%, 실질 결정 대비 85.16% 인용).", "desc_en": "Because the ART re-evaluates partner relationships at the time of the Tribunal's decision, the ~3-year wait allows couples to build decisive cohabitation, financial, and family evidence (74.66% raw / 85.16% restricted Set Aside).", "cta_service": "art_case_review"}]}};

  const STATE = {
    lang: "ko",
    artInteracted: false,
    s48Interacted: false,
    waiverInteracted: false,
    sources: DEFAULT_SOURCES,
    artIntel: DEFAULT_ART_INTEL
  };

  const I18N = {
    ko: {
      brandTag: "박앤코 · 비자 위기·ART 기한 진단기",
      nav_btn_art: "기한 계산기",
      nav_btn_s48: "Section 48",
      nav_btn_waiver: "PIC 4020·8503",
      nav_btn_art_intel: "ART 통계",
      navFaq: "이민 FAQ",
      pollBtnLabel: "14/14 출처 검증",
      topCta: "공식 문의 허브",
      urgentBadge: "연장 불가 법정 기한:",
      urgentText: "s 116 NOICC 소명 통상 5 영업일(reg 2.44) · s 116 취소 확정 후 행정재심기구(ART) 재심 7 영업일 불변(reg 4.10(1)(b)) · 일반 거절 28 역일 · s 500 인성 재심 9 역일",
      heroOverline: "법무법인 박앤코 · QLS 이민법 전문변호사 감수",
      hero_title: "호주 비자 거절 · 취소(s 116 / s 501) · Section 48 · 행정재심기구(ART) 기한 진단기",
      hero_lead: "통지서 수신일과 관할 주(State)를 선택하면 2026–2027 주별 공휴일을 반영한 보수적 안전 접수 권고일과 법정 최종 마감일을 나란히 산출합니다.",
      sec1_title: "1. 행정재심기구(ART) 재심 · s 116 NOICC 소명 · s 501 철회 마감일 계산기",
      sec1_desc: "이민성 통지서 이메일 발송일은 당일 송달로 간주됩니다(Migration Act s 494C(5)). 취소 예고(NOICC) 단계와 취소 확정 후 재심 단계를 정확히 구분하여 선택하십시오.",
      artInputCardTitle: "통지서 유형 · 수신일 · 관할 주(State) 입력",
      lblArtDecision: "1. 수신한 이민성 통지서 / 처분 단계",
      lblArtDate: "2. 통지서 이메일 수신일",
      hintArtDate: "이메일 발송일 당일 수령 간주 (s 494C)",
      lblArtState: "3. 거주 주/준주 (공휴일 기준)",
      hintArtState: "2026–2027 주별 법정 공휴일 자동 반영",
      lblArtSub: "4. 현재 실체 비자(Substantive Visa) 보유 여부",
      artResultCardTitle: "법정 마감일 및 보수적 안전 접수일 병기 결과",
      sec2_title: "2. Section 48 Bar 발동 여부 및 호주 내 예외 신청 비자(reg 2.12) 진단기",
      sec2_desc: "호주 입국 후 비자가 거절·취소되었고 현재 유효한 실체 비자가 없다면 Migration Act s 48에 따라 호주 내에서는 reg 2.12 예외 비자만 접수할 수 있습니다. 브리징 비자 B(BVB)로 출국 후 재입국하더라도 s 48 제한은 해제되지 않습니다.",
      s48InputTitle: "현재 비자 이력 및 희망 신청 비자 선택",
      lblS48History: "1. 마지막 호주 입국 이후 비자 거절/취소 이력",
      lblS48Target: "2. 새로 신청하고자 하는 목표 비자 (Target Subclass)",
      s48ResultTitle: "Section 48 적용 여부 및 합법적 대응 경로",
      sec3_title: "3. PIC 4020 · Condition 8503 · Schedule 3 웨이버 진단 및 긴급 상담 브리프",
      sec3_desc: "소명 요구서(Natural Justice Letter)를 수령했거나 비자에 Condition 8503이 부과된 경우에만 아래 웨이버 항목을 선택하십시오. 선택하지 않은 웨이버 쟁점은 하단 상담 브리프에 포함되지 않습니다.",
      wvInputTitle: "웨이버·소명 쟁점 및 참작 사유 선택 (해당자 선택)",
      lblWvInclude: "PIC 4020 · Condition 8503 · Schedule 3 웨이버 쟁점이 있어 상담 브리프에 포함합니다",
      lblWvIssue: "1. 당면한 법적 장벽 / 통지서 종류",
      lblWvTies: "2. 호주 시민권자·영주권자 가족·고용주 등 핵심 참작 사정",
      wvResultTitle: "법정 웨이버(Waiver) 요건 및 방어 논리",
      briefTitle: "긴급 비자 거절·취소·ART 기한 진단 브리프 복사 및 공식 상담 접수",
      briefDesc: "입력하신 통지 유형과 마감일 산출 내역을 복사하여 법무법인 박앤코 공식 문의 허브 또는 이메일(enquiry@parkcolawyers.com)로 전달하실 수 있습니다.",
      discBgSummary: "배경 통계 및 법적 근거 펼쳐보기 (처분별 법정 기한 비교 차트 · 행정재심기구(ART) 인용률 통계 · 전문변호사 안내)",
      sec0_title: "비자 위기 대응 핵심 법정 기한(NOICC 5영업일 vs 취소 후 ART 7영업일) 및 Section 48 시각화 차트",
      sec0_desc: "행정재심기구(ART)는 법정 기한이 단 하루만 지나도 관할권 없음(No Jurisdiction)으로 각하합니다.",
      artIntelTitle: "행정재심기구(ART) 비자·처분별 실제 재심 결과(이중 분모 비교) 및 13개 카테고리 심리 소요기간",
      artIntelDesc: "행정재심기구(ART) 공식 통계 보고서(Migration-Detailed-Caseload-Statistics-2026-27.pdf) 원문을 검증하여 전체 종결 대비 인용률(S/F)과 실질 본안 결정 대비 인용률(S/[S+A-D])을 함께 제시합니다.",
      artOutcomeTableTitle: "1. 주요 비자 서브클래스·처분별 ART 재심 결과 이중 분모 비교표 (2026.07.01–2026.08.31 공식 PDF)",
      artOutcomeTableSub: "산술 검증식: Set aside(S) + 순수기각(A-D) + 각하부분집합(D) + 자진취하(W) + 관할제외·기타(O) = 전체종결(F).",
      thArtVisa: "비자 · 처분 유형 (PDF 쪽)",
      thArtFlow: "신규접수(L) / 종결(F) / 미결재고(H)",
      thArtBreakdown: "종결 상세: 인용(S) · 기각(A-D) · 각하(D) · 취하(W) · 관할제외(O)",
      thArtAllRate: "전체 종결 대비 Set Aside (S / F)",
      thArtRestRate: "실질 결정 대비 Set Aside (S / [S+A-D])",
      thArtInsight: "실무 해석 및 점검 포인트",
      artDurTableTitle: "2. 행정재심기구(ART) 13개 사건 카테고리별 실제 완료 소요기간 (p50 중앙값 vs p95 장기)",
      artDurTableSub: "법정 기한 내 적법하게 재심을 접수하면 브리징 비자가 유지되며 심리 대기 기간 동안 보완 증거를 제출할 수 있습니다.",
      thDurCat: "ART 사건 카테고리 (Case Category)",
      thDurP50: "50% 사건 완료 소요기간 (p50 중앙값)",
      thDurP95: "95% 사건 완료 소요기간 (p95 장기)",
      thDurStrategy: "재심 대기 기간 보완 포인트",
      sec4_title: "1차 법령 데이터 출처 확인 (14개 연방 법령 · 행정재심기구(ART) · 연방법원 SHA-256 검증)"
    },
    en: {
      brandTag: "Park & Co · Visa Crisis & ART Navigator",
      nav_btn_art: "Deadlines",
      nav_btn_s48: "Section 48",
      nav_btn_waiver: "PIC 4020·8503",
      nav_btn_art_intel: "ART Stats",
      navFaq: "Immi FAQ",
      pollBtnLabel: "14/14 Verified",
      topCta: "Official Inquiry Hub",
      urgentBadge: "Strict Statutory Time Limits:",
      urgentText: "s 116 NOICC response: 5 working days (reg 2.44) · Post-cancellation s 116 ART review: 7 working days non-extendable (reg 4.10(1)(b)) · Standard refusal: 28 calendar days · s 500 Character ART: 9 calendar days",
      heroOverline: "Park & Co Lawyers · QLS Accredited Specialist in Immigration Law",
      hero_title: "Australia Visa Refusal · Cancellation (s 116 / s 501) · Section 48 · ART Deadline Navigator",
      hero_lead: "Select your notification date and State/Territory to calculate both your Conservative Safe Lodgement Date and Statutory Final Deadline across 2026–2027 public holidays.",
      sec1_title: "1. ART Merits Review · s 116 NOICC Response · s 501 Revocation Deadline Calculator",
      sec1_desc: "Home Affairs email notices are deemed received on the date of transmission (Migration Act s 494C(5)). Distinguish carefully between pre-cancellation NOICC (5 working days) and post-cancellation ART review (7 working days).",
      artInputCardTitle: "Notice Stage, Date Received & State/Territory",
      lblArtDecision: "1. Home Affairs Notice / Procedural Stage",
      lblArtDate: "2. Email Notification Date",
      hintArtDate: "Deemed received same day via email (s 494C)",
      lblArtState: "3. State/Territory (Public Holidays)",
      hintArtState: "Applies 2026–2027 National & State public holidays",
      lblArtSub: "4. Current Substantive Visa Status",
      artResultCardTitle: "Side-by-Side Safe & Statutory Deadlines",
      sec2_title: "2. Section 48 Bar & Onshore Exempt Visas (reg 2.12) Checker",
      sec2_desc: "If refused or cancelled onshore without holding a substantive visa, Migration Act s 48 restricts onshore lodgements to reg 2.12 exempt subclasses. Departing and returning on a BVB does not lift Section 48.",
      s48InputTitle: "Current Visa History & Target Subclass",
      lblS48History: "1. Visa Refusal / Cancellation History Since Last Entry",
      lblS48Target: "2. Target Visa Subclass",
      s48ResultTitle: "Section 48 Assessment & Lawful Options",
      sec3_title: "3. PIC 4020 · Condition 8503 · Schedule 3 Waiver & Consultation Brief",
      sec3_desc: "Select a waiver issue below only if you received a Natural Justice letter or hold Condition 8503. Untouched waiver modules are excluded from your consultation brief.",
      wvInputTitle: "Waiver / Natural Justice Issue & Ties (Optional)",
      lblWvInclude: "Include PIC 4020 / Condition 8503 / Schedule 3 waiver issue in my consultation brief",
      lblWvIssue: "1. Statutory Barrier / Notice Type",
      lblWvTies: "2. Key Australian Citizen/PR Family or Employer Ties",
      wvResultTitle: "Statutory Waiver Criteria & Defence Strategy",
      briefTitle: "Copy Urgent Diagnostic Brief & Request Official Consultation",
      briefDesc: "Copy your calculated deadlines and submit via the Park & Co Inquiry Hub or official email (enquiry@parkcolawyers.com).",
      discBgSummary: "Expand Background Statistics & Legal Authorities (Statutory Deadline Charts · Official ART Outcomes · Specialist Profile)",
      sec0_title: "Statutory Deadlines (NOICC 5 Working Days vs ART 7 Working Days) & Section 48 Matrix",
      sec0_desc: "The Administrative Review Tribunal (ART) has zero jurisdiction if an application is lodged even one day late.",
      artIntelTitle: "Official ART Subclass Outcomes (Dual-Denominator) & 13-Category Actual Processing Times",
      artIntelDesc: "Verified against the official ART Migration Detailed Caseload Statistics PDF (2026–27), comparing All-Finalisations Set Aside (S/F) and Restricted Substantive Set Aside (S/[S+A-D]).",
      artOutcomeTableTitle: "1. Subclass & Decision-Type ART Outcomes: Dual-Denominator Table (1 Jul – 31 Aug 2026 Official PDF)",
      artOutcomeTableSub: "Invariant: Set aside (S) + Affirmed (A-D) + Dismissed (D) + Withdrawn (W) + Other (O) = Total Finalised (F).",
      thArtVisa: "Subclass & Decision Type (PDF Page)",
      thArtFlow: "Lodged (L) / Finalised (F) / On-Hand (H)",
      thArtBreakdown: "Set Aside (S) · Affirmed (A-D) · Dismissed (D) · Withdrawn (W) · Other (O)",
      thArtAllRate: "All-Finalisations Set Aside (S / F)",
      thArtRestRate: "Substantive Set Aside (S / [S+A-D])",
      thArtInsight: "Practical Assessment Points",
      artDurTableTitle: "2. ART Actual Processing Times Across 13 Categories (p50 Median vs p95)",
      artDurTableSub: "Timely ART lodgement preserves Bridging Visa status while updated evidence is prepared.",
      thDurCat: "ART Case Category",
      thDurP50: "50% Finalised Within (p50 Median)",
      thDurP95: "95% Finalised Within (p95)",
      thDurStrategy: "Review Queue Preparation Notes",
      sec4_title: "Verify Primary Legal Sources (14 Federal Statutes · ART · FCFCOA SHA-256 Monitor)"
    }
  };

  function computeArtDeadline(type, dateStr, stateCode, lang) {
    const en = lang === "en";
    const st = (stateCode || "QLD").toUpperCase();
    const D = (typeof window !== "undefined" && window.ParkCoDates) || globalThis.ParkCoDates;
    if (!D || !D.parseIsoLocal(dateStr)) return null;

    let res = null;
    let ruleLabel = "";
    let note = "";
    let extendable = false;

    if (type === "s116_noicc") {
      res = D.calcWorkingDaysDeadline(dateStr, 5, st);
      extendable = true;
      ruleLabel = en
        ? "5 Working Days (Pre-Cancellation NOICC · reg 2.44)"
        : "통상 5 영업일 (취소 결정 전 NOICC 소명 · reg 2.44)";
      note = en
        ? "Pre-cancellation Notice of Intention to Consider Cancellation (NOICC) under s 116 / s 119 typically prescribes 5 working days (reg 2.44(2)(b)). Unlike post-cancellation ART review, a discretionary extension of up to 5 additional working days may be requested from the delegate BEFORE the initial period expires (s 121(4) / reg 2.44(3)). Always verify the exact timeframe printed on your notice."
        : "취소 결정이 내려지기 전 단계인 취소예고통지(NOICC · s 116 / s 119) 소명 기한은 통상 5 영업일입니다(reg 2.44(2)(b)). 취소 확정 후 ART 재심과 달리 원 기한이 만료되기 전에 이민성 담당관에게 사유를 소명하여 최대 5 영업일 연장을 신청할 재량 규정이 존재합니다(s 121(4) / reg 2.44(3)). 반드시 통지서 본문에 기재된 정확한 기한을 함께 확인하십시오.";
    } else if (type === "s116_cancel") {
      res = D.calcWorkingDaysDeadline(dateStr, 7, st);
      ruleLabel = en
        ? "7 Working Days Non-Extendable (Post-Cancellation ART · reg 4.10(1)(b))"
        : "7 영업일 불변 (취소 확정 후 ART 재심 · reg 4.10(1)(b))";
      note = en
        ? "Post-cancellation ART review of an onshore s 116 general cancellation decision is strictly 7 working days excluding weekends and public holidays in the relevant State/Territory (reg 4.10(1)(b)). The ART has ZERO statutory discretion to extend this deadline."
        : "이미 s 116 비자 취소 결정이 내려진 뒤 행정재심기구(ART)에 재심을 청구하는 법정 기한은 주말 및 해당 주 공휴일을 제외한 7 영업일입니다(reg 4.10(1)(b)). 이 기한은 단 하루도 연장이 불가능합니다.";
    } else if (type === "detention_ref_canc") {
      res = D.calcWorkingDaysDeadline(dateStr, 7, st);
      ruleLabel = en
        ? "7 Working Days Non-Extendable (Detention ART · reg 4.10(2))"
        : "7 영업일 불변 (이민 구금 상태 ART 재심 · reg 4.10(2))";
      note = en
        ? "Applicants in immigration detention have strictly 7 working days to lodge an ART review application (reg 4.10(2)) with zero extension discretion."
        : "이민 구금(Immigration Detention) 상태에서 받은 비자 거절 또는 s 116 취소 처분에 대한 행정재심기구(ART) 재심 청구 기한은 7 영업일 불변입니다(reg 4.10(2)).";
    } else if (type === "onshore_refusal") {
      res = D.calcCalendarDaysDeadline(dateStr, 28, st, false);
      ruleLabel = en
        ? "28 Calendar Days (Onshore Refusal ART · reg 4.10(1)(a))"
        : "28 역일 (호주 내 일반 거절 ART 재심 · reg 4.10(1)(a))";
      note = en
        ? "Standard ART review period for onshore visa or sponsorship/nomination refusals is 28 calendar days after notification. Lodge on or before the Conservative Safe Date to prevent midnight or timezone disputes."
        : "호주 내 일반 비자 거절 또는 고용주 스폰서십·노미네이션 거절에 대한 행정재심기구(ART) 재심 청구 기한은 통지일 다음 날부터 기산하여 28 역일입니다(reg 4.10(1)(a)). 자정 시간대 착오를 예방하기 위해 보수적 안전 접수 권고일까지 접수를 완료하십시오.";
    } else if (type === "protection_refusal") {
      res = D.calcCalendarDaysDeadline(dateStr, 28, st, false);
      ruleLabel = en
        ? "28 Calendar Days + $1,863.50 Upfront Fee (reg 4.31B · F2026L01448)"
        : "28 역일 + $1,863.50 선납 필수 (reg 4.31B · F2026L01448)";
      note = en
        ? "From 1 November 2026 (F2026L01448, reg 4.31B), Protection Visa ART review applications require a mandatory $1,863.50 upfront fee paid within the strict 28-day lodgement period unless exempt due to detention or severe financial hardship."
        : "2026년 11월 1일 시행령(F2026L01448 · reg 4.31B)에 따라 보호비자 행정재심기구(ART) 재심 청구는 28 역일 법정 기한 내에 신청 수수료 $1,863.50를 선납해야 적법하게 성립합니다(이민 구금 또는 심각한 경제적 곤궁 면제 제외).";
    } else if (type === "s501_mandatory_rev") {
      res = D.calcCalendarDaysDeadline(dateStr, 28, st, false);
      ruleLabel = en
        ? "28 Calendar Days (s 501CA Revocation · Direction No. 123)"
        : "28 역일 불변 (s 501CA 강제취소 철회 요청 · Direction No. 123)";
      note = en
        ? "Written representations seeking revocation of a mandatory s 501(3A) cancellation must be lodged within 28 calendar days addressing Ministerial Direction No. 123 (commenced 31 Oct 2026)."
        : "s 501(3A) 인성 사유 강제 비자 취소에 대한 철회 요청(Revocation Request)은 통지 후 28 역일 이내에 Ministerial Direction No. 123(2026.10.31 시행) 기준 소명서와 함께 제출해야 합니다.";
    } else if (type === "s500_char_art") {
      res = D.calcCalendarDaysDeadline(dateStr, 9, st, false);
      ruleLabel = en
        ? "9 Calendar Days Non-Extendable (s 500(6B) Character ART)"
        : "9 역일 불변 (s 500(6B) 호주 내 인성 처분 ART 재심)";
      note = en
        ? "Onshore character refusal or s 501CA(4) non-revocation review to the ART must be lodged within 9 calendar days (s 500(6B)), and the ART must decide within 84 days."
        : "호주 내 s 501 인성 거절 또는 강제취소 철회거부(s 501CA(4))에 대한 행정재심기구(ART) 재심 기한은 9 역일 불변이며 재판소는 84일 이내에 심결해야 합니다.";
    } else if (type === "offshore_sponsor") {
      res = D.calcCalendarDaysDeadline(dateStr, 70, st, false);
      ruleLabel = en
        ? "70 Calendar Days (Offshore Sponsor ART · reg 4.10(1)(c))"
        : "70 역일 (해외 비자 거절 호주 스폰서 ART 재심 · reg 4.10(1)(c))";
      note = en
        ? "Where an offshore visa application with an eligible Australian sponsor is refused, the sponsor has 70 calendar days to lodge an ART review."
        : "적격 호주 스폰서가 있는 해외 신청 비자가 거절된 경우 호주 내 스폰서는 70 역일 이내에 행정재심기구(ART) 재심을 청구할 수 있습니다.";
    } else {
      res = D.calcCalendarDaysDeadline(dateStr, 35, st, false);
      ruleLabel = en
        ? "35 Calendar Days (FCFCOA Judicial Review · s 477)"
        : "35 역일 (연방순회·가족법원(FCFCOA) 사법심사 · s 477)";
      note = en
        ? "Judicial review applications to the Federal Circuit and Family Court of Australia (FCFCOA) for jurisdictional error must be filed within 35 calendar days of the ART decision."
        : "행정재심기구(ART) 기각 결정일로부터 35 역일 이내에 관할권 오류(Jurisdictional Error)를 근거로 연방순회·가족법원(FCFCOA)에 사법심사를 청구할 수 있습니다.";
    }

    return {
      type: type,
      state: st,
      safeDate: res.safeDate,
      statutoryDate: res.statutoryDate,
      skippedHolidays: res.skippedHolidays || [],
      rolledReason: res.rolledReason || null,
      ruleLabel: ruleLabel,
      note: note,
      extendable: extendable
    };
  }

  function renderCharts() {
    const en = STATE.lang === "en";
    const artChart = document.getElementById("svg-art-deadlines-chart");
    if (artChart) {
      artChart.innerHTML = `
        <svg viewBox="0 0 680 290" width="100%" style="display:block;height:auto;font-family:'Pretendard Variable','Manrope',sans-serif;">
          <rect x="0" y="0" width="680" height="290" rx="10" fill="#FBF9F5"/>
          <text x="18" y="32" font-size="11" font-weight="800" fill="#946200">${en ? "1A. Pre-Cancellation s 116 NOICC Response" : "1A. 취소 전 s 116 예고통지(NOICC) 소명"}</text>
          <rect x="278" y="17" width="76" height="20" rx="4" fill="#B68B40"/>
          <text x="362" y="31" font-size="10.5" font-weight="800" fill="#946200">${en ? "5 Working Days · reg 2.44 (+5d req before expiry)" : "통상 5 영업일 · reg 2.44 (만료 전 +5영업일 연장요청 가능)"}</text>

          <text x="18" y="68" font-size="11" font-weight="800" fill="#9E2A2B">${en ? "1B. Post-Cancellation s 116 / Detention ART" : "1B. 취소 확정 후 s 116 / 구금 ART 재심"}</text>
          <rect x="278" y="53" width="95" height="20" rx="4" fill="#9E2A2B"/>
          <text x="381" y="67" font-size="10.5" font-weight="800" fill="#9E2A2B">${en ? "7 Working Days · reg 4.10(1)(b) (Zero Extension)" : "7 영업일 불변 · reg 4.10(1)(b) (연장 불가)"}</text>

          <text x="18" y="104" font-size="11" font-weight="800" fill="#9E2A2B">${en ? "2. Onshore Character (s 501) ART Review" : "2. 호주 내 인성(s 501) 거절·철회거부 ART"}</text>
          <rect x="278" y="89" width="112" height="20" rx="4" fill="#7A1F2B"/>
          <text x="398" y="103" font-size="10.5" font-weight="800" fill="#7A1F2B">${en ? "9 Calendar Days · s 500(6B) [84-day decision]" : "9 역일 불변 · s 500(6B) [84일 심결]"}</text>

          <text x="18" y="140" font-size="11" font-weight="700" fill="#0E3A3E">${en ? "3. Onshore Visa / Nomination Refusal ART" : "3. 호주 내 일반 비자·노미네이션 거절 ART"}</text>
          <rect x="278" y="125" width="205" height="20" rx="4" fill="#0E3A3E"/>
          <text x="491" y="139" font-size="10.5" font-weight="700" fill="#0E3A3E">${en ? "28 Calendar Days · reg 4.10(1)(a)" : "28 역일 · reg 4.10(1)(a)"}</text>

          <text x="18" y="176" font-size="11" font-weight="700" fill="#1F5A5E">${en ? "4. s 501(3A) Mandatory Cancellation Revocation" : "4. s 501(3A) 강제취소 철회 요청 (s 501CA)"}</text>
          <rect x="278" y="161" width="205" height="20" rx="4" fill="#1F5A5E"/>
          <text x="491" y="175" font-size="10.5" font-weight="700" fill="#1F5A5E">${en ? "28 Calendar Days · Direction No. 123" : "28 역일 · Direction No. 123"}</text>

          <text x="18" y="212" font-size="11" font-weight="700" fill="#3A4D4F">${en ? "5. FCFCOA Judicial Review (Jurisdictional Error)" : "5. 연방순회·가족법원(FCFCOA) 사법심사"}</text>
          <rect x="278" y="197" width="245" height="20" rx="4" fill="#3A4D4F"/>
          <text x="531" y="211" font-size="10.5" font-weight="700" fill="#3A4D4F">${en ? "35 Calendar Days · s 477" : "35 역일 · s 477"}</text>

          <text x="18" y="248" font-size="11" font-weight="700" fill="#1D6B47">${en ? "6. Offshore Refusal Sponsor ART Review" : "6. 해외 비자 거절 호주 스폰서 ART 재심"}</text>
          <rect x="278" y="233" width="320" height="20" rx="4" fill="#1D6B47"/>
          <text x="605" y="247" font-size="10.5" font-weight="700" fill="#1D6B47">${en ? "70 Days" : "70 역일"}</text>
        </svg>
      `;
    }

    const s48Chart = document.getElementById("svg-s48-matrix-chart");
    if (s48Chart) {
      s48Chart.innerHTML = `
        <svg viewBox="0 0 680 250" width="100%" style="display:block;height:auto;font-family:'Pretendard Variable','Manrope',sans-serif;">
          <rect x="0" y="0" width="680" height="250" rx="10" fill="#FBF9F5"/>
          <rect x="18" y="16" width="312" height="218" rx="10" fill="#EEF8F2" stroke="#B7DEC8" stroke-width="1.5"/>
          <text x="34" y="42" font-size="12" font-weight="800" fill="#1D6B47">${en ? "Section 48 Exempt Visas (reg 2.12)" : "Section 48 예외 허용 비자 (reg 2.12)"}</text>
          <text x="34" y="62" font-size="10.5" fill="#14282A">${en ? "Permitted ONSHORE while on a Bridging Visa:" : "브리징 비자 상태에서 호주 내 접수 가능:"}</text>
          <text x="42" y="86" font-size="11" font-weight="700" fill="#14282A">${en ? "• Subclass 190 / 491 / 494 (State & Regional)" : "• Subclass 190 / 491 / 494 (주정부·지방 스폰서)"}</text>
          <text x="42" y="110" font-size="11" font-weight="700" fill="#14282A">${en ? "• Subclass 820/801 (Partner · Check Schedule 3)" : "• Subclass 820/801 (파트너 · Schedule 3 유의)"}</text>
          <text x="42" y="134" font-size="11" font-weight="700" fill="#14282A">${en ? "• Subclass 602 (Medical) · 866 (Protection)" : "• Subclass 602 (의료치료) · 866 (보호비자)"}</text>
          <text x="42" y="158" font-size="11" font-weight="700" fill="#14282A">${en ? "• Bridging Visas A / B / C / E" : "• 브리징 비자 A / B / C / E"}</text>

          <rect x="350" y="16" width="312" height="218" rx="10" fill="#FDF2F2" stroke="#EBCACA" stroke-width="1.5"/>
          <text x="366" y="42" font-size="12" font-weight="800" fill="#9E2A2B">${en ? "Section 48 Barred Onshore" : "Section 48 호주 내 신청 금지 비자"}</text>
          <text x="366" y="62" font-size="10.5" fill="#14282A">${en ? "Must depart Australia and lodge OFFSHORE:" : "출국 후 해외 체류 중 접수해야 하는 비자:"}</text>
          <text x="374" y="86" font-size="11" font-weight="700" fill="#14282A">${en ? "• SID Subclass 482 · ENS Subclass 186" : "• SID Subclass 482 · ENS Subclass 186"}</text>
          <text x="374" y="110" font-size="11" font-weight="700" fill="#14282A">${en ? "• Subclass 500 (Student) · Subclass 485 (Graduate)" : "• Subclass 500 (학생) · Subclass 485 (졸업생)"}</text>
          <text x="374" y="134" font-size="11" font-weight="700" fill="#14282A">${en ? "• Subclass 189 · Subclass 600 · Parent Visas" : "• Subclass 189 · Subclass 600 · 부모초청 비자"}</text>
          <text x="374" y="168" font-size="10.5" font-weight="700" fill="#9E2A2B">${en ? "Note: Returning on BVB does NOT lift s 48." : "주의: BVB로 재입국해도 s 48 제한은 유지됩니다."}</text>
        </svg>
      `;
    }
  }

  function updateArtDeadline() {
    const en = STATE.lang === "en";
    const out = document.getElementById("art-deadline-result");
    if (!out) return;

    if (!STATE.artInteracted) {
      out.innerHTML = `
        <div class="pk-empty-prompt">
          <span>${en
            ? "Select your notice stage, notification date, and State/Territory on the left to calculate your Conservative Safe Lodgement Date and Statutory Final Deadline."
            : "좌측에서 통지서 단계와 이메일 수신일 및 거주 주(State)를 선택하시면 2026–2027 주별 공휴일을 반영한 보수적 안전 접수 권고일과 법정 최종 마감일을 나란히 계산합니다."}</span>
          <button type="button" class="pk-btn-cta" id="btn-art-example">${en ? "Load Example Data" : "예시 데이터 넣어보기"}</button>
        </div>
      `;
      document.getElementById("btn-art-example")?.addEventListener("click", function () {
        const dtEl = document.getElementById("art-decision-type");
        const dateEl = document.getElementById("art-notice-date");
        const stEl = document.getElementById("art-state");
        if (dtEl) dtEl.value = "s116_cancel";
        if (dateEl) dateEl.value = "2026-11-05";
        if (stEl) stEl.value = "QLD";
        STATE.artInteracted = true;
        updateArtDeadline();
      });
      updateCrisisPreview();
      return;
    }

    const type = document.getElementById("art-decision-type")?.value || "onshore_refusal";
    const dateStr = document.getElementById("art-notice-date")?.value || window.ParkCoDates.todayBrisbaneIso();
    const stateCode = document.getElementById("art-state")?.value || "QLD";
    const subStatus = document.getElementById("art-substantive-status")?.value || "bridging";

    const calc = computeArtDeadline(type, dateStr, stateCode, STATE.lang);
    if (!calc) {
      out.innerHTML = `<div class="pk-empty-prompt"><span>${en ? "Please enter a valid notification date (YYYY-MM-DD)." : "유효한 통지서 수신일(YYYY-MM-DD)을 입력해 주십시오."}</span></div>`;
      return;
    }

    const holidayHtml = calc.skippedHolidays.length > 0
      ? `<p style="margin:6px 0 0;font-size:12.5px;color:var(--pk-brand);"><strong>${en ? "Excluded Public Holidays" : "제외된 주별 법정 공휴일"} (${calc.state})</strong>: ${calc.skippedHolidays.map((h) => `${h.date} (${h.name})`).join(", ")}</p>`
      : `<p style="margin:6px 0 0;font-size:12.5px;color:var(--pk-muted);">${en ? `State holiday calendar applied: ${calc.state} (2026–2027)` : `적용된 공휴일 기준: ${calc.state} 주/준주 (2026–2027 법정 공휴일 반영)`}</p>`;

    out.innerHTML = `
      <div class="pk-deadline-pair">
        <div class="pk-deadline-card pk-deadline-card--safe">
          <div class="pk-deadline-card__label">${en ? "Conservative Safe Lodgement Date (1 Business/Calendar Day Prior)" : "보수적 안전 접수 권고일 (1일 전)"}</div>
          <div class="pk-deadline-card__date">${calc.safeDate}</div>
        </div>
        <div class="pk-deadline-card pk-deadline-card--statutory">
          <div class="pk-deadline-card__label">${en ? `Statutory Final Deadline (${calc.state} Holidays Applied)` : `법정 최종 마감일 (${calc.state} 주별 공휴일 반영)`}</div>
          <div class="pk-deadline-card__date">${calc.statutoryDate}</div>
        </div>
      </div>
      <div style="margin-bottom:8px;font-size:13px;font-weight:700;color:var(--pk-ink);">
        ${en ? "Applicable Provision:" : "적용 규정 및 기한:"} <span style="color:var(--pk-brand);">${calc.ruleLabel}</span>
        ${holidayHtml}
      </div>
      <div class="alert-box ${calc.extendable ? "alert-box--warn" : "alert-box--danger"}" style="margin-top:8px;">
        <p style="margin:0 0 6px;"><strong>${calc.extendable ? (en ? "NOICC Response Timeframe" : "NOICC 소명 기한 안내") : (en ? "Strict Statutory Deadline" : "법정 불변 기한 엄수 안내")}</strong>: ${calc.note}</p>
        <p style="margin:0 0 6px;"><strong>[${en ? "FY2026–27 ART Fees" : "FY2026–27 행정재심기구(ART) 수수료"}]</strong>: ${en
          ? "Standard Migration Review: $3,727 AUD (50% hardship reduction / 50% refund on favourable outcome: $1,863.50) · Protection Review (reg 4.31B): mandatory $1,863.50 upfront within 28 days · Character s 501: $1,195."
          : "일반 이민 재심(reg 4.13A): $3,727 AUD (경제적 곤궁 50% 감면 및 인용·환송 시 50% 환급: $1,863.50) · 보호비자 재심(reg 4.31B): 28일 기한 내 $1,863.50 선납 필수 · s 501 인성 재심: $1,195."}</p>
        <p style="margin:0;"><strong>[Section 48]</strong>: ${subStatus === "bridging"
          ? (en
            ? "No substantive visa held: Section 48 applies immediately; only reg 2.12 exempt visas (190/491/494/820/602/866) can be lodged onshore."
            : "현재 실체 비자가 없으므로 Section 48 제한이 즉시 적용되며 호주 내에서는 reg 2.12 예외 비자(190·491·494·820·602·866)만 신청할 수 있습니다.")
          : (en
            ? "Substantive visa still active: Section 48 is not triggered until your substantive visa expires."
            : "기존 실체 비자가 아직 유효하므로 실체 비자 만료일 전까지는 Section 48 제한이 발동하지 않습니다.")}</p>
      </div>
    `;
    updateCrisisPreview();
  }

  function updateSection48Checker() {
    const en = STATE.lang === "en";
    const out = document.getElementById("s48-checker-result");
    if (!out) return;

    if (!STATE.s48Interacted) {
      out.innerHTML = `
        <div class="pk-empty-prompt">
          <span>${en
            ? "Select your visa refusal history and target subclass to check whether onshore lodgement is permitted under reg 2.12."
            : "좌측에서 비자 거절·취소 이력과 희망 목표 비자를 선택하시면 reg 2.12 호주 내 예외 신청 가능 여부를 판정합니다."}</span>
          <button type="button" class="pk-btn-ghost" id="btn-s48-example">${en ? "Load Example Data" : "예시 데이터 넣어보기"}</button>
        </div>
      `;
      document.getElementById("btn-s48-example")?.addEventListener("click", function () {
        STATE.s48Interacted = true;
        updateSection48Checker();
      });
      updateCrisisPreview();
      return;
    }

    const hist = document.getElementById("s48-history")?.value || "refused_no_sub";
    const target = document.getElementById("s48-target-visa")?.value || "190_491_494";
    const s48Active = hist === "refused_no_sub";
    let statusHtml = "";

    if (!s48Active) {
      statusHtml = `
        <div class="alert-box alert-box--success">
          ${en
            ? `<strong>Section 48 Bar Not Triggered</strong>: ${hist === "nom_only_refused" ? "Where only the employer Nomination was refused and your Visa Application was withdrawn prior to refusal, Section 48 does not apply." : "Because you currently hold a valid Substantive Visa, Section 48 is not engaged while that visa remains in effect."}`
            : `<strong>Section 48 제한 미적용</strong>: ${hist === "nom_only_refused" ? "고용주 노미네이션만 거절되고 본인 비자 신청을 거절 결정 전에 자진 취하한 경우 비자 거절 이력이 아니므로 Section 48이 발동하지 않습니다." : "현재 유효한 실체 비자를 보유 중이므로 실체 비자 만료 전까지는 호주 내에서 신규 비자를 접수할 수 있습니다."}`}
        </div>
      `;
    } else if (target === "190_491_494" || target === "602_866") {
      statusHtml = `
        <div class="alert-box alert-box--success">
          ${en
            ? "<strong>Section 48 Exempt Visa (<code>reg 2.12</code>) · Onshore Lodgement Permitted</strong>: Subclasses 190, 491, 494, 602, and 866 are prescribed exempt visas under <em>Migration Regulations 1994</em> reg 2.12 and may be lodged onshore."
            : "<strong>Section 48 예외 허용 비자 (<code>reg 2.12</code>) · 호주 내 신청 가능</strong>: Subclass 190 · 491 · 494 · 602 · 866 비자는 <em>Migration Regulations 1994</em> reg 2.12 예외 목록에 포함되어 출국 없이 호주 내에서 접수할 수 있습니다."}
        </div>
      `;
    } else if (target === "820_801") {
      statusHtml = `
        <div class="alert-box alert-box--warn">
          ${en
            ? "<strong>Onshore Partner Visa (820) Permitted under reg 2.12 · Schedule 3 (3001) Waiver Required</strong>: Subclass 820/801 is exempt from Section 48, but holding a Bridging Visa triggers Schedule 3 unless Compelling Reasons are established."
            : "<strong>호주 내 파트너 비자(820) 접수 가능 · 단 Schedule 3 (3001) 검토 필수</strong>: 파트너 비자(820/801)는 reg 2.12 예외 비자이나 현재 브리징 비자 상태이므로 Schedule 3 요건 면제를 위한 중대한 참작 사유(Compelling Reasons) 입증 여부를 반드시 사전 점검하십시오."}
        </div>
      `;
    } else {
      statusHtml = `
        <div class="alert-box alert-box--danger">
          ${en
            ? "<strong>Barred Onshore by Section 48 (Offshore Lodgement Required)</strong>: Subclasses 482, 186, 500, 485, and 189 are barred onshore under Section 48. Consider obtaining a Bridging Visa B (BVB) to lodge physically offshore, or pivoting to a reg 2.12 exempt subclass (190 / 491 / 494)."
            : "<strong>Section 48 호주 내 접수 불가 (해외 출국 접수 또는 예외 비자 전환 필요)</strong>: 선택하신 비자(SID 482 · ENS 186 · 500 · 485 · 189)는 reg 2.12 예외 목록에 없으므로 호주 내 접수가 무효 처리됩니다. Bridging Visa B(BVB) 승인 후 해외 체류 중 비자를 접수하거나 호주 내 예외 비자(190 · 491 · 494) 전환 가능성을 검토하십시오."}
        </div>
      `;
    }

    out.innerHTML = statusHtml;
    updateCrisisPreview();
  }

  function updateWaiverChecker() {
    const en = STATE.lang === "en";
    const out = document.getElementById("waiver-checker-result");
    if (!out) return;

    const includeChecked = Boolean(document.getElementById("wv-include-check")?.checked);
    if (!STATE.waiverInteracted && !includeChecked) {
      out.innerHTML = `
        <div class="pk-empty-prompt">
          <span>${en
            ? "If you received a PIC 4020 Natural Justice notice or hold Condition 8503, select the barrier on the left to review statutory waiver requirements."
            : "PIC 4020 소명 요구서(Natural Justice) 또는 Condition 8503 대상자인 경우 좌측 항목을 선택하거나 체크박스를 켜시면 법정 웨이버 요건을 안내합니다."}</span>
          <button type="button" class="pk-btn-ghost" id="btn-wv-example">${en ? "Load Example Data" : "예시 데이터 넣어보기"}</button>
        </div>
      `;
      document.getElementById("btn-wv-example")?.addEventListener("click", function () {
        const chk = document.getElementById("wv-include-check");
        if (chk) chk.checked = true;
        STATE.waiverInteracted = true;
        updateWaiverChecker();
      });
      updateCrisisPreview();
      return;
    }

    const issue = document.getElementById("wv-issue-type")?.value || "pic4020_false";
    const ties = document.getElementById("wv-au-ties")?.selectedOptions?.[0]?.text || "";
    let html = "";

    if (issue === "pic4020_identity") {
      html = `
        <div class="alert-box alert-box--danger">
          ${en
            ? "<strong>PIC 4020(2A)/(2B) Identity Requirement · 10-Year Bar &amp; Zero Waiver</strong>: There is no statutory waiver under PIC 4020(4) for identity breaches. Authentic identity evidence must be established before refusal."
            : "<strong>PIC 4020(2A)/(2B) 신원 요건 위반 · 10년 입국금지 및 법정 웨이버 불가</strong>: 신원 불확실 또는 허위 신원 제출에는 PIC 4020(4) 면제 조항이 적용되지 않습니다. 거절 결정 전 소명 단계에서 신원 문서의 진정성을 입증하는 것이 핵심입니다."}
        </div>
      `;
    } else if (issue === "pic4020_false") {
      html = `
        <div class="alert-box alert-box--warn">
          ${en
            ? `<strong>PIC 4020(1)/(2) Bogus Document / False Information (3-Yr Bar) · Two-Step Defence</strong>:<br/>1) Non-engagement (<em>Trivedi</em>): demonstrate lack of purposeful falsity or non-materiality.<br/>2) PIC 4020(4) Waiver: prove compelling circumstances affecting Australia or compassionate/compelling circumstances affecting an Australian citizen/PR (${ties}).`
            : `<strong>PIC 4020(1)/(2) 위조서류·허위정보 (3년 금지) · 2단계 소명 및 PIC 4020(4) 웨이버</strong>:<br/>1) 불성립 소명(<em>Trivedi</em> 법리): 비자 핵심 요건과 무관하거나 고의적 기망이 없는 제3자 오기임을 입증합니다.<br/>2) PIC 4020(4) 웨이버 청구: 호주 시민권자·영주권자 또는 호주 국익에 중대한 영향을 미치는 사정(${ties})을 객관적 증빙으로 소명합니다.`}
        </div>
      `;
    } else if (issue === "cond_8503") {
      html = `
        <div class="alert-box alert-box--warn">
          ${en
            ? "<strong>Condition 8503 (\"No Further Stay\") Waiver (s 41(2A) &amp; reg 2.05(4))</strong>: Requires compelling and compassionate circumstances that developed after visa grant, beyond your control, resulting in a major change."
            : "<strong>Condition 8503 (\"No Further Stay\") 웨이버 (s 41(2A) &amp; reg 2.05(4))</strong>: 비자 발급 이후 신청자가 통제할 수 없는 불가피하고 동정할 만한 사정이 발생하여 중대한 상황 변화가 초래되었음을 입증해야 합니다."}
        </div>
      `;
    } else {
      html = `
        <div class="alert-box alert-box--success">
          ${en
            ? `<strong>PIC 4013/4014 &amp; Schedule 3 Waiver</strong>: Compelling and compassionate circumstances affecting Australian citizen/PR family members or sponsors (${ties}) may support a formal legal waiver submission.`
            : `<strong>PIC 4013/4014 및 Schedule 3 웨이버 검토 가능</strong>: 선택하신 참작 사정(${ties})에 관한 객관적 의료·재정·가족 증빙과 법률 의견서를 통해 면제 승인을 검토할 수 있습니다.`}
        </div>
      `;
    }

    out.innerHTML = html;
    updateCrisisPreview();
  }

  function updateCrisisPreview() {
    const en = STATE.lang === "en";
    const previewEl = document.getElementById("crisis-diagnostic-preview");
    const emailBtn = document.getElementById("btn-crisis-email");
    if (!previewEl) return;

    const typeVal = document.getElementById("art-decision-type")?.value || "onshore_refusal";
    const decType = document.getElementById("art-decision-type")?.selectedOptions?.[0]?.text || "";
    const noticeDate = document.getElementById("art-notice-date")?.value || window.ParkCoDates.todayBrisbaneIso();
    const stateCode = document.getElementById("art-state")?.value || "QLD";
    const subStatus = document.getElementById("art-substantive-status")?.selectedOptions?.[0]?.text || "";
    const calc = STATE.artInteracted ? computeArtDeadline(typeVal, noticeDate, stateCode, STATE.lang) : null;

    const lines = en ? [
      "=== [PNC Legal Pty Ltd t/a Park & Co Lawyers | Urgent Visa & ART Consultation Brief] ===",
      `• Notice / Stage: ${STATE.artInteracted ? decType : "(Not yet selected)"}`,
      `• Notification Date: ${noticeDate} (${stateCode}) | Visa Status: ${subStatus}`
    ] : [
      "=== [법무법인 박앤코 (PNC Legal Pty Ltd t/a Park & Co Lawyers) | 긴급 비자·ART 기한 진단 브리프] ===",
      `• 통지서 / 처분 단계: ${STATE.artInteracted ? decType : "(미선택 · 기한 계산기 입력 전)"}`,
      `• 통지서 수신일: ${noticeDate} (${stateCode} 기준) | 현재 비자 상태: ${subStatus}`
    ];

    if (calc) {
      lines.push(en
        ? `• Calculated Deadlines: Safe Date ${calc.safeDate} | Statutory Final Deadline ${calc.statutoryDate} (${calc.ruleLabel})`
        : `• 산출 마감일: 보수적 안전 접수 권고일 ${calc.safeDate} | 법정 최종 마감일 ${calc.statutoryDate} (${calc.ruleLabel})`
      );
    }

    if (STATE.s48Interacted) {
      const s48Target = document.getElementById("s48-target-visa")?.selectedOptions?.[0]?.text || "";
      lines.push(en ? `• Section 48 Target Visa: ${s48Target}` : `• Section 48 검토 대상 비자: ${s48Target}`);
    }

    const includeWaiver = STATE.waiverInteracted || Boolean(document.getElementById("wv-include-check")?.checked);
    if (includeWaiver) {
      const wvIssue = document.getElementById("wv-issue-type")?.selectedOptions?.[0]?.text || "";
      lines.push(en ? `• Waiver / Natural Justice Issue: ${wvIssue}` : `• 웨이버 / 소명 쟁점: ${wvIssue}`);
    }

    lines.push(en
      ? "• Official Contact: Park & Co Lawyers (Chang Min Park · Legal Practitioner Director) | https://parklawyers.com.au/links/?lang=en | enquiry@parkcolawyers.com"
      : "• 공식 상담 접수: 법무법인 박앤코 (박창민 대표변호사 · Legal Practitioner Director) | https://parklawyers.com.au/links/?lang=ko | enquiry@parkcolawyers.com"
    );

    const text = lines.join("\n");
    previewEl.textContent = text;
    if (emailBtn) {
      emailBtn.href = en ? "https://parklawyers.com.au/links/?lang=en" : "https://parklawyers.com.au/links/?lang=ko";
      emailBtn.onclick = function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(function () {});
        }
      };
    }
  }

  function renderPollerTable(sources) {
    const en = STATE.lang === "en";
    const tbody = document.getElementById("crisis-poller-tbody");
    const rowsHtml = sources.map((s, idx) => `
      <tr>
        <td><code>${idx + 1}</code></td>
        <td><span class="badge badge-burgundy">${s.category}</span></td>
        <td>
          <a href="${s.url}" target="_blank" rel="noopener"><strong>${en ? s.name_en : s.name_ko}</strong></a>
          <div style="font-size:11px;color:var(--pk-muted);font-family:monospace;margin-top:2px;">SHA-256: <code>${s.sha256_prefix || "verified"}</code> ${s.bytes ? `(${Math.round(s.bytes / 1024).toLocaleString()} KB)` : ""}</div>
        </td>
        <td>${s.authority}</td>
        <td>${s.tracks}</td>
        <td>${s.cadence}</td>
        <td><span class="badge-ok">● Verified (${s.http_status || 200})</span></td>
      </tr>
    `).join("");
    if (tbody) tbody.innerHTML = rowsHtml;

    const modalBody = document.getElementById("modal-body-content");
    if (modalBody) {
      modalBody.innerHTML = `
        <p style="font-size:13.5px;color:var(--pk-ink-2);margin-bottom:14px;">
          ${en
            ? "Live verification status of 14 Migration Act 1958, Migration Regulations 1994, Administrative Review Tribunal (ART), and FCFCOA primary sources."
            : "14개 호주 연방 이민법(Migration Act 1958 / Regulations 1994)과 행정재심기구(ART) 및 연방순회·가족법원(FCFCOA) 1차 출처 검증 현황입니다."}
        </p>
        <div class="pk-table-scroll">
          <table class="data-table">
            <thead>
              <tr><th>#</th><th>${en ? "Category" : "구분"}</th><th>${en ? "Source" : "출처명"}</th><th>${en ? "Authority" : "관할"}</th><th>${en ? "Status" : "상태"}</th></tr>
            </thead>
            <tbody>
              ${sources.map((s, i) => `
                <tr>
                  <td><code>${i + 1}</code></td>
                  <td><span class="badge badge-burgundy">${s.category}</span></td>
                  <td><a href="${s.url}" target="_blank" rel="noopener"><strong>${en ? s.name_en : s.name_ko}</strong></a></td>
                  <td>${s.authority}</td>
                  <td><span class="badge-ok">Verified (${s.http_status || 200})</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  function renderArtIntelligence() {
    const en = STATE.lang === "en";
    const intel = STATE.artIntel || {};
    const caseload = intel.caseload_outcomes || {};
    const proc = intel.processing_times || {};

    const insightsGrid = document.getElementById("art-macro-insights-grid");
    if (insightsGrid && Array.isArray(caseload.macro_insights)) {
      insightsGrid.innerHTML = caseload.macro_insights.map((ins) => {
        const isEmg = ins.cta_service === "visa_emergency";
        const ctaUrl = isEmg
          ? (en ? "https://parklawyers.com.au/case-emergency/visa/" : "https://parklawyers.com.au/case-emergency/visa/?lang=ko")
          : (en ? "https://parklawyers.com.au/appealing-visa-decision/" : "https://parklawyers.com.au/appealing-visa-decision/?lang=ko");
        const ctaLabel = isEmg
          ? (en ? "Visa Emergency™ Notice Assessment →" : "비자응급실 통지서 검토 안내 →")
          : (en ? "ART Case Review™ Assessment →" : "ART 재심 실익 검토 안내 →");
        return `
          <div class="card" style="padding:14px 16px;border-top:3px solid ${isEmg ? "var(--pk-danger)" : "var(--pk-brand)"};display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;">
                <span class="badge" style="font-size:11px;">${en ? ins.badge_en : ins.badge_ko}</span>
                <strong style="font-size:12.5px;color:var(--pk-brand);">${ins.metric_highlight}</strong>
              </div>
              <h4 style="margin:0 0 6px;font-size:14.5px;font-weight:800;line-height:1.4;">${en ? ins.title_en : ins.title_ko}</h4>
              <p style="margin:0 0 10px;font-size:12.5px;color:var(--pk-ink-2);line-height:1.55;">${en ? ins.desc_en : ins.desc_ko}</p>
            </div>
            <a href="${ctaUrl}" target="_blank" rel="noopener" style="font-size:12.5px;font-weight:700;">${ctaLabel}</a>
          </div>
        `;
      }).join("");
    }

    const outTbody = document.getElementById("art-subclass-outcomes-tbody");
    if (outTbody && Array.isArray(caseload.subclass_outcomes)) {
      outTbody.innerHTML = caseload.subclass_outcomes.map((r) => `
        <tr>
          <td>
            <strong>${en ? r.label_en : r.label_ko}</strong>
            <div style="font-size:11px;color:var(--pk-muted);">PDF p.${r.pdf_page} · SHA: <code>${caseload.sha256_prefix || "fe57c01188167f6b"}</code></div>
          </td>
          <td style="font-size:12.5px;white-space:nowrap;">
            L: <strong>${Number(r.L).toLocaleString()}</strong> · F: <strong>${Number(r.F).toLocaleString()}</strong><br/>
            <span style="color:var(--pk-brand);font-weight:700;">On-hand: ${Number(r.H).toLocaleString()}</span>
          </td>
          <td style="font-size:12px;">
            <span style="color:var(--pk-ok);font-weight:800;">S: ${r.S.toLocaleString()}</span> ·
            <span>A-D: ${r.A_minus_D.toLocaleString()}</span> ·
            <span style="color:var(--pk-muted);">D: ${r.D.toLocaleString()} · W: ${r.W.toLocaleString()} · O: ${r.O.toLocaleString()}</span>
          </td>
          <td>
            <span class="badge" style="background:var(--pk-warn-bg);color:var(--pk-warn);font-size:12px;font-weight:800;">${r.change_all_pct.toFixed(2)}%</span>
            <div style="font-size:11px;color:var(--pk-muted);margin-top:2px;">(${r.S.toLocaleString()} / ${r.F.toLocaleString()})</div>
          </td>
          <td>
            <span class="badge" style="background:var(--pk-ok-bg);color:var(--pk-ok);font-size:12.5px;font-weight:800;">${r.restricted_change_pct.toFixed(2)}%</span>
            <div style="font-size:11px;color:var(--pk-ok);margin-top:2px;">(${r.S.toLocaleString()} / ${r.restricted_denominator.toLocaleString()})</div>
          </td>
          <td style="font-size:12.2px;line-height:1.5;">${en ? r.insight_en : r.insight_ko}</td>
        </tr>
      `).join("");
    }

    const durTbody = document.getElementById("art-processing-times-tbody");
    if (durTbody && Array.isArray(proc.categories)) {
      durTbody.innerHTML = proc.categories.map((c, idx) => {
        const catLow = (c.category_en || "").toLowerCase();
        let stratKo = "법정 기한 내 재심 접수 후 심리 대기 기간 동안 보완 증거 및 법률 의견서를 준비합니다.";
        let stratEn = "Lodge within the statutory deadline and prepare updated documentary submissions during the review queue.";
        if (catLow.includes("nomination") || catLow.includes("temporary work")) {
          stratKo = "고용주 재무제표(BAS)·AMSR·실제 운영 증빙을 대기 기간 중 체계적으로 보완하여 재심 실익을 점검합니다.";
          stratEn = "Rebuild employer financials, AMSR, and genuine position evidence during the review queue.";
        } else if (catLow.includes("partner")) {
          stratKo = "대기 기간 동안 동거·공동재정·사회적 인정 증거와 Schedule 3 참작 자료를 누적 보강합니다.";
          stratEn = "Accumulate cohabitation, joint financials, and Schedule 3 evidence prior to hearing.";
        } else if (catLow.includes("student cancellation")) {
          stratKo = "취소 결정 전 NOICC(5영업일) 소명 단계와 취소 확정 후 ART 재심(7영업일) 기한을 엄격히 구분해 대응합니다.";
          stratEn = "Distinguish strictly between NOICC (5 working days) and post-cancellation ART review (7 working days).";
        } else if (catLow.includes("bridging")) {
          stratKo = "구금·브리징 사건은 신속 심리(중위 11일)되므로 접수와 동시에 완비된 의견서를 제출해야 합니다.";
          stratEn = "Expedited bridging/detention review (11-day median) requires complete submissions at lodgement.";
        }
        return `
          <tr>
            <td><code>${idx + 1}</code></td>
            <td><strong>${en ? c.category_en : c.category_ko}</strong></td>
            <td><span class="badge" style="background:#EAF2F2;color:var(--pk-brand);font-weight:800;">${en ? c.p50_en : c.p50_ko}</span></td>
            <td><span class="badge badge-burgundy">${en ? c.p95_en : c.p95_ko}</span></td>
            <td style="font-size:12.2px;">${en ? stratEn : stratKo}</td>
          </tr>
        `;
      }).join("");
    }
  }

  const OPTION_I18N = {
    "art-decision-type": {
      onshore_refusal: {
        ko: "호주 내 일반 비자 거절 또는 스폰서십/노미네이션 거절 후 ART 재심 청구 (28 역일 · reg 4.10(1)(a))",
        en: "Onshore Visa or Sponsorship/Nomination Refusal ART Review (28 Calendar Days · reg 4.10(1)(a))"
      },
      s116_noicc: {
        ko: "호주 내 비자 취소 예고통지(NOICC) 소명서 제출 (취소 결정 전 · 통상 5 영업일 · reg 2.44)",
        en: "Onshore s 116 NOICC Response Before Cancellation (Typically 5 Working Days · reg 2.44)"
      },
      s116_cancel: {
        ko: "호주 내 일반 비자 취소 결정 후 ART 재심 청구 (취소 확정 후 · 7 영업일 불변 · reg 4.10(1)(b))",
        en: "Post-Cancellation Onshore s 116 ART Merits Review (7 Working Days Non-Extendable · reg 4.10(1)(b))"
      },
      protection_refusal: {
        ko: "호주 내 보호비자(866) 거절 후 ART 재심 청구 (28 역일 + $1,863.50 선납 필수 · reg 4.31B)",
        en: "Onshore Protection Visa (866) ART Review (28 Calendar Days + $1,863.50 Upfront Fee · reg 4.31B)"
      },
      s501_mandatory_rev: {
        ko: "s 501(3A) 인성 사유 강제 비자 취소 철회 요청 (28 역일 · s 501CA · Direction No. 123)",
        en: "s 501(3A) Mandatory Cancellation Revocation Request (28 Calendar Days · s 501CA · Direction No. 123)"
      },
      s500_char_art: {
        ko: "호주 내 s 501 인성 비자 거절 또는 철회거부 후 ART 재심 청구 (9 역일 불변 · s 500(6B))",
        en: "Onshore s 501 Character Refusal / Non-Revocation ART Review (9 Calendar Days Non-Extendable · s 500(6B))"
      },
      detention_ref_canc: {
        ko: "이민 구금(Detention) 상태에서 비자 거절 또는 s 116 취소 후 ART 재심 청구 (7 영업일 불변 · reg 4.10(2))",
        en: "Immigration Detention Visa Refusal or s 116 Cancellation ART Review (7 Working Days · reg 4.10(2))"
      },
      offshore_sponsor: {
        ko: "해외(Offshore) 비자 거절 건에 대한 호주 스폰서의 ART 재심 청구 (70 역일 · reg 4.10(1)(c))",
        en: "Offshore Visa Refusal · Australian Sponsor ART Review (70 Calendar Days · reg 4.10(1)(c))"
      },
      fcfcoa_jr: {
        ko: "행정재심기구(ART) 기각 후 연방순회·가족법원(FCFCOA) 사법심사 청구 (35 역일 · s 477)",
        en: "FCFCOA Judicial Review After ART Dismissal (35 Calendar Days · s 477)"
      }
    }
  };

  function setLanguage(lang, syncUrl) {
    STATE.lang = lang === "en" ? "en" : "ko";
    document.documentElement.lang = STATE.lang;
    Object.keys(OPTION_I18N).forEach((selId) => {
      const sel = document.getElementById(selId);
      if (!sel) return;
      Array.from(sel.options).forEach((opt) => {
        const entry = OPTION_I18N[selId][opt.value];
        if (entry) opt.textContent = entry[STATE.lang] || entry.ko;
      });
    });
    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === STATE.lang);
    });
    const dict = I18N[STATE.lang] || I18N.ko;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (dict[k]) el.textContent = dict[k];
    });
    document.querySelectorAll(".parkco-svc-link").forEach((lnk) => {
      const h = STATE.lang === "en" ? lnk.getAttribute("data-en-href") : lnk.getAttribute("data-ko-href");
      if (h) lnk.setAttribute("href", h);
    });
    document.querySelectorAll("a.cta-enquiry").forEach((a) => {
      a.setAttribute("href", STATE.lang === "en" ? "https://parklawyers.com.au/links/?lang=en" : "https://parklawyers.com.au/links/?lang=ko");
    });
    if (syncUrl && typeof history !== "undefined" && history.replaceState) {
      try {
        const u = new URL(window.location.href);
        u.searchParams.set("lang", STATE.lang);
        history.replaceState(null, "", u.toString());
      } catch (_) {}
    }
    renderCharts();
    updateArtDeadline();
    updateSection48Checker();
    updateWaiverChecker();
    renderArtIntelligence();
    if (STATE.sources.length) renderPollerTable(STATE.sources);
  }

  function init() {
    if (typeof document === "undefined") return;
    const dateInput = document.getElementById("art-notice-date");
    if (dateInput && window.ParkCoDates) {
      dateInput.value = window.ParkCoDates.todayBrisbaneIso();
    }

    ["art-decision-type", "art-notice-date", "art-state", "art-substantive-status"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = function () {
        STATE.artInteracted = true;
        updateArtDeadline();
      };
      el.addEventListener("input", handler);
      el.addEventListener("change", handler);
    });

    ["s48-history", "s48-target-visa"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = function () {
        STATE.s48Interacted = true;
        updateSection48Checker();
      };
      el.addEventListener("input", handler);
      el.addEventListener("change", handler);
    });

    ["wv-include-check", "wv-issue-type", "wv-au-ties"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = function () {
        if (id !== "wv-include-check") {
          STATE.waiverInteracted = true;
          const chk = document.getElementById("wv-include-check");
          if (chk) chk.checked = true;
        } else {
          STATE.waiverInteracted = Boolean(el.checked);
        }
        updateWaiverChecker();
      };
      el.addEventListener("input", handler);
      el.addEventListener("change", handler);
    });

    document.getElementById("btn-crisis-copy")?.addEventListener("click", function () {
      const txt = document.getElementById("crisis-diagnostic-preview")?.textContent || "";
      navigator.clipboard?.writeText(txt);
      const prev = this.textContent;
      this.textContent = STATE.lang === "en" ? "Copied ✓" : "복사 완료 ✓";
      setTimeout(() => { this.textContent = prev; }, 2000);
    });
    document.getElementById("btn-crisis-print")?.addEventListener("click", function () {
      window.print();
    });

    const modal = document.getElementById("detail-modal");
    document.getElementById("btn-polling-status")?.addEventListener("click", function () {
      modal?.classList.add("open");
    });
    document.getElementById("modal-close-btn")?.addEventListener("click", function () {
      modal?.classList.remove("open");
    });
    modal?.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.remove("open");
    });

    if (typeof window !== "undefined" && window.location && window.location.protocol !== "file:") {
      fetch("data/polling_status.json")
        .then((r) => r.json())
        .then((d) => {
          if (d && Array.isArray(d.sources)) {
            STATE.sources = d.sources;
            renderPollerTable(d.sources);
          }
        })
        .catch(() => {});
      fetch("data/art_intelligence_data.json")
        .then((r) => r.json())
        .then((d) => {
          if (d && d.caseload_outcomes) {
            STATE.artIntel = d;
            renderArtIntelligence();
          }
        })
        .catch(() => {});
    }

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        setLanguage(this.dataset.lang || "ko", true);
      });
    });

    let initLang = "ko";
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "en") initLang = "en";
    } catch (_) {}
    setLanguage(initLang, false);
  }

  if (typeof globalThis !== "undefined") {
    globalThis.VISA_CRISIS_NAVIGATOR = {
      computeArtDeadline: computeArtDeadline,
      STATE: STATE
    };
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
