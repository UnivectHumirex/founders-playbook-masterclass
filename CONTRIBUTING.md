# Contributing

Thanks for your interest. The masterclass is small enough that the contribution flow is intentionally light. Two rules of thumb:

1. **The curriculum is the product.** The interesting work is in the chapter text, drill scenarios, and exam questions — not the framework around them. Treat content edits with the same care you'd treat a chapter rewrite.
2. **Source-grounded edits beat improvisations.** If you're adding or changing curriculum, anchor it to a specific passage in [`docs/source/The-Founders-Playbook-05062026_v3.pdf`](docs/source/The-Founders-Playbook-05062026_v3.pdf) (or a newer published version). Include the page number in your PR description.

---

## Dev setup

```bash
git clone https://github.com/<you>/<repo>.git
cd <repo>
npm install      # Node 20+ — see .nvmrc
npm run dev      # http://localhost:5173
```

Before opening a PR:

```bash
npm run typecheck   # tsc --noEmit
npm run build       # make sure the production bundle still compiles
```

---

## Repo layout

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the deep dive. The short version:

| Path | What lives here |
|---|---|
| `src/App.tsx` | The entire masterclass — curriculum data, drills, exam, field guide, all React components |
| `src/main.tsx` | React mount + the `window.storage → localStorage` shim |
| `src/index.css` | Tailwind directives + base reset |
| `docs/source/` | The original Anthropic playbook PDF |
| `docs/ABOUT.md` | Design philosophy behind the masterclass |
| `docs/ARCHITECTURE.md` | Code walkthrough |

---

## Common changes

### Adding a new chapter

Each chapter is one object in the `CURRICULUM` array in `src/App.tsx`. The shape is:

```ts
{
  id: "scale",                 // kebab-case, must be unique
  n: 4,                        // chapter number, controls ordering and unlock
  icon: TrendingUp,            // any lucide-react icon
  title: "Scale Stage",
  sub: "Building durability and a moat",
  intro: "...",                // single short paragraph
  blocks: [
    r("TAG", "Slide title", ["paragraph 1", "paragraph 2"], ["bullet 1", "bullet 2"], { label: "Key idea", text: "..." }),
    q("Inline question?", ["A", "B", "C", "D"], 1, "Why B is correct."),
    sort("Sort prompt.",
      [{ id: "a", label: "Bucket A" }, { id: "b", label: "Bucket B" }],
      [{ x: "item text", c: "a" }, { x: "item text", c: "b" }],
      "Why these go where they go."
    ),
    // ...
  ],
  check: [
    // Mastery Check questions — q(...) shape only
  ],
}
```

The three constructor helpers (`r`, `q`, `sort`) sit just above the `CURRICULUM` array — read them to confirm the field order before adding blocks.

### Adding a new drill

Each drill is one object in the `DRILLS` array. The drill engine is generic over question shape — both `q` and `sort` block types render correctly inside a drill.

### Adding an exam question

Append to the `EXAM` array. Use the `q(...)` helper. Exam questions are presented in random order, so order in the source doesn't matter — but try to keep the array grouped by stage for human readability.

### Updating the underlying playbook

When Anthropic publishes a new version:

1. Drop the new PDF into `docs/source/` (keep the old one for diffing).
2. Update the filename references in [`README.md`](README.md) and [`docs/ABOUT.md`](docs/ABOUT.md).
3. Walk every chapter against the new version. Track changes you make in `docs/CHANGELOG.md` (create it if it doesn't exist).
4. Bump `version` in `package.json`.

---

## Style conventions

- **Inline styles for colors, Tailwind for layout.** The `C` object at the top of `App.tsx` is the source of truth for the palette. Tailwind handles spacing, flex, sizing, and typography. Don't fight that split — it's deliberate.
- **No new dependencies unless needed.** React + lucide-react + Tailwind is the stack. Adding a fourth runtime dep should clear a high bar (lighter than the lucide pattern it replaces, ships < 5KB, etc.).
- **No TypeScript strict mode.** The curriculum data is intentionally loosely typed (see the `r` / `q` / `sort` helpers) so authors can add content without fighting the type system. If you find yourself adding `as any` casts to make existing code work, that's a smell — open an issue rather than papering over it.

---

## PR checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Manual smoke test: chapter unlocks correctly, drill scoring works, exam scoring works, `localStorage` persistence still works (refresh the page)
- [ ] If you added curriculum content: cite the source page number in the PR description
- [ ] If you changed the visual style: include before/after screenshots in the PR

---

## Reporting issues

Bug or content correction? Open an issue with:

- What you saw vs. what you expected
- Steps to reproduce (chapter / drill / exam question)
- Browser + OS (`localStorage` quirks vary across browsers)
- A screenshot if it's a UI bug

For content corrections, link the playbook page you're correcting against.
