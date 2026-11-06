# AI translation prompt templates

Use these templates with an assistant that can read this repository, or provide
the named docs and file contents directly. Replace every `<PLACEHOLDER>` before
use. Start with a small batch and provide existing terminology choices. See the
[translator guide](translations.md) for the full workflow.

**In every draft, prefer natural native expression over literal wording.**
Translate meaning, teaching intent, and feeling using the target language's own
phrasing and idioms. Reshape sentences as needed while preserving facts,
religious meaning, verified quotations, and the lesson's page/quiz structure.

AI output is a draft. **Before pushing or submitting, a human translator must
read every changed file and every line** for faithful meaning, natural language,
respectful tone, errors, and valid structure. An AI review is not a human review.

## 1. Understand the repository and choose a batch

```text
Help me prepare a LearnSeerah translation into <LANGUAGE> (<LOCALE_CODE>).
Repository: https://github.com/SultanZain/LearnSeerahContent
Source branch: dev
Requested scope: <CONTENT_TYPE_AND_FILE_LIST_OR_RANGE>

Read AGENTS.md, CONTRIBUTING.md, docs/contributing/translations.md, and
docs/contributing/translation-prompts.md. For MDX, also read
docs/contributing/mdx-content.md; for lessons, read docs/lesson-authoring.md
and the writing rules at the start of docs/TRACKER.md.

Inspect the complete English source files and any existing translations in my
locale. Report the source commit, source-to-target paths, existing files to
preserve, matching sections, and repeated unit names. Suggest a small batch
and consistent terminology using these preferences: <TERMINOLOGY_OR_NONE>.
Prioritize language and idioms native speakers naturally use, preserving the
teaching intent and feeling rather than copying English wording.

Timeline translations supply map and Chronicle event text. Do not propose manual
translations of maps, Chronicle CSVs/sheets, or generated paths/manifest files.
If the locale is new, identify maintainer registration needed for real UI testing.
This is a planning request; do not edit files yet. If you cannot access the repo,
tell me which docs and complete source files you need me to provide.
```

## 2. Draft timeline or other MDX translations

```text
Translate these LearnSeerah source files from English into <LANGUAGE>
(<LOCALE_CODE>): <EXACT_SOURCE_FILE_LIST>.
Use the matching content-type/<LOCALE_CODE>/ paths and keep each filename.
Use this terminology: <APPROVED_TERMINOLOGY_OR_EXISTING_LOCALE_EXAMPLES>.

Read AGENTS.md, docs/contributing/translations.md, and
docs/contributing/mdx-content.md before editing. Read every source and existing
target file completely. Preserve existing work and limit edits to this batch.

Translate reader-facing frontmatter values, headings, prose, and image alt text.
Avoid literal, word-for-word translation and copied English sentence structures.
Write as a native speaker would explain the subject, using familiar phrasing and idioms.
Reshape sentences to preserve meaning, teaching intent, warmth, and feeling;
do not add drama, omit information, or change lesson page boundaries. Preserve
qualifications, chronology, dates, quotations, and citation identity. Keep Arabic
quotations and honorifics. Do not invent religious claims, sources, or verse translations.

Keep frontmatter keys, filenames, slugs, linking IDs, numeric values and types,
URLs, image paths, components and props, CSS classes, and MDX markers unchanged.
For timeline files, translate title, display date, location, and body; keep year,
eventId, and age unchanged. Do not edit maps or Chronicle exports separately.
For standalone quizzes, translate every option and explanation while preserving
IDs, order, and correctOptionId. Flag source issues instead of silently fixing them.

Review every translated line against the source, then read it independently for
fluency. Check YAML parsing if dependencies are available; explain its limits.
Rework passages that are technically correct but would sound foreign or awkward
to native readers. Keep factual and scriptural quotations faithful to their source.
Return changed paths, terminology decisions, checks performed, and unresolved
questions outside the translated files. Do not insert review notes into content.
Leave the batch ready for my full human review before any push or submission.
Do not push, open a PR, merge, or publish as part of this drafting request.
```

## 3. Translate lessons and matching sections together

```text
Translate LearnSeerah lessons <EXACT_LESSON_LIST> from en into <LANGUAGE>
(<LOCALE_CODE>), together with their matching section files.
Approved section and unit names: <NAME_MAPPING_OR_REQUEST_TO_USE_EXISTING_NAMES>.

Read AGENTS.md, docs/contributing/translations.md, docs/lesson-authoring.md,
docs/contributing/mdx-content.md, and the writing rules in docs/TRACKER.md.
Read complete source files and existing target translations before editing.

Copy only missing target files; preserve filenames and section slug references.
Translate lesson titles, summaries, unit display names, story text, questions,
all options, and explanations. Translate matching section titles, summaries,
and guidebook text. Use exactly the same translated unit value in every lesson
belonging to that unit, including existing translations. If an existing unit name
needs changing beyond this batch, report the affected files before expanding scope.

Keep order, unitOrder, question/option IDs, correctOptionId, links, Arabic text,
honorifics, Quran components, and page/quiz markers exactly. Preserve the source's
lesson sequence. Ensure the intended correct answer remains correct and every
distractor remains distinct. Avoid literal translation: use the target language's
natural teaching voice and idioms so native readers feel the story and reflection.
Reshape sentences as needed while preserving all information, historical and
theological meaning, and the source's warmth and dignity. Read the target without
looking at the English and rework phrasing a native speaker would not use.
Report suspected source errors separately.

Compare every line with the source, check section links and repeated unit names,
and parse changed YAML when possible. Report what still needs human or real UI
review; do not claim it happened. Do not edit maps, Chronicle data, generated
indexes, or unrelated files. Do not push or submit; I will review every file and
line first. The eventual PR must target dev, followed by testing on
https://dev.learnseerah.com after merge and any required locale setup.
```

## 4. Translate or complete frontend UI strings

```text
Translate frontend/en.json into <LANGUAGE> at frontend/<LOCALE_CODE>.json.
Read AGENTS.md and the UI rules in docs/contributing/translations.md. If the
target file exists, retain good translations and add/update only needed strings.
Use existing terminology: <TERMINOLOGY_AND_UI_CONTEXT>.

Translate string values, including values in arrays. Keep all JSON keys, nesting,
array order, non-string values, the LearnSeerah brand name, and placeholders
such as {n}, {total}, {lang}, {date}, and {percent}. Preserve escapes and markup.
Use expressions native speakers use in apps; adapt encouragement and idioms to
their intended meaning instead of translating English words mechanically.
Placeholder placement can change for natural word order, but its exact name and
occurrence count must match the source string. Keep UI language concise, clear,
and consistent with translated sections and lessons.

Parse both dictionaries and compare their complete key paths, value types,
array lengths, and per-string placeholders. Report missing/extra keys, untranslated
English fallback text, and context you could not verify. Flag suspicious duplicate
keys rather than relying on JSON.parse to detect them. Read every translated
string for fluency; do not claim this replaces my human review or real UI testing.

Edit only the target dictionary. Do not push or submit. Return a reviewable diff
and validation results; the eventual PR targets dev. This repository's frontend
folder contains dictionaries, so do not try to start a local web app here.
```

## 5. Review an existing translation without editing

```text
Review the LearnSeerah translation from en into <LANGUAGE> (<LOCALE_CODE>).
Source/target file pairs: <EXACT_PAIRS>.
Read AGENTS.md, docs/contributing/translations.md, and the applicable MDX/lesson
docs. Read each complete source and target file, including every frontmatter
field, quiz option, explanation, and UI string. Do not edit files in this pass.

Compare line by line for omissions, additions, changed meaning, numbers/dates,
qualifications, quotation/citation identity, honorifics, and terminology. Read the
target independently for natural language, tone, grammar, spelling, and clarity.
Flag awkward literal phrasing, English word order, unnatural idioms, and lost
warmth or emphasis, even if the individual words are accurate. Suggest phrasing a native
speaker would naturally use while preserving the meaning.
Check filenames, slugs, IDs, answer keys, section links, exact repeated unit
names, components, page/quiz sequence, JSON structure, placeholders, and escapes.

Return findings with target file and line, the problem, a proposed correction,
and confidence. Separate translation errors from suspected English source errors.
State what automated checks ran and what context or expertise is missing. Report
no findings if none are supported; do not invent issues. Do not claim fluent human
review or dev-site testing. I will personally read every file and line before push.
```

## 6. Prepare a PR description and development-site review

```text
Prepare a PR description for my reviewed LearnSeerah translation batch.
Language/code: <LANGUAGE_AND_CODE>
Branch: <WORKING_BRANCH>
English source commit: <SOURCE_COMMIT>
Changed scope: <FILES_AND_RANGE>
AI assistance: <WHAT_AI_DID_OR_NONE>
Human review actually completed: <WHO_REVIEWED_AND_WHAT>
Checks actually completed: <CHECKS_AND_RESULTS>
Open questions/fallbacks: <DETAILS_OR_NONE>

Read .github/pull_request_template.md and docs/contributing/translations.md.
The base repository is SultanZain/LearnSeerahContent; the base branch is dev.
Include lesson/section coverage and terminology choices. Identify new-locale
registration and map/Chronicle regeneration needed from maintainers. Keep pending
fluent review and UI testing explicit; do not tick checks that were not completed.

Include a focused review plan for https://dev.learnseerah.com after merge and
the site's update: language selection, sections and unit grouping, complete
lesson/quiz flow, timeline, changed UI strings, layout/text direction, and generated
visualizations after refresh. Production release is a separate maintainer step.
Return the description and review plan only. Do not push, open the PR, merge,
change production, or claim that testing has already happened.
```
