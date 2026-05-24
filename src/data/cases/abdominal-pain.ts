import { OSCECase } from "@/lib/types";

export const abdominalPainCase: OSCECase = {
  id: "abdominal-pain-history",
  title: "Acute Abdominal Pain — History Taking",
  specialty: "Surgery",
  type: "history",
  difficulty: "Year 3",
  timeMinutes: 8,
  tags: ["abdominal pain", "appendicitis", "history", "surgery", "SOCRATES", "peritonism"],

  candidateBrief: `You are a medical student on your surgical rotation at the Royal Children's Hospital / Royal Melbourne Hospital.

**Patient:** Miss Sarah Chen, 22 years old
**Setting:** Surgical Emergency, Royal Melbourne Hospital

Sarah presented to the Emergency Department 2 hours ago with a 24-hour history of abdominal pain. She is a university student. Her vitals: Temp 37.9°C, HR 102, BP 116/72, RR 16, SpO2 99% RA.

**Your task:**
Take a focused history of her presenting complaint. You have 8 minutes.

Cover:
- Full characterisation of abdominal pain (SOCRATES)
- Relevant gastrointestinal review of systems
- Gynaecological history (given patient age and gender)
- Relevant past history
- ICE (Ideas, Concerns, Expectations)

Be sensitive and respectful — gynaecological history is personal information.`,

  patientName: "Sarah Chen",
  patientAge: 22,
  patientGender: "female",
  patientOccupation: "University student (second year law)",
  settingDescription: "Surgical Emergency, Royal Melbourne Hospital",

  patientSystemPrompt: `You are Sarah Chen, a 22-year-old law student with worsening abdominal pain. You are in significant pain and a bit scared.

**Your story:**
Started 24 hours ago with vague central abdominal discomfort — you thought it was period pain or bad gas. Over the last 12 hours, the pain has moved to the RIGHT lower abdomen and has intensified. It's now constant, 8/10, and worse when you move or walk. You've been nauseous and had one vomit. No diarrhoea. You have not opened your bowels in 2 days but that's fairly normal for you.

**Gynaecological history:**
- Last menstrual period was 3 weeks ago — normal period, not pregnant
- Regular periods
- One sexual partner (boyfriend, together 18 months)
- On the oral contraceptive pill (Levlen ED) — take it consistently
- No history of STIs
- No abnormal vaginal discharge
- No previous gynaecological problems
- Not pregnant — you are certain

**Past medical history:**
- No previous abdominal operations or pain
- Appendix still in place (to your knowledge)
- No medical conditions
- Allergies: Penicillin — causes a rash
- No current medications except the OCP

**Social:**
- Lives in a share house in Carlton with 3 other students
- Parents in Adelaide — worried if you call them
- Non-smoker, social alcohol (couple of glasses of wine on weekends)
- No drugs

**Your concerns:**
- You're worried it's appendicitis — your older brother had it when he was 17
- You're embarrassed about gynaecological questions but will answer honestly if asked respectfully
- You want to know if you'll need surgery
- You're worried about your exams next week`,

  scriptedResponses: [
    {
      keywords: ["where", "location", "site", "where is the pain"],
      response: "It's mainly here now — the right lower part of my belly. (points to RIF) It started more in the middle yesterday.",
    },
    {
      keywords: ["when", "start", "how long", "began"],
      response: "It started yesterday evening. About 24 hours ago I'd say. At first I thought it was just period pain or trapped wind.",
    },
    {
      keywords: ["migrat", "move", "shift", "central", "umbilicus", "belly button"],
      response: "Yes — it started more central, around my belly button, then moved down to the right side over the last 12 hours or so.",
      revealsKey: "migration",
    },
    {
      keywords: ["character", "describe", "feel like", "type", "constant", "come and go"],
      response: "It's constant now. Doesn't really come and go. Sharp and achy at the same time, if that makes sense.",
    },
    {
      keywords: ["severity", "scale", "out of 10", "how bad"],
      response: "I'd say 8 out of 10 right now. When I walked in from the car it was really bad.",
    },
    {
      keywords: ["worse", "aggravat", "movement", "walk", "cough", "jump"],
      response: "Moving makes it worse — even walking in here from the car was awful. Coughing makes it spike. I've just been lying still.",
      revealsKey: "peritonism",
    },
    {
      keywords: ["better", "reliev", "ease", "help"],
      response: "Nothing makes it better. I tried lying curled up on my side — that helped a tiny bit but not much.",
    },
    {
      keywords: ["nausea", "sick", "vomit"],
      response: "Yes, I've been nauseous all day. I vomited once about 6 hours ago — just bile.",
    },
    {
      keywords: ["fever", "temperature", "chills", "shiver"],
      response: "I've felt feverish. Not taken my temperature but I feel hot.",
    },
    {
      keywords: ["bowel", "diarrhoea", "constipation", "stool", "open bowels"],
      response: "I haven't opened my bowels in 2 days. But that's actually fairly normal for me — I tend to go every 2-3 days.",
    },
    {
      keywords: ["appetite", "eating", "food"],
      response: "No appetite at all since yesterday. The thought of food makes me feel sick.",
      revealsKey: "anorexia",
    },
    {
      keywords: ["urine", "urinary", "pee", "dysuria", "frequency", "burning"],
      response: "No pain when I pee. Normal colour. No increased frequency.",
    },
    {
      keywords: ["period", "menstrual", "LMP", "last period", "menstruate"],
      response: "My last period was about 3 weeks ago. It was normal — started on time, about 5 days, normal flow.",
    },
    {
      keywords: ["pregnant", "pregnancy", "chance", "contraception"],
      response: "I'm definitely not pregnant. I'm on the pill — Levlen ED — and I take it every day. We also use condoms.",
    },
    {
      keywords: ["discharge", "vaginal", "infection", "STI"],
      response: "(A bit hesitant) No, nothing unusual down there. No discharge or smell or anything.",
    },
    {
      keywords: ["sexual", "partner", "intercourse", "relationship"],
      response: "Yes, I have a boyfriend — we've been together about 18 months. One partner.",
    },
    {
      keywords: ["previous", "before", "past history", "surgery", "operation"],
      response: "No, nothing like this before. I've never had any abdominal surgery. My appendix should still be there.",
    },
    {
      keywords: ["allerg", "penicillin", "medication reaction"],
      response: "Yes — penicillin. I get a rash. It's in my records I think.",
    },
    {
      keywords: ["tablet", "medication", "drug"],
      response: "Just the pill — Levlen ED. No other medications.",
    },
    {
      keywords: ["worried", "concerned", "think", "appendix", "suspect"],
      response: "I'm worried it's my appendix — my brother had appendicitis at 17. It sounds similar to what he described. Am I going to need surgery?",
    },
    {
      keywords: ["exam", "uni", "university", "study", "work"],
      response: "I have law exams starting next Wednesday. That's making this extra stressful.",
    },
    {
      keywords: ["family", "parents", "tell"],
      response: "My parents are in Adelaide. I don't want to worry them if it's nothing. But maybe if it's serious...",
    },
    {
      keywords: ["drink", "alcohol", "social"],
      response: "Social drinker — couple of glasses of wine on weekends. Nothing recently though.",
    },
  ],

  defaultResponse: "Sorry, I'm not sure I understand. Can you ask me differently? (winces with pain)",

  markingCategories: [
    {
      id: "socrates",
      name: "Abdominal Pain Characterisation",
      items: [
        { id: "site", description: "Asks about site and elicits migration from central to RIF", marks: 2, detail: "2 marks for establishing migration pattern; 1 mark for site only", teachingPoint: "Migration of pain from periumbilical → right iliac fossa (McBurney's point) in 50% of appendicitis is the most pathognomonic feature. Always ask where the pain started." },
        { id: "onset", description: "Asks about onset — timing, gradual vs sudden", marks: 1 },
        { id: "character", description: "Asks about character — constant, sharp, colicky", marks: 1 },
        { id: "associations", description: "Asks about associated symptoms — nausea, vomiting, fever, anorexia", marks: 2, detail: "1 mark for any; 2 marks for ≥3 (nausea, vomiting, anorexia, fever)", teachingPoint: "The triad of anorexia + right iliac fossa pain + fever = appendicitis until proven otherwise." },
        { id: "radiation", description: "Asks about radiation", marks: 1 },
        { id: "exacerbating", description: "Asks about factors that worsen pain — movement, coughing (peritonism)", marks: 1, teachingPoint: "Pain worsened by movement/coughing = peritonism. This is a critical finding suggesting the appendix may have perforated or pelvic peritonitis." },
        { id: "severity", description: "Asks about severity", marks: 1 },
      ],
    },
    {
      id: "gi_review",
      name: "GI Review of Systems",
      items: [
        { id: "bowel", description: "Asks about bowel habit change — diarrhoea, constipation, last bowel motion", marks: 1 },
        { id: "appetite", description: "Asks about appetite", marks: 1 },
        { id: "urinary", description: "Asks about urinary symptoms — dysuria, frequency, haematuria", marks: 1, teachingPoint: "Urinary symptoms help exclude UTI/pyelonephritis, which can mimic appendicitis, especially on the right." },
      ],
    },
    {
      id: "gynaecology",
      name: "Gynaecological History (critical in young female)",
      items: [
        { id: "asks_gyn", description: "Appropriately transitions to ask gynaecological history — sensitively", marks: 1 },
        { id: "lmp", description: "Asks about last menstrual period — cycle regularity", marks: 1 },
        { id: "pregnancy", description: "Asks about pregnancy/contraception — rules out ectopic pregnancy", marks: 2, detail: "2 marks for asking AND interpreting (ectopic excluded); 1 mark for asking only", teachingPoint: "Ectopic pregnancy is the #1 surgical emergency in women of reproductive age. ALWAYS check: LMP, contraception, chance of pregnancy. A ruptured ectopic can mimic appendicitis." },
        { id: "discharge_sti", description: "Asks about vaginal discharge, STI history (PID differential)", marks: 1, teachingPoint: "Pelvic inflammatory disease (PID) mimics appendicitis and is treated differently — antibiotics, not surgery. STI history, multiple partners, vaginal discharge are important." },
      ],
    },
    {
      id: "pmh",
      name: "Past Medical History",
      items: [
        { id: "previous_abdo", description: "Asks about previous abdominal operations — important to know if appendix is present", marks: 1 },
        { id: "allergies", description: "Asks about drug allergies — penicillin allergy is critical for antibiotic choice", marks: 2, teachingPoint: "Penicillin allergy changes antibiotic management significantly. In Australia, standard appendicitis prophylaxis is cephalosporins + metronidazole. Penicillin allergy → clarithromycin + metronidazole. Always ask." },
        { id: "medications", description: "Asks about current medications — OCP noted", marks: 1 },
      ],
    },
    {
      id: "ice_communication",
      name: "ICE & Communication",
      items: [
        { id: "ice", description: "Asks about patient's ideas, concerns and expectations", marks: 1 },
        { id: "sensitivity", description: "Shows sensitivity when asking gynaecological questions — explains why needed", marks: 1 },
        { id: "empathy", description: "Acknowledges pain and fear appropriately throughout", marks: 1 },
      ],
    },
  ],

  passMark: 60,

  diagnosis: "Acute appendicitis (clinical diagnosis — requires surgical review, USS ± CT, bloods)",
  differentialDiagnoses: [
    "Acute appendicitis — most likely",
    "Ectopic pregnancy — must be excluded with βhCG",
    "Pelvic inflammatory disease (PID)",
    "Ovarian cyst / torsion",
    "Mesenteric adenitis",
    "Right-sided pyelonephritis",
    "Meckel's diverticulum",
  ],

  debriefSections: [
    {
      heading: "Appendicitis — Classic Presentation",
      type: "diagnosis",
      content: "Sarah's presentation is classic for acute appendicitis: periumbilical pain migrating to RIF over 24 hours, associated with anorexia, nausea, vomiting, and low-grade fever. Pain worsened by movement suggests peritoneal irritation. Initial investigations: FBC (raised WCC), CRP (elevated), βhCG (must exclude ectopic), urinalysis (exclude UTI). Imaging: Ultrasound first (no radiation, good in young females); CT if USS non-diagnostic. Alvarado Score ≥7 = high probability appendicitis.",
    },
    {
      heading: "Why Gynaecological History is Mandatory",
      type: "warning",
      content: "The presentation of right iliac fossa pain in a woman of reproductive age has a wide differential. Missing an ectopic pregnancy is a potentially fatal error — ruptured ectopic causes haemorrhagic shock. βhCG MUST be performed in all females of reproductive age with abdominal pain, regardless of reported contraception. PID is another important differential — antibiotics rather than surgery. A normal gynaecological history does not exclude PID (asymptomatic STI).",
    },
    {
      heading: "Alvarado Score for Appendicitis",
      type: "info",
      content: "Migration of pain (1) + Anorexia (1) + Nausea/vomiting (1) + Tenderness in RIF (2) + Rebound tenderness (1) + Elevated temperature (1) + Raised WCC (2) = Max 9. Score interpretation: <4 = low probability; 5-6 = possible; 7-8 = probable; 9 = definitive. Sarah's score (without exam): migration + anorexia + nausea/vomiting + fever = 4 minimum. Examination will likely add RIF tenderness and rebound, making score 7-8.",
    },
    {
      heading: "Penicillin Allergy — Management Implications",
      type: "tip",
      content: "Penicillin allergy affects ~10% of patients (true allergy ~1-2%). Standard appendicitis prophylaxis in Australia: Cefazolin + metronidazole IV. Penicillin-allergic patient: gentamicin + metronidazole (first line in most Australian hospitals), or clarithromycin + metronidazole if concern about aminoglycoside toxicity. Always document allergy AND the type of reaction (anaphylaxis vs rash vs GI upset — management differs).",
    },
  ],

  keyLearningPoints: [
    "Migration of central pain to RIF is the most specific symptom of appendicitis",
    "βhCG must ALWAYS be checked in women of reproductive age with abdominal pain",
    "Pain worsened by movement = peritoneal irritation = potential perforation risk",
    "Always check drug allergies — penicillin changes antibiotic management",
    "PID is a key differential — always ask about vaginal discharge and sexual history sensitively",
    "Alvarado score helps risk stratify appendicitis — learn it",
    "In young females, USS is first-line imaging (avoids radiation); CT if USS non-diagnostic",
  ],

  australianContext: "In Australia, laparoscopic appendicectomy is the gold standard for uncomplicated appendicitis. ERAS (Enhanced Recovery After Surgery) protocols are standard at major centres. For complicated appendicitis (perforation, abscess), interval appendicectomy after 6-8 weeks of antibiotics is increasingly preferred — supported by APPAC II trial. The Royal Australasian College of Surgeons (RACS) guidelines recommend consideration of antibiotic-first therapy for uncomplicated appendicitis in appropriately selected patients.",
};
