"use client";

import { UserProgress, CaseAttempt } from "./types";

const STORAGE_KEY = "osce_progress";
const API_KEY_STORAGE = "osce_anthropic_key";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return JSON.parse(raw) as UserProgress;
  } catch {
    return emptyProgress();
  }
}

export function saveAttempt(attempt: CaseAttempt): void {
  if (typeof window === "undefined") return;
  const progress = getProgress();
  const existing = progress.attempts.findIndex((a) => a.caseId === attempt.caseId);
  if (existing >= 0) {
    progress.attempts[existing] = attempt;
  } else {
    progress.attempts.push(attempt);
  }
  recalcStats(progress);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getAttempt(caseId: string): CaseAttempt | null {
  const progress = getProgress();
  return progress.attempts.find((a) => a.caseId === caseId) ?? null;
}

export function clearAttempt(caseId: string): void {
  if (typeof window === "undefined") return;
  const progress = getProgress();
  progress.attempts = progress.attempts.filter((a) => a.caseId !== caseId);
  recalcStats(progress);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(API_KEY_STORAGE) ?? "";
}

export function setApiKey(key: string): void {
  if (typeof window === "undefined") return;
  if (key) {
    localStorage.setItem(API_KEY_STORAGE, key);
  } else {
    localStorage.removeItem(API_KEY_STORAGE);
  }
}

function recalcStats(progress: UserProgress): void {
  const completed = progress.attempts.filter((a) => a.completedAt && a.totalScore !== undefined);
  progress.totalCasesAttempted = progress.attempts.length;
  progress.totalCasesCompleted = completed.length;
  progress.averageScore =
    completed.length > 0
      ? completed.reduce((sum, a) => sum + (a.totalScore! / (a.maxScore || 1)) * 100, 0) /
        completed.length
      : 0;
}

function emptyProgress(): UserProgress {
  return {
    attempts: [],
    totalCasesAttempted: 0,
    totalCasesCompleted: 0,
    averageScore: 0,
    specialtyBreakdown: {},
  };
}
