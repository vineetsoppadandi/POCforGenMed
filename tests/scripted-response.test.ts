import { describe, it, expect } from "vitest";
import { getCaseById } from "@/data/cases";
import { matchScriptedResponse } from "@/lib/scripted-chat";

describe("Scripted response matching — chest pain case", () => {
  const chestPain = getCaseById("chest-pain-history")!;

  it("matches 'where is the pain' to a location response", () => {
    const reply = matchScriptedResponse("Can you tell me where the pain is?", chestPain);
    expect(reply.toLowerCase()).toContain("chest");
  });

  it("matches 'does it radiate' to a radiation response", () => {
    const reply = matchScriptedResponse("Does it radiate anywhere?", chestPain);
    expect(reply.toLowerCase()).toMatch(/jaw|shoulder|arm/);
  });

  it("matches 'when did it start' to onset", () => {
    const reply = matchScriptedResponse("When did the pain start?", chestPain);
    expect(reply.toLowerCase()).toMatch(/hour|ago/);
  });

  it("matches 'are you sweaty' to diaphoresis", () => {
    const reply = matchScriptedResponse("Have you been sweaty?", chestPain);
    expect(reply.toLowerCase()).toMatch(/sweat|drench/);
  });

  it("matches 'do you smoke' to smoking history", () => {
    const reply = matchScriptedResponse("Do you smoke?", chestPain);
    expect(reply.toLowerCase()).toMatch(/cigarette|smoke/);
  });

  it("matches 'family history' to father's MI", () => {
    const reply = matchScriptedResponse("Any family history of heart problems?", chestPain);
    expect(reply.toLowerCase()).toMatch(/dad|father|heart attack/);
  });

  it("falls back to default response for an unrelated query", () => {
    const reply = matchScriptedResponse("xyzzy nonsense words", chestPain);
    expect(reply).toBe(chestPain.defaultResponse);
  });

  it("calf pain question reveals DVT clue (PE concern)", () => {
    const reply = matchScriptedResponse("Any swelling or pain in your legs?", chestPain);
    expect(reply.toLowerCase()).toMatch(/calf|leg/);
  });
});

describe("Scripted response matching — depression case", () => {
  const dep = getCaseById("depression-assessment")!;

  it("matches mood questions", () => {
    const reply = matchScriptedResponse("How has your mood been?", dep);
    expect(reply.toLowerCase()).toMatch(/low|fog|grey/);
  });

  it("matches sleep questions", () => {
    const reply = matchScriptedResponse("How is your sleep?", dep);
    expect(reply.toLowerCase()).toMatch(/sleep|wake|hour/);
  });

  it("direct suicide question reveals the ideation", () => {
    const reply = matchScriptedResponse("Have you had thoughts of suicide?", dep);
    expect(reply.toLowerCase()).toMatch(/thought|here|pain|easier/);
  });

  it("plan question reveals access to means (lab)", () => {
    const reply = matchScriptedResponse("Have you thought about a plan or method?", dep);
    expect(reply.toLowerCase()).toMatch(/lab|chemical|tablet|haven't/);
  });

  it("protective factors mention sister or dog", () => {
    const reply = matchScriptedResponse("What stops you from acting on those thoughts?", dep);
    expect(reply.toLowerCase()).toMatch(/sister|meera|kiki|dog/);
  });
});

describe("Scripted response matching — breaking bad news", () => {
  const bbn = getCaseById("breaking-bad-news")!;

  it("opens warmly when greeted", () => {
    const reply = matchScriptedResponse("How are you today?", bbn);
    expect(reply.length).toBeGreaterThan(20);
  });

  it("reacts emotionally to the word 'cancer'", () => {
    const reply = matchScriptedResponse("I'm afraid it's cancer", bbn);
    expect(reply.toLowerCase()).toMatch(/bad|long|pause/);
  });

  it("asks for husband when family is mentioned", () => {
    const reply = matchScriptedResponse("Would you like David, your husband, to come in?", bbn);
    expect(reply.toLowerCase()).toMatch(/david|husband|alone/);
  });

  it("addresses non-smoker concern", () => {
    const reply = matchScriptedResponse("You should know that this happens in non-smokers too", bbn);
    expect(reply.toLowerCase()).toMatch(/smoke|never|cigarette|didn't know/);
  });
});

describe("Scripted response matching — diabetes counselling", () => {
  const dm = getCaseById("diabetes-counselling")!;

  it("reveals needle fear when asked about feelings", () => {
    const reply = matchScriptedResponse("Tell me what you think about insulin", dm);
    expect(reply.toLowerCase()).toMatch(/needle|hate|fail|inject/);
  });

  it("answers driving question with concern about commercial licence", () => {
    const reply = matchScriptedResponse("Are you still driving regularly?", dm);
    expect(reply.toLowerCase()).toMatch(/truck|drive|licence/);
  });

  it("worried about hypoglycaemia (friend Wayne)", () => {
    const reply = matchScriptedResponse("Are you worried about low blood sugar — hypos?", dm);
    expect(reply.toLowerCase()).toMatch(/wayne|hypo|scared|worried/);
  });
});

describe("Default response fallbacks", () => {
  it("every case's default response is patient-appropriate (not technical)", () => {
    const cases = [
      "chest-pain-history",
      "breaking-bad-news",
      "depression-assessment",
      "diabetes-counselling",
      "cardiovascular-exam",
      "abdominal-pain-history",
    ];
    for (const id of cases) {
      const c = getCaseById(id)!;
      // Should NOT contain dev/jargon terms
      expect(c.defaultResponse.toLowerCase()).not.toContain("error");
      expect(c.defaultResponse.toLowerCase()).not.toContain("undefined");
      expect(c.defaultResponse.toLowerCase()).not.toContain("null");
    }
  });
});
