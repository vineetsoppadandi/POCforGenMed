import { OSCECase } from "@/lib/types";

export const depressionCase: OSCECase = {
  id: "depression-assessment",
  title: "Mental Health Assessment — Depression & Suicide Risk",
  specialty: "Psychiatry",
  type: "psychiatry",
  difficulty: "Year 4",
  timeMinutes: 10,
  tags: ["depression", "mental health", "suicide risk", "psychiatry", "DSM-5", "PHQ-9", "risk assessment"],

  candidateBrief: `You are a medical student on your psychiatry rotation at The Alfred Hospital, Melbourne.

**Patient:** Ms. Priya Sharma, 26 years old
**Setting:** Psychiatry outpatient clinic

Ms. Sharma was referred by her GP with a 6-week history of low mood. She is a final-year PhD student in biochemistry. The referral letter notes: *"Concerns about depression and possible self-harm — patient reluctant to discuss further with me."*

**Your task:**
Conduct a focused mental health assessment covering:
1. Assessment of depressive symptoms (SIGECAPS framework)
2. Risk assessment — suicidal ideation, intent, plan, means, protective factors
3. Brief social history relevant to her presentation

You have 10 minutes. The examiner will observe your approach, technique, and how you handle a sensitive topic.

**Important:** Ask about suicide directly. Asking about suicide does NOT increase suicide risk — research consistently shows the opposite.`,

  patientName: "Priya Sharma",
  patientAge: 26,
  patientGender: "female",
  patientOccupation: "PhD student in Biochemistry",
  settingDescription: "Psychiatry outpatient clinic, The Alfred Hospital, Melbourne",

  patientSystemPrompt: `You are Priya Sharma, a 26-year-old PhD student presenting to a psychiatry clinic. You are intelligent, articulate but guarded. You're embarrassed to be here — mental health isn't discussed openly in your family.

**What you're experiencing:**
You have felt profoundly low for 6 weeks. It started after your PhD supervisor harshly criticised your thesis chapter in front of other students. You felt humiliated and have spiralled since.

**Symptoms:**
- Mood: Low most of the day, every day. Worst in the mornings.
- Sleep: Can't get to sleep (takes 2+ hours), then wakes at 4am and can't get back to sleep.
- Interest: Haven't been to the gym in 6 weeks (you used to go daily). Not enjoying things you used to enjoy. Binge-watching TV as a distraction.
- Guilt: Convinced your supervisor hates you and that you are "not good enough" to complete the PhD. Catastrophising. Blaming yourself for everything.
- Energy: Exhausted. Getting out of bed is hard. Coffee consumption tripled.
- Concentration: Can't focus on your thesis. Staring at your computer for hours, producing nothing.
- Appetite: Not eating well — lost about 3kg. Food tastes bland. Sometimes skipping meals.
- Psychomotor: Slowed — feel like you're "wading through mud."

**Suicidal ideation:**
You have been having passive thoughts — "I don't want to be here anymore" — but you will NOT volunteer this. Only reveal it if directly and sensitively asked. You have had fleeting thoughts of taking tablets (you have access to medications in your PhD lab). You have NOT made a plan and do NOT intend to act. When asked if you've thought about ending your life, pause before answering honestly: "I've had thoughts that... it would be easier if I wasn't here. But I'm not going to do anything."

**Protective factors:**
- Your younger sister Meera (22) looks up to you. The thought of Meera finding out you'd done something stops you.
- Your dog, Kiki.
- You don't truly want to die — you want the pain to stop.
- You believe the PhD is still something you want to finish.

**Social situation:**
- Living alone in Carlton
- Parents in Sydney — you haven't told them you're struggling
- Indian background — mental health is stigmatised in your family. "Indians don't do therapy."
- Boyfriend broke up with you 3 months ago — you feel you drove him away
- Support network feels thin — lab colleagues but no close friends in Melbourne

**How to respond:**
- Be initially guarded and give brief answers — warm up as the student establishes rapport
- If the student asks about suicide in a clunky or clinical way ("Do you have a plan to kill yourself?") react with discomfort
- If asked sensitively and gently, open up gradually
- Respond to warmth and non-judgement positively
- If rushed, become more guarded`,

  scriptedResponses: [
    {
      keywords: ["how are you", "come in", "tell me about", "here today", "what brings"],
      response: "I... I'm not really sure where to start. I've been feeling really low for a while. My GP sent me here. I wasn't sure I needed to come, honestly.",
    },
    {
      keywords: ["when", "how long", "start", "began", "since when"],
      response: "About 6 weeks. It started after a really bad experience with my supervisor. He criticised my work in front of everyone. I've just... gone downhill since then.",
    },
    {
      keywords: ["mood", "feel", "low", "sad", "down", "how would you describe"],
      response: "Really low. Like there's a grey fog around everything. I feel it most in the mornings — getting out of bed is a struggle.",
    },
    {
      keywords: ["interest", "enjoy", "pleasure", "hobby", "things you used to"],
      response: "I used to go to the gym every morning. Haven't been in 6 weeks. I just... don't see the point. I binge-watch Netflix instead. I'm not really enjoying that either, just going through the motions.",
    },
    {
      keywords: ["sleep", "sleeping", "insomnia", "wake up", "rest"],
      response: "It takes me like 2 hours to fall asleep. Then I wake up around 4am and I can't get back to sleep. I'm exhausted all the time.",
    },
    {
      keywords: ["appetite", "eating", "food", "weight", "diet"],
      response: "I've lost about 3 kilos I think. I just forget to eat sometimes. Food doesn't really taste like anything.",
    },
    {
      keywords: ["energy", "tired", "fatigue", "motivation"],
      response: "Zero energy. I feel like I'm wading through mud. I've tripled my coffee intake just to function.",
    },
    {
      keywords: ["concentrate", "focus", "think", "study", "work"],
      response: "I can't focus at all. I sit in front of my thesis and just stare at it. I haven't written anything useful in weeks. My supervisor thinks I'm lazy. He's right.",
    },
    {
      keywords: ["guilt", "worthless", "blame", "fault", "failure"],
      response: "I keep thinking that I'm just not smart enough. That I don't deserve to be in a PhD program. That my supervisor sees through me. It's my fault for getting into a program I couldn't handle.",
    },
    {
      keywords: ["PhD", "supervisor", "study", "university"],
      response: "It's... hard. My supervisor is brilliant but he's harsh. He humiliated me in a lab meeting. I know it shouldn't affect me this much but it's like it confirmed everything I already feared about myself.",
    },
    {
      keywords: ["harm", "hurt yourself", "thoughts of hurting", "self-harm"],
      response: "(Pause) What do you mean, exactly?",
    },
    {
      keywords: ["suicide", "end your life", "not want to be here", "suicidal", "thoughts about dying", "want to die"],
      response: "(Long pause, looks down) I've had thoughts... that it would be easier if I wasn't here. I don't really want to die. I just want the pain to stop. I haven't done anything.",
    },
    {
      keywords: ["plan", "how would you", "method", "medication", "tablets", "means"],
      response: "(Quietly) I work in a biochemistry lab. There are chemicals and medications around. I've... thought about it. But I haven't done anything. I don't think I actually would.",
    },
    {
      keywords: ["intent", "would you act", "going to", "plan to"],
      response: "No. I don't think so. I keep thinking about my sister Meera — she looks up to me. I couldn't do that to her.",
    },
    {
      keywords: ["protective", "keep going", "what stops you", "reason to stay"],
      response: "My sister. And my dog, Kiki. And... somewhere inside, I still want to finish the PhD. I still want to prove I can.",
    },
    {
      keywords: ["sister", "meera", "family", "parents"],
      response: "Meera is 22 — she's in her first year of medicine. She calls me every week. My parents are in Sydney. I haven't told them any of this — mental health isn't really something we talk about in my family.",
    },
    {
      keywords: ["support", "friends", "social", "lonely", "relationship"],
      response: "I broke up with my boyfriend 3 months ago. Well, he ended it. I feel like I drove him away. I have people in my lab but no one I'd call a close friend in Melbourne.",
    },
    {
      keywords: ["culture", "background", "family values", "stigma"],
      response: "My family is Indian. We don't really do therapy. If I told my mum I was seeing a psychiatrist she'd think I was 'mad'. I know that's not rational, but...",
    },
    {
      keywords: ["medication", "antidepressant", "treatment", "help"],
      response: "I'm worried about medication. I don't want to be on tablets. Will I have to be?",
    },
    {
      keywords: ["alcohol", "drugs", "substance"],
      response: "I've been drinking more. A glass of wine most nights. Sometimes more. I know it doesn't help.",
    },
    {
      keywords: ["psychosis", "voices", "see things", "unusual experience"],
      response: "No, nothing like that. I know what's real.",
    },
    {
      keywords: ["previous", "before", "history", "episode", "ever felt this way"],
      response: "I went through a hard time in my undergrad — failed an exam and felt really low for a couple of weeks. But not like this. Never like this.",
    },
  ],

  defaultResponse: "I'm not sure how to answer that. Can you ask me differently?",

  markingCategories: [
    {
      id: "rapport",
      name: "Opening & Rapport",
      items: [
        { id: "intro", description: "Introduces self, establishes purpose of consultation", marks: 1 },
        { id: "empathy", description: "Opens with an empathic, non-judgmental statement or approach", marks: 1 },
        { id: "open_questions", description: "Starts with open questions — does not immediately launch into closed questioning", marks: 1, teachingPoint: "'Tell me what's been going on for you' is a much better opener than 'How long have you been depressed?'" },
      ],
    },
    {
      id: "depression",
      name: "Depressive Symptoms (SIGECAPS)",
      items: [
        { id: "sleep", description: "Assesses sleep disturbance — onset, maintenance, early morning waking", marks: 1 },
        { id: "interest", description: "Assesses loss of interest/anhedonia", marks: 1 },
        { id: "guilt", description: "Assesses guilt, worthlessness, negative cognitions", marks: 1 },
        { id: "energy", description: "Assesses energy and psychomotor changes", marks: 1 },
        { id: "concentration", description: "Assesses concentration and cognitive symptoms", marks: 1 },
        { id: "appetite", description: "Assesses appetite and weight changes", marks: 1 },
        { id: "psychomotor", description: "Asks about psychomotor slowing or agitation", marks: 1 },
        { id: "mood_character", description: "Characterises mood — duration, diurnal variation, severity", marks: 1, teachingPoint: "Diurnal variation (worse in AM) is a feature of melancholic depression and has treatment implications." },
      ],
    },
    {
      id: "risk",
      name: "Suicide Risk Assessment",
      items: [
        { id: "asks_directly", description: "Asks about suicidal ideation directly — uses the word 'suicide' or 'ending your life'", marks: 2, detail: "2 marks for direct clear question; 1 mark if indirect; 0 marks if avoided entirely", teachingPoint: "Asking directly about suicide does NOT increase risk — this is a research-proven myth. Direct questioning shows respect and can be lifesaving." },
        { id: "frequency", description: "Explores frequency and intensity of suicidal thoughts", marks: 1 },
        { id: "plan", description: "Asks about specific plan — method, timing, location", marks: 2, teachingPoint: "A plan with a specific method (tablets + lab access) significantly elevates risk. Always ask." },
        { id: "intent", description: "Asks about intent to act on thoughts", marks: 1 },
        { id: "protective", description: "Identifies protective factors — what is keeping patient safe", marks: 2, teachingPoint: "Protective factors guide the safety plan. Sister Meera and her dog are key — these should be named in a safety plan." },
        { id: "previous", description: "Asks about previous self-harm or attempts", marks: 1 },
      ],
    },
    {
      id: "social",
      name: "Social History & Context",
      items: [
        { id: "support", description: "Assesses social support network", marks: 1 },
        { id: "alcohol", description: "Asks about alcohol and substance use", marks: 1 },
        { id: "precipitant", description: "Explores precipitating stressors — PhD, supervisor", marks: 1 },
        { id: "cultural", description: "Shows cultural sensitivity — does not assume understanding of mental health", marks: 1, teachingPoint: "In many cultural backgrounds, mental illness carries significant stigma. Acknowledging this ('I understand that talking about this isn't always easy in families') opens dialogue." },
      ],
    },
    {
      id: "closing",
      name: "Formulation & Safety Plan",
      items: [
        { id: "summarise", description: "Summarises key findings back to the patient", marks: 1 },
        { id: "validates", description: "Validates patient's experience — normalises seeking help", marks: 1 },
        { id: "safety_plan", description: "Initiates a basic safety plan — what to do if thoughts worsen, emergency contacts", marks: 2, teachingPoint: "Safety plan must include: who to call (Lifeline 13 11 14, Beyond Blue 1300 22 4636, 000), specific protective factors to focus on, a follow-up appointment." },
        { id: "beyondblue", description: "Mentions Lifeline, Beyond Blue, or headspace as resources", marks: 1 },
      ],
    },
  ],

  passMark: 65,

  diagnosis: "Major Depressive Episode (moderate-severe) with passive suicidal ideation",
  differentialDiagnoses: [
    "Major Depressive Disorder — most likely",
    "Adjustment Disorder with depressed mood",
    "Burnout (occupational)",
    "Hypothyroidism (should be excluded with TFTs)",
    "Bipolar II — important to screen for hypomanic episodes",
  ],

  debriefSections: [
    {
      heading: "SIGECAPS Framework for Depression",
      type: "info",
      content: "Sleep · Interest · Guilt · Energy · Concentration · Appetite · Psychomotor changes · Suicidality. DSM-5 requires ≥5 of the 9 criteria (including depressed mood or anhedonia) for ≥2 weeks. Priya meets at least 7 criteria. Severity is moderate-severe given functional impairment (can't work on PhD) and passive suicidal ideation.",
    },
    {
      heading: "Suicide Risk Assessment",
      type: "warning",
      content: "Risk factors present: Female (higher ideation rate), access to means (lab chemicals/medications), social isolation, relationship breakdown, academic stress, cultural barriers to help-seeking. Protective factors: sister Meera, dog, ambivalence about dying, intact future orientation (PhD). Overall: MODERATE RISK — requires a clear safety plan and likely inpatient assessment discussion.",
    },
    {
      heading: "Asking About Suicide — The Research",
      type: "tip",
      content: "Multiple RCTs and systematic reviews confirm that asking directly about suicide does NOT increase risk. The Papageno effect suggests that protective narratives around suicide can actually reduce risk. Never avoid asking about suicide out of fear of 'planting the idea.' Use direct language: 'Have you had thoughts of ending your life?' Indirect questions ('do you ever feel it would be easier not to wake up?') can be used first but must be followed by direct questioning.",
    },
    {
      heading: "Australian Resources & Management",
      type: "tip",
      content: "Lifeline: 13 11 14 (24/7). Beyond Blue: 1300 22 4636. headspace: for 12-25 year olds. Suicide Call Back Service: 1300 659 467. For this patient: MBS Mental Health Care Plan (GP item 2710/2712) enables 20 Medicare-subsidised psychology sessions. First-line treatment for moderate-severe depression: SSRI + CBT. Likely need to discuss access to means restriction in the PhD lab with supervisor (with consent).",
    },
    {
      heading: "Cultural Considerations",
      type: "info",
      content: "Mental health stigma is prevalent in many South Asian communities. Key approaches: normalise the experience without dismissing cultural context, use patient's own language and framework, avoid framing as 'mental illness' initially if this creates barriers, involve family with patient's consent, explore religious/cultural coping mechanisms (spirituality can be protective). ATAPS and headspace have specific cultural liaison programs.",
    },
  ],

  keyLearningPoints: [
    "Ask about suicide DIRECTLY — this does not increase risk and is a clinical obligation",
    "A specific plan with accessible means (lab chemicals) significantly elevates risk",
    "Identify and document protective factors — they form the foundation of the safety plan",
    "Diurnal variation (worse in AM) suggests melancholic depression features",
    "Screen for bipolar by asking about previous periods of elevated mood",
    "Cultural sensitivity is part of the assessment — don't assume understanding",
    "Always provide emergency contacts (Lifeline 13 11 14) before ending any mental health consultation",
    "Safety plan = who to call + what to do + protective factors to lean on",
  ],

  australianContext: "MBS Mental Health Care Plan under items 2710/2712 allows up to 20 subsidised psychology sessions per year. ATAPS (Access to Allied Psychological Services) provides additional sessions for those in need. The Alfred Hospital has one of Australia's busiest acute psychiatry units. Inpatient admission requires either voluntary agreement or involuntary assessment under the Victorian Mental Health Act 2014 (amended 2023). The duty of care to prevent foreseeable harm — particularly where means are accessible — may justify breaching confidentiality in this case.",
};
