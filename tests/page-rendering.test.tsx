import { describe, it, expect } from "vitest";
import { allCases, getCaseById } from "@/data/cases";

/**
 * These tests verify that case data can be safely rendered as JSX —
 * no undefined fields, no broken references, no nullable structures
 * that would crash the React tree.
 */
describe("Case data — render safety", () => {
  it("every case's candidateBrief contains markdown that renders safely", () => {
    for (const c of allCases) {
      // No unclosed code blocks or markdown that could break rendering
      const tripleTick = (c.candidateBrief.match(/```/g) ?? []).length;
      expect(tripleTick % 2, `Case ${c.id} has unclosed code block`).toBe(0);
    }
  });

  it("every patient name renders without HTML injection risk", () => {
    for (const c of allCases) {
      // No raw HTML tags in patient name (React would escape but signal danger)
      expect(c.patientName, `Case ${c.id} patient name has < `).not.toContain("<");
      expect(c.patientName, `Case ${c.id} patient name has >`).not.toContain(">");
    }
  });

  it("specialty values are all valid (used for filtering)", () => {
    const validSpecialties = [
      "General Medicine", "Cardiology", "Respiratory", "Gastroenterology",
      "Neurology", "Psychiatry", "Paediatrics", "Obstetrics & Gynaecology",
      "Emergency Medicine", "General Practice", "Surgery", "Dermatology",
      "Endocrinology", "Haematology", "Infectious Disease",
    ];
    for (const c of allCases) {
      expect(validSpecialties).toContain(c.specialty);
    }
  });

  it("difficulty values are all valid", () => {
    const validDifficulties = ["Year 3", "Year 4", "Year 5", "Intern", "AMC"];
    for (const c of allCases) {
      expect(validDifficulties).toContain(c.difficulty);
    }
  });

  it("case type values are all valid", () => {
    const validTypes = ["history", "examination", "communication", "psychiatry", "counselling", "procedural"];
    for (const c of allCases) {
      expect(validTypes).toContain(c.type);
    }
  });

  it("all tags are non-empty strings", () => {
    for (const c of allCases) {
      for (const tag of c.tags) {
        expect(typeof tag).toBe("string");
        expect(tag.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("URL safety — case ids are URL-safe", () => {
  it("all case ids use kebab-case (no spaces, no special chars)", () => {
    for (const c of allCases) {
      expect(c.id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
