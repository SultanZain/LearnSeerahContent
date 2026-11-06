# Working in LearnSeerahContent

This repository holds LearnSeerah's MDX educational content, locale dictionaries,
and data-generation tooling. It is a content repository; `frontend/` contains UI
translations, not a runnable application. Make changes that are easy for a human
translator or maintainer to review.

## Read before working

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for the branch and PR workflow.
- For translations, read [the translator guide](docs/contributing/translations.md)
  and [prompt templates](docs/contributing/translation-prompts.md).
- For MDX, read [MDX content rules](docs/contributing/mdx-content.md).
- For lessons, read [lesson structure](docs/lesson-authoring.md) and the writing
  rules at the start of [TRACKER.md](docs/TRACKER.md).
- For generated data, read [Scripts & Data Generation](docs/contributing/scripts.md)
  and inspect the actual script before running it.

Inspect the working tree and current branch first. Preserve the user's existing
changes and other translators' work. Read complete source and target files before
editing; do not infer an entire file from a preview or search excerpt. Ask for the
target language or required scope if it cannot be inferred; continue independent
inspection while clarification is pending.

## Source files and translation scope

- English source content lives under `content/<type>/en/`; target translations
  live under `content/<type>/<locale>/` with identical filenames.
- Translate `content/timeline/<locale>/*.mdx` for event text. Map event data and
  Chronicle CSVs are derived from timeline files. Do not manually translate
  `content/maps/*`, Chronicle exports/sheets, or `content/chronicle.json`.
- Translate lessons together with their matching sections. Section filenames and
  each lesson's `section` value are stable IDs. Translate section titles,
  summaries, guidebooks, and lesson `unit` display names. Reuse exactly the same
  translated unit name across all lessons in that unit.
- Standalone quizzes, glossary entries, references, and requested changelogs are
  separate sources. Translate them when included in the task; preserve their links.
- UI translations are `frontend/<locale>.json`. Manual editing and GitLocalize
  are both supported; resulting PRs target `dev`.
- `paths/<locale>.json` and `paths/manifest.json` are generated. Do not hand-edit
  indexes or hashes for a translation task. New locales require maintainer
  registration: the path generator currently supports `en`, `ar`, `ur`, and `bn`.

Limit edits to the requested locale and batch. Copy only missing files; compare
and update existing targets rather than overwriting them with English. Do not
submit untranslated bulk copies as completed work. Keep unrelated English source,
scripts, workflows, dependency files, and other locales out of translation changes
unless the user requests the corresponding fix or integration.

## Preserve structure and meaning

- Translate reader-facing values and prose; preserve field names, filenames,
  slugs, linking IDs, `order`, `unitOrder`, numeric values/types, dates' actual
  meaning, URLs, image paths, and technical metadata.
- Translate every question, answer option, and explanation. Keep IDs, option
  order, and `correctOptionId`; ensure translation does not change the answer.
- Keep `<Quran ... />` components and verse props, Arabic quotations, honorifics
  such as `ﷺ`, CSS classes, and MDX tags unchanged. Translate surrounding prose.
- Preserve `{/* page */}`, `{/* quiz: q1 */}`, and `{/* quiz */}` exactly and in
  the source order. Do not introduce HTML comments or change lesson flow.
- Use valid YAML; prefer double quotes for edited strings, escaping internal
  quotes. Preserve existing value types and UTF-8 encoding.
- In frontend JSON, translate string values, including array entries. Preserve
  keys, nesting, array order, non-string values, escapes, markup, and exact
  placeholder names/counts. Retain the LearnSeerah brand name.
- Prefer natural native expression over literal, word-for-word translation.
  Write as a native speaker would teach the subject: adapt idioms and reshape
  sentences to preserve meaning, warmth, emphasis, and feeling. Retain all
  information and page/quiz boundaries. Do not add drama or alter verified quotes.
- Write respectful language with consistent established terminology.
  Preserve chronology, theological meaning, evidence, and uncertainty. Do not
  invent facts, citations, Arabic quotations, Quran/hadith translations, or claims.
- Flag suspected source errors with file/line or question ID separately. Do not
  silently turn a translation into a historical correction or change an answer key.

## Review and validation

Work in small batches. Compare every changed line with its source, then read the
complete target independently for fluency, tone, grammar, and omissions. Check
for copied English sentence structures and awkward literal phrasing; rewrite
them using expressions native readers naturally use. Preserve the intended
emotional and teaching effect. Check matching sections and exact repeated unit
values, quiz references/answers, MDX markers/components, and UI placeholders.

Before pushing or submitting, the human translator must read **every changed
file and every line**, including AI drafts, metadata, and quizzes. Make the draft,
diff, terminology decisions, and unresolved questions concrete and reviewable.
Never claim fluent human review, approval, or real UI testing that did not happen;
state pending review honestly. AI self-review does not replace human review.

Use checks appropriate to the edited files:

- Run `git diff --check`; inspect new files as well as tracked diffs. For staged
  changes, inspect `git diff --cached` and `git diff --cached --check`.
- Parse changed JSON with Node.js. For UI dictionaries, compare source/target key
  paths, types, array lengths, and each string's placeholders; syntax alone is
  insufficient.
- Parse changed MDX frontmatter with `gray-matter` when available. Parsing YAML
  does not compile MDX or prove the lesson renders correctly.
- For docs, check links, paths, examples, and consistency with actual tooling.
- `package.json` has no test/build/dev script. Do not invent commands or add tests
  for prose changes. Install dependencies only when the task needs them.

The actual UI is tested at `https://dev.learnseerah.com` after merge to `dev`. New locales need application registration, and maps/Chronicle
need their generated-data refresh. Report these dependencies rather than claiming
that copying a folder enables the locale or instantly updates every visualization.

## Branches, PRs, and maintainer tools

Start new contribution branches from `dev` (for example
`translation/id-first-lessons`). Target **all translation PRs at `dev`**, including
fork and GitLocalize submissions. Do not push directly to `dev` or `production`.
Production release is a separate maintainer step after development-site testing.
Do not push, submit, merge, release, or publish unless the task authorizes it.

Stage the exact files in scope rather than everything in the working tree. Use
clear commits/PR descriptions with locale, source revision, coverage, AI use,
actual review/checks, and outstanding concerns. Use the repository's PR template.

The generation commands in `package.json` are maintainer tools. They default to
Arabic unless passed `-l <locale>` and write to `./Output/`; ensure the output
directory exists if running them. These exports are not complete map files and
are not automatically imported into Chronicle's sheets. Do not commit exports as
manual translations or run notification/release tools for routine validation.

When changing docs or tooling, verify against repository files, keep instructions
usable in the documented shell, and update links affected by your edits. Report
what changed, what was checked, and any review or integration that remains.
