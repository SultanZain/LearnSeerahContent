# Authoring the Learn content (Sections › Units › Lessons)

The **Learn** page is a Duolingo-style journey: **Sections** contain **Units**, which contain
**Lessons** (lessons). Everything is content-driven — see the `en` examples under
`content/sections/` and `content/lessons/`.

**Translators:** follow the [translator guide](contributing/translations.md).
Translate matching sections alongside lessons, preserve section slugs, and use
exactly the same translated `unit` name across every lesson in a unit.

## 1. Sections (`content/sections/{locale}/{slug}.mdx`)

A section is its own file with a **Guidebook** body. The locale path generator
lists its slug in `paths/{locale}.json` under `"sections": [ ... ]`. Preserve the
section's `order` when translating; do not manually translate the generated index.

```mdx
---
title: "Before Prophethood"
order: 1
summary: "Short blurb shown on the section card."
imageUrl: "https://…"        # optional thumbnail
---
What this section is about, tips, how to approach it … (the Guidebook page)
```

## 2. Lessons (`content/lessons/{locale}/{slug}.mdx`)

The locale path generator lists the slug in `paths/{locale}.json` under
`"lessons": [ ... ]`. See [generated indexes](contributing/scripts.md#generated-locale-indexes)
for the workflow and new-locale registration.

```yaml
---
title: "The First Revelation"
summary: "Short blurb."
section: "makkan-period"      # MUST match a section slug
unit: "The First Revelation" # theme within the section
unitOrder: 1                 # orders units inside the section
order: 1                     # orders lessons inside the unit
imageUrl: "…"                # optional
questions:                   # comprehension questions (referenced by id below)
  - id: "q1"
    text: "Where did the first revelation come?"
    options:
      - { id: "a", text: "The cave of Hira" }
      - { id: "b", text: "The valley of Mina" }
    correctOptionId: "a"
    explanation: "Optional note shown after answering."
---
```

### Steps (story + quiz, interleaved)

Split the body into **steps** with `{/* page */}`. A page that is exactly a **quiz marker**
becomes a quiz step **at that position** — quizzes can appear anywhere, not only at the end:

```mdx
Story text for step 1 …

{/* page */}

{/* quiz: q1 */}

{/* page */}

Story text for step 3 …

{/* page */}

{/* quiz */}
```

- A step that starts with an image shows it as that step's optional illustration.
- No `{/* page */}` markers? The lesson auto-splits by headings, then paragraphs.
- Any `questions` not placed by a marker are appended as a final quiz step.
- `{/* quiz: q1 */}` uses question `q1`; `{/* quiz */}` uses remaining unused
  questions. Preserve markers, IDs, placement, and order when translating.

## 3. Progression & jumping

Lessons unlock in order (finish one to unlock the next). A locked **unit** (JUMP HERE on the map)
or **section** (Jump to section) can be unlocked by passing a **placement test** — 10–15 random
questions drawn from the lessons being skipped.
