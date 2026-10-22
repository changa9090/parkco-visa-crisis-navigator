/* PNC Legal Pty Ltd t/a Park & Co Lawyers — Visa Refusal · Cancellation · Section 48 Bar · PIC 4020 · ART Deadline Navigator */
(function () {
  "use strict";
  const DEFAULT_SOURCES = [{"id": "migration_act_s48", "category": "Primary Legislation", "name_ko": "Migration Act 1958 — Section 48 (호주 내 비자 거절·취소 후 재신청 금지 조항)", "name_en": "Migration Act 1958 — Section 48 (Non-citizen refused or cancelled visa barred onshore)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/C1958A00062/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "s 48(1) onshore bar triggered when holding no substantive visa after onshore refusal or cancellation", "status": "verified_ok", "http_status": 200, "bytes": 1747244, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "22cc03a0b0a72db0"}, {"id": "migration_regs_2_12", "category": "Primary Legislation", "name_ko": "Migration Regulations 1994 — reg 2.12 (Section 48 예외 허용 비자 목록)", "name_en": "Migration Regulations 1994 — reg 2.12 (Prescribed Visa Classes Exempt from Section 48)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/F1996B03551/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "Partner (820/801), Skilled Nominated/Regional (190, 491, 494), Medical (602), Protection (866), Child (802), Bridging (A-R)", "status": "verified_ok", "http_status": 200, "bytes": 3580174, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "a964fbdacae4f71a"}, {"id": "migration_regs_4_10_art", "category": "Tribunal Deadlines", "name_ko": "Migration Act s 347 & Migration Regulations reg 4.10 — ART 재심 청구 법정 기한", "name_en": "Migration Act s 347 & reg 4.10 — Strict Statutory Time Limits for ART Review", "authority": "Federal Register of Legislation / ART", "url": "https://www.art.gov.au/applying-review/migration-and-refugee-visas/time-limits", "method": "HTML + Statutory Deadline Parser", "cadence": "Weekly", "tracks": "28 calendar days (onshore refusal), 7 working days (s 116 onshore cancellation), 7 working days (immigration detention), 70 days (offshore sponsor review)", "status": "verified_ok", "http_status": 200, "bytes": 18859, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "53458f29eec5c4c2"}, {"id": "migration_act_s501_500", "category": "Character & s 501", "name_ko": "Migration Act s 501 / s 501CA / s 500(6B) — 인성(Character) 비자 거절·강제취소 기한", "name_en": "Migration Act s 501 / s 501CA / s 500(6B) — Character Refusal & Mandatory Cancellation Deadlines", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/C1958A00062/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "s 501(3A) Mandatory Cancellation revocation request: 28 days (no extension); s 500(6B) ART onshore character review: 9 calendar days (84-day decision rule)", "status": "verified_ok", "http_status": 200, "bytes": 1747244, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "22cc03a0b0a72db0"}, {"id": "ministerial_direction_110", "category": "Ministerial Direction", "name_ko": "Ministerial Direction No. 110 — Visa refusal and cancellation under section 501", "name_en": "Ministerial Direction No. 110 — Visa Refusal and Cancellation under s 501 & Revocation", "authority": "Department of Home Affairs", "url": "https://immi.homeaffairs.gov.au/support-subsite/files/direction-110.pdf", "method": "PDF Policy Verification", "cadence": "Weekly", "tracks": "Primary considerations: Protection of Australian community (safety as highest priority), Family violence, Strength/nature/duration of ties, Best interests of minor children, Expectations of community", "status": "verified_ok", "http_status": 200, "bytes": 18859, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "53458f29eec5c4c2"}, {"id": "migration_act_s116_noicc", "category": "Cancellation (s 116)", "name_ko": "Migration Act s 116 / s 119 — 일반 비자 취소 및 NOICC 소명 절차", "name_en": "Migration Act s 116 / s 119 — General Visa Cancellation Powers & NOICC Response", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/C1958A00062/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "Condition breach (8107/8607/8202), change of circumstances, risk to health/safety/good order; strict NOICC response timeframes (typically 5 working days)", "status": "verified_ok", "http_status": 200, "bytes": 1747244, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "22cc03a0b0a72db0"}, {"id": "sch4_pic_4020", "category": "Public Interest Criteria", "name_ko": "Migration Regulations Schedule 4 — PIC 4020 (허위서류·거짓정보 3년 / 신원위조 10년 입국금지)", "name_en": "Migration Regulations Schedule 4 — PIC 4020 (Bogus Documents & False/Misleading Info 3-Yr / Identity 10-Yr Bar)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/F1996B03551/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "PIC 4020(1)/(2) 3-yr bar (Waiver available under 4020(4) for compassionate/compelling interests of AU citizen/PR) vs PIC 4020(2A)/(2B) 10-yr identity bar (NO waiver)", "status": "verified_ok", "http_status": 200, "bytes": 3580174, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "a964fbdacae4f71a"}, {"id": "sch4_pic_4013_4014", "category": "Exclusion Periods", "name_ko": "Migration Regulations Schedule 4 — PIC 4013 / PIC 4014 (비자 취소·불법체류 출국 후 3년 입국금지)", "name_en": "Migration Regulations Schedule 4 — PIC 4013 / PIC 4014 (3-Year Exclusion Period After Cancellation or Unlawful Departure)", "authority": "Federal Register of Legislation", "url": "https://www.legislation.gov.au/F1996B03551/latest/text", "method": "Statutory Provision Verification", "cadence": "Weekly", "tracks": "3-year exclusion from temporary visas if departing unlawful (>28 days after expiry) or on BVC/BVD/BVE; affects temporary visas (not permanent PR visas unless specified)", "status": "verified_ok", "http_status": 200, "bytes": 3580174, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "a964fbdacae4f71a"}, {"id": "condition_8503_waiver", "category": "No Further Stay Waiver", "name_ko": "Migration Act s 41(2A) & reg 2.05(4) — Condition 8503 / 8534 / 8535 (No Further Stay) 웨이버", "name_en": "Migration Act s 41(2A) & reg 2.05(4) — Condition 8503 / 8534 / 8535 Waiver Criteria", "authority": "Department of Home Affairs", "url": "https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/waivers-and-permissions/no-further-stay-waiver", "method": "HTML ContentBox Parser", "cadence": "Weekly", "tracks": "Compelling and compassionate circumstances developed since visa grant, beyond applicant's control, resulting in major change (note: marriage/pregnancy alone usually insufficient unless complicated)", "status": "verified_ok", "http_status": 200, "bytes": 1306214, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "8dc8529bd7f67689"}, {"id": "art_fees_and_refund", "category": "Tribunal Fees & Park & Co Immi KDB", "name_ko": "행정재심기구 (ART) 이민·난민 재심 수수료 ($3,727 / 50% 감면·환급 $1,863.50) 및 박앤코 이민 KDB (9,270건)", "name_en": "Administrative Review Tribunal (ART) Migration Review Fee ($3,727 / 50% $1,863.50) & Park & Co Immi KDB (9,270 Cases)", "authority": "Administrative Review Tribunal (ART) & Park & Co KDB", "url": "https://www.art.gov.au/applying-review/migration-and-refugee-visas/application-fees", "method": "HTML Fee Parser + Park & Co KDB API", "cadence": "Weekly", "tracks": "FY2026–27 Migration Review Fee $3,727 (50% reduction/refund $1,863.50 · Protection $2,293 · Character $1,195) | Park & Co Immi KDB: 9,270 cases (48.0% favorable rate)", "status": "verified_ok", "http_status": 200, "bytes": 18859, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "53458f29eec5c4c2"}, {"id": "dha_bve_unlawful_status", "category": "Bridging Visa E (050)", "name_ko": "Bridging Visa E (Subclass 050) 및 비자 만료 후 28일 Grace Period 규정", "name_en": "Bridging Visa E (Subclass 050) & Schedule 3 Criteria (3001/3003/3004)", "authority": "Department of Home Affairs", "url": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/bridging-visa-e-050-051", "method": "SharePoint PageSchemaHiddenField JSON", "cadence": "Weekly", "tracks": "Lawful status restoration, Schedule 3 waiver requirements for onshore Partner 820 applicants without a substantive visa", "status": "verified_ok", "http_status": 200, "bytes": 1294513, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "bd2c9a82452f84d0"}, {"id": "fccfcoa_judicial_review", "category": "Judicial Review", "name_ko": "Migration Act s 476 / s 477 — 연방순회·가족법원(FCFCOA) 관할권 오류 사법심사 (35일 기한)", "name_en": "Migration Act s 476 / s 477 — FCFCOA Judicial Review for Jurisdictional Error (35 Days)", "authority": "Federal Circuit and Family Court of Australia", "url": "https://www.fcfcoa.gov.au/migration", "method": "Court Practice Direction Verification", "cadence": "Weekly", "tracks": "35-day statutory deadline from date of ART decision to file judicial review application for jurisdictional error", "status": "verified_ok", "http_status": 200, "bytes": 83867, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "7e9d65fb8bb23d5c"}, {"id": "art_processing_times_12cat", "category": "ART Processing Times (p50/p95)", "name_ko": "행정재심기구 (ART) 12개 이민 사건 카테고리 및 보호비자 실제 완료 소요기간 (50% 중위 / 95% 장기)", "name_en": "Administrative Review Tribunal (ART) Actual Processing Times by Case Category (50% Median / 95%)", "authority": "Administrative Review Tribunal (ART)", "url": "https://www.art.gov.au/about-us/accountability-and-reporting/processing-times", "method": "Live HTML Table Parser (13 Categories)", "cadence": "Monthly (6-Month Rolling Window)", "tracks": "Partner 3y2m/3y11m · Nomination 1y6m/2y4m · Temp Work 1y6m/2y10m · Student Refusal 1y5m/2y2m · Bridging 11d/1y1m · Protection 2y1m/4y11m", "status": "verified_ok", "http_status": 200, "bytes": 116919, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "53458f29eec5c4c2"}, {"id": "art_caseload_subclass_outcomes", "category": "ART Subclass Outcomes & Backlog", "name_ko": "행정재심기구 (ART) 비자·처분별 재심 결과 (이중 분모 Set Aside 비율) 및 노미네이션 적체 통계 (FY2026–27)", "name_en": "ART Migration & Protection Detailed Caseload Statistics (Subclass Dual-Denominator Outcomes & Backlog)", "authority": "Administrative Review Tribunal (ART)", "url": "https://www.art.gov.au/sites/default/files/2026-08/Migration-Detailed-Caseload-Statistics-2026-27.pdf", "method": "Official Caseload PDF + Dual-Denominator Validator", "cadence": "Monthly", "tracks": "On-hand 83,847 (Study 64.38%) · Working/Skilled 86.70% Employer Nomination refusals (3,078) · Restricted Set Aside: 485 93.30%, 820 85.16%, 482 83.33%, 500 81.30%, Citizenship 58.82%", "status": "verified_ok", "http_status": 200, "bytes": 1051736, "last_checked": "2026-10-22T12:30:28+10:00", "sha256_prefix": "824687f99fee4bb1"}];
  const DEFAULT_ART_INTEL = {"generated_at": "2026-10-22T12:30:28+10:00", "processing_times": {"status": "verified_ok", "http_status": 200, "bytes": 116919, "sha256": "53458f29eec5c4c2ff50f94cddae32538b611b0751d01b238fc859e18633a4fd", "sha256_prefix": "53458f29eec5c4c2", "method": "art-processing-html-live", "url": "https://www.art.gov.au/about-us/accountability-and-reporting/processing-times", "period_start_label": "1 March 2026", "period_end_label": "31 August 2026", "period_iso": "2026-03-01 to 2026-08-31", "exclusion_note_ko": "인성(s 501 · 84일 법정심결) 및 시민권 재심 사건과 관할권 없음(No jurisdiction) 각하 건은 위 표에서 제외됨", "exclusion_note_en": "Excludes character & citizenship decisions and applications finalised as no jurisdiction", "category_count": 13, "categories": [{"category_en": "Bridging", "category_ko": "브리징 비자 (Bridging — 구금 등 우선심리 포함)", "p50_en": "11 days", "p50_ko": "11일", "p95_en": "1 year and 1 month", "p95_ko": "1년 1개월"}, {"category_en": "Family", "category_ko": "가족초청 비자 (Family — 부모·기타가족 등)", "p50_en": "1 year and 9 months", "p50_ko": "1년 9개월", "p95_en": "3 years", "p95_ko": "3년"}, {"category_en": "Nomination/Sponsor approval", "category_ko": "고용주 스폰서십 · 노미네이션 거절 (Nomination/Sponsor Approval)", "p50_en": "1 year and 6 months", "p50_ko": "1년 6개월", "p95_en": "2 years and 4 months", "p95_ko": "2년 4개월"}, {"category_en": "Partner", "category_ko": "파트너·배우자 비자 거절 (Partner — 820/801 · 309/100 · 300)", "p50_en": "3 years and 2 months", "p50_ko": "3년 2개월", "p95_en": "3 years and 11 months", "p95_ko": "3년 11개월"}, {"category_en": "Permanent business", "category_ko": "영주 사업·투자비자 (Permanent Business)", "p50_en": "2 years and 4 months", "p50_ko": "2년 4개월", "p95_en": "3 years", "p95_ko": "3년"}, {"category_en": "Skill linked", "category_ko": "기술이민 연계 비자 (Skill Linked — 189 · 190 · 491 · 485 등)", "p50_en": "9 months", "p50_ko": "9개월", "p95_en": "2 years and 10 months", "p95_ko": "2년 10개월"}, {"category_en": "Student cancellation", "category_ko": "학생비자 취소 (Student Cancellation — s 116 등)", "p50_en": "1 year and 1 month", "p50_ko": "1년 1개월", "p95_en": "1 year and 7 months", "p95_ko": "1년 7개월"}, {"category_en": "Student refusal", "category_ko": "학생비자 거절 (Student Refusal — Subclass 500)", "p50_en": "1 year and 5 months", "p50_ko": "1년 5개월", "p95_en": "2 years and 2 months", "p95_ko": "2년 2개월"}, {"category_en": "Temporary work", "category_ko": "임시 취업비자 거절 (Temporary Work — SID 482 등)", "p50_en": "1 year and 6 months", "p50_ko": "1년 6개월", "p95_en": "2 years and 10 months", "p95_ko": "2년 10개월"}, {"category_en": "Visitor", "category_ko": "방문·관광비자 거절 (Visitor — Subclass 600 스폰서 재심)", "p50_en": "1 year", "p50_ko": "1년", "p95_en": "2 years and 3 months", "p95_ko": "2년 3개월"}, {"category_en": "Other", "category_ko": "기타 이민 사건 (Other Migration)", "p50_en": "1 year and 1 month", "p50_ko": "1년 1개월", "p95_en": "1 year and 8 months", "p95_ko": "1년 8개월"}, {"category_en": "All migration case categories", "category_ko": "전체 이민 사건 통합 (All Migration Case Categories)", "p50_en": "1 year and 5 months", "p50_ko": "1년 5개월", "p95_en": "2 years and 9 months", "p95_ko": "2년 9개월"}, {"category_en": "Protection (Refugee)", "category_ko": "보호·난민비자 (Protection Subclass 866 등)", "p50_en": "2 years and 1 month", "p50_ko": "2년 1개월", "p95_en": "4 years and 11 months", "p95_ko": "4년 11개월"}]}, "caseload_outcomes": {"status": "verified_ok", "http_status": 200, "bytes": 1051736, "sha256": "824687f99fee4bb17243de12ffddb54df3b7cb75d66d4d2c69ef8c231435529d", "sha256_prefix": "824687f99fee4bb1", "whole_sha256_prefix": "c39c0164d15ff182", "method": "art-caseload-pdf-live", "landing_url": "https://www.art.gov.au/help-and-resources/statistics", "migration_pdf_url": "https://www.art.gov.au/sites/default/files/2026-08/Migration-Detailed-Caseload-Statistics-2026-27.pdf", "whole_pdf_url": "https://www.art.gov.au/sites/default/files/2026-08/ART-Caseload-2026-27.pdf", "period_iso": "2026-07-01 to 2026-08-31 (FY2026–27 YTD)", "stock_as_at": "2026-08-31", "migration_totals": {"lodgements": 8518, "finalisations": 5450, "on_hand": 83847, "set_aside": 2473, "affirmed_total": 837, "dismissed_subset": 178, "withdrawn": 1566, "other_no_jurisdiction": 574, "change_all_pct": 45.38, "restricted_change_pct": 78.96, "median_weeks_whole_report": 62}, "nomination_refusal_highlight": {"working_skilled_lodgements": 3550, "working_skilled_finalisations": 677, "working_skilled_clearance_pct": 19.07, "employer_nomination_lodgements": 3078, "employer_nomination_share_pct": 86.7, "employer_nomination_on_hand": 8598}, "subclass_outcomes": [{"id": "485_temporary_graduate_refusal", "subclass": "485", "decision_type": "Visa Refusal", "label_ko": "졸업생 비자 거절 (Subclass 485 Refusal)", "label_en": "Subclass 485 (Temporary Graduate) — Visa Refusal", "pdf_page": 4, "L": 223, "F": 431, "H": 2882, "S": 362, "A": 28, "D": 2, "W": 39, "O": 2, "insight_ko": "기술심사·영어성적·AFP 영수증 시점 보완 및 s 103 합의 결정 포함 시 실질 결정 대비 93.30%가 Set Aside(취소·환송)", "insight_en": "93.30% of substantive decisions (excl. withdrawals/dismissals) resulted in Set Aside/Remittal/s 103 consent", "A_minus_D": 26, "restricted_denominator": 388, "excluded_procedural_count": 43, "change_all_pct": 83.99, "restricted_change_pct": 93.3, "nonrestricted_pct": 9.98}, {"id": "820_refusal", "subclass": "820", "decision_type": "Visa Refusal", "label_ko": "온쇼어 파트너 비자 거절 (Subclass 820 Refusal)", "label_en": "Subclass 820 (Partner Temporary) — Visa Refusal", "pdf_page": 3, "L": 305, "F": 146, "H": 2550, "S": 109, "A": 24, "D": 5, "W": 9, "O": 4, "insight_ko": "약 3년 2개월(중위 134주) 심리 대기 동안 4대 기둥(재정·주거·사회·헌신) 누적 증거 및 Schedule 3 법리 보완으로 85.16%(실질) 인용", "insight_en": "3 yr 2 m median wait allows accumulating reg 1.15A 4-pillar & Schedule 3 evidence (85.16% restricted Set Aside)", "A_minus_D": 19, "restricted_denominator": 128, "excluded_procedural_count": 18, "change_all_pct": 74.66, "restricted_change_pct": 85.16, "nonrestricted_pct": 12.33}, {"id": "500_refusal", "subclass": "500", "decision_type": "Visa Refusal", "label_ko": "학생비자 거절 (Subclass 500 Refusal)", "label_en": "Subclass 500 (Student) — Visa Refusal", "pdf_page": 5, "L": 2846, "F": 2912, "H": 53357, "S": 1361, "A": 397, "D": 84, "W": 1068, "O": 86, "insight_ko": "학업 완료·출국에 따른 자진 취하(Withdrawn 1,068건 = 36.68%) 착시를 걷어내면, 끝까지 심리받은 사건의 81.30%가 Set Aside", "insight_en": "36.68% (1,068) withdraw before hearing; among cases reaching a non-dismissal decision, 81.30% are Set Aside", "A_minus_D": 313, "restricted_denominator": 1674, "excluded_procedural_count": 1238, "change_all_pct": 46.74, "restricted_change_pct": 81.3, "nonrestricted_pct": 42.51}, {"id": "482_refusal", "subclass": "482", "decision_type": "Visa Refusal", "label_ko": "고용주 스폰서 비자 거절 (SID/TSS 482 Refusal)", "label_en": "Subclass 482 (SID/TSS) — Visa Refusal", "pdf_page": 9, "L": 250, "F": 220, "H": 3530, "S": 100, "A": 46, "D": 26, "W": 61, "O": 13, "insight_ko": "취하(61건)·절차종결(39건)을 제외한 본안 결정(120건) 중 83.33%(100건)가 노미네이션·경력 보완을 통해 Set Aside", "insight_en": "83.33% (100/120) restricted Set Aside rate once withdrawals (61) and dismissals/other (39) are separated", "A_minus_D": 20, "restricted_denominator": 120, "excluded_procedural_count": 100, "change_all_pct": 45.45, "restricted_change_pct": 83.33, "nonrestricted_pct": 45.45}, {"id": "500_cancellation", "subclass": "500", "decision_type": "Visa Cancellation", "label_ko": "학생비자 취소 (Subclass 500 Cancellation — s 116)", "label_en": "Subclass 500 (Student) — Visa Cancellation", "pdf_page": 5, "L": 84, "F": 172, "H": 566, "S": 78, "A": 76, "D": 22, "W": 8, "O": 10, "insight_ko": "단순 거절(81.30%)보다 취소(59.09%)의 방어 난도가 훨씬 높으므로 NOICC 5영업일 소명 단계(비자응급실)에서 취소를 막는 것이 핵심", "insight_en": "Cancellation review is tougher (59.09% vs 81.30% for refusal) — early NOICC defence before cancellation is critical", "A_minus_D": 54, "restricted_denominator": 132, "excluded_procedural_count": 40, "change_all_pct": 45.35, "restricted_change_pct": 59.09, "nonrestricted_pct": 23.26}, {"id": "600_refusal", "subclass": "600", "decision_type": "Visa Refusal", "label_ko": "방문비자 거절 (Subclass 600 Refusal — 호주 가족 스폰서 건)", "label_en": "Subclass 600 (Visitor) — Visa Refusal", "pdf_page": 7, "L": 335, "F": 465, "H": 3269, "S": 52, "A": 22, "D": 1, "W": 85, "O": 306, "insight_ko": "⚠️ 전체 종결의 65.81%(306건)가 재심 청구 적격(Part 5 reviewable 요건) 미비로 '관할권 없음(Other)' 각하! 본안 심리 통과 시에는 71.23% 인용", "insight_en": "65.81% (306/465) dismissed as Other/No Jurisdiction due to ineligible offshore applications; 71.23% (52/73) when valid", "A_minus_D": 21, "restricted_denominator": 73, "excluded_procedural_count": 392, "change_all_pct": 11.18, "restricted_change_pct": 71.23, "nonrestricted_pct": 84.3}, {"id": "citizenship", "subclass": "Citizenship", "decision_type": "Citizenship Refusal", "label_ko": "호주 시민권 거절 재심 (Australian Citizenship Refusal)", "label_en": "Australian Citizenship Refusal Review", "pdf_page": 11, "L": 82, "F": 94, "H": 301, "S": 30, "A": 26, "D": 5, "W": 21, "O": 17, "insight_ko": "인성(Good Character)·거주기간·신원 사유 시민권 거절 건으로, 취하·각하 제외 실질 결정(51건) 중 58.82%(30건)가 Set Aside", "insight_en": "Good character, residence & identity refusals: 31.91% (30/94) of all finalisations and 58.82% (30/51) of substantive decisions Set Aside", "A_minus_D": 21, "restricted_denominator": 51, "excluded_procedural_count": 43, "change_all_pct": 31.91, "restricted_change_pct": 58.82, "nonrestricted_pct": 45.74}, {"id": "character", "subclass": "s 501 Character", "decision_type": "Character s 501 / s 501CA", "label_ko": "인성 사유 비자 거절 · 강제취소 철회거부 (s 501 / s 501CA)", "label_en": "Character Review (s 501 Refusal & s 501CA Non-Revocation)", "pdf_page": 11, "L": 72, "F": 89, "H": 154, "S": 33, "A": 42, "D": 1, "W": 6, "O": 8, "insight_ko": "9일 청구 기한 · 84일 법정 심결 데드라인(s 500(6B)) 적용 구간으로, Direction 110 법리 다툼을 통해 실질 결정의 44.59%(33/74) Set Aside", "insight_en": "Subject to strict 9-day filing & 84-day decision rules (s 500(6B)); 44.59% (33/74) restricted Set Aside under Direction 110", "A_minus_D": 41, "restricted_denominator": 74, "excluded_procedural_count": 15, "change_all_pct": 37.08, "restricted_change_pct": 44.59, "nonrestricted_pct": 16.85}], "macro_insights": [{"id": "employer_nomination_surge", "badge_ko": "고용주 스폰서 · 노미네이션 핵심 병목 (PDF p.9–10)", "badge_en": "Working & Skilled Backlog Driver (PDF p.9–10)", "metric_highlight": "86.70% (3,078 / 3,550건)", "title_ko": "취업·기술비자 ART 신규 접수의 86.70%(3,078건)가 '고용주 노미네이션 거절'입니다", "title_en": "86.70% (3,078 of 3,550) of Working/Skilled ART Lodgements Are Employer Nomination Refusals", "desc_ko": "2026년 7~8월 두 달간 취업·기술비자(Working/Skilled) 재심 청구 3,550건 중 종결은 677건(해소율 19.07%, 미결 순증 +2,863건)에 불과하며, 신규 접수의 86.70%(3,078건)가 비자 본안이 아닌 고용주 노미네이션(Nomination) 거절입니다. 약 1년 6개월~2년 10개월의 ART 대기 시간 동안 재무제표·AMSR·진정성(Genuine Position) 서류를 보강하면 본안 결정 대비 83.33%(482 기준)의 높은 역전 승소율을 기대할 수 있습니다.", "desc_en": "Working/Skilled visas recorded a 19.07% clearance rate (677 finalised vs 3,550 lodged), driven by 3,078 Employer Nomination refusals (86.70%). The 1.5–2.8 year ART queue provides a critical window to rebuild financial, AMSR, and genuine position evidence.", "cta_service": "art_case_review"}, {"id": "study_backlog_concentration", "badge_ko": "학생비자 적체 집중 & 자진취하 착시 (PDF p.5)", "badge_en": "Study Visa Backlog & Withdrawal Effect (PDF p.5)", "metric_highlight": "64.38% (53,984 / 83,847건)", "title_ko": "전체 이민 재심 적체의 64.38%(53,984건)가 학생비자이며, 실질 본안 결정 시 81.30%가 뒤집힙니다", "title_en": "Study Visas Hold 64.38% (53,984) of Migration On-Hand Backlog; 81.30% Restricted Set Aside", "desc_ko": "학생비자(500) 거절의 전체 종결 대비 Set Aside 비율은 46.74%(1,361/2,912)로 보이지만, 이는 재심 대기 중 학업을 마치고 출국하며 자진 취하한 1,068건(36.68%)이 분모에 포함되었기 때문입니다. 취하·각하를 제외하고 실제 본안 결정까지 간 사건(1,674건) 중에서는 81.30%(1,361건)가 Set Aside(취소·환송)되었습니다.", "desc_en": "While 500 Refusal shows a 46.74% raw Set Aside rate across all 2,912 finalisations, 36.68% (1,068) were applicant withdrawals. Among the 1,674 non-dismissal substantive decisions, 81.30% (1,361) were Set Aside.", "cta_service": "art_case_review"}, {"id": "visitor_jurisdiction_trap", "badge_ko": "관할권 각하(No Jurisdiction) 함정 경보 (PDF p.7)", "badge_en": "No-Jurisdiction Dismissal Trap (PDF p.7)", "metric_highlight": "65.81% (306 / 465건 각하)", "title_ko": "방문비자(600) ART 신청의 65.81%(306건)가 본안 심리도 못 받고 '관할권 없음'으로 각하됩니다", "title_en": "65.81% (306 of 465) of Subclass 600 ART Finalisations Exit as No-Jurisdiction / Other", "desc_ko": "해외 신청 방문비자(600)는 호주 시민권/영주권 가족 스폰서 요건(Part 5 reviewable decision)을 충족하지 못하면 ART 관할권이 전혀 없습니다. 무작정 재심을 넣었다가 65.81%가 각하되는 반면, 적격 여부를 사전 검증해 본안 심리(73건)까지 간 사건은 71.23%(52건)가 인용되었습니다.", "desc_en": "Offshore Visitor 600 refusals without an eligible Australian family sponsor/visit condition lack Part 5 jurisdiction (65.81% exited as Other). When jurisdictionally valid and decided on the merits, 71.23% (52/73) were Set Aside.", "cta_service": "visa_emergency"}, {"id": "partner_long_queue_window", "badge_ko": "파트너·가족비자 장기 대기 & 증거 보강 (PDF p.1, 3)", "badge_en": "Partner/Family 134-Week Median Wait & Evidence Window", "metric_highlight": "3년 2개월 (중위 134주) · 85.16%", "title_ko": "파트너 비자(820) 재심은 중위 3년 2개월(134주)이 소요되나, 실질 본안 결정의 85.16%가 인용됩니다", "title_en": "Partner 820 Reviews Take 3 Yrs 2 Mos (134 Wks Median), Yielding 85.16% Restricted Set Aside", "desc_ko": "파트너 비자는 이민성 1차 심사 시점의 증거 부족이나 Schedule 3 사유로 거절되더라도, ART는 재심 결정 시점(Time of Decision)의 누적된 동거·재정·자녀 출산 증거를 모두 반영합니다(전체 종결 대비 74.66%, 실질 결정 대비 85.16% Set Aside).", "desc_en": "Because the ART re-evaluates partner relationships at the time of the Tribunal's decision, the ~3-year wait allows couples to build decisive cohabitation, financial, and family evidence (74.66% raw / 85.16% restricted Set Aside).", "cta_service": "art_case_review"}]}};

  const STATE = {
    lang: "ko",
    sources: DEFAULT_SOURCES,
    artIntel: DEFAULT_ART_INTEL
  };

  const I18N = {
    ko: {
      brandTag: "호주 비자 거절 · 취소(s 116 / s 501) · Section 48 · PIC 4020 · ART 긴급 진단기",
      pollBtnLabel: "14/14 법령·ART 출처 검증됨",
      topCta: "박앤코 긴급 상담 신청 →",
      urgentBadge: "🚨 골든타임 엄수 (기한 연장 절대 불가)",
      urgentText: "행정재심기구(ART)은 단 1초라도 마감 기한을 넘기면 재심 신청을 각하할 수밖에 없으며 법적으로 기한 연장 권한(No Power to Extend)이 전혀 없습니다! 일반 취소(s 116) 7영업일 · 인성(s 500) 9역일 · 일반 거절 28역일!",
      urgentLink: "내 ART 마감일 즉시 계산 →",
      heroOverline: "Migration Act 1958 ss 48, 116, 347, 500, 501 · Migration Regulations 1994 reg 2.12, 4.10 & Schedule 4 (PIC 4020 / 4014)",
      hero_title: "호주 비자 거절 · 취소(s 116 / s 501) · Section 48 Bar · PIC 4020 & ART 재심 기한 긴급 진단기",
      hero_lead: "비자 거절 통지서(Refusal), 취소 예고장(NOICC), 강제 취소(s 501(3A)), 또는 PIC 4020 허위서류 의심 통지를 받으셨나요? 단 하루도 지체할 수 없는 ART 재심 법정 데드라인(7영업일·9일·28일)부터 비자·처분별 실제 ART 재심 인용률(이중 분모 비교)·소요기간(p50/p95), Section 48 예외 비자(reg 2.12), 그리고 PIC 4020(4)·8503 웨이버 전략까지 한 화면에서 즉시 진단하세요.",
      nav_btn_art: "1. ART 재심 & 소명 마감일 계산기",
      nav_btn_s48: "2. Section 48 Bar & 우회 비자 진단",
      nav_btn_charts: "3. 법정 기한 & s 48 시각화 차트",
      nav_btn_art_intel: "📊 ART 비자별 승소율(이중분모) · 소요기간",
      nav_btn_waiver: "4. PIC 4020 · 8503 · 4014 웨이버",
      sec0_title: "비자 위기 대응 핵심 법정 기한 및 Section 48 / PIC 4020 시각화 차트",
      sec0_desc: "처분 유형별 재심 청구 기간(7영업일~70역일) 비교와 Section 48 Bar 발동 시 호주 내 접수 가능/불가 비자 매트릭스입니다.",
      sec1_title: "행정재심기구(ART) 재심 청구 · s 501 철회 · NOICC 소명 마감일 정밀 계산기",
      sec1_desc: "통지서 수신일(이메일 발송일 당일 간주 — Migration Act s 494C(5))과 처분 종류를 선택하면 법정 마감일과 보수적 안전 접수일을 계산합니다.",
      artIntelTitle: "📊 행정재심기구(ART) 비자·처분별 실제 재심 결과(이중 분모 비교) · 4대 적체 인사이트 & 13개 카테고리 심리 소요기간",
      artIntelDesc: "호주 행정재심기구(ART) 공식 통계 보고서(Migration-Detailed-Caseload-Statistics-2026-27.pdf 및 art.gov.au/.../processing-times) 원문을 실시간 검증하여, ① 자진취하·관할각하·절차각하를 모두 포함한 전체 종결 대비 Set Aside 비율(S / F)과 ② 절차적 이탈을 제외하고 실제 결정까지 간 사건 대비 인용 비율(S / [S + A - D])을 투명하게 대조합니다.",
      artOutcomeTableTitle: "1. 주요 비자 서브클래스·처분별 ART 재심 결과 이중 분모(Dual-Denominator) 비교표 (2026.07.01–2026.08.31 공식 PDF)",
      artOutcomeTableSub: "산술 검증식: Set aside(S) + 순수기각(A-D) + 각하부분집합(D) + 자진취하(W) + 관할제외·기타(O) = 전체종결(F). 이민 사건의 Set aside(S)에는 취소·변경·환송(Remittal) 및 s 103 합의 결정이 포함되며, 환송 후 최종 비자 발급 건수와는 구별됩니다.",
      thArtVisa: "비자 · 처분 유형 (PDF 쪽)",
      thArtFlow: "신규접수(L) / 종결(F) / 미결재고(H)",
      thArtBreakdown: "종결 상세: 인용(S) · 기각(A-D) · 각하(D) · 취하(W) · 관할제외(O)",
      thArtAllRate: "전체 종결 대비 Set Aside (S / F)",
      thArtRestRate: "실질 결정 대비 Set Aside (S / [S+A-D])",
      thArtInsight: "박앤코 실무 해석 & 대응 포인트",
      artDurTableTitle: "2. ART 13개 이민·난민 사건 카테고리별 실제 완료 소요기간 (50% 중앙값 vs 95% 장기 · 2026.03.01–2026.08.31)",
      artDurTableSub: "법정 신청 기한(28일/7영업일/9일) 안에 적법하게 ART 재심을 접수하면 브리징 비자가 유지되며, 아래 실제 심리 대기 기간 동안 부족했던 재무·고용·관계 증거를 완벽히 재구축하여 승소(Set Aside/Remittal)를 준비할 수 있습니다.",
      thDurCat: "ART 사건 카테고리 (Case Category)",
      thDurP50: "50% 사건 완료 소요기간 (p50 중앙값)",
      thDurP95: "95% 사건 완료 소요기간 (p95 장기)",
      thDurStrategy: "재심 대기 기간 활용 전략 & 전담 서비스",
      sec2_title: "Section 48 Bar 발동 여부 및 호주 내 재신청 가능 비자(reg 2.12) 진단기",
      sec2_desc: "호주 입국 후 비자가 거절되거나 취소되었고 현재 유효한 실체 비자(Substantive Visa)가 없다면(브리징 비자 소지 중), Migration Act s 48에 의해 호주 내 신규 비자 신청이 엄격히 제한됩니다.",
      sec3_title: "PIC 4020 (허위서류·신원) · Condition 8503 (No Further Stay) · PIC 4014 웨이버 진단 및 긴급 상담서 출력",
      sec3_desc: "3년/10년 입국금지 조항의 면제(Waiver) 가능 여부와 호주 시민권/영주권 가족·국익 참작 사유(Compelling & Compassionate)를 점검합니다.",
      sec4_title: "14개 1차 법령 · 행정재심기구(ART) · 연방법원 규정 모니터링 대시보드"
    },
    en: {
      brandTag: "Australia Visa Refusal · Cancellation (s 116 / s 501) · Section 48 · PIC 4020 · ART Navigator",
      pollBtnLabel: "14/14 Statutory & ART Sources Verified",
      topCta: "Urgent Legal Consultation →",
      urgentBadge: "🚨 STRICT STATUTORY DEADLINES (NO POWER TO EXTEND)",
      urgentText: "The Administrative Review Tribunal (ART) has ZERO statutory power to extend migration review deadlines by even one second! Onshore s 116 Cancellation: 7 working days · s 500 Character: 9 calendar days · Standard Refusal: 28 calendar days!",
      urgentLink: "Calculate My ART Deadline Now →",
      heroOverline: "Migration Act 1958 ss 48, 116, 347, 500, 501 · Migration Regulations 1994 reg 2.12, 4.10 & Schedule 4 (PIC 4020 / 4014)",
      hero_title: "Australia Visa Refusal · Cancellation (s 116 / s 501) · Section 48 Bar · PIC 4020 & ART Deadline Navigator",
      hero_lead: "Received a Visa Refusal, NOICC, s 501(3A) Mandatory Cancellation, or PIC 4020 Natural Justice letter? Calculate your non-extendable ART statutory deadline (7 working days, 9 days, 28 days), compare official ART subclass Set Aside rates (dual-denominator) & p50/p95 durations, verify Section 48 onshore exempt visas (reg 2.12), and assess PIC 4020(4) & Condition 8503 waiver strategies.",
      nav_btn_art: "1. ART & NOICC Deadline Calculator",
      nav_btn_s48: "2. Section 48 Bar & Exempt Visas",
      nav_btn_charts: "3. Statutory Deadlines & s 48 Charts",
      nav_btn_art_intel: "📊 ART Subclass Outcomes & Processing Times",
      nav_btn_waiver: "4. PIC 4020 · 8503 · 4014 Waivers",
      sec0_title: "Statutory Deadlines & Section 48 / PIC 4020 Visual Analytics",
      sec0_desc: "Compare statutory review periods (7 working days to 70 calendar days) and the Section 48 Bar onshore allowed vs prohibited visa matrix.",
      sec1_title: "Administrative Review Tribunal (ART) · s 501 Revocation & NOICC Strict Deadline Calculator",
      sec1_desc: "Select the decision type and notice date (deemed received on the day of email transmission under Migration Act s 494C(5)) to compute both the statutory deadline and conservative safe lodgement date.",
      artIntelTitle: "📊 Official ART Subclass Review Outcomes (Dual-Denominator), 4 Backlog Insights & 13-Category Actual Processing Times",
      artIntelDesc: "Verified against the official ART Migration Detailed Caseload Statistics PDF (2026–27) and ART Processing Times HTML. Compares (1) All-Finalisations Set Aside Rate (S / F, including withdrawals & no-jurisdiction exits) against (2) Restricted Non-Dismissal Decision Rate (S / [S + A - D]).",
      artOutcomeTableTitle: "1. Subclass & Decision-Type ART Outcomes: Dual-Denominator Comparison (1 Jul – 31 Aug 2026 Official PDF)",
      artOutcomeTableSub: "Arithmetic invariant: Set aside (S) + Affirmed non-dismissed (A-D) + Dismissed subset (D) + Withdrawn (W) + Other/No jurisdiction (O) = Total Finalised (F). Migration Set Aside includes vary, set aside, remit and s 103 consent decisions.",
      thArtVisa: "Subclass & Decision Type (PDF Page)",
      thArtFlow: "Lodged (L) / Finalised (F) / On-Hand (H)",
      thArtBreakdown: "Breakdown: Set Aside (S) · Affirmed (A-D) · Dismissed (D) · Withdrawn (W) · Other (O)",
      thArtAllRate: "All-Finalisations Set Aside (S / F)",
      thArtRestRate: "Restricted Substantive Rate (S / [S+A-D])",
      thArtInsight: "Park & Co Strategic Interpretation",
      artDurTableTitle: "2. ART Actual Processing Times Across 13 Migration & Protection Categories (p50 Median vs p95 · 1 Mar – 31 Aug 2026)",
      artDurTableSub: "Valid ART lodgement within the statutory deadline preserves Bridging Visa status, allowing applicants and sponsors to use the 1.5–3.2 year review queue to rebuild financial, AMSR, and relationship evidence.",
      thDurCat: "ART Case Category",
      thDurP50: "50% Finalised Within (p50 Median)",
      thDurP95: "95% Finalised Within (p95)",
      thDurStrategy: "Queue Strategy & Park & Co Review Service",
      sec2_title: "Section 48 Bar Trigger & Onshore Exempt Visa (reg 2.12) Checker",
      sec2_desc: "If you have had a visa refused or cancelled since last entering Australia and do not hold a substantive visa (e.g. holding a Bridging Visa), Migration Act s 48 bars most onshore visa applications unless exempt under reg 2.12.",
      sec3_title: "PIC 4020 · Condition 8503 · Schedule 3 Waiver Diagnostic & Urgent Brief Export",
      sec3_desc: "Assess whether 3-year/10-year exclusion bars can be waived and evaluate Compelling & Compassionate circumstances affecting Australian citizens/PRs.",
      sec4_title: "14 Primary Statutory & Tribunal Sources Monitoring Dashboard"
    }
  };

  function addWorkingDays(startDate, workingDays) {
    const d = new Date(startDate.getTime());
    let added = 0;
    while (added < workingDays) {
      d.setDate(d.getDate() + 1);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) {
        added += 1;
      }
    }
    return d;
  }

  function renderCharts() {
    const en = STATE.lang === "en";
    const artChart = document.getElementById("svg-art-deadlines-chart");
    if (artChart) {
      artChart.innerHTML = `
        <svg viewBox="0 0 680 265" width="100%" style="display:block;height:auto;font-family:'Pretendard Variable','Manrope',sans-serif;">
          <rect x="0" y="0" width="680" height="265" rx="10" fill="#FCFAF6"/>
          <!-- Horizontal timeline bars -->
          <text x="20" y="34" font-size="11.5" font-weight="800" fill="#530009">${en ? "1. Onshore General Cancellation (s 116) / Detention" : "1. 호주 내 일반 비자 취소 (s 116) / 이민구금"}</text>
          <rect x="275" y="19" width="95" height="22" rx="4" fill="#B23A2E"/>
          <text x="380" y="35" font-size="11" font-weight="800" fill="#530009">${en ? "7 Working Days — reg 4.10(1)(b)" : "7 영업일 (Working Days) — reg 4.10(1)(b)"}</text>

          <text x="20" y="76" font-size="11.5" font-weight="800" fill="#7A1F2B">${en ? "2. Onshore Character (s 501) ART Review" : "2. 호주 내 인성(s 501) 거절·철회거부 ART 재심"}</text>
          <rect x="275" y="61" width="115" height="22" rx="4" fill="#7A1F2B"/>
          <text x="400" y="77" font-size="11" font-weight="800" fill="#7A1F2B">${en ? "9 Calendar Days — s 500(6B) [84-day decision]" : "9 역일 (Calendar Days) — s 500(6B) [84일 심결]"}</text>

          <text x="20" y="118" font-size="11.5" font-weight="700" fill="#1F5A5E">${en ? "3. Onshore Visa / Nomination Refusal" : "3. 호주 내 일반 비자·노미네이션 거절 (Onshore)"}</text>
          <rect x="275" y="103" width="210" height="22" rx="4" fill="#1F5A5E"/>
          <text x="495" y="119" font-size="11" font-weight="700" fill="#1F5A5E">${en ? "28 Calendar Days — reg 4.10(1)(a)" : "28 역일 (Calendar Days) — reg 4.10(1)(a)"}</text>

          <text x="20" y="160" font-size="11.5" font-weight="700" fill="#6B4A1F">${en ? "4. s 501(3A) Mandatory Cancellation Revocation" : "4. s 501(3A) 강제 비자 취소 철회 요청 (Revocation)"}</text>
          <rect x="275" y="145" width="210" height="22" rx="4" fill="#B67A1E"/>
          <text x="495" y="161" font-size="11" font-weight="700" fill="#6B4A1F">${en ? "28 Calendar Days — s 501CA" : "28 역일 (Calendar Days) — s 501CA"}</text>

          <text x="20" y="202" font-size="11.5" font-weight="700" fill="#2E2E2E">${en ? "5. Federal Circuit Court (FCFCOA) Judicial Review" : "5. ART 패소 후 연방법원(FCFCOA) 사법심사"}</text>
          <rect x="275" y="187" width="250" height="22" rx="4" fill="#47433E"/>
          <text x="535" y="203" font-size="11" font-weight="700" fill="#2E2E2E">${en ? "35 Calendar Days — s 477" : "35 역일 — s 477"}</text>

          <text x="20" y="244" font-size="11.5" font-weight="700" fill="#2E6B4F">${en ? "6. Offshore Refusal Australian Sponsor ART Review" : "6. 해외 비자 거절 건 호주 스폰서 ART 재심"}</text>
          <rect x="275" y="229" width="335" height="22" rx="4" fill="#2E6B4F"/>
          <text x="616" y="245" font-size="11" font-weight="700" fill="#2E6B4F">${en ? "70 Days" : "70 역일"}</text>
        </svg>
      `;
    }

    const s48Chart = document.getElementById("svg-s48-matrix-chart");
    if (s48Chart) {
      s48Chart.innerHTML = `
        <svg viewBox="0 0 680 265" width="100%" style="display:block;height:auto;font-family:'Pretendard Variable','Manrope',sans-serif;">
          <rect x="0" y="0" width="680" height="265" rx="10" fill="#FCFAF6"/>
          <!-- Left: Exempt Visas (Allowed Onshore) -->
          <rect x="20" y="18" width="310" height="230" rx="10" fill="#E7F3EC" stroke="#B7DEC8" stroke-width="1.5"/>
          <text x="36" y="44" font-size="12.5" font-weight="800" fill="#1A4731">${en ? "✅ Section 48 Exempt Visas (reg 2.12)" : "✅ Section 48 예외 허용 비자 (reg 2.12)"}</text>
          <text x="36" y="64" font-size="10.5" fill="#2E6B4F">${en ? "Can be lodged ONSHORE while holding a Bridging Visa:" : "브리징 비자 상태에서 호주 내(Onshore) 신청 가능:"}</text>
          <text x="44" y="88" font-size="11" font-weight="700" fill="#1A4731">${en ? "• Subclass 190 (State Nominated PR)" : "• Subclass 190 (주정부 후원 기술영주)"}</text>
          <text x="44" y="110" font-size="11" font-weight="700" fill="#1A4731">${en ? "• Subclass 491 (Skilled Work Regional)" : "• Subclass 491 (지방 주정부/가족 후원 임시)"}</text>
          <text x="44" y="132" font-size="11" font-weight="700" fill="#1A4731">${en ? "• Subclass 494 (Employer Sponsored Regional)" : "• Subclass 494 (지방 고용주 스폰서 SESR)"}</text>
          <text x="44" y="154" font-size="11" font-weight="700" fill="#1A4731">${en ? "• Subclass 820/801 (Partner — Check Sch 3)" : "• Subclass 820/801 (파트너 비자 — Sch 3 유의)"}</text>
          <text x="44" y="176" font-size="11" font-weight="700" fill="#1A4731">${en ? "• Subclass 602 (Medical) · 866 (Protection) · 802 (Child)" : "• Subclass 602 (의료치료) · 866 (보호) · 802 (자녀)"}</text>
          <text x="44" y="198" font-size="11" font-weight="700" fill="#1A4731">${en ? "• Bridging Visa A / B / C / E" : "• Bridging Visa A / B / C / E (재심/출국용)"}</text>
          <rect x="36" y="210" width="278" height="26" rx="5" fill="#FFFFFF" stroke="#B7DEC8"/>
          <text x="175" y="227" text-anchor="middle" font-size="10" font-weight="800" fill="#2E6B4F">${en ? "💡 If 482 refused: pivot to 494/190/491 or lodge 482 offshore" : "💡 482 거절 시 494/190/491 또는 Offshore 482로 우회"}</text>

          <!-- Right: Barred Visas (Prohibited Onshore) -->
          <rect x="350" y="18" width="310" height="230" rx="10" fill="#F2E4E5" stroke="#D9A7AD" stroke-width="1.5"/>
          <text x="366" y="44" font-size="12.5" font-weight="800" fill="#7A1F2B">${en ? "🛑 Section 48 Barred Visas (Onshore Blocked)" : "🛑 Section 48 호주 내 신청 금지 비자"}</text>
          <text x="366" y="64" font-size="10.5" fill="#530009">${en ? "Must depart Australia and lodge OFFSHORE:" : "반드시 출국(Offshore) 후 해외에서 접수해야 하는 비자:"}</text>
          <text x="374" y="88" font-size="11" font-weight="700" fill="#530009">${en ? "• SID Subclass 482 (Skills in Demand)" : "• SID Subclass 482 (고용주 스폰서 임시)"}</text>
          <text x="374" y="110" font-size="11" font-weight="700" fill="#530009">${en ? "• ENS Subclass 186 (Employer Nomination PR)" : "• ENS Subclass 186 (고용주 지명 영주 TRT/DE)"}</text>
          <text x="374" y="132" font-size="11" font-weight="700" fill="#530009">${en ? "• Subclass 500 (Student) · Subclass 485 (Graduate)" : "• Subclass 500 (학생) · Subclass 485 (졸업생)"}</text>
          <text x="374" y="154" font-size="11" font-weight="700" fill="#530009">${en ? "• Subclass 189 (Skilled Independent) · 600 (Visitor)" : "• Subclass 189 (독립기술이민) · 600 (관광)"}</text>
          <text x="374" y="176" font-size="11" font-weight="700" fill="#530009">${en ? "• Parent Visas (804 / 864 / 884 / 143 / 103)" : "• 부모초청 비자 (804 / 864 / 884 / 143 / 103)"}</text>
          <rect x="366" y="196" width="278" height="40" rx="5" fill="#FFFFFF" stroke="#D9A7AD"/>
          <text x="505" y="213" text-anchor="middle" font-size="10" font-weight="800" fill="#7A1F2B">${en ? "⚠️ Leaving & returning on BVB does NOT lift s 48!" : "⚠️ BVB로 잠깐 해외 나갔다 재입국해도 s 48 유지됨!"}</text>
          <text x="505" y="228" text-anchor="middle" font-size="9.5" fill="#530009">${en ? "Must physically lodge while outside Australia" : "반드시 해외 체류 중에 비자 접수(Lodge Offshore) 필요"}</text>
        </svg>
      `;
    }
  }

  /* 1. ART Deadline Calculator */
  function updateArtDeadline() {
    const en = STATE.lang === "en";
    const type = document.getElementById("art-decision-type")?.value || "onshore_refusal";
    const dateStr = document.getElementById("art-notice-date")?.value || "2026-10-15";
    const subStatus = document.getElementById("art-substantive-status")?.value || "bridging";
    const out = document.getElementById("art-deadline-result");
    if (!out) return;

    const start = new Date(dateStr + "T00:00:00");
    let deadline = new Date(start.getTime());
    let ruleLabel = "";
    let note = "";

    if (type === "onshore_refusal") {
      deadline = new Date(start.getTime() + 28 * 86400000);
      ruleLabel = en ? "28 Calendar Days (reg 4.10(1)(a))" : "28 역일 (Calendar Days — reg 4.10(1)(a))";
      note = en
        ? "Standard ART review period for onshore visa or employer nomination refusals. Lodge on or before the Conservative Safe Date (Day 27) to avoid timezone/midnight traps."
        : "호주 내 비자 거절 또는 고용주 Nomination 거절에 대한 표준 ART 재심 기한입니다. 보수적 안전 기준으로 통지일 포함 27일차(늦어도 28일차) 자정 전에 접수해야 합니다.";
    } else if (type === "s116_cancel" || type === "detention_ref_canc") {
      deadline = addWorkingDays(start, 7);
      ruleLabel = en ? "7 Working Days (reg 4.10(1)(b) / (2))" : "7 영업일 (Working Days — reg 4.10(1)(b) / (2))";
      note = en
        ? "⚠️ CRITICAL URGENCY: Onshore s 116 cancellation and detention review deadlines are strictly 7 working days (excluding weekends & public holidays in your state)."
        : "⚠️ 초긴급: 일반 비자 취소(s 116) 및 구금 상태 재심 기한은 주말·공휴일을 제외한 7 영업일에 불과합니다. 주별 공휴일 차이를 고려해 즉시 접수해야 합니다.";
    } else if (type === "s501_mandatory_rev") {
      deadline = new Date(start.getTime() + 28 * 86400000);
      ruleLabel = en ? "28 Calendar Days (s 501CA Revocation Request)" : "28 역일 (s 501CA Mandatory Cancellation 철회 요청)";
      note = en
        ? "Following mandatory visa cancellation under s 501(3A), written representations seeking revocation addressing Direction 110 must be lodged within 28 calendar days."
        : "12개월 이상 징역형 등으로 s 501(3A) 강제 비자 취소를 당한 경우, 이민성 장관에게 28일 이내에 철회 요청(Request for Revocation)과 Direction 110 소명자료를 제출해야 합니다.";
    } else if (type === "s500_char_art") {
      deadline = new Date(start.getTime() + 9 * 86400000);
      ruleLabel = en ? "9 Calendar Days (s 500(6B) Onshore Character ART)" : "9 역일 (s 500(6B) 호주 내 인성 처분 ART 재심)";
      note = en
        ? "🚨 MAXIMUM URGENCY: Onshore character refusal or non-revocation (s 501CA(4)) review to the ART must be lodged within 9 calendar days, and the ART must decide within 84 days."
        : "🚨 최우선 긴급: 호주 내 s 501 인성 거절 또는 강제취소 철회거부(s 501CA(4))에 대한 ART 재심 기한은 단 9일이며, ART는 통지 후 84일 이내에 결정을 내려야 합니다.";
    } else if (type === "offshore_sponsor") {
      deadline = new Date(start.getTime() + 70 * 86400000);
      ruleLabel = en ? "70 Calendar Days (Offshore Sponsor ART — reg 4.10(1)(c))" : "70 역일 (해외 비자 거절 호주 스폰서 재심 — reg 4.10(1)(c))";
      note = en
        ? "Where an offshore visa application with an Australian sponsor is refused, the sponsor has 70 calendar days to lodge an ART review."
        : "해외(Offshore) 신청 비자(예: 309 파트너, 482 해외 신청 등)가 거절된 경우 호주 내 스폰서가 70일 이내에 ART 재심을 청구할 수 있습니다.";
    } else {
      deadline = new Date(start.getTime() + 35 * 86400000);
      ruleLabel = en ? "35 Calendar Days (FCFCOA Judicial Review — s 477)" : "35 역일 (연방순회·가족법원 FCFCOA 사법심사 — s 477)";
      note = en
        ? "Judicial review to the Federal Circuit and Family Court of Australia (FCFCOA) for jurisdictional error must be filed within 35 days of the ART decision."
        : "ART 기각 결정문 날짜로부터 35일 이내에 관할권 오류(Jurisdictional Error)를 입증하여 연방법원에 사법심사를 제기해야 합니다.";
    }

    const conservativeDate = new Date(deadline.getTime() - 86400000);
    const fmt = (d) => isNaN(d.getTime()) ? "—" : d.toISOString().slice(0, 10);

    out.innerHTML = `
      <div class="result-summary-grid">
        <div class="mini-kpi" style="border-top:3px solid #7A1F2B;">
          <span>${en ? "Recommended Safe Lodgement Date" : "권장 안전 접수일 (통지일 산입 기준)"}</span>
          <strong>${fmt(conservativeDate)}</strong>
        </div>
        <div class="mini-kpi" style="border-top:3px solid #1F5A5E;">
          <span>${en ? "Statutory Final Deadline" : "법정 최종 마감일 (통지 익일 기산)"}</span>
          <strong style="color:#1F5A5E;">${fmt(deadline)}</strong>
        </div>
        <div class="mini-kpi" style="border-top:3px solid #6B4A1F;">
          <span>${en ? "Applicable Statutory Rule" : "적용 법조항 및 기한"}</span>
          <strong style="color:#6B4A1F;font-size:15px;">${ruleLabel}</strong>
        </div>
      </div>
      <div class="alert-box alert-box--danger" style="margin-top:0.85rem;">
        <p style="margin:0 0 0.35rem;"><strong>⏰ ${en ? "Non-Extendable Statutory Deadline" : "법정 기한 엄수 경고 (연장 불가)"}</strong>: ${note}</p>
        <p style="margin:0 0 0.35rem;"><strong>💰 [${en ? "FY2026–27 ART Filing Fee & Park & Co KDB Benchmark" : "FY2026–27 ART 재심 수수료 및 박앤코 KDB 승소율"}]</strong>: ${en
          ? "Standard Migration Review Fee: <strong>$3,727 AUD</strong> (50% financial hardship reduction / 50% refund on favourable decision: <strong>$1,863.50</strong> · Protection Review: <strong>$2,293</strong> · Character s 501: <strong>$1,195</strong>). Live Park & Co Immi KDB (9,270 decisions) favourable/remittal rate: <strong>48.0%</strong>."
          : "이민 재심 신청 수수료(reg 4.13A): <strong>$3,727 AUD</strong> (경제적 곤궁 50% 감면 및 승소/환송 시 50% 환급액: <strong>$1,863.50</strong> · 보호비자 재심 <strong>$2,293</strong> · s 501 일반 재심 <strong>$1,195</strong>). 박앤코 이민 KDB(9,270건) 평균 인용·환송률: <strong>48.0%</strong>."}</p>
        <p style="margin:0;"><strong>[${en ? "Section 48 Status" : "Section 48 상태"}]</strong>: ${subStatus === "bridging"
          ? (en
            ? "Because you do not hold a substantive visa, the <strong>Section 48 Bar applies immediately</strong>—only reg 2.12 exempt visas (190/491/494/820, etc.) can be lodged onshore."
            : "현재 실체 비자가 없으므로 <strong>Section 48 Bar가 즉시 적용</strong>되어 호주 내에서는 reg 2.12 예외 비자(190/491/494/820 등)만 신규 신청이 가능합니다.")
          : (en
            ? "Because your substantive visa is still in effect, the Section 48 Bar is not triggered until that substantive visa expires."
            : "아직 기존 실체 비자가 유효하므로 실체 비자 만료 전까지는 Section 48 Bar가 발동하지 않습니다.")}</p>
      </div>
    `;
    updateCrisisPreview();
  }

  /* 2. Section 48 Bar Checker */
  function updateSection48Checker() {
    const en = STATE.lang === "en";
    const hist = document.getElementById("s48-history")?.value || "refused_no_sub";
    const target = document.getElementById("s48-target-visa")?.value || "190_491_494";
    const out = document.getElementById("s48-checker-result");
    if (!out) return;

    const s48Active = hist === "refused_no_sub";
    let statusHtml = "";

    if (!s48Active) {
      statusHtml = `
        <div class="alert-box alert-box--success">
          ${en
            ? `<strong>✅ Section 48 Bar Does NOT Apply (All Visas Open Onshore)</strong>: ${hist === "nom_only_refused" ? "If only the employer's Nomination was refused and you withdrew your Visa Application before a visa refusal decision was made, Section 48 is NOT triggered!" : "Because you currently hold a valid Substantive Visa, Section 48 does not apply—lodge your new visa before your substantive visa expires."}`
            : `<strong>✅ Section 48 Bar 미적용 (호주 내 모든 비자 정상 신청 가능)</strong>: ${hist === "nom_only_refused" ? "고용주의 노미네이션(Nomination)만 거절되었고 귀하의 비자 신청(Visa Application)을 거절 결정 전에 자진 취하(Withdrawn)했다면, '비자 거절(Visa Refusal)' 기록이 아니므로 Section 48 Bar가 발동하지 않습니다!" : "현재 유효한 실체 비자(Substantive Visa)를 보유하고 있으므로 Section 48 Bar가 적용되지 않습니다. 단, 실체 비자가 만료되는 즉시 s 48이 발동하므로 만료일 전에 새 비자를 접수해야 합니다."}`}
        </div>
      `;
    } else if (target === "190_491_494" || target === "602_866") {
      statusHtml = `
        <div class="alert-box alert-box--success">
          ${en
            ? "<strong>✅ Section 48 Exempt Visa (<code>reg 2.12</code>) — Valid Onshore Lodgement Permitted!</strong>: Even while subject to Section 48, <strong>Subclasses 190, 491, 494, 602, and 866</strong> are prescribed exempt visas under <em>Migration Regulations 1994</em> reg 2.12 and can be lodged onshore without departing Australia."
            : "<strong>✅ Section 48 예외 허용 비자 (<code>reg 2.12</code>) — 호주 내(Onshore) 신청 가능!</strong>: 현재 Section 48 Bar가 적용 중이더라도, <strong>Subclass 190 · 491 · 494 · 602 · 866</strong> 비자는 <em>Migration Regulations 1994</em> reg 2.12에 의해 예외 비자로 지정되어 있어 <strong>출국하지 않고 호주 내에서 바로 신청</strong>할 수 있습니다."}
        </div>
      `;
    } else if (target === "820_801") {
      statusHtml = `
        <div class="alert-box alert-box--warn">
          ${en
            ? "<strong>⚠️ Onshore Partner Visa (820) Allowed under reg 2.12, but Schedule 3 (3001) Waiver Required!</strong>: Subclass 820/801 is exempt from s 48, but holding a Bridging Visa triggers <strong>Schedule 3 (Criterion 3001)</strong>, requiring <strong>Compelling Reasons</strong> (e.g. Australian citizen child) to waive—otherwise consider Offshore Subclass 309."
            : "<strong>⚠️ 호주 내 파트너 비자(820) 신청은 가능하나 Schedule 3 (3001) 웨이버 필수!</strong>: 파트너 비자(820/801)는 reg 2.12 예외 비자이므로 Section 48 상태에서도 호주 내 접수가 가능합니다. 그러나 현재 브리징 비자 소지 중이므로 <strong>Schedule 3 (실체 비자 만료 후 28일 경과)</strong>가 적용되어, 호주 시민권/영주권 자녀 양육 등 <strong>강력한 참작 사유(Compelling Reasons)</strong>를 입증해야 합니다 (그렇지 않으면 Offshore 309 비자 권장)."}
        </div>
      `;
    } else {
      statusHtml = `
        <div class="alert-box alert-box--danger">
          ${en
            ? "<strong>🛑 Barred Onshore by Section 48 (Offshore Lodgement Strategy Required)</strong>: Your selected visa (<strong>SID 482 · ENS 186 · 500 · 485 · 189</strong>) is NOT on the reg 2.12 exempt list and is invalid if lodged onshore.<br/><br/><strong>[Lawful Solution]</strong>:<br/>1) Obtain a <strong>Bridging Visa B (BVB)</strong>, depart Australia, <strong>lodge your new 482/186 application while physically offshore</strong>, and return to Australia before your BVB travel facility expires, OR<br/>2) Pivot onshore to a Section 48 exempt visa such as <strong>SESR 494 / 190 / 491</strong>."
            : "<strong>🛑 Section 48 Bar 호주 내 신청 불가 (Offshore 출국 접수 전략 필수)</strong>: 선택하신 비자(<strong>SID 482 · ENS 186 · 500 · 485 · 189</strong>)는 Section 48 예외 목록(reg 2.12)에 없으므로 호주 내에서는 ImmiAccount 접수가 원천 차단(Invalid Application)됩니다.<br/><br/><strong>[합법적 해결 전략]</strong>:<br/>1) 현재 유효한 브리징 비자 A에서 <strong>Bridging Visa B (BVB)</strong>를 승인받은 후 해외(예: 한국·뉴질랜드·싱가포르 등)로 출국하여 <strong>해외 체류 중에 새 482/186 비자를 접수(Lodge Offshore)</strong>하고 BVB 유효기간 내에 호주로 복귀하거나,<br/>2) Section 48 예외 비자인 <strong>SESR 494 / 190 / 491</strong>로 호주 내에서 전환해야 합니다."}
        </div>
      `;
    }

    out.innerHTML = statusHtml;
    updateCrisisPreview();
  }

  /* 3. Waiver Diagnostic */
  function updateWaiverChecker() {
    const en = STATE.lang === "en";
    const issue = document.getElementById("wv-issue-type")?.value || "pic4020_false";
    const ties = document.getElementById("wv-au-ties")?.value || "au_child_spouse";
    const out = document.getElementById("waiver-checker-result");
    if (!out) return;

    let html = "";
    if (issue === "pic4020_identity") {
      html = `
        <div class="alert-box alert-box--danger">
          ${en
            ? "<strong>🚨 PIC 4020(2A)/(2B) Identity Requirement — 10-Year Ban &amp; ZERO Statutory Waiver!</strong>: Unlike bogus documents/false information (3-year ban), <strong>there is NO waiver provision under PIC 4020(4) for identity breaches</strong>. The only defence is proving genuine identity at the Natural Justice stage before refusal."
            : "<strong>🚨 PIC 4020(2A)/(2B) 신원(Identity) 위반 — 10년 입국금지 &amp; 법정 Waiver 조항 없음!</strong>: 위조서류·허위정보(3년 금지)와 달리, <strong>신원(Identity) 불확실 또는 허위 신원 제출은 PIC 4020(4) 웨이버 대상에서 아예 제외</strong>되어 있습니다. 따라서 거절 결정이 내려지기 전 <strong>Natural Justice 소명 단계에서 신원 문서의 진정성을 입증하여 PIC 4020 위반 자체가 성립하지 않도록 방어</strong>하는 것이 유일한 해법입니다."}
        </div>
      `;
    } else if (issue === "pic4020_false") {
      html = `
        <div class="alert-box alert-box--warn">
          ${en
            ? `<strong>⚖️ PIC 4020(1)/(2) Bogus Document / False Information (3-Yr Ban) — Two-Prong Defence &amp; PIC 4020(4) Waiver</strong>:<br/>1) <strong>Prong 1 (Non-engagement under <em>Trivedi</em>)</strong>: Prove the error was non-material to visa criteria or an innocent typographical mistake without purposeful falsity.<br/>2) <strong>Prong 2 (PIC 4020(4) Waiver)</strong>: Establish <strong>compelling circumstances affecting the interests of Australia, or compassionate or compelling circumstances affecting an Australian citizen/PR</strong> (${ties}).`
            : `<strong>⚖️ PIC 4020(1)/(2) 허위서류·거짓정보 (3년 금지) — 2단계 방어 및 PIC 4020(4) 웨이버 전략</strong>:<br/>1) <strong>1차 방어 (불성립 주장 — <em>Trivedi</em> 판례 법리)</strong>: 해당 정보가 직무·비자 핵심 요건과 무관하거나(Not material), 고의적 기망이 아닌 단순 제3자 실수/오표기임을 입증.<br/>2) <strong>2차 방어 (PIC 4020(4) Waiver 청구)</strong>: 비자를 허가하지 않을 경우 <strong>호주 시민권자·영주권자 또는 호주의 이익에 영향을 미치는 중대하고 불가피한 사정(Compelling circumstances affecting the interests of Australia, or compassionate or compelling circumstances affecting an Australian citizen/PR)</strong>(${ties})을 법정 진술서와 객관적 증거로 입증.`}
        </div>
      `;
    } else if (issue === "cond_8503") {
      html = `
        <div class="alert-box alert-box--warn">
          ${en
            ? "<strong>🔓 Condition 8503 (\"No Further Stay\") Waiver (Migration Act s 41(2A) &amp; reg 2.05(4))</strong>:<br/>Requires proving that since the visa was granted, <strong>compelling and compassionate circumstances have developed beyond your control</strong> resulting in a <strong>major change</strong> to your circumstances (allow ~28 days processing before visa expiry)."
            : "<strong>🔓 Condition 8503 (\"No Further Stay\") 웨이버 요건 (Migration Act s 41(2A) &amp; reg 2.05(4))</strong>:<br/>비자 승인 이후에 <strong>신청자가 통제할 수 없는(Beyond control) 불가피하고 동정할 만한 사정(Compelling and compassionate circumstances)</strong>이 새로 발생하여 중대한 상황 변화(Major change)가 일어났음을 입증해야 합니다. (주의: 단순 결혼이나 일반 임신만으로는 기각되며, 합병증·중증 질환·본국 재난 등 통제 불능 사유를 결합해야 하며 심사 기간 약 28일을 고려해 비자 만료 최소 4~6주 전에 신청해야 합니다.)"}
        </div>
      `;
    } else {
      html = `
        <div class="alert-box alert-box--success">
          ${en
            ? `<strong>✅ PIC 4013/4014 &amp; Schedule 3 (3001/3004) Compelling &amp; Compassionate Waiver Available</strong>: A structured legal submission evidencing the impact on your Australian ties (<strong>${ties}</strong>) or Australian employer can waive the exclusion period.`
            : `<strong>✅ PIC 4013/4014 및 Schedule 3 (3001/3004) Compelling &amp; Compassionate Waiver 가능</strong>: 선택하신 연고 사유(<strong>${ties}</strong>)를 중심으로 호주 시민권/영주권 가족의 정서적·재정적·의료적 의존성 또는 호주 고용주의 중대한 사업 차질을 입증하는 법률 의견서(Legal Submission)를 통해 웨이버 승인이 가능합니다.`}
        </div>
      `;
    }

    out.innerHTML = html;
    updateCrisisPreview();
  }

  /* 4. Update 1-Click Crisis Brief Preview */
  function updateCrisisPreview() {
    const en = STATE.lang === "en";
    const previewEl = document.getElementById("crisis-diagnostic-preview");
    const emailBtn = document.getElementById("btn-crisis-email");
    if (!previewEl) return;

    const decType = document.getElementById("art-decision-type")?.selectedOptions?.[0]?.text || "호주 내 비자 거절";
    const noticeDate = document.getElementById("art-notice-date")?.value || "2026-10-15";
    const subStatus = document.getElementById("art-substantive-status")?.selectedOptions?.[0]?.text || "";
    const s48Target = document.getElementById("s48-target-visa")?.selectedOptions?.[0]?.text || "";
    const wvIssue = document.getElementById("wv-issue-type")?.selectedOptions?.[0]?.text || "";

    const text = en ? [
      "=== [PNC Legal Pty Ltd t/a Park & Co Lawyers | Urgent Visa Refusal·Cancellation·s 48·ART Brief] ===",
      `• Decision / Notice Type: ${decType}`,
      `• Notice Date: ${noticeDate} | Current Visa Status: ${subStatus}`,
      `• Target Visa (Section 48 Check): ${s48Target}`,
      `• Primary Waiver / Legal Issue: ${wvIssue}`,
      `• Urgent Legal Representation: Park & Co Lawyers (enquiry@parkcolawyers.com)`
    ].join("\n") : [
      "=== [PNC Legal Pty Ltd t/a Park & Co Lawyers | 호주 비자 거절·취소·Section 48·ART 긴급 진단서] ===",
      `• 처분/통지 유형: ${decType}`,
      `• 통지서 수신일: ${noticeDate} | 현재 비자 상태: ${subStatus}`,
      `• Section 48 희망 전환 비자: ${s48Target}`,
      `• 주요 법적 쟁점(Waiver): ${wvIssue}`,
      `• 긴급 법률 대리 문의: Park & Co Lawyers (enquiry@parkcolawyers.com)`
    ].join("\n");

    previewEl.textContent = text;
    if (emailBtn) {
      const subject = encodeURIComponent(`[Urgent Refusal/Cancellation/ART] Notice ${noticeDate} — ${decType.slice(0, 28)}`);
      const body = encodeURIComponent(text + "\n\n[IMPORTANT: Please attach the Department Decision Record / NOICC PDF to this email.]\n");
      emailBtn.href = `mailto:enquiry@parkcolawyers.com?subject=${subject}&body=${body}`;
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
          <a href="${s.url}" target="_blank" rel="noopener noreferrer"><strong>${en ? s.name_en : s.name_ko}</strong></a>
          <div style="font-size:11px;color:#5A5654;font-family:monospace;margin-top:2px;">SHA-256: <code>${s.sha256_prefix || "verified"}</code> ${s.bytes ? `(${Math.round(s.bytes / 1024).toLocaleString()} KB)` : ""}</div>
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
        <p style="font-size:13.5px;color:#47433E;margin-bottom:14px;">
          ${en
            ? "Live status of 14 Migration Act 1958, Migration Regulations 1994, Administrative Review Tribunal (ART), and Federal Court primary sources verified by <code>poller/visa_crisis_poller.py</code>."
            : "<code>poller/visa_crisis_poller.py</code>가 정기 점검하는 14개 호주 연방 이민법(Migration Act 1958 / Regulations 1994), 행정재심기구(ART), 연방법원(FCFCOA) 1차 출처 상태입니다."}
        </p>
        <div class="table-wrap">
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
          ? (en ? "🚨 Free Visa Emergency™ Pre-Lodgement Check →" : "🚨 비자응급실 무료 적격·소명 진단 →")
          : (en ? "⚖️ Free ART Case Review™ & Second Opinion →" : "⚖️ 무료 ART Case Review™ 승산 진단 →");
        return `
          <div class="card" style="padding:16px 18px;border-top:4px solid ${isEmg ? "#B23A2E" : "#1E3A8A"};display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:8px;">
                <span class="badge" style="background:${isEmg ? "#FEE2E2" : "#DBEAFE"};color:${isEmg ? "#991B1B" : "#1E3A8A"};font-size:11px;">${en ? ins.badge_en : ins.badge_ko}</span>
                <strong style="font-size:13px;color:${isEmg ? "#B23A2E" : "#1E3A8A"};">${ins.metric_highlight}</strong>
              </div>
              <h4 style="margin:0 0 6px;font-size:15px;font-weight:800;color:#1A1211;line-height:1.4;">${en ? ins.title_en : ins.title_ko}</h4>
              <p style="margin:0 0 12px;font-size:12.6px;color:#47433E;line-height:1.55;">${en ? ins.desc_en : ins.desc_ko}</p>
            </div>
            <a href="${ctaUrl}" target="_blank" rel="noopener" style="font-size:12.5px;font-weight:800;color:${isEmg ? "#B23A2E" : "#1E3A8A"};text-decoration:none;">
              ${ctaLabel}
            </a>
          </div>
        `;
      }).join("");
    }

    const outTbody = document.getElementById("art-subclass-outcomes-tbody");
    if (outTbody && Array.isArray(caseload.subclass_outcomes)) {
      outTbody.innerHTML = caseload.subclass_outcomes.map((r) => `
        <tr>
          <td>
            <strong style="color:#1A1211;">${en ? r.label_en : r.label_ko}</strong>
            <div style="font-size:11px;color:#5A5654;">PDF p.${r.pdf_page} · SHA: <code>${caseload.sha256_prefix || "824687f99fee4bb1"}</code></div>
          </td>
          <td style="font-size:12.5px;white-space:nowrap;">
            L: <strong>${Number(r.L).toLocaleString()}</strong> · F: <strong>${Number(r.F).toLocaleString()}</strong><br/>
            <span style="color:#7A1F2B;font-weight:700;">On-hand: ${Number(r.H).toLocaleString()}</span>
          </td>
          <td style="font-size:12px;">
            <span style="color:#065F46;font-weight:800;">S: ${r.S.toLocaleString()}</span> ·
            <span>A-D: ${r.A_minus_D.toLocaleString()}</span> ·
            <span style="color:#5A5654;">D: ${r.D.toLocaleString()} · W: ${r.W.toLocaleString()} · O: ${r.O.toLocaleString()}</span>
          </td>
          <td>
            <span class="badge" style="background:#FEF3C7;color:#92400E;font-size:12.5px;font-weight:800;">${r.change_all_pct.toFixed(2)}%</span>
            <div style="font-size:11px;color:#5A5654;margin-top:2px;">(${r.S.toLocaleString()} / ${r.F.toLocaleString()})</div>
          </td>
          <td>
            <span class="badge" style="background:#DCFCE7;color:#166534;font-size:13px;font-weight:800;">${r.restricted_change_pct.toFixed(2)}%</span>
            <div style="font-size:11px;color:#166534;margin-top:2px;">(${r.S.toLocaleString()} / ${r.restricted_denominator.toLocaleString()})</div>
          </td>
          <td style="font-size:12.3px;line-height:1.5;color:#2E2E2E;">${en ? r.insight_en : r.insight_ko}</td>
        </tr>
      `).join("");
    }

    const durTbody = document.getElementById("art-processing-times-tbody");
    if (durTbody && Array.isArray(proc.categories)) {
      durTbody.innerHTML = proc.categories.map((c, idx) => {
        const catLow = (c.category_en || "").toLowerCase();
        let stratKo = "28일 법정 기한 내 재심 접수 후 심리 대기 기간 동안 보완 증거·법리 의견서 제출";
        let stratEn = "Lodge within 28 days and build updated statutory & factual submissions during queue";
        if (catLow.includes("nomination") || catLow.includes("temporary work")) {
          stratKo = "고용주 재무제표(BAS/재무)·AMSR·조직도·실제 운영 증거를 1.5~2.8년 대기 중 완벽 재구축 (ART Case Review™)";
          stratEn = "Rebuild employer financials, AMSR & genuine position evidence during the 1.5–2.8 yr queue (ART Case Review™)";
        } else if (catLow.includes("partner")) {
          stratKo = "3년 2개월 대기 동안 동거·공동계좌·자녀·Form 888 및 Schedule 3 참작 증거 누적 제출 (85.16% 실질 인용)";
          stratEn = "Accumulate cohabitation, joint financials & Schedule 3 evidence across the 3 yr 2 m wait (85.16% restricted Set Aside)";
        } else if (catLow.includes("student cancellation")) {
          stratKo = "7영업일 기한 엄수 필수! 취소 확정 전 NOICC 단계라면 비자응급실 무료 진단 우선 권장";
          stratEn = "Strict 7 working-day deadline! If at NOICC stage before cancellation, use Free Visa Emergency™";
        } else if (catLow.includes("bridging")) {
          stratKo = "구금·브리징 사건 초고속 심리(중위 11일) — 접수 즉시 완비된 법률 의견서 제출 필수";
          stratEn = "Expedited bridging/detention review (11-day median) — full legal submission required at lodgement";
        }
        return `
          <tr>
            <td><code>${idx + 1}</code></td>
            <td><strong>${en ? c.category_en : c.category_ko}</strong></td>
            <td><span class="badge" style="background:#EFF6FF;color:#1E3A8A;font-weight:800;">${en ? c.p50_en : c.p50_ko}</span></td>
            <td><span class="badge badge-burgundy">${en ? c.p95_en : c.p95_ko}</span></td>
            <td style="font-size:12.3px;color:#2E2E2E;">${en ? stratEn : stratKo}</td>
          </tr>
        `;
      }).join("");
    }
  }

  function init() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (k && !I18N.ko[k]) I18N.ko[k] = el.textContent.trim();
    });

    renderCharts();
    updateArtDeadline();
    updateSection48Checker();
    updateWaiverChecker();
    renderArtIntelligence();
    renderPollerTable(STATE.sources);

    ["art-decision-type", "art-notice-date", "art-substantive-status"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateArtDeadline);
      document.getElementById(id)?.addEventListener("change", updateArtDeadline);
    });
    ["s48-history", "s48-target-visa"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateSection48Checker);
      document.getElementById(id)?.addEventListener("change", updateSection48Checker);
    });
    ["wv-issue-type", "wv-au-ties"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateWaiverChecker);
      document.getElementById(id)?.addEventListener("change", updateWaiverChecker);
    });

    document.getElementById("btn-crisis-copy")?.addEventListener("click", function () {
      const txt = document.getElementById("crisis-diagnostic-preview")?.textContent || "";
      navigator.clipboard?.writeText(txt);
      this.textContent = "✅ 복사 완료! (Copied)";
      setTimeout(() => { this.textContent = "📋 긴급 진단서 클립보드 복사"; }, 2200);
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

    if (window.location.protocol !== "file:") {
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
        STATE.lang = this.dataset.lang || "ko";
        document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b === this));
        const dict = I18N[STATE.lang] || I18N.ko;
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const k = el.getAttribute("data-i18n");
          if (dict[k]) el.textContent = dict[k];
        });
        renderCharts();
        updateArtDeadline();
        updateSection48Checker();
        updateWaiverChecker();
        renderArtIntelligence();
        if (STATE.sources.length) renderPollerTable(STATE.sources);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


/* === Park & Co Universal Ecosystem Strip & Static Leaf KO<->EN Enhancer === */
(function () {
  var LEAF_KO_TO_EN = {
    "← 박앤코 법률 인텔리전스 통합 허브 (All 12 Navigators)": "← Park & Co Legal Intelligence Hub (All 12 Navigators)",
    "파트너(820)·485": "Partner (820) & 485",
    "부모비자": "Parent Visas",
    "고용법(FWC)": "Employment Law (FWC)",
    "가족법·재산분할": "Family Law & Property",
    "위기·ART": "Visa Crisis & ART",
    "← 전체 네비게이터 허브": "← All Navigators Hub",
    "박창민 대표변호사 (Chang Min Park)": "Chang Min Park (Principal Solicitor)",
    "\"삶에 집중하세요, 법률은 저희가 맡겠습니다.\"": "\"You focus on life, we'll handle the law.\"",
    "법무법인 박앤코 (PNC Legal Pty Ltd t/a Park & Co Lawyers)": "PNC Legal Pty Ltd t/a Park & Co Lawyers",
    "법령 및 주정부 심사 근거": "Statutory & State Nomination Authority",
    "법령 및 심사 근거": "Statutory & Policy Authority",
    "법령 및 재판소 근거": "Statutory & Tribunal Authority",
    "Schedule 6D (189·190·491) 점수 계산기 ↓": "Schedule 6D (189·190·491) Points Calculator ↓",
    "8개 주정부(QLD~NT) 자격 매칭 & 백과사전": "8-State (QLD–NT) Eligibility Matcher & Compendium",
    "1. 8개 주정부 비교 & 점수 차트": "1. 8-State Comparison & Points Charts",
    "2. Schedule 6D 점수 계산기": "2. Schedule 6D Points Calculator",
    "3. 8개 주정부(QLD~NT) 정밀 매칭기": "3. 8-State (QLD–NT) Eligibility Matcher",
    "4. 491→191 영주권 & 총비용·진단서": "4. 491→191 PR & Total Cost / Brief",
    "변호사 1:1 기술이민·주정부 노미네이션 상담 신청 →": "Request 1:1 Skilled & State Nomination Consultation →",
    "65점": "65 pts",
    "190(+5점) · 491(+15점) 가점 포함": "Incl. 190 (+5 pts) & 491 (+15 pts)",
    "최대 20점": "Max 20 pts",
    "해외(15점)+호주(20점) 통합 상한": "Combined Overseas (15) + AUS (20) Cap",
    "FY26–27 주신청자 (189는 $6,135)": "FY26–27 Primary VAC (189 is $6,135)",
    "$0 하한": "$0 Floor",
    "최저소득 폐지 · ATO NOA 3년치 제출": "No min income · 3 yrs ATO NOAs required",
    "배우자 +$315 · 미성년 자녀 +$160": "Partner +$315 · Child +$160",
    "190·491 최소 거주·근무 개월 수 및 주정부 수수료 비교": "190/491 Minimum Residency/Work Months & State Fee Comparison",
    "그래프 1 · 8개 주/준주 일반 거주자 190 vs 491 필수 근무/거주 개월 수 & 신청비 비교": "Chart 1 · 8-State/Territory Onshore 190 vs 491 Minimum Work/Residency Months & Fees",
    "WA는 491 고용계약·경력 면제 및 신청비 $0이며, QLD는 2025–26부터 190 9개월 / 491 6개월로 강화되었어요.": "WA waives application fees ($0) and 491 job-offer rules; QLD requires 9 months (190) / 6 months (491).",
    "그래프 2 · Schedule 6D 항목별 최대 배점 및 해외+호주 경력 20점 통합 상한(Item 6D51)": "Chart 2 · Schedule 6D Maximum Points & Item 6D51 20-Point Combined Work Experience Cap",
    "나이(30점) + 영어(20점) + 경력합산(최대 20점) + 학력/STEM/호주학업/파트너 + 주정부 가점(+5/+15점).": "Age (30) + English (20) + Combined Work (max 20) + Education/STEM/Study/Partner + State (+5/+15).",
    "Schedule 6D 11대 평가 항목 입력": "Schedule 6D 11-Factor Assessment Inputs",
    "1. 초청 시점 만 나이 (Part 6D.1)": "1. Age at Time of Invitation (Part 6D.1)",
    "만 18세 ~ 24세 (25점)": "Aged 18–24 (25 pts)",
    "만 25세 ~ 32세 (30점 — 최고 배점)": "Aged 25–32 (30 pts — Maximum)",
    "만 33세 ~ 39세 (25점)": "Aged 33–39 (25 pts)",
    "만 40세 ~ 44세 (15점)": "Aged 40–44 (15 pts)",
    "만 45세 이상 (0점 — GSM 189/190/491 신청 불가)": "Aged 45+ (0 pts — Ineligible for GSM 189/190/491)",
    "2. 영어 능력 (Part 6D.2 — 유효기간 3년)": "2. English Language Ability (Part 6D.2 — 3-Year Validity)",
    "Competent English — IELTS 각 6.0 / PTE 50 (0점 · 최소 기본요건)": "Competent English — IELTS 6.0 / PTE 50 (0 pts · Minimum Threshold)",
    "Proficient English — IELTS 각 7.0 / PTE 65 (10점)": "Proficient English — IELTS 7.0 / PTE 65 (10 pts)",
    "Superior English — IELTS 각 8.0 / PTE 79 (20점)": "Superior English — IELTS 8.0 / PTE 79 (20 pts)",
    "3. 해외 숙련 경력 (Part 6D.3 — 최근 10년 내 주 20h+)": "3. Overseas Skilled Employment (Part 6D.3 — 20h+/wk in last 10 yrs)",
    "3년 미만 (0점)": "Under 3 years (0 pts)",
    "3년 이상 ~ 5년 미만 (5점)": "3 to <5 years (5 pts)",
    "5년 이상 ~ 8년 미만 (10점)": "5 to <8 years (10 pts)",
    "8년 이상 (15점)": "8+ years (15 pts)",
    "4. 호주 내 숙련 경력 (Part 6D.4 — 최근 10년 내 주 20h+)": "4. Australian Skilled Employment (Part 6D.4 — 20h+/wk in last 10 yrs)",
    "1년 미만 (0점)": "Under 1 year (0 pts)",
    "1년 이상 ~ 3년 미만 (5점)": "1 to <3 years (5 pts)",
    "8년 이상 (20점)": "8+ years (20 pts)",
    "5. 최종 학력/자격 (Part 6D.7)": "5. Educational Qualifications (Part 6D.7)",
    "박사 학위 (Doctorate / PhD — 20점)": "Doctorate / PhD (20 pts)",
    "학사(Bachelor) 또는 석사(Masters) 학위 (15점)": "Bachelor or Masters Degree (15 pts)",
    "호주 Diploma / Trade 학위 또는 기술심사기관 인정 자격 (10점)": "Australian Diploma / Trade Qualification or Recognised Award (10 pts)",
    "인정 학력 없음 (0점)": "No Recognised Qualification (0 pts)",
    "6. 배우자/파트너 자격 또는 미혼 (Part 6D.11)": "6. Partner Skills or Single Status (Part 6D.11)",
    "미혼(Single) 또는 파트너가 호주 시민권자/영주권자 (10점 — 6D112)": "Single OR Partner is Australian Citizen/PR (10 pts — 6D112)",
    "파트너가 만 45세 미만 + Competent 영어 + 동일 리스트 기술심사 보유 (10점 — 6D111)": "Partner <45 + Competent English + Skilled Assessment (10 pts — 6D111)",
    "파트너가 Competent 영어(IELTS 6.0)만 보유 (5점 — 6D113)": "Partner has Competent English (IELTS 6.0) only (5 pts — 6D113)",
    "파트너가 시민권/영주권자가 아니며 영어/기술심사 미보유 (0점)": "Partner is non-citizen/PR without English or Skills Assessment (0 pts)",
    "7. 추가 가점 항목 (해당 항목 모두 체크 — Part 6D.6 / 6D.7A / 6D.8 / 6D.9 / 6D.10)": "7. Bonus Point Factors (Tick all that apply — Parts 6D.6–6D.10)",
    "Subclass 189 · 190 · 491 법정 점수 산출 결과": "Subclass 189 · 190 · 491 Statutory Points Breakdown",
    "8개 주/준주 중 현재 바로 노미네이션 신청(또는 ROI/Matrix 접수)이 가능한 주와 부족한 개월 수를 즉시 판정": "Instantly identify eligible States/Territories and any remaining residency/work months required",
    "내 거주지 · 근무 개월 · 주당 시간 · 졸업생 프로필 입력": "Your Current State, Work Months, Weekly Hours & Graduate Profile",
    "1. 현재 거주 중인 주/준주 (또는 해외)": "1. Current State/Territory of Residence (or Offshore)",
    "Queensland (QLD — 브리즈번 / 골드코스트·지방 QLD)": "Queensland (QLD — Brisbane / Gold Coast & Regional QLD)",
    "New South Wales (NSW — 시드니 / 지방 NSW)": "New South Wales (NSW — Sydney / Regional NSW)",
    "Victoria (VIC — 멜버른 / 지방 VIC)": "Victoria (VIC — Melbourne / Regional VIC)",
    "Western Australia (WA — 퍼스 및 서호주 전역)": "Western Australia (WA — Perth & Statewide WA)",
    "South Australia (SA — 애들레이드 및 외곽 SA)": "South Australia (SA — Adelaide & Regional SA)",
    "Tasmania (TAS — 호바트·론세스턴 등 전역)": "Tasmania (TAS — Hobart, Launceston & Statewide)",
    "Australian Capital Territory (ACT — 캔버라)": "Australian Capital Territory (ACT — Canberra)",
    "Northern Territory (NT — 다윈·앨리스스프링스 등)": "Northern Territory (NT — Darwin & Regional NT)",
    "해외 거주 중 (Offshore — 한국 등 호주 외 거주)": "Residing Offshore (Outside Australia)",
    "2. 직군 산업 분야 (Priority Sector)": "2. Occupation Industry Sector",
    "일반 기술·전문직·기능직 (General CSOL/State List)": "General Skilled / Professional / Trade Occupation",
    "건축·건설·트레이드 (Building & Construction — QLD·WA·SA 최우선 우대)": "Building & Construction Trades (Priority in QLD, WA, SA)",
    "보건·의료·간호·교육·사회복지 (Health, Nursing, Teaching, Social Work)": "Health, Nursing, Teaching & Social Work",
    "3. 현 거주 주(State) 연속 거주 개월 수 (개월)": "3. Continuous Residency in Current State (Months)",
    "4. 현 거주 주 내 숙련 직무 연속 근무 개월 수 (개월)": "4. Continuous Skilled Employment in Current State (Months)",
    "5. 주당 평균 유급 근무시간 (시간/주)": "5. Average Paid Working Hours per Week",
    "주 35~38시간 이상 (Full-time — 전 주정부 190/491 기준 충족)": "35–38+ hrs/wk (Full-time — Meets all State 190/491 thresholds)",
    "주 30시간 이상 (QLD·SA·ACT 190 기준 충족)": "30+ hrs/wk (Meets QLD, SA, ACT 190 thresholds)",
    "주 20시간 이상 (NSW·TAS·SA 491 기준 충족)": "20+ hrs/wk (Meets NSW, TAS, SA 491 thresholds)",
    "주 15시간 이상 (ACT 491 13/15주 기준 충족)": "15+ hrs/wk (Meets ACT 491 threshold)",
    "현재 미취업 (졸업생 무경력 스트림 또는 해외 경력 활용)": "Currently Unemployed (Graduate stream or offshore experience)",
    "6. 현 거주 주(State) 내 대학/VET 졸업 여부": "6. Graduate of a University/VET Institution in Current State?",
    "아니오 (일반 숙련 근로자 스트림)": "No (Standard Skilled Worker Stream)",
    "예 — 해당 주에서 학사/석사/학위(2년+) 졸업 (Regional NSW·WA·TAS·SA·NT 졸업생 특례)": "Yes — Bachelor/Masters (2+ yrs) in this State (Graduate concessions)",
    "예 — 해당 주에서 박사(PhD) 학위 취득 (ACT 무료·자동초청 / QLD·WA·SA 우대)": "Yes — Doctorate (PhD) completed in this State (Priority stream)",
    "예 — 해당 주에서 2년 이상 VET (Cert III/IV/Diploma) 졸업 (WA·TAS·SA 졸업생)": "Yes — 2+ yr VET (Cert III/IV/Diploma) in this State",
    "내 프로필 기준 주정부 노미네이션(190 · 491) 적격 판정": "State Nomination (190 · 491) Eligibility Assessment",
    "8개 주/준주별 190·491 세부 스트림 · 거주/근무/고용계약 · 수수료 · 숨은 함정 총정리": "8-State/Territory 190 & 491 Streams, Residency/Work Rules, Fees & Key Traps",
    "QLD (퀸즐랜드)": "QLD (Queensland)",
    "NSW (뉴사우스웨일스)": "NSW (New South Wales)",
    "VIC (빅토리아)": "VIC (Victoria)",
    "WA (서호주)": "WA (Western Australia)",
    "SA (남호주)": "SA (South Australia)",
    "TAS (태즈메이니아)": "TAS (Tasmania)",
    "ACT (캔버라)": "ACT (Canberra)",
    "NT (노던준주)": "NT (Northern Territory)",
    "최저소득 폐지($0 기준 · NOA 3년치 제출)": "No Minimum Income ($0 floor · 3 ATO NOAs required)",
    "주정부 노미네이션 수수료 + FY2026–27 연방 비자비(VAC) 총합": "State Nomination Fee + FY2026–27 Federal VAC Total",
    "비자 종류 · 노미네이션 주 · 가족 수 · [491/494 전용] 191 전환 요건": "Visa Subclass, Nominating State, Family Size & [491/494 Only] 191 PR Check",
    "1. 신청 비자 서브클래스": "1. Target Visa Subclass",
    "Subclass 491 — 지방 주정부/가족 지명 임시 5년 (3년 후 191 영주권 전환 대상 · VAC $6,140)": "Subclass 491 — Regional Provisional 5-Yr (Eligible for 191 PR after 3 yrs · VAC $6,140)",
    "Subclass 191 — [491/494 소지자 전용] 3년 후 영주권 전환 신청 (VAC $630 · 주정부 비용 $0)": "Subclass 191 — [491/494 Holders Only] 3-Yr PR Transition (VAC $630 · State Fee $0)",
    "Subclass 190 — 주정부 지명 영주비자 (처음부터 영주권 Direct PR · 191 전환 대상 아님 · VAC $6,140)": "Subclass 190 — State Nominated Direct PR (Direct PR · Not a 191 pathway · VAC $6,140)",
    "Subclass 189 — 독립기술 영주비자 (처음부터 영주권 Direct PR · 주정부/191 대상 아님 · VAC $6,135)": "Subclass 189 — Skilled Independent Direct PR (Direct PR · Not a 191 pathway · VAC $6,135)",
    "2. 노미네이션 신청 주/준주 (190·491만 해당)": "2. Nominating State/Territory (190 & 491 Only)",
    "QLD — $630.30 (Onshore GST 포함)": "QLD — $630.30 (incl. Onshore GST)",
    "NSW — $346.50 (Onshore GST 포함)": "NSW — $346.50 (incl. Onshore GST)",
    "WA — $0 (서호주 주정부 신청비 전면 무료!)": "WA — $0 (Western Australia $0 Nomination Fee)",
    "3. 동반 성인 가족 수 (만 18세 이상 배우자 등)": "3. Accompanying Adult Applicants (18+ Partner/Dependants)",
    "0명 (단독 신청)": "0 (Single Applicant)",
    "1명 (+$3,070 / 191은 +$315)": "1 Adult (+$3,070 / 191 is +$315)",
    "1명 (배우자 동반)": "1 Adult (Accompanying Partner)",
    "2명": "2",
    "3명": "3",
    "0명": "0",
    "1명": "1",
    "4. 동반 미성년 자녀 수 (만 18세 미만)": "4. Accompanying Minor Children (Under 18)",
    "1명 (+$1,535 / 189는 +$1,540 / 191은 +$160)": "1 Child (+$1,535 / 189 is +$1,540 / 191 is +$160)",
    "5. [491/494 소지자 전용] 보유 기간 & ATO NOA 수": "5. [491/494 Holders Only] Years Held & ATO NOAs",
    "491/494 보유 3년 이상 + ATO Notice of Assessment 3개 연도 확보 완료": "Held 491/494 for 3+ yrs + 3 income years of ATO NOAs ready",
    "아직 3년 미만 보유 중 (5년 비자 기간 중 총 3개 과세연도 NOA 확보 필요)": "Held <3 yrs (Must complete 3 years and 3 ATO NOAs within 5-yr validity)",
    "6. [491/494 소지자 전용] 지방 거주·근무 조건(8579) 준수": "6. [491/494 Holders Only] Condition 8579 Regional Compliance",
    "준수 완료 — 지정 지방(Designated Regional Area) 내 거주·근무·학업 유지": "Compliant — Resided, worked & studied exclusively in Designated Regional Areas",
    "주의 필요 — 대도시(시드니·멜버른·브리즈번) 장기 체류 또는 주소 변경 미신고(8578)": "Caution — Extended metro stay (Sydney/Melbourne/Brisbane) or unnotified address (8578)",
    "FY2026–27 총비용 & Subclass 191 영주권 전환 판정": "FY2026–27 Total Statutory Cost & Subclass 191 PR Assessment",
    "내 기술이민 점수(Schedule 6D) & 주정부 노미네이션 진단서 복사 · 인쇄(PDF) & 상담 메일 발송": "Copy, Print (PDF) & Email Your GSM Points & State Nomination Brief",
    "위 모듈에서 계산된 189·190·491 점수, 거주 주 노미네이션 적격 판정, 총비용 요약문을 즉시 복사하거나 상담 메일에 첨부할 수 있어요.": "Copy or email your calculated 189/190/491 points, state nomination eligibility, and fee breakdown directly to Park & Co.",
    "📋 진단 요약 클립보드 복사": "📋 Copy Diagnostic Summary",
    "📋 긴급 진단서 클립보드 복사": "📋 Copy Urgent Diagnostic Brief",
    "🖨️ PDF / 브리프 인쇄": "🖨️ Print / Save PDF",
    "✉️ 진단 결과 담아 박앤코에 이메일 문의 →": "✉️ Email Diagnostic Brief to Park & Co →",
    "🚨 진단 결과 담아 박앤코 긴급 자문 요청 →": "🚨 Email Urgent Brief to Park & Co →",
    "구분": "Category",
    "공식 법령 · 주정부 이민 포털 및 링크": "Official Legislation / State Portal & Link",
    "공식 문서명 및 링크": "Official Instrument / Source & Link",
    "공식 법령 · 재판소 안내 및 링크": "Official Legislation / Tribunal Guide & Link",
    "관할 기관": "Authority",
    "추적 지표": "Monitored Metrics",
    "검증 주기": "Schedule",
    "상태": "Status",
    "법률 면책공고 (Legal Disclaimer) · 주정부 노미네이션 할당량(Quota) 안내": "Legal Disclaimer & State Nomination Quota Notice",
    "법률 면책공고 (Legal Disclaimer) · Migration Act s 245AR 비용 전가 금지 안내": "Legal Disclaimer & Migration Act s 245AR Prohibition Notice",
    "법률 면책공고 (Legal Disclaimer) · 송달 간주 규정(s 494B / s 494C) 안내": "Legal Disclaimer & Deemed Notification Rules (s 494B / s 494C)",
    "연방 Schedule 6D & 8개 주정부 포털 실시간 모니터 (12/12 Live Verified)": "Federal Schedule 6D & 8-State Portal Live Monitor (12/12 Verified)",
    "공식 1차 출처 실시간 모니터 (12/12 Live Verified)": "Official Primary Source Live Monitor (12/12 Verified)",
    "공식 1차 법령·ART 출처 실시간 모니터 (12/12 Live Verified)": "Official Statutory & ART Primary Source Monitor (12/12 Verified)",
    "비자 만료 시까지 (Until Visa Expiry)": "Until Visa Expiry (LIN 22/012 & LIN 22/013)",
    "28 역일": "28 Calendar Days",
    "일반 비자·노미네이션 거절 (reg 4.10)": "Standard Onshore Visa/Nomination Refusal (reg 4.10)",
    "7 영업일": "7 Working Days",
    "호주 내 일반 비자 취소 · 구금 재심": "Onshore s 116 Cancellation / Detention Review",
    "9일 / 28일": "9 Days / 28 Days",
    "ART 재심 9일(s 500(6B)) · 철회 28일": "ART s 500(6B) 9d · Revocation Request 28d",
    "+ 파트너(820) · 의료(602) · 보호(866)": "+ Partner (820) · Medical (602) · Protection (866)",
    "3년 / 10년": "3 Yrs / 10 Yrs",
    "허위서류 3년(Waiver유) · 신원 10년(무)": "Bogus Doc 3yr (Waivable) · Identity 10yr (No Waiver)",
    "35 역일": "35 Calendar Days",
    "ART 기각 후 관할권 오류 사법심사(s 477)": "FCFCOA Judicial Review after ART Dismissal (s 477)",
    "2. ART 재심 · s 501 데드라인 계산기": "2. ART Review & s 501 Deadline Calculator",
    "3. Section 48 Bar 예외 비자 진단": "3. Section 48 Bar Exempt Visa Checker",
    "긴급 비자 거절·취소 1:1 변호사 자문 요청 →": "Request Urgent 1:1 Refusal/Cancellation Legal Advice →"
  };

  function applyUniversalLeafTranslation(lang) {
    var isEn = lang === "en";
    document.querySelectorAll(".parkco-svc-link").forEach(function (lnk) {
      var h = isEn ? lnk.getAttribute("data-en-href") : lnk.getAttribute("data-ko-href");
      if (h) lnk.setAttribute("href", h);
    });
    var walk = function (el) {
      if (!el || el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.tagName === "PRE") return;
      var hasElementChildren = false;
      for (var i = 0; i < el.children.length; i++) {
        if (el.children[i].tagName !== "BR") {
          hasElementChildren = true;
          break;
        }
      }
      if (!hasElementChildren) {
        var raw = (el.textContent || "").trim().replace(/\s+/g, " ");
        if (!el.getAttribute("data-ko-leaf") && /[가-힣]/.test(raw) && raw.indexOf("한국어") === -1) {
          el.setAttribute("data-ko-leaf", el.textContent);
        }
        var koOrig = el.getAttribute("data-ko-leaf");
        if (koOrig) {
          var normKo = koOrig.trim().replace(/\s+/g, " ");
          if (isEn) {
            if (LEAF_KO_TO_EN[normKo]) {
              el.textContent = LEAF_KO_TO_EN[normKo];
            } else if (normKo.indexOf("(") !== -1 && /[A-Za-z]/.test(normKo)) {
              /* If option has bilingual text like '1월 (Jan)' or '만 67세 미만 (Under 67)', extract English or keep clean */
            }
          } else {
            el.textContent = koOrig;
          }
        }
      }
      for (var j = 0; j < el.children.length; j++) {
        walk(el.children[j]);
      }
    };
    walk(document.body);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btns = document.querySelectorAll("#lang-en, #lang-ko, #lang-toggle-en, #lang-toggle-ko, .lang-btn");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var isEn = (b.id && b.id.indexOf("en") !== -1) || b.getAttribute("data-lang") === "en";
        document.documentElement.lang = isEn ? "en" : "ko";
        setTimeout(function () { applyUniversalLeafTranslation(isEn ? "en" : "ko"); }, 20);
      });
    });

    var params = new URLSearchParams(window.location.search);
    if (params.get("lang") === "en") {
      var enBtn = document.getElementById("lang-en") || document.getElementById("lang-toggle-en") || document.querySelector('[data-lang="en"]');
      if (enBtn) {
        enBtn.click();
        setTimeout(function () { applyUniversalLeafTranslation("en"); }, 40);
      }
    }
  });
})();
