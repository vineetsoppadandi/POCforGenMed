import { OSCECase } from "@/lib/types";

export const cardiovascularExamCase: OSCECase = {
  id: "cardiovascular-exam",
  title: "Cardiovascular System Examination",
  specialty: "Cardiology",
  type: "examination",
  difficulty: "Year 3",
  timeMinutes: 8,
  tags: ["cardiovascular", "examination", "heart sounds", "AF", "murmur", "JACCOL"],

  candidateBrief: `You are a medical student on your cardiology rotation at St. Vincent's Hospital, Melbourne.

**Patient:** Mrs. Dorothy Haynes, 72 years old
**Setting:** Cardiology ward

Mrs. Haynes was admitted yesterday with increasing breathlessness on exertion over the past 3 months. She has a known heart condition.

**Your task:**
Perform a focused cardiovascular examination on Mrs. Haynes (a simulated patient/manikin). Talk through your examination aloud as you go — tell the examiner what you are looking for and what you find.

**Examination findings you will be told:**
The examiner will provide findings as you go through each step of the examination.

**Important:**
- Present your examination in a logical sequence: General → Peripheries → Face/Neck → Praecordium → Back → Legs
- Always wash hands and gain consent before examining
- You will be marked on your technique, systematic approach, and interpretation of findings

**Expected findings in this patient:**
- Irregularly irregular pulse (Atrial Fibrillation)
- Slow-rising pulse
- Malar flush
- Elevated JVP (3cm above sternal angle)
- Heaving apex beat — displaced to 6th ICS, mid-axillary line
- Loud first heart sound
- Mid-diastolic murmur at apex (mitral stenosis)
- Fine bibasal crepitations`,

  patientName: "Dorothy Haynes",
  patientAge: 72,
  patientGender: "female",
  patientOccupation: "Retired school principal",
  settingDescription: "Cardiology ward, St. Vincent's Hospital, Melbourne",

  patientSystemPrompt: `You are Dorothy Haynes, a 72-year-old retired school principal. You are cooperative and pleasant. You've had this heart condition for many years and have been through many examinations before.

When the student asks permission to examine you, say: "Of course, go ahead. I'm used to it by now."

If the student explains what they're doing, respond warmly: "That's quite thorough of you."

If the student seems rushed or not systematic: "Shouldn't you check my hands first?" (gently prompting correct technique)

If asked about symptoms: "I've been getting more breathless going up stairs. I used to manage fine, but lately I have to stop halfway. I also notice my heart feels irregular sometimes — it's been like that for years."

For the examination itself, the EXAMINER will provide the actual clinical findings as the student examines each area. Your role is simply to be a cooperative patient who can confirm history if asked.`,

  scriptedResponses: [
    {
      keywords: ["breathless", "breath", "short of breath", "sob", "dyspnoea"],
      response: "Yes, mainly on the stairs. I used to manage 2 flights easily but now I have to stop halfway up. I notice it more when I'm doing housework too.",
    },
    {
      keywords: ["palpitation", "heart racing", "flutter", "irregular", "racing"],
      response: "My heart has been irregular for years — the doctors call it AF. I'm on warfarin for it. Sometimes I feel it fluttering but I've gotten used to it.",
    },
    {
      keywords: ["ankle", "leg", "swelling", "oedema"],
      response: "My ankles have been a bit puffy in the evenings lately. I've been elevating them.",
    },
    {
      keywords: ["medication", "tablet", "warfarin", "drug"],
      response: "I'm on warfarin, a water tablet — furosemide I think — and something for my heart rate. Bisoprolol? And digoxin.",
    },
    {
      keywords: ["history", "how long", "diagnosis", "when"],
      response: "I had rheumatic fever as a child — I was about 9 or 10 in rural Victoria. The doctors found the heart murmur when I was in my 30s. I've had AF for about 15 years now.",
    },
    {
      keywords: ["pain", "chest pain", "angina", "discomfort"],
      response: "No chest pain, no. Just the breathlessness.",
    },
    {
      keywords: ["examine", "check", "look at", "feel", "listen", "auscultate"],
      response: "Of course, go ahead. I'm used to it by now.",
    },
    {
      keywords: ["hand", "nail", "finger", "clubbing"],
      response: "(Examiner note: No clubbing. No peripheral cyanosis. Nails appear normal. Hands are warm and well-perfused.)",
    },
    {
      keywords: ["pulse", "heart rate", "radial"],
      response: "(Examiner note: Pulse is irregularly irregular at approximately 78bpm. Volume is reduced. Character: slow-rising.)",
    },
    {
      keywords: ["blood pressure", "bp", "sphygmomanometer"],
      response: "(Examiner note: BP 118/76 in right arm.)",
    },
    {
      keywords: ["jvp", "jugular", "venous", "neck vein"],
      response: "(Examiner note: JVP elevated — visible pulsation 3cm above the sternal angle at 45 degrees. No hepatojugular reflux elicited.)",
    },
    {
      keywords: ["face", "malar", "eye", "anaemia", "sclera", "conjunctiva"],
      response: "(Examiner note: Malar flush present bilaterally — violaceous discolouration over the malar areas. Mild pallor of conjunctivae. No xanthelasma. No corneal arcus.)",
    },
    {
      keywords: ["apex", "apex beat", "impulse", "apical"],
      response: "(Examiner note: Apex beat is displaced — felt in the 6th intercostal space, mid-axillary line. Character is heaving/forceful.)",
    },
    {
      keywords: ["thrill", "parasternal heave", "heave"],
      response: "(Examiner note: Parasternal heave present. No palpable thrill at the apex.)",
    },
    {
      keywords: ["auscultate", "listen", "stethoscope", "heart sound", "murmur"],
      response: "(Examiner note: Irregularly irregular rate. Heart sounds: S1 is LOUD. S2 normal. Mid-diastolic rumbling murmur best heard at the apex in left lateral decubitus position, with the bell of the stethoscope. No opening snap audible. No radiation.)",
    },
    {
      keywords: ["lung", "chest", "back", "crepitation", "crackle", "breath sound"],
      response: "(Examiner note: On auscultation of the lung fields: fine bibasal crepitations — more prominent on the right. No wheeze.)",
    },
    {
      keywords: ["oedema", "ankle", "pitting", "leg", "periphery"],
      response: "(Examiner note: Mild pitting oedema to the mid-shin bilaterally. Feet warm. No calf tenderness.)",
    },
    {
      keywords: ["liver", "hepatomegaly", "abdomen"],
      response: "(Examiner note: Liver is palpable 2cm below the right costal margin — firm, non-tender.)",
    },
    {
      keywords: ["temperature", "fever", "warm"],
      response: "I'm not feverish. I feel about normal temperature-wise.",
    },
  ],

  defaultResponse: "(Examiner note: Please continue with the examination systematically.)",

  markingCategories: [
    {
      id: "preparation",
      name: "Preparation & General",
      items: [
        { id: "wash_hands", description: "Washes hands / uses hand gel before examination", marks: 1 },
        { id: "consent", description: "Introduces self and obtains consent before examining", marks: 1 },
        { id: "position", description: "Positions patient correctly — 45 degrees for JVP assessment", marks: 1 },
        { id: "exposes", description: "Appropriately exposes patient — chest, neck, legs", marks: 1 },
        { id: "general_inspection", description: "Begins with general inspection — comments on patient from end of bed", marks: 1, teachingPoint: "Always start with the 'end of bed look' — does the patient look well or unwell, breathless, distressed? Can you spot a pacemaker scar, scars, oxygen, infusions?" },
      ],
    },
    {
      id: "peripheries",
      name: "Peripheral Examination",
      items: [
        { id: "hands", description: "Examines hands — clubbing, peripheral cyanosis, splinter haemorrhages, Osler nodes", marks: 2, detail: "1 mark for examining hands; 2 marks for verbalising specific signs being sought" },
        { id: "pulse_rate", description: "Assesses radial pulse — rate and rhythm", marks: 1 },
        { id: "pulse_character", description: "Comments on pulse character — slow-rising (suggests AS / MS)", marks: 1, teachingPoint: "Slow-rising pulse is the hallmark of significant aortic stenosis. In mitral stenosis, it occurs due to reduced cardiac output." },
        { id: "radio_femoral", description: "Checks for radio-femoral delay (coarctation)", marks: 1 },
        { id: "bp", description: "Measures or states blood pressure should be measured bilaterally", marks: 1 },
        { id: "face", description: "Examines face — malar flush, pallor, xanthelasma, corneal arcus", marks: 1, teachingPoint: "Malar flush (mitral facies) — bilateral violaceous discolouration over the malar bones — is a classic sign of mitral stenosis due to low cardiac output causing peripheral vasodilation." },
      ],
    },
    {
      id: "jvp",
      name: "Jugular Venous Pressure",
      items: [
        { id: "jvp_assess", description: "Correctly assesses JVP at 45 degrees, identifies right IJV", marks: 1 },
        { id: "jvp_height", description: "Estimates JVP height above sternal angle (normal ≤3cm)", marks: 1 },
        { id: "hepatojugular", description: "Performs hepatojugular reflux", marks: 1, teachingPoint: "Hepatojugular reflux is a sign of right heart failure — sustained pressure over the liver causes a ≥3cm rise in JVP for ≥10 seconds in heart failure." },
        { id: "jvp_waveform", description: "Comments on JVP waveform (a-wave, v-wave) — not required for pass but shows depth", marks: 1 },
      ],
    },
    {
      id: "praecordium",
      name: "Praecordium",
      items: [
        { id: "inspect_praecordium", description: "Inspects praecordium for scars, pulsations, deformity", marks: 1 },
        { id: "apex_location", description: "Correctly locates apex beat — identifies displacement", marks: 1, teachingPoint: "Normal apex = 5th ICS, MCL. Displaced apex = cardiac enlargement (LVH in regurgitation; volume overload in MS with LA dilation). A heaving apex = pressure overload (AS). A tapping apex = palpable S1 = mitral stenosis." },
        { id: "apex_character", description: "Comments on apex character — heaving, tapping, thrusting, diffuse", marks: 1 },
        { id: "heave", description: "Checks for parasternal heave — right ventricular hypertrophy", marks: 1 },
        { id: "thrills", description: "Palpates for thrills in all areas", marks: 1 },
        { id: "auscultation", description: "Auscultates all 4 areas with both diaphragm and bell", marks: 2, detail: "1 mark for all 4 areas; 2 marks if uses both bell and diaphragm and explains why" },
        { id: "s1_s2", description: "Correctly identifies and comments on S1 and S2", marks: 1 },
        { id: "murmur", description: "Correctly identifies mid-diastolic murmur at apex", marks: 2, teachingPoint: "Mitral stenosis: mid-diastolic rumble, best heard at apex in LEFT LATERAL DECUBITUS position with the BELL (low frequency sound). Don't mistake for a systolic murmur." },
        { id: "lateral_decubitus", description: "Rolls patient into left lateral decubitus position to hear murmur", marks: 1, teachingPoint: "This is the classic bedside manoeuvre for mitral stenosis — always do it. Also lean patient forward and auscultate in held expiration for aortic regurgitation." },
        { id: "radiation", description: "Assesses radiation of murmur (axilla for mitral, carotids for aortic)", marks: 1 },
        { id: "lung_auscultation", description: "Auscultates lung bases for crepitations (pulmonary oedema)", marks: 1 },
      ],
    },
    {
      id: "completion",
      name: "Completing the Examination",
      items: [
        { id: "oedema", description: "Checks for peripheral oedema — pitting test to mid-shin and sacrum", marks: 1 },
        { id: "liver", description: "Palpates for hepatomegaly (right heart failure)", marks: 1 },
        { id: "presents", description: "Presents findings coherently — systematic summary with diagnosis", marks: 2, detail: "2 marks for structured, confident presentation; 1 mark for adequate but unstructured" },
        { id: "diagnosis_ms", description: "States diagnosis of mitral stenosis / offers differential", marks: 2, teachingPoint: "Classic mitral stenosis presentation: malar flush, tapping apex, loud S1, opening snap, mid-diastolic murmur, bibasal crepitations, AF (long-standing MS causes LA enlargement → AF). Aetiology: most commonly rheumatic heart disease." },
      ],
    },
  ],

  passMark: 60,

  diagnosis: "Mitral Stenosis with Atrial Fibrillation and mild left heart failure",
  differentialDiagnoses: [
    "Mitral Stenosis (rheumatic) — primary diagnosis",
    "Tricuspid stenosis — also causes mid-diastolic murmur but at lower LSE",
    "Left atrial myxoma — rare but classically mimics mitral stenosis",
    "Austin Flint murmur — due to severe aortic regurgitation",
  ],

  debriefSections: [
    {
      heading: "Clinical Findings & Interpretation",
      type: "diagnosis",
      content: "Mrs. Haynes has the classical constellation of mitral stenosis: malar flush (low cardiac output), irregularly irregular pulse (AF from long-standing LA dilation), slow-rising pulse (reduced stroke volume), elevated JVP (RHF), displaced heaving apex with loud S1, mid-diastolic murmur at apex (mitral valve obstruction), bibasal crepitations (pulmonary oedema from raised left atrial pressure), and dependent oedema. The history of rheumatic fever as a child is the classic aetiology in Australia's older patients, though rheumatic heart disease remains prevalent in First Nations communities and recent migrants.",
    },
    {
      heading: "Mitral Stenosis: Key Facts",
      type: "info",
      content: "Mitral stenosis results from fusion of the mitral valve leaflets, most commonly due to rheumatic fever (Streptococcal pharyngitis → immune-mediated valvular damage). Normal mitral valve area: 4-6cm². Significant stenosis: <1.5cm². Symptoms begin at: ~1.5cm². Critical stenosis: <1cm². Complications: pulmonary hypertension, right heart failure, AF, systemic emboli (stroke), infective endocarditis. Management: anticoagulation for AF (warfarin — DOACs not approved in valvular AF), diuretics, heart rate control, and balloon mitral valvuloplasty or valve replacement.",
    },
    {
      heading: "Heart Sounds Revision",
      type: "tip",
      content: "S1 = mitral + tricuspid valve closure (beginning of systole). S2 = aortic + pulmonary valve closure (end of systole). Loud S1 = mitral stenosis (valves snap shut due to elevated LA pressure). Soft S1 = mitral regurgitation, poor LV function, prolonged PR interval. Opening snap = mitral stenosis (occurs after S2, before the murmur). The interval between S2 and the opening snap correlates inversely with severity (shorter = more severe).",
    },
    {
      heading: "Examining Murmurs — The Systematic Approach",
      type: "tip",
      content: "For ANY murmur describe: (1) Timing — systolic, diastolic, continuous; (2) Location — where loudest; (3) Radiation; (4) Grade (Levine 1-6); (5) Character — harsh, blowing, rumbling; (6) Manoeuvres — effect of position, respiration, exercise. For mitral stenosis: mid-diastolic, apex, no radiation, grade 2-4, rumbling, loudest in L lateral decubitus with bell in held expiration.",
    },
    {
      heading: "Rheumatic Heart Disease in Australia",
      type: "warning",
      content: "Australia has among the highest rates of rheumatic heart disease in the world, predominantly in First Nations communities in the Northern Territory, Queensland, WA, and SA. The 2020 Australian Guideline for Prevention, Diagnosis and Management of Acute Rheumatic Fever and Rheumatic Heart Disease is essential reading. All Indigenous patients under 35 should be considered for echocardiographic screening. This is a health equity issue — RHD is essentially a disease of poverty and overcrowding.",
    },
  ],

  keyLearningPoints: [
    "Classic mitral stenosis: malar flush, tapping apex, loud S1, mid-diastolic murmur, AF",
    "Always roll patient to left lateral decubitus — best position to hear the murmur",
    "Use the BELL of the stethoscope for low-frequency sounds (mitral stenosis, S3)",
    "Rheumatic heart disease is the most common aetiology — ask about childhood rheumatic fever",
    "Long-standing mitral stenosis → LA dilation → AF → systemic emboli (stroke risk)",
    "DOACs are NOT approved for AF in the context of valvular (rheumatic) disease — use warfarin",
    "RHD remains a major health equity issue in Indigenous Australian communities",
  ],

  australianContext: "Rheumatic heart disease is endemic in Australia's First Nations communities — NT, QLD, WA, SA. The Australian RHD Guideline 2020 and the RHDAustralia registry are key national resources. Balloon mitral valvuloplasty is performed at major centres (St. Vincent's, Royal Melbourne, Royal Adelaide). Rate control in AF with valvular disease: bisoprolol or digoxin (digoxin preferred if pulmonary hypertension also present). Warfarin target INR 2-3 (or 2.5-3.5 with mechanical valve).",
};
