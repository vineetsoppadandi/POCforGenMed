import { describe, it, expect } from "vitest";
import { allCases, getCaseById, getCasesBySpecialty, getCasesByType } from "@/data/cases";
import { OSCECase } from "@/lib/types";

describe("Case data integrity", () => {
  it("loads at least 6 cases", () => {
    expect(allCases.length).toBeGreaterThanOrEqual(6);
  });

  it("every case has a unique id", () => {
    const ids = allCases.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every case has required top-level fields", () => {
    for (const c of allCases) {
      expect(c.id, `Case missing id`).toBeTruthy();
      expect(c.title, `Case ${c.id} missing title`).toBeTruthy();
      expect(c.specialty, `Case ${c.id} missing specialty`).toBeTruthy();
      expect(c.type, `Case ${c.id} missing type`).toBeTruthy();
      expect(c.difficulty, `Case ${c.id} missing difficulty`).toBeTruthy();
      expect(c.candidateBrief.length, `Case ${c.id} brief too short`).toBeGreaterThan(100);
      expect(c.patientName, `Case ${c.id} missing patient name`).toBeTruthy();
      expect(c.patientAge, `Case ${c.id} missing patient age`).toBeGreaterThan(0);
      expect(c.patientGender, `Case ${c.id} missing gender`).toBeTruthy();
      expect(c.diagnosis, `Case ${c.id} missing diagnosis`).toBeTruthy();
    }
  });

  it("every case has a reasonable time limit (5–20 minutes)", () => {
    for (const c of allCases) {
      expect(c.timeMinutes, `Case ${c.id} time invalid`).toBeGreaterThanOrEqual(5);
      expect(c.timeMinutes, `Case ${c.id} time too long`).toBeLessThanOrEqual(20);
    }
  });

  it("every case has a sensible pass mark (40–80%)", () => {
    for (const c of allCases) {
      expect(c.passMark, `Case ${c.id} pass mark invalid`).toBeGreaterThanOrEqual(40);
      expect(c.passMark, `Case ${c.id} pass mark too high`).toBeLessThanOrEqual(80);
    }
  });

  it("every case has at least one marking category", () => {
    for (const c of allCases) {
      expect(c.markingCategories.length, `Case ${c.id} has no marking categories`).toBeGreaterThan(0);
    }
  });

  it("every marking item has marks > 0 and a description", () => {
    for (const c of allCases) {
      for (const cat of c.markingCategories) {
        expect(cat.name, `Case ${c.id} has nameless category`).toBeTruthy();
        expect(cat.items.length, `Case ${c.id} cat ${cat.id} has no items`).toBeGreaterThan(0);
        for (const item of cat.items) {
          expect(item.id, `Case ${c.id} has item without id`).toBeTruthy();
          expect(item.description, `Case ${c.id} item ${item.id} missing description`).toBeTruthy();
          expect(item.marks, `Case ${c.id} item ${item.id} has 0 marks`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("total marks per case is reasonable (15–60)", () => {
    for (const c of allCases) {
      const total = c.markingCategories.reduce(
        (sum, cat) => sum + cat.items.reduce((s, item) => s + item.marks, 0),
        0
      );
      expect(total, `Case ${c.id} has ${total} marks - too few/many`).toBeGreaterThanOrEqual(15);
      expect(total, `Case ${c.id} has ${total} marks - too many`).toBeLessThanOrEqual(60);
    }
  });

  it("marking item ids are unique within a case", () => {
    for (const c of allCases) {
      const itemIds = c.markingCategories.flatMap((cat) => cat.items.map((i) => i.id));
      const uniqueIds = new Set(itemIds);
      expect(uniqueIds.size, `Case ${c.id} has duplicate marking item ids`).toBe(itemIds.length);
    }
  });

  it("every case has at least 10 scripted responses", () => {
    for (const c of allCases) {
      expect(c.scriptedResponses.length, `Case ${c.id} has too few scripted responses`).toBeGreaterThanOrEqual(10);
    }
  });

  it("every scripted response has keywords and a non-empty response", () => {
    for (const c of allCases) {
      for (const r of c.scriptedResponses) {
        expect(r.keywords.length, `Case ${c.id} response missing keywords`).toBeGreaterThan(0);
        expect(r.response.length, `Case ${c.id} response empty`).toBeGreaterThan(0);
        for (const kw of r.keywords) {
          expect(kw.length, `Case ${c.id} has empty keyword`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every case has a default response", () => {
    for (const c of allCases) {
      expect(c.defaultResponse.length, `Case ${c.id} missing default response`).toBeGreaterThan(10);
    }
  });

  it("every case has a patient system prompt for AI mode", () => {
    for (const c of allCases) {
      expect(c.patientSystemPrompt.length, `Case ${c.id} system prompt too short`).toBeGreaterThan(200);
    }
  });

  it("every case has at least 2 debrief sections", () => {
    for (const c of allCases) {
      expect(c.debriefSections.length, `Case ${c.id} has too few debrief sections`).toBeGreaterThanOrEqual(2);
      for (const s of c.debriefSections) {
        expect(s.heading.length, `Case ${c.id} debrief heading empty`).toBeGreaterThan(0);
        expect(s.content.length, `Case ${c.id} debrief content too short`).toBeGreaterThan(50);
        expect(["info", "warning", "tip", "diagnosis"]).toContain(s.type);
      }
    }
  });

  it("every case has at least 3 key learning points", () => {
    for (const c of allCases) {
      expect(c.keyLearningPoints.length, `Case ${c.id} has too few learning points`).toBeGreaterThanOrEqual(3);
    }
  });

  it("every case mentions Australian context in either the field or content", () => {
    const ausTerms = ["Australia", "PBS", "Medicare", "RACGP", "AMC", "NDSS", "Beyond Blue", "Cancer Council", "Lifeline", "NHMRC", "Australian", "RACS", "RACP"];
    for (const c of allCases) {
      const allContent = [
        c.australianContext ?? "",
        c.candidateBrief,
        c.settingDescription,
        ...c.debriefSections.map((s) => s.content),
      ].join(" ");
      const hasAustralianTerm = ausTerms.some((t) => allContent.includes(t));
      expect(hasAustralianTerm, `Case ${c.id} has no Australian context`).toBe(true);
    }
  });

  it("every case has a clinically descriptive diagnosis", () => {
    for (const c of allCases) {
      expect(c.diagnosis.length, `Case ${c.id} diagnosis too short`).toBeGreaterThan(10);
    }
  });
});

describe("Case lookup helpers", () => {
  it("getCaseById returns the correct case", () => {
    const c = getCaseById("chest-pain-history");
    expect(c).toBeTruthy();
    expect(c?.id).toBe("chest-pain-history");
    expect(c?.specialty).toBe("Emergency Medicine");
  });

  it("getCaseById returns null for unknown id", () => {
    const c = getCaseById("does-not-exist");
    expect(c).toBeNull();
  });

  it("getCasesBySpecialty filters correctly", () => {
    const psych = getCasesBySpecialty("Psychiatry");
    expect(psych.length).toBeGreaterThan(0);
    for (const c of psych) {
      expect(c.specialty).toBe("Psychiatry");
    }
  });

  it("getCasesByType filters correctly", () => {
    const history = getCasesByType("history");
    expect(history.length).toBeGreaterThan(0);
    for (const c of history) {
      expect(c.type).toBe("history");
    }
  });

  it("case types cover history, examination, communication, psychiatry, counselling", () => {
    const types = new Set(allCases.map((c) => c.type));
    expect(types.has("history")).toBe(true);
    expect(types.has("examination")).toBe(true);
    expect(types.has("communication")).toBe(true);
    expect(types.has("psychiatry")).toBe(true);
    expect(types.has("counselling")).toBe(true);
  });
});

describe("Clinical content checks (sanity)", () => {
  it("chest pain case covers SOCRATES, red flags, and CVD risk factors", () => {
    const c = getCaseById("chest-pain-history")!;
    const categoryNames = c.markingCategories.map((cat) => cat.name.toLowerCase()).join(" ");
    expect(categoryNames).toContain("socrates");
    expect(categoryNames).toContain("red flag");
    expect(categoryNames).toContain("risk factor");
  });

  it("breaking bad news case uses SPIKES framework", () => {
    const c = getCaseById("breaking-bad-news")!;
    const categoryNames = c.markingCategories.map((cat) => cat.name).join(" ");
    expect(categoryNames.toLowerCase()).toContain("setting");
    expect(categoryNames.toLowerCase()).toContain("perception");
    expect(categoryNames.toLowerCase()).toContain("knowledge");
    expect(categoryNames.toLowerCase()).toContain("emotion");
  });

  it("depression case asks about suicide directly (high marks for direct asking)", () => {
    const c = getCaseById("depression-assessment")!;
    const riskCat = c.markingCategories.find((cat) => cat.name.toLowerCase().includes("risk"));
    expect(riskCat).toBeTruthy();
    const directAsk = riskCat?.items.find((i) =>
      i.description.toLowerCase().includes("directly") || i.description.toLowerCase().includes("suicide")
    );
    expect(directAsk).toBeTruthy();
    expect(directAsk!.marks).toBeGreaterThanOrEqual(2);
  });

  it("diabetes counselling case addresses driving and hypoglycaemia", () => {
    const c = getCaseById("diabetes-counselling")!;
    const allContent = JSON.stringify(c).toLowerCase();
    expect(allContent).toContain("driv");
    expect(allContent).toContain("hypo");
    expect(allContent).toContain("ndss");
  });

  it("abdominal pain case includes ectopic pregnancy in differentials", () => {
    const c = getCaseById("abdominal-pain-history")!;
    const diffs = c.differentialDiagnoses.join(" ").toLowerCase();
    expect(diffs).toContain("ectopic");
  });

  it("cardiovascular exam case identifies mitral stenosis findings", () => {
    const c = getCaseById("cardiovascular-exam")!;
    expect(c.diagnosis.toLowerCase()).toContain("mitral");
    expect(JSON.stringify(c).toLowerCase()).toContain("rheumatic");
  });
});
