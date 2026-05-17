# The Founder's Playbook — Interactive Masterclass

An interactive learning experience built from Anthropic's [Founder's Playbook](https://www.anthropic.com/founders-playbook). It turns the playbook into a guided 5-chapter curriculum with inline quizzes, five repeatable skill drills, a 24-question certification exam, and a searchable field guide — with XP, mastery badges, and a 7-tier founder progression that persists across sessions.

By the time someone clears all four stages, the drills, and the exam, they've genuinely internalized the playbook — not just read it.

---

> [!Warning]
> The contents of this repo are personal and reflect my own interests, not those of my employer, any firm I am or have been affiliated with, or any of their clients. Nothing posted here constitutes legal, financial, investment, tax, or any other professional advice, is intended to be relied upon as such, or creates an attorney-client, fiduciary, or other professional relationship. All content is provided as-is, for personal and educational purposes only, without any representation or warranty of accuracy, completeness, or fitness for any particular purpose. 

"I’m still a dumb shit who doesn’t know much relative to what I need to know." - Ray Dalio

---

## Live demo

Once you push this repo to GitHub and enable Pages (see [Deploy](#deploy)), the masterclass will be live at:

```
https://<your-github-username>.github.io/<your-repo-name>/
```

You can also run it locally — see [Quickstart](#quickstart).

---

## What's inside

### The Journey — 5 sequential chapters

Each chapter weaves teaching slides with inline quizzes and tap-to-sort exercises, then closes with a Mastery Check.

| # | Chapter | What you learn |
|---|---|---|
| 0 | **The Reboot** | Why the lifecycle is rebooted, the founder-as-orchestrator, the three superpowers, and the Chat / Cowork / Code surfaces |
| 1 | **Idea Stage** | Testable hypotheses, the three-yeses exit, the three traps, devil's-advocate validation, competitive tiers, customer discovery |
| 2 | **MVP Stage** | Agentic technical debt, CLAUDE.md, scope discipline, false PMF, the Sean Ellis and effort tests |
| 3 | **Launch Stage** | The three exit conditions, the founder bottleneck, security as a workstream, the product-management OS |
| 4 | **Scale Stage** | The moat through accumulated depth, the data flywheel, workflow lock-in, the three exit forms |

Chapters unlock sequentially — the playbook's stages build on each other.

<img width="559" height="884" alt="Screenshot 2026-05-16 at 10 58 29 PM" src="https://github.com/user-attachments/assets/69683fb1-10f3-4533-81f0-6faa89e6cb84" />


### Five Skill Drills — endless repeatable practice

- **Pick the Right Claude** — match the task to the right surface (Chat / Cowork / Code)
- **Spot the Trap** — flag pivot, premature scaling, and tech-debt traps before they bite
- **Hypothesis Lab** — write a testable hypothesis that survives a falsifiability check
- **Signal vs. Noise** — separate real validation signal from noisy enthusiasm
- **Interview Auditor** — audit customer-interview questions for bias, leading language, and missing follow-ups

### The Certification Exam

24 scenario-heavy questions spanning every stage. 80% to certify. Full answer review on submit. AI-Native Founder certificate on completion.

### The Field Guide

Searchable reference of stages, surfaces, principles, and real founder stories — for when you just want to look something up.

<img width="559" height="751" alt="Screenshot 2026-05-16 at 10 59 54 PM" src="https://github.com/user-attachments/assets/7d07d250-6906-4aa5-a063-c4d7f23d2608" />

### Progression

A 7-tier founder ladder from **Aspiring Founder** to **AI-Native Master**, with XP for chapters, drills, and the exam. Progress persists across sessions via `localStorage`.

---

## Quickstart

```bash
# 1. Clone
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install (Node 20+ recommended — see .nvmrc)
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Progress is auto-saved to your browser's `localStorage`.

### Other scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server at `:5173`, hot-reloads on save |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serves the production build locally (useful before deploying) |
| `npm run typecheck` | Runs `tsc --noEmit` to catch type errors |

---

## Tech stack

- **[React 18](https://react.dev)** — UI runtime
- **[Vite 5](https://vitejs.dev)** — build tool + dev server
- **[TypeScript 5](https://www.typescriptlang.org)** — typing
- **[Tailwind CSS 3](https://tailwindcss.com)** — styling (JIT mode, arbitrary values welcome)
- **[lucide-react](https://lucide.dev)** — icon set

The masterclass itself is a single React component (`src/App.tsx`, ~1,665 lines) — no router, no global state library, no external API. State is local; progress is shimmed to `localStorage` in `src/main.tsx`.

---

## Project structure

```
.
├── .github/workflows/deploy-pages.yml   # GitHub Pages CI
├── docs/
│   ├── ABOUT.md                          # the design philosophy behind the masterclass
│   ├── ARCHITECTURE.md                   # how the code is organized
│   └── source/
│       └── The-Founders-Playbook-05062026_v3.pdf   # original Anthropic playbook
├── public/                               # static assets (currently empty)
├── src/
│   ├── App.tsx                           # the masterclass — chapters, drills, exam, guide
│   ├── main.tsx                          # React mount + window.storage → localStorage shim
│   ├── index.css                         # Tailwind directives + base styles
│   └── vite-env.d.ts                     # Vite + window.storage TS declarations
├── index.html                            # Vite entry
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── .nvmrc                                # Node 20
├── CONTRIBUTING.md
├── LICENSE                               # MIT (code) — see notes about playbook content
└── README.md
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for a deeper walkthrough of how `App.tsx` is laid out (curriculum data model, drill engine, exam, field guide).

---

## Deploy

### GitHub Pages (one-click, included)

This repo ships a workflow at [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) that builds and publishes the site to GitHub Pages on every push to `main`.

To turn it on:

1. Push to GitHub.
2. In the repo settings: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push to `main` (or trigger the workflow manually under **Actions**). The first run will publish the site at `https://<your-username>.github.io/<your-repo-name>/`.

The workflow auto-detects the repo name and sets Vite's `base` path to match — you don't have to edit anything.

### Vercel

1. Import the repo in Vercel.
2. Framework preset: **Vite**.
3. No env vars needed. Default build command (`npm run build`) and output dir (`dist`) work as-is.

### Netlify

1. New site → Import from GitHub.
2. Build command: `npm run build`. Publish directory: `dist`.

### Any static host

`npm run build` produces a fully static `dist/` directory. Drop it on any static host (Cloudflare Pages, S3 + CloudFront, your own nginx, etc.). For path-prefixed hosting set `BASE_PATH=/your-prefix/` before the build.

---

## The source playbook

The masterclass content is built from Anthropic's [Founder's Playbook](https://www.anthropic.com/founders-playbook). The version this app was adapted from is included verbatim at [`docs/source/The-Founders-Playbook-05062026_v3.pdf`](docs/source/The-Founders-Playbook-05062026_v3.pdf) so you can compare any chapter, drill question, or exam item back to the source.

If you want the canonical reference, read the PDF cover-to-cover first. The masterclass is built to deepen that reading, not to replace it.

---

## Contributing

PRs and issues welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how curriculum is structured, how to add a new drill or exam question, and the conventions the codebase follows.

Two common contributions worth flagging:

- **Adding a chapter or drill** — both follow well-defined shapes in `App.tsx` (`CURRICULUM` array for chapters, `DRILLS` array for drills). The README in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) walks through the data shapes.
- **Updating to a newer playbook version** — drop the new PDF into `docs/source/`, bump the filename, and update [`docs/ABOUT.md`](docs/ABOUT.md) and any chapters that have new material.

---

## License & credits

- **Code** is MIT licensed — see [`LICENSE`](LICENSE).
- **The Founder's Playbook content** is the intellectual property of [Anthropic, PBC](https://www.anthropic.com). This project is an unofficial educational adaptation built for personal learning. All chapter text, drill scenarios, and exam questions are derived from the publicly published playbook with attribution.
- **Built with [Claude](https://claude.com)**. The masterclass artifact was originally generated as a Claude.ai artifact, then ported to a runnable Vite project.

If you're at Anthropic and want this taken down or restructured, open an issue.
