import { OSCECase } from "@/lib/types";
import { chestPainCase } from "./chest-pain";
import { breakingBadNewsCase } from "./breaking-bad-news";
import { depressionCase } from "./depression-assessment";
import { cardiovascularExamCase } from "./cardiovascular-exam";
import { diabetesCounsellingCase } from "./diabetes-counselling";
import { abdominalPainCase } from "./abdominal-pain";

export const allCases: OSCECase[] = [
  chestPainCase,
  abdominalPainCase,
  cardiovascularExamCase,
  breakingBadNewsCase,
  depressionCase,
  diabetesCounsellingCase,
];

export function getCaseById(id: string): OSCECase | null {
  return allCases.find((c) => c.id === id) ?? null;
}

export function getCasesBySpecialty(specialty: string): OSCECase[] {
  return allCases.filter((c) => c.specialty === specialty);
}

export function getCasesByType(type: string): OSCECase[] {
  return allCases.filter((c) => c.type === type);
}

export {
  chestPainCase,
  breakingBadNewsCase,
  depressionCase,
  cardiovascularExamCase,
  diabetesCounsellingCase,
  abdominalPainCase,
};
