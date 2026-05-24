import { OSCECase } from "./types";

/**
 * Matches a student query against the case's scripted responses.
 * Uses longest-keyword-wins: more specific keywords beat shorter ones,
 * so "non-smoker" beats "know" when both appear in the query.
 */
export function matchScriptedResponse(query: string, osce: OSCECase): string {
  const lower = query.toLowerCase();
  let best: { response: string; score: number } | null = null;

  for (const r of osce.scriptedResponses) {
    for (const k of r.keywords) {
      const kLower = k.toLowerCase();
      if (lower.includes(kLower)) {
        const score = kLower.length;
        if (!best || score > best.score) {
          best = { response: r.response, score };
        }
      }
    }
  }

  return best?.response ?? osce.defaultResponse;
}
