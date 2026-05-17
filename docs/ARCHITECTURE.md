# Architecture

The masterclass is intentionally simple: one component file, one entry point, one stylesheet. No router, no state library, no API layer. Everything you need to understand the app is in three files.

```
src/
├── App.tsx        # the masterclass (~1,665 lines)
├── main.tsx       # React mount + window.storage → localStorage shim
└── index.css      # Tailwind directives + base styles
```

This document walks through `App.tsx` top to bottom, explains the data shapes, and points to the extension points if you want to remix it.

---

## File map of `App.tsx`

Roughly in order:

| Lines | Section | What's there |
|---|---|---|
| 1–7 | Imports | React + lucide-react icons (the only external deps) |
| 9–17 | Theme palette (`C`) | All colors as hex strings. Single source of truth for visual identity. |
| 18–22 | Block constructor helpers | `r` (read), `q` (question), `sort` (sort-into-buckets) — used to build curriculum data |
| 24–~700 | `CURRICULUM` array | The 5 chapters and their blocks |
| ~700–730 | `DRILLS` array | The 5 endlessly-repeatable drill definitions |
| ~730–745 | Progress persistence | `loadProgress` / `saveProgress` using `window.storage` (shimmed to `localStorage` in `main.tsx`) |
| ~745–760 | XP system | `computeXP` and `levelFor` — the 7-tier ladder |
| ~760–~900 | `EXAM` array | The 24 certification questions |
| ~900–1000 | `FieldGuide` data + component | The searchable reference |
| ~1000–1300 | Block renderers | `ReadBlock`, `QuestionBlock`, `SortBlock` |
| ~1300–1440 | `ChapterPlayer` | Walks a learner through one chapter's blocks |
| ~1440–1500 | `DrillPlayer` / `ExamPlayer` | Generic question runner used by drills and exam |
| 1430–1576 | `Home` | Top-level dashboard with chapter cards, drill cards, exam, guide |
| 1578–1665 | `App` (default export) | Root state, view routing, top bar |

---

## Data model

The curriculum is structured data, not JSX. That's the single most important design decision in this codebase.

### A chapter

```ts
{
  id: "idea",               // kebab-case, used as a state key
  n: 1,                     // ordinal — gates sequential unlock
  icon: Lightbulb,          // lucide-react component
  title: "Idea Stage",
  sub: "Validation before you build",
  intro: "Short paragraph shown on the chapter card.",
  blocks: [
    // read blocks, question blocks, sort blocks — in order
  ],
  check: [
    // Mastery Check questions (q-blocks only) shown at the end
  ],
}
```

### A read block — `r(tag, title, body, bullets?, note?, kind?)`

```ts
r("TAG", "Slide title", ["paragraph 1", "paragraph 2"], ["bullet 1", "bullet 2"], { label: "Key idea", text: "..." })
```

- `tag` — small uppercase label (the orange "THE SHIFT", "THE MAP" pills)
- `title` — slide headline
- `body` — string or array of paragraphs
- `bullets` — optional array; renders as a bullet list
- `note` — optional callout `{ label, text }` rendered in an accent box
- `kind` — optional `"big"` to render the title larger

### A question block — `q(question, options, answerIndex, why)`

```ts
q("What did AI change about the lifecycle?",
  ["A", "B", "C", "D"],
  1,                                  // index of correct answer
  "Why B is right — and what the others miss.")
```

### A sort block — `sort(prompt, categories, items, why)`

```ts
sort("Match each task to a superpower.",
  [{ id: "res", label: "Research" }, { id: "code", label: "Coding" }],
  [{ x: "synthesize a competitor scan", c: "res" },
   { x: "refactor auth", c: "code" }],
  "Research is synthesis; coding is software.")
```

### A drill

```ts
{
  id: "pick-claude",
  title: "Pick the Right Claude",
  blurb: "Match the task to Chat / Cowork / Code.",
  icon: MessageSquare,
  hue: "#df8a5f",                     // accent color for the drill card + player
  questions: [
    // q(...) or sort(...) blocks — both supported
  ],
}
```

### Progress

`progress` is a single object:

```ts
{
  chapters: { [id]: { done: boolean, check: number /* % */ } },
  drills:   { [id]: number /* best % */ },
  exam:     number /* best % */,
}
```

It's loaded from `window.storage` on mount and persisted on every state change.

---

## State and routing

There's no router. The root component has four pieces of state:

```ts
const [progress, setProgress] = useState(blankProgress());
const [view, setView]         = useState<"home" | "chapter" | "drill" | "exam" | "guide">("home");
const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
const [activeDrill, setActiveDrill]     = useState<Drill | null>(null);
```

Navigation is a switch in the render tree. Browser history is intentionally not wired in — the back button takes you out of the app rather than back a screen, which is fine for a single-page learning tool.

If you want browser-back to navigate views, the easiest patch is `react-router-dom` with five routes (`/`, `/chapter/:id`, `/drill/:id`, `/exam`, `/guide`). It's a 50-line change.

---

## Storage shim

The original artifact was built for the Claude.ai sandbox, which exposes `window.storage`. In a browser we shim it in `main.tsx`:

```ts
window.storage = window.storage || {
  get: async (k) => {
    const v = window.localStorage.getItem(k);
    return v != null ? { value: v } : null;
  },
  set: async (k, v) => window.localStorage.setItem(k, v),
};
```

The shim is intentionally permissive (catches storage-quota errors silently) because progress data is recoverable — a learner can always redo a chapter. If you swap localStorage for an actual backend, replace this shim and the rest of the app is unchanged.

---

## Styling

The split is deliberate:

- **Colors** live in the `C` object at the top of `App.tsx` and are applied as inline `style={{...}}` props. This makes theme changes a single edit.
- **Layout** uses Tailwind utility classes (`flex`, `gap-2`, `text-[14px]`, `rounded-2xl`, etc.). Arbitrary values like `text-[14px]` are common — they work in Tailwind 3+ JIT.

`src/index.css` has the Tailwind directives plus a base reset (full-height root, dark background fallback, system font).

The `tailwind.config.js` also re-exports the `C` palette under a `playbook` namespace (e.g. `text-playbook-accent`) — useful if you want to add components that use Tailwind for color instead of inline styles.

---

## Build & deploy

- **Dev:** `npm run dev` — Vite at `:5173` with HMR.
- **Build:** `npm run build` — emits `dist/`. Set `BASE_PATH=/your-prefix/` if hosting under a path (GitHub Pages does this automatically via the included workflow).
- **Preview:** `npm run preview` — serves `dist/` so you can sanity-check the production bundle before deploying.

The GitHub Actions workflow at `.github/workflows/deploy-pages.yml` is straightforward: checkout, `npm ci`, `npm run build` with `BASE_PATH` set to `/<repo-name>/`, upload `dist/` as a Pages artifact, deploy.

---

## Extension points

If you want to remix:

| To do this | Edit |
|---|---|
| Add a chapter | `CURRICULUM` array |
| Add a drill | `DRILLS` array |
| Add an exam question | `EXAM` array |
| Change a color | `C` object at top of `App.tsx` |
| Change a font / base reset | `src/index.css` |
| Wire browser history | Add a router in `App.tsx` |
| Replace progress storage with an API | Rewrite `loadProgress` / `saveProgress` |
| Unlock all chapters from the start | Remove the `unlocked` check in `Home` |
| Make the exam available immediately | Set `examUnlocked = true` unconditionally in `Home` |

Each one is a single-file change.
