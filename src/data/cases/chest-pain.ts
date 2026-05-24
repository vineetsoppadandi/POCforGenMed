import { OSCECase } from "@/lib/types";

export const chestPainCase: OSCECase = {
  id: "chest-pain-history",
  title: "Acute Chest Pain — History Taking",
  specialty: "Emergency Medicine",
  type: "history",
  difficulty: "Year 4",
  timeMinutes: 8,
  tags: ["ACS", "chest pain", "SOCRATES", "history", "cardiovascular", "emergency"],

  candidateBrief: `You are a medical student on placement in the Emergency Department at Royal Melbourne Hospital.

**Patient:** Mr. James Kovacs, 52 years old
**Presenting complaint:** Chest pain — brought in by ambulance

Mr. Kovacs called 000 approximately 45 minutes ago complaining of chest pain. He is now sitting up in the resus bay. His vital signs on arrival: BP 148/92, HR 94, RR 18, SpO2 96% on room air, Temp 36.8°C. An ECG is being performed.

**Your task:**
Take a focused history of the presenting complaint and any relevant past history. You have 8 minutes. The examiner will stop you at the end.

**You will be assessed on your ability to:**
- Characterise the chest pain systematically
- Identify relevant risk factors and red flags
- Gather appropriate past medical, medication and social history
- Communicate in a clear, empathetic manner`,

  patientName: "James Kovacs",
  patientAge: 52,
  patientGender: "male",
  patientOccupation: "Warehouse manager",
  settingDescription: "Emergency Department resus bay, Royal Melbourne Hospital",

  patientSystemPrompt: `You are James Kovacs, a 52-year-old warehouse manager presenting to the Royal Melbourne Hospital Emergency Department with chest pain.

**Your story:**
You've had crushing central chest pain for about 2 hours. It started while you were moving some heavy pallets at work. The pain is 7/10 in severity. It radiates to your left shoulder and jaw. It doesn't get better when you rest and gets a little worse when you breathe deeply. You feel sweaty and a bit nauseated — you actually vomited once in the ambulance.

**Your medical background:**
- You were told your blood pressure was "a bit high" about a year ago but you haven't been on any tablets
- You smoke about 10 cigarettes a day (have done for 30 years)
- You drink socially — maybe 6 stubbies on a Friday, a couple during the week
- Your father had a heart attack at 58 and died. This frightens you but you haven't told your wife yet
- No previous chest pain or heart problems
- No diabetes that you know of
- Cholesterol — never been checked
- No allergies

**Your emotional state:**
You are anxious, a bit pale and sweaty. You're worried it might be a heart attack (like your dad) but you don't want to say that unless asked directly. If asked what you think is happening, you say "I dunno, doc — my dad died of a heart attack around my age and I'm scared it's the same thing."

**Instructions for the simulation:**
- Respond only to what you are asked — don't volunteer information
- Speak naturally, like a regular bloke who is a bit scared
- If asked about something you don't know, say you don't know
- Keep responses to 2-3 sentences unless elaborating when asked
- Do not use medical jargon
- The pain has NOT improved — it is still present right now`,

  scriptedResponses: [
    {
      keywords: ["where", "location", "site", "where is"],
      response: "Right in the middle of my chest, like right here — feels like someone's sitting on me.",
      revealsKey: "location",
    },
    {
      keywords: ["spread", "radiat", "arm", "jaw", "back", "anywhere else", "go anywhere"],
      response: "Yeah, actually — it goes up into my jaw and down my left shoulder. Started noticing that about an hour ago.",
      revealsKey: "radiation",
    },
    {
      keywords: ["when", "start", "how long", "duration", "began"],
      response: "It came on about 2 hours ago. I was moving some heavy pallets at work.",
      revealsKey: "onset",
    },
    {
      keywords: ["character", "describe", "feel like", "nature", "type", "kind of pain"],
      response: "It's like a crushing, heavy feeling — like pressure. Not sharp.",
      revealsKey: "character",
    },
    {
      keywords: ["scale", "severity", "out of 10", "how bad", "score"],
      response: "I'd say about a 7 out of 10. It's pretty bad, doc.",
      revealsKey: "severity",
    },
    {
      keywords: ["worse", "aggravate", "bring on", "exacerbat", "trigger"],
      response: "It came on with the heavy lifting. It seems a tiny bit worse when I breathe in deeply.",
      revealsKey: "exacerbating",
    },
    {
      keywords: ["better", "reliev", "ease", "help", "improve"],
      response: "Nothing makes it better. I sat down and rested in the ambulance and it's still the same.",
      revealsKey: "relieving",
    },
    {
      keywords: ["nausea", "sick", "vomit", "nauseous"],
      response: "Yeah, I feel pretty queasy. I actually vomited once in the ambulance — just bile.",
      revealsKey: "nausea",
    },
    {
      keywords: ["sweat", "perspir", "diaphor", "clammy"],
      response: "Yeah, I've been really sweaty since it started. My shirt is drenched.",
      revealsKey: "sweating",
    },
    {
      keywords: ["breath", "short of breath", "sob", "dyspnoea", "breathless"],
      response: "I'm a bit short of breath, yeah. It's hard to tell if it's the pain or the breathlessness causing it.",
    },
    {
      keywords: ["palpitation", "heart racing", "flutter", "irregular"],
      response: "Not really, doc. My heart doesn't feel like it's racing or anything.",
    },
    {
      keywords: ["dizzy", "lightheaded", "faint", "syncope", "pass out"],
      response: "I felt a bit dizzy in the ambulance, yeah. Not right now though.",
    },
    {
      keywords: ["cough", "sputum", "phlegm"],
      response: "No cough, no. I don't think so.",
    },
    {
      keywords: ["blood pressure", "hypertension", "bp", "high blood pressure"],
      response: "Yeah, the doctor at the GP said my blood pressure was a bit high about a year ago. I was supposed to come back but I never got around to it. No tablets or anything.",
      revealsKey: "hypertension",
    },
    {
      keywords: ["diabetes", "sugar", "glucose"],
      response: "Not that I know of. Never been tested as far as I can remember.",
    },
    {
      keywords: ["cholesterol", "lipid", "fats"],
      response: "Never been checked, doc. I've been meaning to get a blood test but kept putting it off.",
      revealsKey: "cholesterol",
    },
    {
      keywords: ["smoke", "smoking", "cigarette", "tobacco"],
      response: "Yeah, I smoke. About 10 a day. Been doing it since I was about 22.",
      revealsKey: "smoking",
    },
    {
      keywords: ["alcohol", "drink", "drinking"],
      response: "Socially. A few stubbies during the week, more on weekends. Friday I'd have maybe a six-pack.",
    },
    {
      keywords: ["family", "history", "father", "dad", "mum", "mother", "relative"],
      response: "My dad had a heart attack at 58 and died. That's why I'm here — I'm worried it's the same thing happening to me.",
      revealsKey: "family_history",
    },
    {
      keywords: ["medication", "tablet", "medicine", "drug", "prescription"],
      response: "Nothing. I don't take any tablets.",
    },
    {
      keywords: ["allerg", "reaction"],
      response: "No allergies that I know of.",
    },
    {
      keywords: ["previous", "before", "past", "history", "ever had"],
      response: "No, nothing like this before. Never had chest pain.",
    },
    {
      keywords: ["work", "job", "occupation"],
      response: "I manage a warehouse in Sunshine. Physical job — lots of moving stuff around.",
    },
    {
      keywords: ["worried", "concerned", "think", "feel about", "suspect"],
      response: "Honestly doc, I'm scared it's a heart attack. My dad went the same way. I haven't told my wife yet — she'd go into a panic.",
    },
    {
      keywords: ["wife", "partner", "family at home"],
      response: "Married, yeah — Diane. She doesn't know I'm here yet. She thinks I'm still at work.",
    },
    {
      keywords: ["pleuritic", "pleuris", "pleural"],
      response: "It does hurt a little bit more when I breathe in deeply, yeah.",
    },
    {
      keywords: ["tear", "ripping", "tearing", "worst pain"],
      response: "No, it's not a tearing kind of pain. More crushing and heavy.",
    },
    {
      keywords: ["fever", "temperature", "chills", "shiver", "flu"],
      response: "No fever or anything like that. No flu.",
    },
    {
      keywords: ["travel", "flight", "overseas", "long trip", "immobil"],
      response: "No, I haven't been on any long flights or anything. Just been at work.",
    },
    {
      keywords: ["leg", "calf", "swollen", "swelling", "dvt"],
      response: "Now that you mention it, my left calf has been a bit sore for a couple of days, I thought I'd just pulled a muscle.",
      revealsKey: "dvt",
    },
  ],

  defaultResponse:
    "Sorry doc, I'm not sure what you mean. Can you ask me a different way? I'm a bit foggy with the pain.",

  markingCategories: [
    {
      id: "socrates",
      name: "Chest Pain Characterisation (SOCRATES)",
      items: [
        { id: "site", description: "Asks about site/location of pain", marks: 1 },
        { id: "onset", description: "Asks about onset — when, sudden vs gradual, precipitant", marks: 1 },
        { id: "character", description: "Asks about character — crushing, sharp, burning, tearing", marks: 1 },
        { id: "radiation", description: "Asks about radiation — arm, jaw, back, shoulder", marks: 1 },
        { id: "associations", description: "Asks about associated symptoms — nausea, vomiting, diaphoresis, dyspnoea", marks: 2, detail: "1 mark for any, 2 marks for ≥3 associated symptoms" },
        { id: "time", description: "Asks about timing — duration, continuous vs intermittent, previous episodes", marks: 1 },
        { id: "exacerbating", description: "Asks about exacerbating and relieving factors", marks: 1 },
        { id: "severity", description: "Asks about severity (pain scale)", marks: 1, teachingPoint: "Pain scale helps track improvement and anchors future communications with the team." },
      ],
    },
    {
      id: "red_flags",
      name: "Red Flags & Differentials",
      items: [
        { id: "pleuritic", description: "Asks specifically about pleuritic component (worse on inspiration)", marks: 1, teachingPoint: "Pleuritic pain raises PE, pleuritis, or pericarditis." },
        { id: "tearing", description: "Asks about tearing/ripping quality (aortic dissection)", marks: 1, teachingPoint: "Tearing/ripping pain radiating to the back is aortic dissection until proven otherwise — needs urgent imaging." },
        { id: "dvt", description: "Asks about DVT symptoms — calf pain, leg swelling", marks: 1, teachingPoint: "Always ask about DVT symptoms when PE is on the differential." },
        { id: "syncope", description: "Asks about syncope or pre-syncope", marks: 1 },
        { id: "fever", description: "Asks about fever/infective symptoms", marks: 1 },
      ],
    },
    {
      id: "risk_factors",
      name: "Cardiovascular Risk Factors",
      items: [
        { id: "smoking", description: "Asks about smoking history (pack-years)", marks: 1 },
        { id: "htn", description: "Asks about hypertension", marks: 1 },
        { id: "diabetes", description: "Asks about diabetes", marks: 1 },
        { id: "cholesterol", description: "Asks about hyperlipidaemia/cholesterol", marks: 1 },
        { id: "family_hx", description: "Asks about family history of premature CVD (<65 women, <55 men)", marks: 1, teachingPoint: "A father with MI at 58 counts as premature CVD — this significantly raises the pretest probability of ACS." },
      ],
    },
    {
      id: "pmh",
      name: "Past Medical History & Medications",
      items: [
        { id: "prev_cardiac", description: "Asks about previous cardiac events or investigations", marks: 1 },
        { id: "medications", description: "Asks about current medications including aspirin, GTN, anticoagulants", marks: 1 },
        { id: "allergies", description: "Asks about drug allergies — specifically asks penicillin, aspirin", marks: 1 },
      ],
    },
    {
      id: "communication",
      name: "Communication & Professionalism",
      items: [
        { id: "introduces", description: "Introduces self and checks patient identity", marks: 1 },
        { id: "empathy", description: "Acknowledges patient's anxiety and pain", marks: 1 },
        { id: "ice", description: "Asks about patient's Ideas, Concerns or Expectations", marks: 1, teachingPoint: "ICE: 'What do you think might be happening?' often elicits the most important concerns." },
        { id: "systematic", description: "History is systematic and structured — not disorganised", marks: 1 },
        { id: "jargon", description: "Uses appropriate language — avoids excessive jargon", marks: 1 },
      ],
    },
  ],

  passMark: 60,

  diagnosis: "Likely ST-Elevation Myocardial Infarction (STEMI) — inferior pattern with possible PE as differential given calf pain",
  differentialDiagnoses: [
    "ST-Elevation Myocardial Infarction (STEMI) — most likely",
    "NSTEMI / Unstable Angina",
    "Pulmonary Embolism — calf pain raises DVT/PE risk",
    "Aortic Dissection — less likely given pain character",
    "Pericarditis — pleuritic element noted but pain pattern atypical",
  ],

  debriefSections: [
    {
      heading: "Key Clinical Findings",
      type: "diagnosis",
      content: "Mr. Kovacs has crushing central chest pain radiating to the jaw and left shoulder, associated with nausea, vomiting, and diaphoresis — the classic triad of ACS. This, combined with his CVD risk profile (smoking, hypertension, strong family history, age, male sex) makes STEMI the primary diagnosis until proven otherwise. The calf pain is an important finding that raises the possibility of concomitant DVT/PE — management implications differ significantly.",
    },
    {
      heading: "SOCRATES Framework",
      type: "info",
      content: "Site · Onset · Character · Radiation · Associations · Timing · Exacerbating/Relieving · Severity. This systematic approach ensures no feature is missed. For chest pain, always ask about the 'big 5': ACS, aortic dissection, PE, pericarditis/myocarditis, and oesophageal rupture (Boerhaave's).",
    },
    {
      heading: "Australian Context",
      type: "tip",
      content: "In Australia, STEMI management follows the NHFA/CSANZ Acute Coronary Syndrome Guidelines. The target door-to-balloon time is ≤90 minutes. Royal Melbourne Hospital is a PCI-capable centre. Aspirin 300mg should be given immediately if no allergy. Clopidogrel or ticagrelor as P2Y12 inhibitor will be added. GTN is contraindicated if inferior STEMI (risk of RV involvement and hypotension).",
    },
    {
      heading: "What Students Often Miss",
      type: "warning",
      content: "1. Forgetting to ask about the TEARING quality of pain — missing aortic dissection. 2. Not asking about calf pain — missing DVT/PE overlap. 3. Not quantifying smoking in pack-years (cigarettes/day ÷ 20 × years). 4. Missing the ICE question — this patient is terrified he'll die like his father and hasn't told his wife. This has significant psychological and logistical implications. 5. Forgetting to ask about GTN use or aspirin — critically important for management.",
    },
  ],

  keyLearningPoints: [
    "Crushing chest pain + radiation + diaphoresis + nausea = ACS until proven otherwise",
    "Always ask about TEARING pain to screen for aortic dissection",
    "DVT symptoms alongside chest pain should trigger PE workup",
    "Quantify smoking in pack-years, not just 'yes/no'",
    "Family history of premature CVD (<55 in males) significantly increases pretest probability",
    "ICE framework identifies patient concerns that may affect management",
    "GTN is CONTRAINDICATED in inferior STEMI — check ECG first",
  ],

  australianContext: "Royal Melbourne Hospital is a PCI-capable centre under the Victorian STEMI network. If the ECG confirms STEMI, the 'STEMI protocol' is activated — team is assembled and patient goes directly to the cath lab. Aspirin 300mg + ticagrelor (PLATO trial — now preferred over clopidogrel in ACS) are given immediately. The patient should be assessed with troponin (high-sensitivity), ECG, and CXR as minimum. PBS-listed anticoagulants include enoxaparin and fondaparinux.",

  relevantGuidelines: [
    "NHFA/CSANZ Acute Coronary Syndrome Management Guidelines 2016 (updated 2019)",
    "European Society of Cardiology STEMI Guidelines 2023",
    "ACLS/ANZCOR Resuscitation Guidelines",
  ],
};
