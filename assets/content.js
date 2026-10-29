/* =========================================================================
   Content data for the interactive anticoagulant-reversal-in-GI-haemorrhage
   protocol. Every clinical claim below is paraphrased from the cited
   source, not copied from it. The algorithm itself (every box, decision
   diamond, drug name and dose) is reproduced unchanged from Figure 1 of the
   source manuscript.

   Source: Karcıoğlu Ö, et al. "Management of Anticoagulant-Associated
   Gastrointestinal Haemorrhage: A Narrative Review" (manuscript in
   preparation). Figure 1 / Section 8 "Decision-Making Algorithm for
   Anticoagulant Reversal in Gastrointestinal Haemorrhage" is reproduced,
   unchanged, as this page's flowchart.

   Every reference below (bar one) comes from the manuscript's own 64-item
   list and was independently re-verified against its primary source rather
   than taken on trust — one manuscript DOI (originally ref. 59) proved to
   be wrong and is corrected here, with the error noted in that entry's
   text. One further reference (id 31, Yee & Kaide) was independently
   located: the manuscript's Table 2 gives a protamine dosing regimen for
   UFH/LMWH without citing a source for it.
   ========================================================================= */

const REFERENCES = [
  {
    id: 1,
    kind: "Derivation study — Glasgow-Blatchford Score",
    text: "Blatchford O, Murray WR, Blatchford M. A risk score to predict need for treatment for upper-gastrointestinal haemorrhage. Lancet. 2000;356(9238):1318–1321.",
    url: "https://doi.org/10.1016/S0140-6736(00)02816-6"
  },
  {
    id: 2,
    kind: "Clinical practice guideline — upper GI bleeding",
    text: "Laine L, Barkun AN, Saltzman JR, et al. ACG clinical guideline: upper gastrointestinal and ulcer bleeding. Am J Gastroenterol. 2021;116(5):899–917.",
    url: "https://doi.org/10.14309/ajg.0000000000001245"
  },
  {
    id: 3,
    kind: "Derivation study — AIMS65 score",
    text: "Saltzman JR, Tabak YP, Hyett BH, et al. A simple risk score accurately predicts in-hospital mortality, length of stay, and cost in acute upper GI bleeding. Gastrointest Endosc. 2011;74(6):1215–1224.",
    url: "https://doi.org/10.1016/j.gie.2011.06.024"
  },
  {
    id: 4,
    kind: "Derivation study — Oakland score",
    text: "Oakland K, Jairath V, Uberoi R, et al. Derivation and validation of a novel risk score for safe discharge after acute lower gastrointestinal bleeding: a modelling study. Lancet Gastroenterol Hepatol. 2017;2(9):635–643.",
    url: "https://doi.org/10.1016/S2468-1253(17)30150-4"
  },
  {
    id: 5,
    kind: "Society guidance — ISTH SSC, DOAC reversal",
    text: "Levy JH, Shaw JR, Castellucci LA, et al. Reversal of direct oral anticoagulants: guidance from the SSC of the ISTH. J Thromb Haemost. 2024;22(10):2889–2899.",
    url: "https://doi.org/10.1016/j.jtha.2024.07.009"
  },
  {
    id: 6,
    kind: "Clinical practice guideline — ACG/CAG, anticoagulant management in GI bleeding",
    text: "Abraham NS, Barkun AN, Sauer BG, et al. American College of Gastroenterology-Canadian Association of Gastroenterology clinical practice guideline: management of anticoagulants and antiplatelets during acute gastrointestinal bleeding and the periendoscopic period. Am J Gastroenterol. 2022;117(4):542–558.",
    url: "https://doi.org/10.14309/ajg.0000000000001627"
  },
  {
    id: 7,
    kind: "Society guideline — ESGE, upper GI bleeding",
    text: "Gralnek IM, Stanley AJ, Morris AJ, et al. Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage (NVUGIH): European Society of Gastrointestinal Endoscopy (ESGE) Guideline – Update 2021. Endoscopy. 2021;53(3):300–332.",
    url: "https://doi.org/10.1055/a-1369-5274"
  },
  {
    id: 8,
    kind: "Clinical practice guideline — ACG, lower GI bleeding",
    text: "Sengupta N, Feuerstein JD, Jairath V, et al. Management of patients with acute lower gastrointestinal bleeding: an updated ACG guideline. Am J Gastroenterol. 2023;118(2):208–231.",
    url: "https://doi.org/10.14309/ajg.0000000000002130"
  },
  {
    id: 9,
    kind: "Society guideline — ESGE, lower GI bleeding",
    text: "Triantafyllou K, Gkolfakis P, Gralnek IM, et al. Diagnosis and management of acute lower gastrointestinal bleeding: European Society of Gastrointestinal Endoscopy (ESGE) Guideline. Endoscopy. 2021;53(8):850–868.",
    url: "https://doi.org/10.1055/a-1496-8969"
  },
  {
    id: 10,
    kind: "Expert consensus pathway — ACC, bleeding on oral anticoagulants",
    text: "Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594–622.",
    url: "https://doi.org/10.1016/j.jacc.2020.04.053"
  },
  {
    id: 11,
    kind: "Review — prothrombin complex concentrates",
    text: "Grottke O, Levy JH. Prothrombin complex concentrates in trauma and perioperative bleeding. Anesthesiology. 2015;122(4):923–931.",
    url: "https://doi.org/10.1097/ALN.0000000000000608"
  },
  {
    id: 12,
    kind: "Review — the authors' own prior work on PCC",
    text: "Karcioglu O, Yilmaz E, Yeniocak S, Topacoglu H. Prothrombin complex concentrates in post-traumatic hemorrhage: a review. Emerg Med Open J. 2019;5(1):36–43.",
    url: "https://doi.org/10.17140/EMOJ-5-152"
  },
  {
    id: 13,
    kind: "Cohort study — FFP and organ-failure risk",
    text: "Watson GA, Sperry JL, Rosengart MR, et al. Fresh frozen plasma is independently associated with a higher risk of multiple organ failure and acute respiratory distress syndrome. J Trauma. 2009;67(2):221–227.",
    url: "https://doi.org/10.1097/TA.0b013e3181ad5957"
  },
  {
    id: 14,
    kind: "Systematic review and meta-analysis — 4F-PCC vs FFP",
    text: "Brekelmans MPA, van Ginkel K, Daams JG, et al. Benefits and harms of 4-factor prothrombin complex concentrate for reversal of vitamin K antagonist associated bleeding: a systematic review and meta-analysis. J Thromb Thrombolysis. 2017;44(1):118–129.",
    url: "https://doi.org/10.1007/s11239-017-1506-0"
  },
  {
    id: 15,
    kind: "Randomized trial — 4F-PCC vs plasma",
    text: "Sarode R, Milling TJ Jr, Refaai MA, et al. Efficacy and safety of a 4-factor prothrombin complex concentrate in patients on vitamin K antagonists presenting with major bleeding: a randomized, plasma-controlled, phase IIIb study. Circulation. 2013;128(11):1234–1243.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.113.002283"
  },
  {
    id: 16,
    kind: "Prospective cohort — PCC vs FFP, GI bleeding specific",
    text: "Karaca MA, Erbil B, Ozmen MM. Use and effectiveness of prothrombin complex concentrates vs fresh frozen plasma in gastrointestinal hemorrhage due to warfarin usage in the ED. Am J Emerg Med. 2014;32(6):660–664.",
    url: "https://doi.org/10.1016/j.ajem.2014.02.016"
  },
  {
    id: 17,
    kind: "Retrospective cohort — PCC vs plasma, GI bleeding specific",
    text: "Spector H, McRae HL, Love T, et al. Reduced time to procedure for gastrointestinal bleeding after warfarin reversal with four-factor complex concentrate as compared to plasma. J Clin Med Res. 2023;15(1):51–57.",
    url: "https://doi.org/10.14740/jocmr4856"
  },
  {
    id: 18,
    kind: "Systematic review and meta-analysis — fixed vs weight/INR-based PCC dosing",
    text: "Alwakeal A, Maas MB, Naidech AM, et al. Fixed- versus variable-dose prothrombin complex concentrate for the emergent reversal of vitamin K antagonists: a systematic review and meta-analysis. Crit Care Med. 2024;52(5):811–820.",
    url: "https://doi.org/10.1097/CCM.0000000000006212"
  },
  {
    id: 19,
    kind: "Clinical guideline — warfarin anticoagulation",
    text: "Keeling D, Baglin T, Tait C, et al. Guidelines on oral anticoagulation with warfarin – fourth edition. Br J Haematol. 2011;154(3):311–324.",
    url: "https://doi.org/10.1111/j.1365-2141.2011.08753.x"
  },
  {
    id: 20,
    kind: "Cohort study — 4F-PCC with/without vitamin K",
    text: "Temür ŞA, Ayar MS, Kurnaz Y, Çalışkan F. Effectiveness of 4-factor prothrombin complex concentrate with and without vitamin K in managing warfarin-associated major bleeding. Eurasian J Med. 2025;57(1):1–4.",
    url: "https://doi.org/10.5152/eurasianjmed.2025.25710"
  },
  {
    id: 21,
    kind: "Propensity-matched cohort — thromboembolism after 4F-PCC vs plasma",
    text: "Go AS, Leong TK, Sung SH, et al. Thromboembolism after treatment with 4-factor prothrombin complex concentrate or plasma for warfarin-related bleeding. J Thromb Thrombolysis. 2022;54(3):470–479.",
    url: "https://doi.org/10.1007/s11239-022-02695-5"
  },
  {
    id: 22,
    kind: "Review — idarucizumab mechanism",
    text: "Eikelboom JW, Quinlan DJ, van Ryn J, Weitz JI. Idarucizumab: the antidote for reversal of dabigatran. Circulation. 2015;132(25):2412–2422.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.115.019628"
  },
  {
    id: 23,
    kind: "Cohort study — RE-VERSE AD, idarucizumab full cohort",
    text: "Pollack CV Jr, Reilly PA, van Ryn J, et al. Idarucizumab for dabigatran reversal – full cohort analysis. N Engl J Med. 2017;377(5):431–441.",
    url: "https://doi.org/10.1056/NEJMoa1707278"
  },
  {
    id: 24,
    kind: "Systematic review — idarucizumab real-world outcomes",
    text: "Frol S, Sagris D, Šabovič M, et al. Dabigatran reversal with idarucizumab and in-hospital mortality in intracranial hemorrhage: a systematic review of real-life data from case reports and case series. Front Neurol. 2021;12:727403.",
    url: "https://doi.org/10.3389/fneur.2021.727403"
  },
  {
    id: 25,
    kind: "Mechanistic study — andexanet alfa off-target effect",
    text: "Hoornstra IMS, Zhao J, Middelveld H, et al. Procoagulant off-target effect of the direct oral anticoagulant reversal agent andexanet alfa. Blood Vessel Thromb Hemost. 2025;2(4):100100.",
    url: "https://doi.org/10.1016/j.bvth.2025.100100"
  },
  {
    id: 26,
    kind: "Cohort study — ANNEXA-4 full study report",
    text: "Connolly SJ, Crowther M, Eikelboom JW, et al. Full study report of andexanet alfa for bleeding associated with factor Xa inhibitors. N Engl J Med. 2019;380(14):1326–1335.",
    url: "https://doi.org/10.1056/NEJMoa1814051"
  },
  {
    id: 27,
    kind: "Retrospective cohort — 4F-PCC in factor Xa inhibitor-associated GI bleeding",
    text: "Shamiea M, Kashua A, Natour AE, et al. Prothrombin complex concentrate for reversal of factor Xa inhibitor-associated acute major gastrointestinal bleeding. Am J Med. 2026;139(5):646–652.",
    url: "https://doi.org/10.1016/j.amjmed.2026.01.010"
  },
  {
    id: 28,
    kind: "Retrospective cohort — 4F-PCC in factor Xa inhibitor-associated bleeding",
    text: "Shaw JR, Almujalli AA, Xu Y, et al. Prothrombin complex concentrate for direct factor Xa inhibitor-associated bleeding or before urgent surgery. Thromb Res. 2024;243:109172.",
    url: "https://doi.org/10.1016/j.thromres.2024.109172"
  },
  {
    id: 29,
    kind: "Multicentre audit — DOAC reversal agents, UK-wide",
    text: "HaemSTAR Collaborators. A UK-wide analysis of 2265 patients receiving a reversal agent for direct oral anticoagulant-associated bleeding. J Thromb Haemost. 2026;24(3):900–912.",
    url: "https://doi.org/10.1016/j.jtha.2025.11.003"
  },
  {
    id: 30,
    kind: "Review — DOAC reversal for critical bleeding",
    text: "Goldin M, Tsaftaridis N, Jnani J, Spyropoulos AC. Reversal of direct oral anticoagulants (DOACs) for critical bleeding or urgent procedures. J Clin Med. 2025;14(3):1013.",
    url: "https://doi.org/10.3390/jcm14031013"
  },
  {
    id: 31,
    kind: "Review — independently located; the manuscript's Table 2 cites no source for protamine dosing",
    text: "Yee J, Kaide CG. Emergency Reversal of Anticoagulation. West J Emerg Med. 2019;20(5):770–783.",
    url: "https://doi.org/10.5811/westjem.2018.5.38235"
  },
  {
    id: 32,
    kind: "Review — laboratory measurement of DOAC activity",
    text: "Cuker A, Siegal DM, Crowther MA, Garcia DA. Laboratory measurement of the anticoagulant activity of the non-vitamin K oral anticoagulants. J Am Coll Cardiol. 2014;64(11):1128–1139.",
    url: "https://doi.org/10.1016/j.jacc.2014.05.065"
  },
  {
    id: 33,
    kind: "Society recommendations — ICSH, laboratory measurement of DOACs",
    text: "Gosselin RC, Adcock DM, Bates SM, et al. International Council for Standardization in Haematology (ICSH) recommendations for laboratory measurement of direct oral anticoagulants. Thromb Haemost. 2018;118(3):437–450.",
    url: "https://doi.org/10.1055/s-0038-1627480"
  },
  {
    id: 34,
    kind: "Narrative review — framework for resuming anticoagulation after GI bleeding",
    text: "Xu Y, Siegal DM. Anticoagulant-associated gastrointestinal bleeding: framework for decisions about whether, when and how to resume anticoagulants. J Thromb Haemost. 2021;19(10):2383–2393.",
    url: "https://doi.org/10.1111/jth.15466"
  },
  {
    id: 35,
    kind: "Systematic review and meta-analysis — resuming anticoagulation after GI bleeding (DOI corrected — the manuscript prints 10.1160/TH15-02-0148, which does not resolve to this article)",
    text: "Chai-Adisaksopha C, Hillis C, Monreal M, et al. Thromboembolic events, recurrent bleeding and mortality after resuming anticoagulant following gastrointestinal bleeding: a meta-analysis. Thromb Haemost. 2015;114(4):819–825.",
    url: "https://doi.org/10.1160/TH15-01-0063"
  },
  {
    id: 36,
    kind: "Joint society guideline — BSG/ESGE, endoscopy on anticoagulant therapy",
    text: "Veitch AM, Radaelli F, Alikhan R, et al. Endoscopy in patients on antiplatelet or anticoagulant therapy: British Society of Gastroenterology (BSG) and European Society of Gastrointestinal Endoscopy (ESGE) guideline update. Gut. 2021;70(9):1611–1628.",
    url: "https://doi.org/10.1136/gutjnl-2021-325184"
  }
];

const NODES = [
  {
    id: "step1",
    type: "terminal",
    label: "STEP 1 — Immediate assessment (all patients)",
    sub: "• Interrupt the anticoagulant; haemodynamic assessment and resuscitation (IV access; crystalloid / blood products as indicated)\n• Identify agent, dose and time of last intake; baseline tests (FBC, coagulation, renal function, crossmatch)\n• Risk stratification: GBS / AIMS65 (upper GIB); Oakland score (lower GIB)\n• GI consultation; prepare for endoscopy",
    meaning:
      "This step applies to every patient with suspected anticoagulant-associated GI bleeding, before any branching on severity. Four things happen together rather than in sequence: the anticoagulant is interrupted; resuscitation begins with IV access and crystalloid or blood products as indicated; the specific agent, its dose and the time of the last intake are identified alongside baseline bloods (full blood count, coagulation, renal function, crossmatch); and bleeding risk is stratified with a validated score — the Glasgow-Blatchford Score (GBS) or AIMS65 for suspected upper GI bleeding (UGIB), the Oakland score for lower GI bleeding (LGIB) — while GI is consulted and endoscopy prepared for.",
    rationale:
      "A risk score takes minutes and decides much of what follows: whether reversal is even likely to be needed, and how urgently endoscopy should happen. The GBS identifies patients who need hospital-based intervention versus those safe for early discharge; AIMS65 and the Oakland score add prognostic and discharge-safety information respectively. This matters because the 2022 ACG/CAG guideline frames pharmacological reversal as an adjunct for selected high-risk patients, not a routine step — so this initial stratification is the gate the rest of the algorithm passes through.",
    refs: [1, 2, 3, 4]
  },
  {
    id: "stability_check",
    type: "decision",
    label: "Haemodynamically stable?",
    meaning:
      "This is the algorithm's central branch point. \"Unstable\" here tracks the indications for pharmacological reversal described in the wider literature: active, haemodynamically significant bleeding — hypotension, tachycardia, syncope, or a haemoglobin drop of 2 g/dL or more — that has not responded to initial resuscitation, or a high-risk endoscopic lesion found before haemostasis is secured.",
    rationale:
      "Contemporary guidance is explicit that reversal is not universally required: most patients with GI bleeding, including those on anticoagulants, do well with resuscitation, anticoagulant interruption and timely endoscopy alone, with pharmacological reversal reserved for a smaller group with haemodynamically significant or uncontrolled bleeding. Routing every patient through this single question before any drug is chosen keeps that distinction explicit rather than assumed.",
    refs: [5, 6]
  },
  {
    id: "stable_mgmt",
    type: "branch",
    label: "STEP 2 — Stable: conservative management",
    sub: "• Resuscitation + anticoagulant interruption\n• Upper GIB: endoscopy within 24 h\n• Lower GIB: non-urgent colonoscopy after bowel preparation\n• No reversal unless INR >2.5 (VKA)",
    meaning:
      "For a haemodynamically stable patient, management stays conservative: continued resuscitation and anticoagulant interruption, without a reversal agent, while endoscopy is arranged on a non-emergency timeline. Upper GI bleeding is scoped within 24 hours — earlier than that has not been shown to improve outcomes. Lower GI bleeding is more often self-limiting and is managed with non-urgent colonoscopy once bowel preparation is adequate. The one exception that still prompts reversal in an otherwise stable patient is a markedly supratherapeutic INR (>2.5) in someone on a vitamin K antagonist (VKA).",
    rationale:
      "This pathway reflects the same evidence that routes most anticoagulated GI bleeding away from pharmacological reversal: in stable patients, reversal has not been shown to add benefit over resuscitation, interruption and timely endoscopy, and exposes the patient to reversal-agent risk (thrombosis, transfusion reactions) without a clear offsetting gain. The 24-hour and non-urgent timeframes for upper and lower GI bleeding respectively come from the same society guidelines that define routine endoscopic timing more broadly.",
    cautions: [
      "\"Stable\" is a point-in-time assessment — a patient who re-bleeds or deteriorates after this step should be re-routed through the unstable pathway rather than kept on the conservative one by default."
    ],
    refs: [6, 5, 2, 7, 8, 9]
  },
  {
    id: "unstable_mgmt",
    type: "branch",
    label: "STEP 2/3 — Unstable / massive GIB: agent-specific reversal in parallel with resuscitation and urgent endoscopy",
    sub: "• Lower GIB with ongoing bleeding: CT angiography first to localise the source\n• Select reversal pathway according to the agent below",
    meaning:
      "For haemodynamically unstable or massive bleeding, reversal is not deferred until after resuscitation and endoscopy — all three run in parallel, because the time to definitive haemostasis is what the reversal agent is trying to buy. For ongoing lower GI bleeding with instability, CT angiography is obtained first to localise the bleeding source before an endoscopic or radiological intervention is chosen, and brisk haematochezia with instability should also prompt consideration of an upper GI source.",
    rationale:
      "The specific agent reversed depends entirely on which anticoagulant the patient is on, which is why this step hands off into four separate, agent-specific pathways below rather than a single generic reversal step. Across those pathways the same general preferences recur: 4F-PCC with IV vitamin K for VKA reversal, idarucizumab for dabigatran, and andexanet alfa or 4F-PCC for factor Xa inhibitors — a pattern also reflected in the 2020 ACC expert consensus pathway on bleeding in patients on oral anticoagulants.",
    refs: [8, 9, 6, 10]
  },
  {
    id: "vka_pathway",
    type: "process",
    label: "VKA / warfarin",
    sub: "• 4F-PCC, INR- and weight-based dose (Table 2) + IV vitamin K 5–10 mg\n• Recheck INR at 30 min and 6–8 h\n• If PCC unavailable: FFP 10–15 mL/kg + vitamin K",
    meaning:
      "Four-factor prothrombin complex concentrate (4F-PCC) replaces the vitamin-K-dependent clotting factors a VKA suppresses far faster than fresh frozen plasma (FFP) can, and is dosed by INR tier and body weight (25 IU/kg for INR 2–4, 35 IU/kg for INR 4–6, 50 IU/kg capped at 5,000 IU above INR 6). Intravenous vitamin K is given alongside every dose, not instead of it, because 4F-PCC's effect on clotting factor levels wanes over hours while vitamin K takes 6–12 hours to restore the liver's own synthesis — without it, the INR tends to rebound. The INR is rechecked at 30 minutes and again at 6–8 hours to confirm correction holds.",
    dose: [
      ["INR 2–4", "4F-PCC 25 IU/kg IV"],
      ["INR 4–6", "4F-PCC 35 IU/kg IV"],
      ["INR >6", "4F-PCC 50 IU/kg IV (max 5,000 IU)"],
      ["With every dose", "IV vitamin K 5–10 mg, infused over 30 minutes"],
      ["If 4F-PCC unavailable", "FFP 10–15 mL/kg + IV vitamin K"]
    ],
    rationale:
      "A randomized, plasma-controlled trial found 4F-PCC achieved rapid INR correction in 62% of patients versus 10% with plasma, and a GI-bleeding-specific cohort found no active bleeding at endoscopy in any patient reversed with PCC versus 35% of those given FFP, with a shorter emergency-department stay. A meta-analysis comparing 4F-PCC with FFP found lower thrombosis (2.5% vs 6.4%) and no significant mortality difference, and a large propensity-matched study of 1,119 pairs found no excess thrombotic risk at 45 days and lower mortality with 4F-PCC. Three-factor PCC, which lacks meaningful factor VII content, is substantially inferior for VKA reversal and should not be substituted. Weight- and INR-based dosing, as used here, more reliably reaches an INR below 1.5 than fixed-dose regimens, though fixed dosing is faster to administer.",
    cautions: [
      "Vitamin K is not optional alongside 4F-PCC — omitting it risks the INR rebounding once the concentrate's own effect wanes.",
      "Three-factor PCC is not an acceptable substitute for 4F-PCC in VKA reversal; its factor VII content is absent or trace.",
      "FFP carries materially higher rates of transfusion-related acute lung injury (TRALI), circulatory overload (TACO) and transfusion-transmitted infection than 4F-PCC — a further reason it is listed here only as a fallback."
    ],
    refs: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  },
  {
    id: "dabigatran_pathway",
    type: "process",
    label: "Dabigatran",
    sub: "• Idarucizumab 5 g IV (2 × 2.5 g, ≤15 min)\n• If unavailable: aPCC or 4F-PCC 50 IU/kg\n• Activated charcoal if last dose 2–6 h prior",
    meaning:
      "Idarucizumab is a humanised monoclonal antibody fragment that binds dabigatran with very high affinity — roughly 350 times that of thrombin itself — neutralising its anticoagulant effect within minutes of the two 2.5 g vials being given. Where it is not available, activated prothrombin complex concentrate (aPCC) or 4F-PCC at 50 IU/kg is used instead, and activated charcoal can still reduce further drug absorption if the last dose was taken within the last 2–6 hours and the patient can swallow safely.",
    dose: [
      ["First-line", "Idarucizumab 5 g IV (two 2.5 g vials, given no more than 15 minutes apart)"],
      ["If idarucizumab unavailable", "aPCC 50 IU/kg IV or 4F-PCC 50 IU/kg IV"],
      ["Last dose 2–6 h ago", "Activated charcoal, if the patient can swallow safely"]
    ],
    rationale:
      "The full RE-VERSE AD cohort confirmed idarucizumab's efficacy, with thrombotic events in 4.8% of participants at 30 days — attributed to the underlying thrombotic disease and the anticoagulant interruption itself, not to any prothrombotic property of the antibody fragment. Even so, the 2022 ACG/CAG guideline advises against routine idarucizumab use for GI bleeding specifically, reserving it for bleeding that is life-threatening or associated with haemodynamic instability — exactly the branch of this algorithm this pathway sits in.",
    cautions: [
      "Renal impairment prolongs dabigatran's own effect and may warrant extended post-reversal monitoring for rebound anticoagulation.",
      "Idarucizumab is not recommended as a routine measure for GI bleeding in general — it is reserved for life-threatening or haemodynamically unstable bleeding, which is the context this box applies in."
    ],
    refs: [6, 22, 23, 24]
  },
  {
    id: "fxa_pathway",
    type: "process",
    label: "Apixaban / rivaroxaban / edoxaban",
    sub: "• Andexanet alfa, low/high dose (Table 2), if available\n• If unavailable or cost-prohibitive: 4F-PCC or aPCC 50 IU/kg\n• Activated charcoal within 2–6 h (apixaban) or 6–8 h (rivaroxaban)",
    meaning:
      "Andexanet alfa is a modified, catalytically inactive recombinant factor Xa decoy that binds and sequesters factor Xa inhibitors, restoring endogenous factor Xa activity. Dosing is tiered by which drug, what dose, and how recently it was taken — a low-dose regimen (400 mg bolus plus 480 mg over 2 hours) for apixaban ≤5 mg or rivaroxaban ≤10 mg, or when more than 8 hours have passed since the last dose, and a high-dose regimen (800 mg bolus plus 960 mg over 2 hours) otherwise. Where andexanet is unavailable or cost-prohibitive, 4F-PCC or aPCC at 50 IU/kg is used instead, and activated charcoal remains useful if the last dose was recent enough.",
    dose: [
      ["Low dose (apixaban ≤5 mg, rivaroxaban ≤10 mg, or >8 h since last dose)", "Andexanet alfa 400 mg bolus + 480 mg over 2 hours"],
      ["High dose (apixaban >5 mg, rivaroxaban >10 mg, within 8 h)", "Andexanet alfa 800 mg bolus + 960 mg over 2 hours"],
      ["If andexanet unavailable / cost-prohibitive", "4F-PCC 50 IU/kg IV or aPCC 50 IU/kg IV"],
      ["Activated charcoal", "Within 2–6 h of last dose for apixaban, or 6–8 h for rivaroxaban, if able to swallow safely"]
    ],
    rationale:
      "The full ANNEXA-4 study report established andexanet's haemostatic efficacy for factor Xa inhibitor-associated bleeding. But its thrombotic burden is the highest of the agents on this page — a 2024 meta-analysis reported thrombotic events in 14% of patients (95% CI 10–19%), with observational series reporting rates as high as 27%, and andexanet also carries a recognised procoagulant off-target effect. Real-world, GI-bleeding-specific cohorts support 4F-PCC as an effective, more available and less expensive alternative: one reported 72.6% haemostatic efficacy and a second reported 66.7%, both with lower reported thrombosis than andexanet series. A UK-wide audit of DOAC-bleeding patients found a higher 30-day stroke rate with andexanet than 4F-PCC in a GI-bleeding-matched subgroup (4.5% vs 0%), even though 90-day mortality was similar. Reflecting this balance, the 2022 ACG/CAG guideline suggests against routine andexanet or PCC use in GI bleeding, reserving reversal for refractory haemodynamic instability — most DOAC-associated GI bleeding is managed with resuscitation and endoscopy alone.",
    cautions: [
      "Andexanet alfa carries the highest observed thrombotic risk of the reversal agents covered on this page — this is a direct trade-off against its haemostatic efficacy, not an incidental side effect.",
      "The 2022 ACG/CAG guideline suggests against routine andexanet or PCC use for GI bleeding specifically, reserving reversal for refractory haemodynamic instability rather than applying it by default to every factor Xa inhibitor-associated bleed."
    ],
    refs: [5, 6, 25, 26, 27, 28, 29, 30]
  },
  {
    id: "heparin_pathway",
    type: "process",
    label: "UFH / LMWH",
    sub: "• UFH: protamine 1 mg per 100 IU (max 50 mg)\n• LMWH: protamine, partial reversal (~60%)\n• Infuse slowly (hypotension / bradycardia)",
    meaning:
      "Protamine sulfate is a strongly basic protein that binds unfractionated heparin (UFH) ionically, neutralising its anticoagulant effect essentially completely. Low-molecular-weight heparin (LMWH) binds protamine less completely because a larger share of its anticoagulant activity comes from anti-factor Xa inhibition, which protamine neutralises poorly — so reversal with protamine is only partial, on the order of 60%.",
    dose: [
      ["UFH", "Protamine sulfate 1 mg per 100 IU of UFH given in the last 2–3 hours (maximum 50 mg IV)"],
      ["LMWH", "Protamine 1 mg per 1 mg of enoxaparin — partial reversal only, roughly 60%"]
    ],
    rationale:
      "The dosing shown here follows the authored protocol's own regimen; the manuscript's Table 2 does not cite a specific source for it. An independent emergency-medicine review of anticoagulation reversal confirms the same general approach — protamine dosed against the amount of heparin given and the time elapsed since the last dose, with LMWH reversal capped at roughly 60–75% of its anti-factor Xa activity because of protamine's weaker binding to the drug's smaller, more heavily sulfated chains.",
    cautions: [
      "Protamine must be infused slowly — rapid administration can cause hypotension, bradycardia and anaphylactoid reactions, which are more frequent with faster infusion rates.",
      "Reversal of LMWH is only ever partial; a persistently prolonged aPTT or ongoing bleeding after protamine does not necessarily mean the dose was inadequate."
    ],
    refs: [31]
  },
  {
    id: "endoscopy",
    type: "process",
    label: "STEP 4 — Endoscopy and haemostasis",
    sub: "• Upper or lower GI endoscopy with endoscopic haemostasis (injection, thermal, mechanical) as indicated\n• Target INR ≤1.5–2.0 is generally acceptable for most procedures in VKA-treated patients\n• Reassess haemostasis clinically (vital signs, overt bleeding, serial haemoglobin) when DOAC-specific assays are unavailable",
    meaning:
      "This is the point every pathway above converges on: definitive source control by endoscopy, with injection, thermal or mechanical haemostatic technique chosen as the lesion demands. For patients reversed from a VKA, an INR of 1.5–2.0 or below is generally acceptable to proceed rather than waiting for full normalisation. Because routine DOAC-specific coagulation assays (calibrated anti-Xa, diluted thrombin time, ecarin-based assays) are not available around the clock in most emergency departments, haemostatic adequacy for DOAC-treated patients is judged clinically — stabilising vital signs, cessation of overt bleeding, and stable or improving serial haemoglobin — with endoscopic confirmation of haemostasis as the reference standard.",
    rationale:
      "Waiting for a fully normalised INR or a DOAC level before scoping would needlessly delay the one intervention — endoscopic haemostasis — that actually stops the bleeding; a modestly elevated INR is an acceptable trade-off against that delay for most lesions. Standard screening coagulation tests (PT/INR, aPTT) are unreliable for quantifying DOAC effect and should not be used alone to decide whether it is safe to proceed, which is why clinical and simple laboratory endpoints are used instead when specific assays are unavailable.",
    cautions: [
      "A normal PT/INR or aPTT does not exclude a clinically relevant residual DOAC effect — these tests were not designed to measure it and can look falsely reassuring."
    ],
    refs: [2, 8, 32, 33]
  },
  {
    id: "post_haemostasis",
    type: "terminal",
    label: "STEP 5 — Post-haemostasis monitoring and resumption planning",
    sub: "• Monitor for thromboembolic complications (highest with andexanet alfa)\n• Assess for rebound anticoagulant activity (e.g., dabigatran after idarucizumab)\n• High-dose PPI after endoscopic haemostasis (upper GIB)\n• Plan anticoagulant resumption once haemostasis is secure, generally between 7 days and 6 weeks (risk-stratified, multidisciplinary; see Section 11)",
    meaning:
      "Once bleeding is controlled, attention shifts to the risks the reversal itself created or revealed. Thrombotic complications are monitored for, particularly after andexanet alfa given its higher observed rate; rebound anticoagulant activity is watched for, notably in dabigatran-treated patients after idarucizumab; a high-dose proton pump inhibitor (PPI) is continued after endoscopic haemostasis for upper GI bleeding; and — the step that most shapes long-term outcome — a plan for resuming anticoagulation is made, generally somewhere between 7 days and 6 weeks after the bleed, individualised to the patient's competing bleeding and thrombotic risk and decided with the relevant specialties.",
    rationale:
      "Both premature resumption and prolonged or permanent cessation of anticoagulation carry real harm: resuming too early raises rebleeding risk, while stopping for too long — or for good — raises thromboembolic and stroke risk. A meta-analysis found that resuming anticoagulation after GI bleeding is consistently associated with less thromboembolism and lower mortality than permanent cessation, at the cost of more recurrent bleeding, particularly when restarted within the first 2–3 weeks; most thromboembolic events occur beyond 2 weeks of interruption, and risk modelling suggests an optimal window of roughly 3–6 weeks for warfarin specifically. The ESGE recommends resuming as soon as bleeding is controlled, preferably within or soon after 7 days, and the BSG/ESGE guideline supports earlier resumption — with heparin bridging where appropriate — in patients at high thrombotic risk. Validated tools such as HAS-BLED (bleeding risk) and CHA₂DS₂-VASc (thromboembolic risk in atrial fibrillation) support this individualised decision.",
    cautions: [
      "Neither resuming immediately nor withholding anticoagulation indefinitely is a neutral default — each carries a distinct, serious failure mode (rebleeding versus thromboembolism), which is why this decision is explicitly individualised rather than protocolised to a single fixed interval.",
      "Rebound anticoagulant activity after idarucizumab is a recognised phenomenon in dabigatran-treated patients and is a specific reason for continued clinical and, where available, laboratory reassessment rather than assuming reversal is durable."
    ],
    refs: [34, 5, 23, 7, 30, 35, 36]
  }
];

const GLOSSARY = [
  { match: "4F-PCC", full: "four-factor prothrombin complex concentrate", def: "A plasma-derived concentrate of clotting factors II, VII, IX and X (plus proteins C and S), used to rapidly replace the vitamin-K-dependent factors suppressed by a VKA, or as a fallback when a specific DOAC antidote is unavailable." },
  { match: "aPCC", full: "activated prothrombin complex concentrate", def: "A prothrombin complex concentrate containing activated clotting factors (chiefly factor VIIa alongside the others), used as a dabigatran- or factor-Xa-inhibitor-reversal fallback when the specific antidote is unavailable." },
  { match: "FFP", full: "fresh frozen plasma", def: "Plasma containing all clotting factors at roughly normal plasma concentration. Slower to correct an elevated INR than 4F-PCC and carries materially higher rates of TRALI, TACO and transfusion-transmitted infection, so it is used here only when PCC is unavailable." },
  { match: "INR", full: "international normalised ratio", def: "A standardised measure of the extrinsic/common coagulation pathway, used to monitor and dose VKA (warfarin) therapy and to track the response to its reversal." },
  { match: "DOAC", full: "direct oral anticoagulant", def: "An oral anticoagulant that directly inhibits a single clotting factor — dabigatran inhibits thrombin (factor IIa); apixaban, rivaroxaban and edoxaban inhibit factor Xa — as opposed to a VKA, which suppresses the hepatic synthesis of several factors at once." },
  { match: "GBS", full: "Glasgow-Blatchford Score", def: "A risk score for upper GI bleeding, calculated from blood urea nitrogen, haemoglobin, systolic blood pressure, heart rate and several clinical features, used to identify patients safe for early discharge versus those needing hospital-based intervention." },
  { match: "AIMS65", full: "albumin, INR, altered mental status, systolic blood pressure, age ≥65", def: "An upper GI bleeding risk score combining albumin <3.0 g/dL, INR >1.5, altered mental status, systolic blood pressure ≤90 mmHg and age ≥65 years, used mainly for prognosis — rebleeding and in-hospital mortality — rather than discharge triage." },
  { match: "Oakland score", full: "Oakland score", def: "A validated risk score for lower GI bleeding; a score of 8 or below identifies patients at low enough risk for safe discharge and outpatient investigation rather than admission." },
  { match: "idarucizumab", full: "idarucizumab", def: "A humanised monoclonal antibody fragment that binds dabigatran with very high affinity, neutralising its anticoagulant effect within minutes. The specific reversal agent for dabigatran." },
  { match: "andexanet alfa", full: "andexanet alfa", def: "A modified, catalytically inactive recombinant factor Xa decoy protein that binds and sequesters factor Xa inhibitors (apixaban, rivaroxaban, edoxaban), restoring endogenous factor Xa activity. Carries the highest thrombotic risk among the reversal agents covered here." },
  { match: "protamine sulfate", full: "protamine sulfate", def: "A strongly basic protein that binds heparin ionically to neutralise its anticoagulant effect — essentially completely for unfractionated heparin, only partially (around 60%) for low-molecular-weight heparin." },
  { match: "UFH", full: "unfractionated heparin", def: "An injectable anticoagulant that potentiates antithrombin's inhibition of both thrombin and factor Xa. Fully neutralised by protamine sulfate, unlike LMWH." },
  { match: "LMWH", full: "low-molecular-weight heparin", def: "A heparin derivative (e.g. enoxaparin) with more selective anti-factor-Xa activity than unfractionated heparin. Protamine reverses only around 60% of its anticoagulant effect." },
  { match: "PPI", full: "proton pump inhibitor", def: "An acid-suppressing drug given at high dose after endoscopic haemostasis for upper GI bleeding, to create a less acidic environment that stabilises clot formation over the treated lesion." },
  { match: "CT angiography", full: "computed tomography angiography", def: "Contrast-enhanced CT imaging of the vasculature, used here to localise an ongoing lower GI bleeding source before an endoscopic or interventional-radiology procedure is chosen." },
  { match: "TRALI", full: "transfusion-related acute lung injury", def: "A serious, potentially fatal acute lung injury that can follow plasma or blood-product transfusion — occurs at materially higher rates with FFP than with 4F-PCC." },
  { match: "TACO", full: "transfusion-associated circulatory overload", def: "Acute pulmonary oedema from volume overload during or shortly after transfusion — particularly relevant in elderly anticoagulated patients with pre-existing cardiopulmonary disease, who make up much of this population, and occurs more often with FFP than with 4F-PCC." },
  { match: "HAS-BLED", full: "HAS-BLED score", def: "A bleeding-risk score (hypertension, abnormal renal/liver function, stroke history, bleeding history or predisposition, labile INR, elderly age, drugs/alcohol) used alongside a thromboembolic-risk score to individualise the decision to resume anticoagulation." },
  { match: "CHA₂DS₂-VASc", full: "CHA₂DS₂-VASc score", def: "A thromboembolic-risk score for atrial fibrillation (congestive heart failure, hypertension, age ≥75, diabetes, prior stroke/TIA/thromboembolism, vascular disease, age 65–74, sex category), used alongside a bleeding-risk score to individualise anticoagulant-resumption timing." }
];
