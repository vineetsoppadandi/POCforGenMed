import { OSCECase } from "@/lib/types";

export const diabetesCounsellingCase: OSCECase = {
  id: "diabetes-counselling",
  title: "Starting Insulin — Type 2 Diabetes Counselling",
  specialty: "General Practice",
  type: "counselling",
  difficulty: "Year 5",
  timeMinutes: 10,
  tags: ["diabetes", "insulin", "counselling", "GP", "lifestyle", "patient education", "PBS", "NDSS"],

  candidateBrief: `You are a GP registrar at a suburban general practice in Dandenong, Melbourne.

**Patient:** Mr. Robert (Bob) Mitchell, 64 years old
**Setting:** General practice consultation

Bob was diagnosed with Type 2 Diabetes Mellitus 8 years ago. He has been managed with metformin 1g BD and empagliflozin 25mg daily for 3 years. Despite this, his HbA1c has progressively risen and is now 10.2% (88 mmol/mol) — well above the target of <7% (53 mmol/mol). He also has stage 2 hypertension and mild CKD (eGFR 58, stable) and is obese (BMI 34).

Following discussion with the endocrinology team, the decision has been made to commence **basal insulin** (insulin glargine once daily at bedtime).

**Today's task:**
Counsel Bob about starting insulin therapy. This includes:
1. Explaining WHY insulin is being started
2. Explaining HOW to take it (injection technique, dose, timing)
3. Addressing HYPOGLYCAEMIA — recognition and management
4. MONITORING — blood glucose targets, when to contact you
5. LIFESTYLE — reinforcing diet and physical activity
6. Addressing Bob's CONCERNS and FEARS about insulin

**You will NOT be asked to prescribe or calculate doses in this OSCE — focus on the counselling.**`,

  patientName: "Robert (Bob) Mitchell",
  patientAge: 64,
  patientGender: "male",
  patientOccupation: "Retired truck driver",
  settingDescription: "General practice, Dandenong, Melbourne",

  patientSystemPrompt: `You are Bob Mitchell, a 64-year-old retired truck driver with Type 2 Diabetes. You've been told you need to start insulin injections today and you are NOT happy about it.

**Your fears and concerns (reveal gradually when asked):**
1. "I don't want to inject myself — I'm terrified of needles." (Your biggest fear)
2. "Does this mean I've failed? I thought if I took my tablets I wouldn't need needles."
3. "My mate Wayne started insulin and he ended up having a terrible hypo at night. He didn't wake up properly. That really scared me."
4. "Will I lose my driving licence? I was a truckie for 40 years — can I still drive?"
5. "Is this because I didn't stick to my diet properly?"

**Your understanding of diabetes:**
- You know you have diabetes and you take "tablets" for it
- You check your blood sugar "sometimes" but not consistently — every few days
- You're not really sure what HbA1c means
- You think insulin is what people get "when it gets really bad" — end-stage

**Your lifestyle:**
- Recently retired, much less active than when driving
- Diet: BBQ, pies, loves potato chips, drinks about 4 stubbies of beer most evenings
- Weight has gone up about 5kg since retirement
- Wife Julie is very supportive — she'd like to come to appointments but he preferred to come alone today

**Your mood:**
- Initially resistant and a bit grumpy
- Underneath, you're scared — scared of needles, scared of what this means for your health
- If the doctor is empathic and non-judgmental, you open up and become more cooperative
- If the doctor is rushed or dismissive, you become more guarded

**Things you respond well to:**
- Being treated as an adult who can manage this
- Practical explanations — "this is how you do it"
- Being told it's not your fault / not a failure
- When the doctor addresses your specific concerns about driving and hypos

**What you will ask at some point:**
- "So do I take this with my other tablets or instead of them?"
- "How long will I have to do this for?"
- "Will my blood sugar go too low?"
- "What's the NDSS? My mate mentioned it."`,

  scriptedResponses: [
    {
      keywords: ["how are you", "come in", "today", "how do you feel about"],
      response: "Not great, honestly. I've been dreading this appointment. I knew it was coming but I still didn't want to hear it.",
    },
    {
      keywords: ["understand", "know about", "hear about", "think about insulin", "feel about insulin"],
      response: "I know it means needles. I'm not going to lie — I hate needles. Never liked them. Also feels like I've failed, you know? Like I couldn't manage my diabetes properly.",
    },
    {
      keywords: ["fail", "fault", "blame", "didn't", "should have"],
      response: "My mate Kevin always said if you eat right and take your tablets you won't need needles. So I must have done something wrong.",
    },
    {
      keywords: ["not your fault", "diabetes progresses", "natural", "common", "many people"],
      response: "Oh... I didn't know that. I thought it was just my diet.",
    },
    {
      keywords: ["why", "reason", "explain", "HbA1c", "blood sugar", "not controlled"],
      response: "Right... my blood sugar's been too high for too long. I get that. What's HbA1c exactly? My doctor mentions it but I've never fully understood it.",
    },
    {
      keywords: ["HbA1c", "three month", "average", "90 day"],
      response: "Ah okay, so it's like an average over 3 months. That makes sense. Mine's been going up I think.",
    },
    {
      keywords: ["inject", "injection", "needle", "pen", "how to"],
      response: "So I have to stab myself with a needle? Every day? (grimaces) Alright... I suppose I can handle it. How big is the needle?",
    },
    {
      keywords: ["small", "thin", "tiny needle", "4mm", "pen device", "insulin pen"],
      response: "Oh, that's much smaller than I imagined. Like a blood test needle?",
    },
    {
      keywords: ["where", "inject where", "abdomen", "stomach", "thigh", "site"],
      response: "I see. So I just rotate around the belly area. That's not too bad I suppose.",
    },
    {
      keywords: ["when", "timing", "bedtime", "night", "morning", "glargine"],
      response: "So once at night before bed. That's simple enough. And I just keep taking my other tablets too?",
    },
    {
      keywords: ["tablets", "metformin", "keep taking", "continue", "empagliflozin"],
      response: "Right. So the tablets and the injection. Okay. And the empagliflozin — I heard you have to be careful with that when you're on insulin?",
    },
    {
      keywords: ["hypo", "low blood sugar", "hypoglycaemia", "too low"],
      response: "Yeah, this is what worries me most actually. My mate Wayne had a really bad hypo on insulin — his wife found him confused in the middle of the night. Scared the life out of both of them. How common is that?",
    },
    {
      keywords: ["symptom", "recognise", "shaky", "sweaty", "feel", "sign of hypo"],
      response: "So shaking, sweating, feeling confused... how will I know it's a hypo and not just... feeling off?",
    },
    {
      keywords: ["treat", "hypo treatment", "juice", "glucose", "15-15", "sugary", "dextrose"],
      response: "So have something sugary straight away. Like juice or a glucose tablet. Then have something more substantial. Okay, I can remember that.",
    },
    {
      keywords: ["drive", "licence", "car", "driving", "trucking"],
      response: "This is a big one for me. I was a truckie for 40 years — I still drive. If I have a hypo while driving that's terrifying. Am I allowed to drive on insulin?",
    },
    {
      keywords: ["check", "before driving", "monitor", "test before", "licence conditional"],
      response: "So I need to check my blood sugar before every drive. And keep glucose tablets in the car. Can I still drive my own car, like to the shops?",
    },
    {
      keywords: ["NDSS", "National Diabetes Services", "strips", "supplies", "subsidised"],
      response: "My mate mentioned the NDSS. What's that exactly?",
    },
    {
      keywords: ["national diabetes", "diabetes australia", "subsidised", "NDSS", "strips"],
      response: "So I can get my testing strips cheaper through that? I should sign up. How do I do that?",
    },
    {
      keywords: ["monitor", "check blood sugar", "glucometer", "BSL", "how often", "target"],
      response: "I check it every couple of days at the moment. Is that enough?",
    },
    {
      keywords: ["target", "goal", "aim for", "6-8", "before meals"],
      response: "Okay, so 6-8 in the morning before I eat. Got it. What about after meals?",
    },
    {
      keywords: ["diet", "eat", "food", "carbohydrate", "lifestyle"],
      response: "I know, I know — I should cut back on the chips and pies. And the beer. My wife keeps telling me too. (sighs) I've been eating worse since I retired.",
    },
    {
      keywords: ["alcohol", "beer", "drink"],
      response: "About 4 stubbies most evenings. Sometimes more on weekends.",
    },
    {
      keywords: ["beer hypo", "alcohol hypo", "alcohol blood sugar"],
      response: "Oh, I didn't know alcohol could cause a hypo. That's really good to know.",
    },
    {
      keywords: ["exercise", "activity", "walk", "physical"],
      response: "I used to be active trucking — loading and unloading. Since I retired I just sit around really. I know I need to do more.",
    },
    {
      keywords: ["diabetes educator", "education", "dietitian", "support"],
      response: "A diabetes educator? I didn't know that was a thing. Is that covered by Medicare?",
    },
    {
      keywords: ["how long", "forever", "permanent", "stop insulin", "come off"],
      response: "Will I be on insulin forever? Is there any chance I could come off it if I lose weight?",
    },
    {
      keywords: ["summary", "recap", "questions", "anything else", "understand"],
      response: "I think so... it's a lot to take in. My wife will probably have questions too. Can she come next time?",
    },
  ],

  defaultResponse: "Sorry, I didn't quite catch that. Can you explain it again?",

  markingCategories: [
    {
      id: "opening",
      name: "Opening the Consultation",
      items: [
        { id: "intro", description: "Introduces self, checks patient identity", marks: 1 },
        { id: "perception", description: "Elicits patient's current understanding and expectations before explaining", marks: 1, teachingPoint: "'Before I explain the plan, can you tell me what you already know about insulin?' — This prevents information mismatch and respects patient knowledge." },
        { id: "concerns", description: "Actively invites concerns early — 'Is there anything in particular worrying you about this?'", marks: 1 },
        { id: "empathy", description: "Acknowledges patient's resistance/fear without dismissing it", marks: 1 },
      ],
    },
    {
      id: "why_insulin",
      name: "Explaining Why Insulin is Needed",
      items: [
        { id: "not_failure", description: "Explicitly addresses that starting insulin is NOT a personal failure — diabetes is progressive", marks: 2, detail: "2 marks for clear normalisation; 1 mark if mentioned briefly", teachingPoint: "Studies show that framing insulin as 'failure' causes significant psychological insulin resistance. Always counter this narrative directly." },
        { id: "HbA1c", description: "Explains HbA1c in plain language — 3-month average, what 10.2% means", marks: 1 },
        { id: "harm", description: "Briefly explains harm of prolonged hyperglycaemia — eyes, kidneys, feet, heart", marks: 1 },
      ],
    },
    {
      id: "how_to",
      name: "How to Take Insulin",
      items: [
        { id: "type", description: "Explains type of insulin — basal/long-acting, once daily, bedtime", marks: 1 },
        { id: "needle", description: "Reassures about needle size — small pen needle (4-6mm), painless", marks: 1, teachingPoint: "Many patients' fear of insulin is based on memories of older, larger needles. Modern insulin pen needles are 4-6mm — thinner than a human hair. Demonstrating the pen device dramatically reduces fear." },
        { id: "injection_site", description: "Explains injection sites — abdomen (best absorption), thigh, upper arm; rotation", marks: 1 },
        { id: "storage", description: "Mentions storage — fridge until opened, room temperature once in use, discard after 28-30 days", marks: 1 },
        { id: "timing", description: "Confirms timing — bedtime, once daily. Continue existing tablets", marks: 1 },
      ],
    },
    {
      id: "hypoglycaemia",
      name: "Hypoglycaemia Education",
      items: [
        { id: "definition", description: "Defines hypoglycaemia — BSL <4mmol/L", marks: 1 },
        { id: "symptoms", description: "Lists symptoms — sweating, tremor, pallor, confusion, hunger, heart racing", marks: 1 },
        { id: "treatment", description: "Explains 15-15 rule — 15g fast-acting carbs, recheck in 15 mins, then complex carbs", marks: 2, teachingPoint: "15g fast-acting glucose = 150mL fruit juice, 3-4 glucose tablets, 6-7 jellybeans. NOT chocolate (fat slows absorption). Then eat a small snack containing complex carbs." },
        { id: "nocturnal", description: "Addresses nocturnal hypo risk specifically — relate to patient's concern about his friend Wayne", marks: 1 },
        { id: "alcohol_hypo", description: "Warns that alcohol can mask hypo symptoms AND cause delayed hypoglycaemia", marks: 1, teachingPoint: "Alcohol inhibits hepatic gluconeogenesis — the liver can't raise blood sugar when it's metabolising alcohol. Hypos can occur 4-6 hours after drinking. Always eat when drinking." },
      ],
    },
    {
      id: "monitoring",
      name: "Blood Glucose Monitoring",
      items: [
        { id: "frequency", description: "Advises daily fasting BSL monitoring initially, then adjust", marks: 1 },
        { id: "targets", description: "States targets — fasting BSL 6-8 mmol/L, 2hr post-prandial <10 mmol/L", marks: 1 },
        { id: "record", description: "Advises keeping a glucose diary — shows doctor at next appointment", marks: 1 },
        { id: "ndss", description: "Mentions NDSS — National Diabetes Services Scheme for subsidised strips and supplies", marks: 1, teachingPoint: "NDSS provides heavily subsidised blood glucose test strips, lancets, and insulin syringes. Registration through Diabetes Australia is free and takes 5 minutes. PBS covers insulin glargine." },
      ],
    },
    {
      id: "driving",
      name: "Driving & Diabetes",
      items: [
        { id: "driving_advice", description: "Addresses driving specifically — check BSL before every drive", marks: 2, detail: "2 marks for complete advice including BSL check AND glucose in car; 1 mark for partial", teachingPoint: "Austroads/RACGP Guidelines: Private vehicle licence holders on insulin must check BSL <30 mins before driving and must NOT drive if BSL <5 mmol/L. They may drive if BSL ≥5 and no symptoms of hypoglycaemia. Glucose should be in the vehicle. Heavy vehicle commercial licences require specialist review — previously not possible, but conditional commercial licences are now available in some states." },
        { id: "glucose_car", description: "Advises keeping glucose tablets/snack in the car", marks: 1 },
        { id: "commercial", description: "Mentions commercial licence requirements differ — advise to check with licencing authority", marks: 1 },
      ],
    },
    {
      id: "lifestyle",
      name: "Lifestyle & Follow-up",
      items: [
        { id: "diet", description: "Reinforces dietary advice — reduces chips, pies, alcohol (non-judgmental)", marks: 1 },
        { id: "exercise", description: "Encourages physical activity — aim 150 mins moderate activity per week", marks: 1 },
        { id: "educator", description: "Refers to Diabetes Educator and/or Dietitian (both PBS-subsidised under CDM plan)", marks: 1, teachingPoint: "A GP Management Plan (GPMP) + Team Care Arrangement (TCA) enables 5 subsidised allied health visits per year. Always refer T2DM patients to a diabetes educator and dietitian." },
        { id: "follow_up", description: "Arranges early follow-up (1-2 weeks) to review BSL diary and dose titration", marks: 1 },
        { id: "safety_net", description: "Provides clear instructions on when to call — BSL consistently <4 or >15, confusion, vomiting", marks: 1 },
      ],
    },
    {
      id: "communication",
      name: "Communication & Patient Centredness",
      items: [
        { id: "check_understanding", description: "Uses teach-back — 'Can you tell me in your own words what to do if you feel shaky?'", marks: 2, teachingPoint: "Teach-back is the most evidence-based method to confirm health literacy and understanding. It is not a test of the patient — it's a test of your explanation." },
        { id: "plain_language", description: "Uses plain language — avoids medical jargon", marks: 1 },
        { id: "written", description: "Offers written information — medication instructions, Diabetes Australia pamphlets", marks: 1 },
        { id: "wife", description: "Invites wife to future appointment — family involvement in chronic disease management", marks: 1 },
      ],
    },
  ],

  passMark: 60,

  diagnosis: "Type 2 Diabetes Mellitus — poorly controlled, commencing insulin glargine",
  differentialDiagnoses: [],

  debriefSections: [
    {
      heading: "Psychological Insulin Resistance",
      type: "warning",
      content: "The most common barrier to starting insulin is psychological insulin resistance (PIR) — the patient's belief that insulin represents failure, is dangerous, or will cause complications. Up to 50% of patients resist insulin initiation. Key strategies: (1) Normalise — 'diabetes is a progressive condition; it's not your fault'; (2) Address myths directly; (3) Start low, go slow with dosing; (4) Use the pen device to demonstrate that injection is not as feared. PIR is a stronger predictor of HbA1c than clinical factors.",
    },
    {
      heading: "Driving & Insulin in Australia",
      type: "info",
      content: "Austroads/National Transport Commission Guidelines (2022): Private vehicle (Group 1) drivers on insulin must: check BSL <30 mins before driving, not drive if BSL <5 mmol/L, have glucose accessible in vehicle, recheck every 2 hours on long journeys. Commercial/heavy vehicle (Group 2) licence holders — insulin was previously an absolute contraindication. Since 2019, conditional licences are possible following specialist review, but this is complex and state-dependent. Bob should be advised to notify the licencing authority (VicRoads in VIC) — failure to disclose is a legal offence.",
    },
    {
      heading: "NDSS & PBS — Australian Context",
      type: "tip",
      content: "National Diabetes Services Scheme (NDSS): Register through Diabetes Australia. Provides heavily subsidised blood glucose test strips, lancets, insulin syringes, and CGMS. Insulin glargine (Lantus, Basaglar, Semglee) is PBS-listed for T2DM requiring insulin. Empagliflozin should be continued with insulin for cardiovascular benefit, but the dose may need review given CKD (eGFR 58 — still above the 30 threshold for empagliflozin use). CDM plan (GPMP + TCA) allows 5 free allied health visits — always set this up for newly insulin-dependent T2DM patients.",
    },
    {
      heading: "Insulin Initiation — The Evidence",
      type: "info",
      content: "UKPDS and subsequent studies show HbA1c reduction of 1-2% with basal insulin addition. Starting dose: typically 10 units or 0.2 units/kg/day. Titrate up by 2 units every 3 days until fasting BSL 4-7 mmol/L (treat-to-target). If hypoglycaemia occurs or BSL <4: reduce dose by 10-20%. The 301 trial and INSIGHT trial support once-daily glargine or degludec as first-line basal insulin. Degludec (Tresiba) has a lower nocturnal hypoglycaemia rate and may be preferred in patients at high hypo risk.",
    },
    {
      heading: "What Students Commonly Miss",
      type: "warning",
      content: "1. Not addressing psychological insulin resistance — jumping straight to 'how to inject' without addressing the 'why am I doing this and am I a failure?' 2. Not explaining hypos specifically — especially nocturnal risk and alcohol interaction. 3. Forgetting the driving advice — this has legal and safety implications. 4. Not mentioning NDSS. 5. Not using teach-back. 6. Not inviting the wife / carer — family support is one of the strongest predictors of diabetes self-management success.",
    },
  ],

  keyLearningPoints: [
    "Psychological insulin resistance is common — always address 'this is NOT failure'",
    "Teach-back is the gold standard for checking understanding in counselling stations",
    "15-15 rule for hypos: 15g fast-acting carbs, wait 15 mins, recheck BSL",
    "Alcohol causes delayed hypoglycaemia (4-6 hours post-drinking) — critical safety advice",
    "Driving on insulin: check BSL <30 mins before driving, don't drive if BSL <5 mmol/L",
    "NDSS provides subsidised supplies — register through Diabetes Australia",
    "Always involve family/carer — diabetes self-management is a family affair",
    "Refer to Diabetes Educator AND Dietitian under CDM plan (5 free allied health visits)",
  ],

  australianContext: "Australia has one of the highest rates of T2DM in the developed world, with over 1.3 million Australians diagnosed. The NDSS is a critical government program subsidising diabetes supplies. PBS-listed basal insulins include: glargine U100 (Lantus), glargine U300 (Toujeo), degludec (Tresiba). GPs can initiate insulin with CDM support — specialist referral is not mandatory. The RACGP's Red Book (Preventive Activities in General Practice) and Diabetes Australia guidelines provide the framework for GP-based diabetes management.",
};
