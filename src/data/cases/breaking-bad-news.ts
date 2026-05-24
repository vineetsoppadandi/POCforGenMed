import { OSCECase } from "@/lib/types";

export const breakingBadNewsCase: OSCECase = {
  id: "breaking-bad-news",
  title: "Breaking Bad News — New Cancer Diagnosis",
  specialty: "General Medicine",
  type: "communication",
  difficulty: "Year 4",
  timeMinutes: 10,
  tags: ["breaking bad news", "SPIKES", "communication", "oncology", "lung cancer", "ICE"],

  candidateBrief: `You are a resident medical officer at Austin Health, Melbourne.

**Patient:** Mrs. Angela Tran, 56 years old
**Setting:** Oncology outpatient clinic, private consultation room

Mrs. Tran was referred to you 2 weeks ago with a persistent cough and weight loss. A CT chest confirmed a 4.2cm right upper lobe mass with mediastinal lymphadenopathy. A CT-guided biopsy performed last week has confirmed **non-small cell lung carcinoma (NSCLC)**, adenocarcinoma subtype, with stage IIIA disease. You have reviewed her results with the oncology team.

Mrs. Tran is here today for her results appointment. Her husband is in the waiting room — she asked to come in alone first.

**Your task:**
Deliver the diagnosis to Mrs. Tran using a structured, empathetic approach. Address her immediate concerns and outline a clear next-steps plan. You have 10 minutes.

**You will NOT be assessed on oncological management details — focus on communication.**`,

  patientName: "Angela Tran",
  patientAge: 56,
  patientGender: "female",
  patientOccupation: "Primary school teacher",
  settingDescription: "Oncology outpatient clinic, Austin Health, Melbourne",

  patientSystemPrompt: `You are Angela Tran, a 56-year-old Vietnamese-Australian primary school teacher. You are here to get results for your CT scan and biopsy.

**What you know and feel:**
You know something is wrong — the doctors have been very serious and the biopsy sounded worrying. You're trying to stay calm but underneath you are terrified. You have not Googled your symptoms because you were "too scared to know." You believe this might be serious.

**Your background:**
- Married to David (your husband of 28 years) who is in the waiting room. You wanted to hear results alone first so you could decide how to tell him.
- Two adult children — Michael (30) and Linh (26). Linh has two young children — your grandchildren.
- You are a committed teacher and were looking forward to retiring in 4 years.
- You are a non-smoker. You don't understand how you could have lung cancer.
- You were born in Vietnam and came to Australia at age 12. English is excellent.
- You practice Buddhism — faith is important to you.
- You are not aware of lung cancer survival statistics.

**How you respond to the news:**
When you hear it's cancer, you will be very still and quiet for a moment. Then you ask "Is it bad?" Then "How long do I have?" You are composed outwardly but visibly upset. You will ask:
- "Can it be cured?"
- "I don't smoke — how did I get this?"
- "Can my husband come in now?"
- "What happens next?"
- "What do I tell my daughter? She has little children..."
- "I want to keep teaching — is that still possible?"

**Emotional cues:**
- You may tear up when the word "cancer" is said
- You appreciate when the doctor pauses and gives you time
- You are reassured by honesty combined with compassion — don't give vague non-answers
- You are not angry — you are frightened and sad

**Instructions:**
- Respond naturally to how the student is communicating
- If they rush or use jargon, ask them to slow down or explain in plain language
- If they are compassionate, warm, and clear, respond positively and engage more
- Respond to silences by saying "Sorry... I'm just taking this in"`,

  scriptedResponses: [
    {
      keywords: ["sit", "comfortable", "seat", "how are you"],
      response: "Thank you, I'm okay I suppose. I've been quite nervous waiting for these results. I tried not to think about it too much this week.",
    },
    {
      keywords: ["husband", "david", "alone", "someone with you", "support person"],
      response: "David is in the waiting room. I asked to come in alone first — I wanted to hear what you have to say myself, before telling him. Is that okay?",
    },
    {
      keywords: ["know", "understand", "perception", "already know", "what do you know", "tell me what you know"],
      response: "Well... the doctors who did the biopsy said they needed to check some cells. And the CT scan showed something on my lung. I haven't Googled it — I was too scared to. I'm hoping it's just an infection or something.",
    },
    {
      keywords: ["results", "news", "findings", "scan", "biopsy", "information"],
      response: "Okay... I'm ready. Please just tell me.",
    },
    {
      keywords: ["cancer", "carcinoma", "malignant", "tumour", "growth"],
      response: "(Long pause) ...Is it bad? How long do I have?",
    },
    {
      keywords: ["long", "prognosis", "survive", "time", "how long", "life expectancy"],
      response: "I see... (quietly) Can it be cured? I have grandchildren, you see.",
    },
    {
      keywords: ["cure", "treat", "treatment", "options", "manage"],
      response: "What does treatment involve? Is it chemotherapy? I've seen people go through that. It looked very hard.",
    },
    {
      keywords: ["chemotherapy", "chemo", "radiation", "surgery", "immunotherapy"],
      response: "Will I lose my hair? I know that's a silly thing to ask right now... but the children at school, they look up to me.",
    },
    {
      keywords: ["smoke", "smoking", "non-smoker", "cigarette", "cause"],
      response: "I've never smoked a single cigarette in my life. How can I have lung cancer? I don't understand.",
    },
    {
      keywords: ["non-smoker", "passive", "radon", "adenocarcinoma", "can happen"],
      response: "Oh... I didn't know that. The doctor who did the biopsy didn't really explain.",
    },
    {
      keywords: ["husband", "david", "come in", "family", "together"],
      response: "Yes... I think I'd like David to come in now. I don't think I should be alone right now. Is that okay?",
    },
    {
      keywords: ["next step", "next", "plan", "what happens", "from here"],
      response: "What happens now? Do I need to come back? I'm not sure I understand what comes next.",
    },
    {
      keywords: ["oncologist", "specialist", "team", "multidisciplinary"],
      response: "Who else will be involved? I don't really know what an oncologist does exactly.",
    },
    {
      keywords: ["teach", "work", "school", "job"],
      response: "I'm a teacher — I was planning to retire in 4 years. Will I be able to keep teaching? The children, they mean everything to me.",
    },
    {
      keywords: ["daughter", "linh", "son", "children", "family", "tell them"],
      response: "How do I tell my daughter? She has two little ones — my grandchildren are 3 and 5. I don't want them to worry.",
    },
    {
      keywords: ["support", "counsellor", "psychologist", "help", "cancer council"],
      response: "I didn't know there was support available. That's... actually that's good to know. My husband will be very worried.",
    },
    {
      keywords: ["question", "ask", "anything else", "concern"],
      response: "I have so many questions but I can't think of them right now. My head is spinning. Can I call if I think of things later?",
    },
    {
      keywords: ["sorry", "difficult", "hard", "must be"],
      response: "(Nods quietly) It is hard. But thank you for being kind about it.",
    },
    {
      keywords: ["faith", "religion", "pray", "buddhism", "spiritual"],
      response: "I will pray. I don't know what else to do right now. My faith helps me.",
    },
  ],

  defaultResponse: "I'm sorry... could you explain that again? I'm finding it a bit hard to take in right now.",

  markingCategories: [
    {
      id: "setting",
      name: "Setting Up — S of SPIKES",
      items: [
        { id: "private", description: "Ensures private, quiet setting — acknowledges patient came alone", marks: 1 },
        { id: "intro", description: "Introduces self, role, and reason for meeting", marks: 1 },
        { id: "support", description: "Asks about support person / checks if patient wants anyone present", marks: 1 },
        { id: "warning", description: "Gives a 'warning shot' — prepares patient that news may be difficult", marks: 1, teachingPoint: "'I'm afraid I have some difficult news to share with you' — this brief warning shot allows the patient to brace themselves and is associated with better recall and less distress." },
      ],
    },
    {
      id: "perception",
      name: "Perception — P of SPIKES",
      items: [
        { id: "perception", description: "Elicits patient's current understanding of their illness", marks: 2, teachingPoint: "Start where the patient is: 'Before I share the results, can you tell me what you already know or understand about why you're here?' This avoids information mismatch." },
      ],
    },
    {
      id: "invitation",
      name: "Invitation — I of SPIKES",
      items: [
        { id: "invitation", description: "Checks how much information patient wants to receive", marks: 1, teachingPoint: "'How much detail would you like me to go into?' Some patients want everything; others need just the headline. Respecting autonomy here is essential." },
      ],
    },
    {
      id: "knowledge",
      name: "Knowledge — K of SPIKES",
      items: [
        { id: "headline", description: "Delivers diagnosis clearly, using the word 'cancer' — not euphemisms", marks: 2, detail: "2 marks for clear diagnosis, 1 if hedged/euphemistic. Avoid: 'we found some abnormal cells.'", teachingPoint: "Research shows patients who are told clearly and directly have better outcomes and satisfaction, even when the news is bad." },
        { id: "plain_language", description: "Explains in plain, understandable language — checks comprehension", marks: 1 },
        { id: "pauses", description: "Pauses after delivering the diagnosis — allows patient time to respond", marks: 1 },
        { id: "type_stage", description: "Gives basic information about type/stage at appropriate pace", marks: 1 },
        { id: "non_smoker", description: "Addresses patient's question about being a non-smoker — validates and explains", marks: 1, teachingPoint: "Adenocarcinoma NSCLC is the most common lung cancer in non-smokers. Aetiology includes passive smoke, radon, occupational exposures, and genetic mutations (EGFR, ALK) which are more prevalent and targetable in non-smokers." },
      ],
    },
    {
      id: "emotions",
      name: "Emotions & Empathy — E of SPIKES",
      items: [
        { id: "acknowledge", description: "Explicitly acknowledges patient's emotional response", marks: 2, detail: "2 marks for named emotion + validation; 1 mark if present but generic", teachingPoint: "'I can see this is a terrible shock.' Naming the emotion validates the patient's experience. Silence is also appropriate here — don't rush." },
        { id: "tissue", description: "Offers tissues or practical support during emotional response", marks: 1 },
        { id: "not_alone", description: "Reassures patient they will not be alone — team will support them", marks: 1 },
      ],
    },
    {
      id: "strategy",
      name: "Strategy & Summary — S of SPIKES",
      items: [
        { id: "next_steps", description: "Outlines clear next steps — MDT, oncology referral", marks: 1 },
        { id: "cancer_council", description: "Mentions Cancer Council or other support resources", marks: 1, teachingPoint: "Cancer Council Australia (1800 650 130) provides free, confidential support. Always mention this." },
        { id: "follow_up", description: "Arranges follow-up appointment and contact number for questions", marks: 1 },
        { id: "husband", description: "Offers to bring husband into the consultation", marks: 1 },
        { id: "summarises", description: "Summarises the key points at the end", marks: 1 },
      ],
    },
  ],

  passMark: 65,

  diagnosis: "Non-Small Cell Lung Carcinoma (adenocarcinoma), Stage IIIA",
  differentialDiagnoses: [],

  debriefSections: [
    {
      heading: "The SPIKES Protocol",
      type: "info",
      content: "SPIKES is the evidence-based framework for breaking bad news, developed by Dr. Walter Baile at MD Anderson. S — Setting up; P — Perception; I — Invitation; K — Knowledge; E — Emotions; S — Strategy and Summary. This structure ensures you don't skip crucial steps, particularly the P (perception) and I (invitation) which are most commonly missed.",
    },
    {
      heading: "Common Mistakes",
      type: "warning",
      content: "1. NOT using the word 'cancer' — using terms like 'abnormal cells' or 'a growth' leaves patients confused and anxious. Studies show patients prefer direct, clear language. 2. Rushing past the emotional response to focus on management — management details are rarely recalled in this first consultation. 3. Not checking understanding: 'Can you tell me in your own words what I've explained?' 4. Not addressing the non-smoker question — this patient explicitly needs this addressed to reduce self-blame. 5. Missing the Cancer Council referral.",
    },
    {
      heading: "Non-Smoker Lung Cancer",
      type: "tip",
      content: "10–25% of all lung cancers occur in never-smokers. Adenocarcinoma NSCLC is the predominant subtype. Risk factors include: passive smoke exposure, radon gas (important in Australia, particularly QLD/SA), occupational exposures (asbestos, diesel), and genetic mutations (EGFR, ALK, ROS1). EGFR and ALK mutations are more common in non-smokers and are targetable with oral tyrosine kinase inhibitors (erlotinib, osimertinib, alectinib) — associated with much better prognosis.",
    },
    {
      heading: "Australian Resources",
      type: "tip",
      content: "Cancer Council Australia: 13 11 20 (free, confidential support). Peter MacCallum Cancer Centre (Melbourne) — Australia's only public hospital dedicated to cancer. Lung Foundation Australia. For stage IIIA NSCLC, treatment is typically concurrent chemoradiotherapy ± consolidation durvalumab (PACIFIC trial). MDT (multidisciplinary team) meeting is mandatory before treatment commences per NHMRC guidelines.",
    },
  ],

  keyLearningPoints: [
    "Always use the SPIKES framework when breaking bad news",
    "Use the word 'cancer' — avoid euphemisms that create confusion",
    "Pause after delivering the diagnosis — allow silence, don't rush to fill it",
    "Elicit perception BEFORE giving information — meet the patient where they are",
    "Address the emotional response before giving management plans",
    "Always mention Cancer Council Australia and other support services",
    "First consultation is for breaking the news — management details can wait for the next appointment",
    "Non-smoker lung cancer is common — address this to prevent self-blame",
  ],

  australianContext: "In Australia, a new cancer diagnosis triggers a mandatory MDT meeting under the National Cancer Control Policy. Patients are entitled to a GP care plan under MBS item 723 (Chronic Disease Management). Peter MacCallum Cancer Centre, Austin Health, and Royal Melbourne Hospital are major lung cancer centres in Victoria. The Lung Foundation Australia provides specific patient support. Durvalumab (IMFINZI) is PBS-listed for stage III NSCLC following definitive chemoradiotherapy.",
};
