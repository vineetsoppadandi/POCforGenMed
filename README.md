# OSCEready — OSCE Prep for Australian Medical Students

**Live site:** https://vineetsoppadandi.github.io/POCforGenMed/

AI-powered OSCE preparation platform aligned with AMC standards and Australian clinical guidelines. Practice history-taking, examinations, and communication stations with an AI patient, then self-assess against a detailed marking scheme and expert debrief.

---

## Features

- **6 OSCE stations** covering the core AMC domains
  - Chest pain history (cardiovascular)
  - Abdominal pain history (gastroenterology)
  - Cardiovascular examination (clinical skills)
  - Breaking bad news (communication)
  - Depression assessment (psychiatry)
  - Diabetes counselling (chronic disease)
- **AI patient mode** — bring your own Anthropic API key for dynamic, context-aware responses
- **Scripted fallback** — keyword-matched patient responses work with no API key
- **Self-assessment marking** with per-item teaching points
- **Expert debrief** with diagnosis, differentials, Australian clinical context, and relevant guidelines
- **Study mode vs Exam mode** — hints visible vs timed, no hints
- **Progress dashboard** — tracks your attempts and scores locally

---

## Tech stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS
- Static export → GitHub Pages
- Anthropic claude-haiku-4-5 for AI patient roleplay
- Vitest (68 tests)

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # run test suite
npm run build      # verify static export builds cleanly
```

To use AI patient mode: start a station, click **Enable AI**, and paste your Anthropic API key (`sk-ant-...`). The key is stored in your browser's localStorage only — it never leaves your machine.

---

## Deploying

The site auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

To enable for the first time: **GitHub repo → Settings → Pages → Source → GitHub Actions**.
