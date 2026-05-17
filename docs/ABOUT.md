# About the Masterclass

## Why this exists

Anthropic's [Founder's Playbook](https://www.anthropic.com/founders-playbook) is one of the most concrete pieces of AI-native company-building advice published in 2026. It's also a 50-page document — and the gap between "I read it once" and "I've internalized it" is the gap most readers never close.

This masterclass closes that gap by turning passive reading into active practice:

- **Quizzes after every concept** force you to apply the idea rather than nod through it.
- **Drills with randomized question pools** give you reps until the patterns become reflex.
- **A certification exam** holds you to an 80% bar across every stage at once.
- **A field guide** gives you a place to come back to when you forget which trap is which.

By the time you've cleared all four stages, the five drills, and the exam, you've genuinely internalized the playbook — not just read it.

---

## What you'll learn

The playbook organizes the AI-native startup journey into four stages plus a "reboot" chapter that resets your mental model going in. The masterclass mirrors that structure exactly.

### Chapter 0 — The Reboot

What AI actually changed about the startup lifecycle. The founder-as-orchestrator role. The three superpowers (research, agentic coding, workflow automation). Picking the right Claude surface (Chat / Cowork / Code) for the task in front of you.

### Chapter 1 — Idea Stage

The discipline of writing a hypothesis you can actually falsify. The three-yeses exit condition (real problem, willing buyer, viable path). The three traps founders fall into at this stage. Devil's-advocate validation. How to map a competitive landscape without flattering yourself. Customer discovery interviews that produce signal instead of noise.

### Chapter 2 — MVP Stage

Why "agentic technical debt" is the new technical debt — and why `CLAUDE.md` files are the highest-leverage thing you'll write this month. Scope discipline. The shape of "false PMF" and how to spot it. The Sean Ellis test and the effort test as PMF gates.

### Chapter 3 — Launch Stage

The three exit conditions from launch. The founder bottleneck (when you become the constraint). Why security is a workstream, not a quarter-end task. Building a product-management OS that doesn't depend on the founder running point on every decision.

### Chapter 4 — Scale Stage

The moat through accumulated depth. The data flywheel. Workflow lock-in. The three exit forms — and what each one actually optimizes for.

---

## Design philosophy

A few intentional choices worth surfacing:

### Sequential chapter unlocks

The stages build on each other. A founder who hasn't internalized the Reboot's mental model is going to bounce off the MVP chapter's "agentic technical debt" framing. Forcing sequential completion is a feature, not a paywall. (If you want everything open from the start for review — easy patch; see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md).)

### XP and badges

The 7-tier progression (Aspiring Founder → AI-Native Master) and the mastery badges aren't there to gamify the playbook into nonsense. They're there to give a tangible signal of progress that maps to a real curriculum milestone. Hitting Tier 4 actually means you cleared Chapter 2 with a Mastery Check above the threshold — not that you tapped a button 40 times.

### Drills are endless

The five drills (Pick the Right Claude, Spot the Trap, Hypothesis Lab, Signal vs. Noise, Interview Auditor) pull from question pools and re-randomize on every retake. The point isn't to score 100% once. It's to score 100% three times in a row, weeks apart, with the patterns burned in.

### The exam is hard

24 questions, 80% to certify, scenario-heavy. Most are pulled from situations a real founder hits in the first 18 months — not from textbook definitions. If you can clear the exam cold without retaking it, you can probably make most of the calls the playbook is preparing you for.

### Inline-styled palette

The dark, slightly-warm color palette (`#161310` background, `#df8a5f` accent, `#e0b15f` gold) is intentional — it reads as "studio" rather than "dashboard." All colors live in the `C` object at the top of `App.tsx`. Tailwind handles layout; inline styles handle color, so theme changes are a single object edit.

### Source-grounded everything

Every quiz answer's "why" explanation, every exam scenario, and every drill question is anchored to a specific passage in the source playbook. The original PDF lives at [`docs/source/`](source/) so you can verify any claim back to the canonical reference.

---

## What this is *not*

- **Not a replacement for the playbook.** Read the PDF first. The masterclass is built to deepen that reading, not to replace it.
- **Not a course on how to use Claude.** It's a course on how to *think* about company-building in the AI-native era. Claude is the tooling layer the playbook assumes — and the masterclass assumes you have at least some familiarity with it.
- **Not an Anthropic product.** This is an unofficial educational adaptation. If you want the canonical Anthropic experience, go to [anthropic.com/founders-playbook](https://www.anthropic.com/founders-playbook).

---

## Who built this

This started as a single Claude.ai artifact — built by Michael Fernandez and Claude (Opus 4.7), end-to-end in one session, from the published playbook PDF. The artifact is the masterclass; this repo packages it as a runnable Vite project anyone can clone, deploy, and remix.

If you make changes worth sharing — a corrected exam question, a new drill, a chapter update for a future playbook version — see [`CONTRIBUTING.md`](../CONTRIBUTING.md).
