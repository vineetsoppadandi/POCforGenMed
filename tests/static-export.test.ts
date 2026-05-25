import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT_DIR = resolve(__dirname, "../out");
const BASE_PATH = "/POCforGenMed";

function walk(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function extractInternalLinks(html: string): string[] {
  const hrefs = new Set<string>();
  const matches = html.matchAll(/href="([^"]+)"/g);
  for (const m of matches) {
    const href = m[1];
    if (!href.startsWith(BASE_PATH)) continue;
    if (href.includes("_next/")) continue;
    const path = href.split("?")[0].split("#")[0];
    hrefs.add(path);
  }
  return [...hrefs];
}

function linkToFile(href: string): string {
  const relative = href.replace(BASE_PATH, "").replace(/^\//, "").replace(/\/$/, "");
  if (!relative) return join(OUT_DIR, "index.html");
  const asIndex = join(OUT_DIR, relative, "index.html");
  const asHtml = join(OUT_DIR, `${relative}.html`);
  if (existsSync(asIndex)) return asIndex;
  if (existsSync(asHtml)) return asHtml;
  return asIndex;
}

describe("Static export integrity", () => {
  let htmlFiles: string[] = [];

  beforeAll(() => {
    htmlFiles = walk(OUT_DIR);
  });

  it("out/ directory exists with HTML files", () => {
    expect(existsSync(OUT_DIR)).toBe(true);
    expect(htmlFiles.length).toBeGreaterThan(0);
  });

  it("generates landing page", () => {
    expect(existsSync(join(OUT_DIR, "index.html"))).toBe(true);
  });

  it("generates cases library page", () => {
    expect(existsSync(join(OUT_DIR, "cases/index.html"))).toBe(true);
  });

  it("generates dashboard page", () => {
    expect(existsSync(join(OUT_DIR, "dashboard/index.html"))).toBe(true);
  });

  it("generates 404 page", () => {
    expect(existsSync(join(OUT_DIR, "404.html"))).toBe(true);
  });

  it.each([
    "chest-pain-history",
    "abdominal-pain-history",
    "cardiovascular-exam",
    "breaking-bad-news",
    "depression-assessment",
    "diabetes-counselling",
  ])("generates case page: %s", (caseId) => {
    expect(existsSync(join(OUT_DIR, `cases/${caseId}/index.html`))).toBe(true);
  });

  it("includes .nojekyll to prevent GitHub Pages from blocking _next/", () => {
    expect(existsSync(join(OUT_DIR, ".nojekyll"))).toBe(true);
  });

  it("applies basePath to all internal links", () => {
    const landing = readFileSync(join(OUT_DIR, "index.html"), "utf-8");
    const rawInternalLinks = [...landing.matchAll(/href="(\/[^"]*)"/g)]
      .map((m) => m[1])
      .filter((h) => !h.startsWith(BASE_PATH));
    expect(rawInternalLinks).toEqual([]);
  });

  it("applies basePath to static asset prefix", () => {
    const landing = readFileSync(join(OUT_DIR, "index.html"), "utf-8");
    expect(landing).toContain(`${BASE_PATH}/_next/`);
    expect(landing).not.toMatch(/src="\/_next\//);
    expect(landing).not.toMatch(/href="\/_next\//);
  });

  it("every internal link resolves to a generated file", () => {
    const broken: { from: string; to: string }[] = [];

    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf-8");
      const links = extractInternalLinks(html);
      for (const link of links) {
        const target = linkToFile(link);
        if (!existsSync(target)) {
          broken.push({ from: file.replace(OUT_DIR, ""), to: link });
        }
      }
    }

    if (broken.length > 0) {
      console.error("\nBroken internal links:");
      for (const b of broken) {
        console.error(`  ${b.from}  →  ${b.to}`);
      }
    }

    expect(broken).toEqual([]);
  });

  it("HTML files contain non-trivial content (not blank)", () => {
    for (const file of htmlFiles) {
      const content = readFileSync(file, "utf-8");
      expect(content.length).toBeGreaterThan(500);
      expect(content).toContain("<!DOCTYPE html>");
      expect(content).toContain("</html>");
    }
  });

  it("landing page renders core branding", () => {
    const landing = readFileSync(join(OUT_DIR, "index.html"), "utf-8");
    expect(landing).toMatch(/OSCEready/);
  });

  it("each case page renders the patient name and brief", () => {
    const caseToPatient: Record<string, string> = {
      "chest-pain-history": "Kovacs",
      "abdominal-pain-history": "",
      "cardiovascular-exam": "",
      "breaking-bad-news": "",
      "depression-assessment": "",
      "diabetes-counselling": "",
    };

    for (const [caseId] of Object.entries(caseToPatient)) {
      const file = join(OUT_DIR, `cases/${caseId}/index.html`);
      const content = readFileSync(file, "utf-8");
      expect(content, `${caseId} should have content`).toContain("Candidate Brief");
      expect(content, `${caseId} should have start button`).toContain("Start Station");
    }
  });
});
