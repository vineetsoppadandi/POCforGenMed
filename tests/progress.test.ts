import { describe, it, expect, beforeEach } from "vitest";
import { getProgress, saveAttempt, getAttempt, clearAttempt, getApiKey, setApiKey } from "@/lib/progress";
import { CaseAttempt } from "@/lib/types";

describe("Progress tracking (localStorage)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty progress when nothing stored", () => {
    const progress = getProgress();
    expect(progress.attempts).toEqual([]);
    expect(progress.totalCasesAttempted).toBe(0);
    expect(progress.totalCasesCompleted).toBe(0);
    expect(progress.averageScore).toBe(0);
  });

  it("saves a single attempt", () => {
    const attempt: CaseAttempt = {
      caseId: "chest-pain-history",
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      markedItems: { site: 1, onset: 1 },
      totalScore: 2,
      maxScore: 10,
      mode: "study",
    };
    saveAttempt(attempt);
    const progress = getProgress();
    expect(progress.attempts).toHaveLength(1);
    expect(progress.attempts[0].caseId).toBe("chest-pain-history");
  });

  it("retrieves a saved attempt by id", () => {
    const attempt: CaseAttempt = {
      caseId: "depression-assessment",
      startedAt: new Date().toISOString(),
      markedItems: {},
      mode: "exam",
    };
    saveAttempt(attempt);
    const fetched = getAttempt("depression-assessment");
    expect(fetched).toBeTruthy();
    expect(fetched?.caseId).toBe("depression-assessment");
    expect(fetched?.mode).toBe("exam");
  });

  it("returns null for non-existent attempt", () => {
    const fetched = getAttempt("does-not-exist");
    expect(fetched).toBeNull();
  });

  it("overwrites existing attempt for the same caseId", () => {
    const first: CaseAttempt = {
      caseId: "chest-pain-history",
      startedAt: new Date().toISOString(),
      markedItems: { site: 0 },
      totalScore: 0,
      maxScore: 10,
      mode: "study",
    };
    saveAttempt(first);

    const second: CaseAttempt = {
      caseId: "chest-pain-history",
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      markedItems: { site: 1, onset: 1 },
      totalScore: 8,
      maxScore: 10,
      mode: "exam",
    };
    saveAttempt(second);

    const progress = getProgress();
    expect(progress.attempts).toHaveLength(1);
    expect(progress.attempts[0].totalScore).toBe(8);
    expect(progress.attempts[0].mode).toBe("exam");
  });

  it("calculates average score across completed attempts", () => {
    saveAttempt({
      caseId: "chest-pain-history",
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      markedItems: {},
      totalScore: 8,
      maxScore: 10,
      mode: "study",
    });
    saveAttempt({
      caseId: "depression-assessment",
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      markedItems: {},
      totalScore: 6,
      maxScore: 10,
      mode: "study",
    });

    const progress = getProgress();
    expect(progress.totalCasesCompleted).toBe(2);
    expect(progress.averageScore).toBe(70); // (80 + 60) / 2
  });

  it("excludes incomplete attempts from average score", () => {
    saveAttempt({
      caseId: "chest-pain-history",
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      markedItems: {},
      totalScore: 8,
      maxScore: 10,
      mode: "study",
    });
    saveAttempt({
      caseId: "depression-assessment",
      startedAt: new Date().toISOString(),
      markedItems: {},
      mode: "study",
    });

    const progress = getProgress();
    expect(progress.totalCasesAttempted).toBe(2);
    expect(progress.totalCasesCompleted).toBe(1);
    expect(progress.averageScore).toBe(80);
  });

  it("clears a specific attempt", () => {
    saveAttempt({
      caseId: "chest-pain-history",
      startedAt: new Date().toISOString(),
      markedItems: {},
      mode: "study",
    });
    saveAttempt({
      caseId: "depression-assessment",
      startedAt: new Date().toISOString(),
      markedItems: {},
      mode: "study",
    });

    clearAttempt("chest-pain-history");

    const progress = getProgress();
    expect(progress.attempts).toHaveLength(1);
    expect(progress.attempts[0].caseId).toBe("depression-assessment");
  });

  it("handles malformed JSON gracefully", () => {
    localStorage.setItem("osce_progress", "not-valid-json{");
    const progress = getProgress();
    expect(progress.attempts).toEqual([]);
  });
});

describe("API key storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty string when no key stored", () => {
    expect(getApiKey()).toBe("");
  });

  it("stores and retrieves API key", () => {
    setApiKey("sk-ant-test-key");
    expect(getApiKey()).toBe("sk-ant-test-key");
  });

  it("clears key when empty string is passed", () => {
    setApiKey("sk-ant-test");
    setApiKey("");
    expect(getApiKey()).toBe("");
  });
});
