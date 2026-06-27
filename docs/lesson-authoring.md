# Authoring the Learn content (Sections › Units › Lessons)

The **Learn** page is a Duolingo-style journey: **Sections** contain **Units**, which contain
**Lessons** (lessons). Everything is content-driven — see the `en` examples under
`content/sections/` and `content/lessons/`.

## 1. Sections (`content/sections/{locale}/{slug}.mdx`)

A section is its own file with a **Guidebook** body. List its slug in `paths/{locale}.json` under
`"sections": [ ... ]` (in display order).

```mdx
---
title: 'Before Prophethood'
order: 1
summary: 'Short blurb shown on the section card.'
imageUrl: 'https://…'        # optional thumbnail
---
What this section is about, tips, how to approach it … (the Guidebook page)
```

## 2. Lessons (`content/lessons/{locale}/{slug}.mdx`)

List the slug in `paths/{locale}.json` under `"lessons": [ ... ]`.

```yaml
---
title: 'The First Revelation'
summary: 'Short blurb.'
section: makkan-period      # MUST match a section slug
unit: 'The First Revelation' # theme within the section
unitOrder: 1                 # orders units inside the section
order: 1                     # orders lessons inside the unit
imageUrl: '…'                # optional
questions:                   # comprehension questions (referenced by id below)
  - id: q1
    text: 'Where did the first revelation come?'
    options:
      - { id: a, text: 'The cave of Hira' }
      - { id: b, text: 'The valley of Mina' }
    correctOptionId: a
    explanation: 'Optional note shown after answering.'
---
```

### Steps (story + quiz, interleaved)

Split the body into **steps** with `<!-- page -->`. A page that is exactly a **quiz marker**
becomes a quiz step **at that position** — quizzes can appear anywhere, not only at the end:

```mdx
Story text for step 1 …

{/* page */}

{/* quiz: q1 */}        ← quiz step using question q1

{/* page */}

Story text for step 3 …

{/* page */}

{/* quiz */}            ← quiz step using all remaining (unused) questions
```

- A step that starts with an image shows it as that step's optional illustration.
- No `{/* page */}` markers? The lesson auto-splits by headings, then paragraphs.
- Any `questions` not placed by a marker are appended as a final quiz step.

## 3. Progression & jumping

Lessons unlock in order (finish one to unlock the next). A locked **unit** (JUMP HERE on the map)
or **section** (Jump to section) can be unlocked by passing a **placement test** — 10–15 random
questions drawn from the lessons being skipped.
