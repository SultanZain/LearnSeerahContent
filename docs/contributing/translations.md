# Translator guide

Translate LearnSeerah into the language native speakers naturally use, so its
teaching and feeling reach them. **Avoid literal, word-for-word translations.**
Use the English files in `en` as your source, keep the same filenames and file
structure in your language, and submit a pull request (PR) to **`dev`**.

You can work in GitHub's browser editor, use a local editor, or ask an AI assistant
to draft translations. A human translator must read **every changed file and every
line before pushing or submitting it**, including AI-generated translations.

## Quick start

1. Read [what to translate](#what-to-translate) and
   [the language rules](#language-and-tone).
2. Choose a language code, such as `id` for Indonesian, and a small batch of files.
3. Start a working branch from `dev`, for example `translation/id-first-lessons`.
4. Copy each English source file to the matching language folder. Keep its filename.
5. Translate reader-facing text, preserving IDs, links, numbers, and MDX syntax.
   Translate the matching sections alongside lessons.
6. Read the complete translation against the source, then read it on its own for
   natural language. Complete the [review checklist](#before-pushing-review-checklist).
7. Open a PR with **base repository `SultanZain/LearnSeerahContent` and base branch
   `dev`**. Include the language, file scope, review status, and any uncertainties.
8. After merge and the development site's update, review it in the real UI at
   [dev.learnseerah.com](https://dev.learnseerah.com). A new language needs
   [maintainer setup](#adding-a-new-language) before it can be selected there.

For AI-assisted work, use the [copyable prompt templates](translation-prompts.md)
and give the assistant [AGENTS.md](../../AGENTS.md) as well as this guide.

## Find your next step

- [What to translate](#what-to-translate)
- [Copy files into your language](#copy-files-into-your-language)
- [Preserve file structure and identifiers](#keep-the-structure-translate-the-text)
- [Native language, tone, and expression](#language-and-tone)
- [Browser, local editor, and GitLocalize workflows](#choose-your-workflow)
- [AI-assisted translations](#ai-assisted-translations)
- [Review before pushing](#before-pushing-review-checklist)
- [PRs, development-site testing, and new languages](#pull-requests-and-real-ui-testing)

## What to translate

Paths below are relative to the repository root. Replace `{locale}` with your
language code; Indonesian examples use `id`.

| Location | Translator's work |
| --- | --- |
| `content/timeline/{locale}/*.mdx` | Translate event titles, display dates, place names, and the full body. This is the source of event translations for Timeline, maps, and Chronicle. |
| `content/lessons/{locale}/*.mdx` | Translate titles, summaries, unit names, lesson bodies, questions, every answer option, and explanations. |
| `content/sections/{locale}/*.mdx` | Translate section titles, summaries, and guidebook bodies. These belong with the lessons that reference them. |
| `content/quiz/{locale}/*.mdx` | Translate standalone quiz titles, descriptions, bodies, questions, options, and explanations. These are separate source files, not generated map or Chronicle exports. |
| `content/glossary/{locale}/*.mdx` | Translate displayed terms, their meanings, and definitions; keep linking slugs and related-term IDs. |
| `content/references/{locale}/*.mdx` | Translate descriptions and reader-facing text. Keep each work and author identifiable and preserve citation details. |
| `frontend/{locale}.json` | Translate UI string values, including strings inside arrays. Keep JSON keys, nesting, array order, and placeholders. Work manually or through GitLocalize. |
| `changelogs/changelog-{locale}.mdx` | Translate release notes when they are included in your agreed scope. Keep version numbers, dates, and links. |
| `content/maps/{locale}/*.geojson` | **No manual translation required.** Maintainers generate event text from the translated timeline and integrate it with map geometry. |
| `content/chronicle.json` and Chronicle CSV/Google Sheets | **No separate event translation required.** Chronicle presents timeline data in another visualization format. Maintainers handle generated CSVs and their published sheet URLs. |
| `paths/*.json`, including `paths/manifest.json` | Generated indexes and hashes, not translation files. Maintainers and the workflow handle these. |

### Translate timeline once for maps and Chronicle

The event text follows this flow:

```text
content/timeline/id/*.mdx
  -> Timeline
  -> generated event data for maps
  -> generated CSV for Chronicle
```

If you see an incorrect translation in a map popup or Chronicle event, find and
correct its timeline source. Mention the affected visualization in your PR so
maintainers can refresh its generated data. Map controls and Chronicle UI labels
are still translated in `frontend/id.json`.

The extraction scripts automate the conversion, but the current workflow still
requires maintainers to integrate map exports and import Chronicle CSVs into
Google Sheets. Merging timeline translations does not by itself complete those
imports. Translators do not need to copy maps, edit coordinates, translate CSVs,
or change `content/chronicle.json`. See [Scripts & Data Generation](scripts.md)
for the maintainer handoff.

### Translate lessons and sections together

The Learn journey groups lessons into sections and units:

```text
section filename (stable slug)
  -> lesson's section value (same stable slug)
     -> lesson's unit value (translated display name)
        -> lesson title, story, and questions
```

For example, `content/lessons/en/lesson-1.mdx` contains:

```yaml
section: foundations-of-faith
unit: 'One Message, Many Messengers'
```

Its Indonesian translation must keep `section: foundations-of-faith`, and the
matching section must exist at
`content/sections/id/foundations-of-faith.mdx`. Translate that section's `title`,
`summary`, and body; keep its filename and `order`.

Translate `unit` as a display name, using **exactly the same translated spelling,
capitalization, spacing, and punctuation in every lesson in that unit**. Different
versions can split one unit into multiple groups in the UI. Preserve `unitOrder`
and lesson `order`. Use the same translated section and unit names in prose
cross-references. See [lesson authoring](../lesson-authoring.md) for the structure.

## Copy files into your language

Content is organized by content type first, then language. There is no single
top-level `en` folder to copy.

| English source | Indonesian destination |
| --- | --- |
| `content/timeline/en/571-event-1.mdx` | `content/timeline/id/571-event-1.mdx` |
| `content/lessons/en/lesson-1.mdx` | `content/lessons/id/lesson-1.mdx` |
| `content/sections/en/foundations-of-faith.mdx` | `content/sections/id/foundations-of-faith.mdx` |
| `frontend/en.json` | `frontend/id.json` |

Use the same language code everywhere: `id`, not `indonesian`. Other examples are
`ar` (Arabic), `bn` (Bengali), and `ur` (Urdu). For a regional variant, coordinate
its code with maintainers so the content, UI, and language selector agree.

Check whether the destination already exists. If it does, update its translation
against the source rather than overwriting another translator's work. Keep
filenames and slugs unchanged, using their existing ASCII spelling and hyphens.
Translated prose can use the full script of your language. Save files as UTF-8.

Start with one section and a few of its lessons, or a small timeline batch. Only
copy the files you intend to translate and review in that PR. Do not submit a
whole copied English folder as a completed translation; list any intentional
English fallback strings in the PR.

### Local copy example (PowerShell)

Run from the repository root **after checking that these destinations do not
already exist**:

```powershell
New-Item -ItemType Directory -Force -Path content/lessons/id, content/sections/id
Copy-Item -LiteralPath content/lessons/en/lesson-1.mdx -Destination content/lessons/id/lesson-1.mdx
Copy-Item -LiteralPath content/sections/en/foundations-of-faith.mdx -Destination content/sections/id/foundations-of-faith.mdx
```

For UI work, copy `frontend/en.json` to `frontend/id.json` only if the destination
does not exist. For timeline work, create `content/timeline/id/` and copy the
chosen event files with the same names. The editor's file-copy action works too.

## Keep the structure; translate the text

Frontmatter is the YAML block between the opening `---` lines in an MDX file.
Its keys are application field names. Translate the appropriate values, not keys.

| Field or syntax | What to do |
| --- | --- |
| `title`, `summary`, `description`, headings, paragraphs, link labels, image alt text | Translate the reader-facing text. Keep links and image paths intact. |
| Timeline `date` | Translate month names and calendar labels naturally; retain the actual date, year, era, ranges, and any uncertainty. |
| Timeline `location` | Use the language's accepted place name consistently; do not change the actual location. |
| Timeline `year`, `eventId`, `age` | Keep values and their existing types. Do not add an age label to the stored number or numeric string. |
| `sources`, bibliography, hadith citations | Preserve source identity, URLs, volume/page/verse/hadith numbers. An established localized book title is fine if the original source remains identifiable. |
| Lesson `unit` | Translate the display name consistently across every lesson in that unit. |
| `section`, `slug`, `relatedTerms`, question/option `id`, `correctOptionId` | Keep the linking identifiers exactly as in the source. |
| `order`, `unitOrder`, numeric fields, booleans | Keep unchanged. |
| `imageUrl`, URLs, component names, prop names, CSS classes, technical hints such as `dataAiHint` | Keep unchanged unless a maintainer requests a specific adjustment. |
| `<Quran surah="6" ayah="124" />` | Keep the component and its verse references exactly. It loads the appropriate verse translation through the app. |
| `{/* page */}`, `{/* quiz: q1 */}`, `{/* quiz */}` | Keep exact syntax, IDs, order, and placement. These control the lesson flow. |

Preserve Arabic quotations and honorifics in the source, including `ﷺ` and spans
such as `<span className="font-ar">عليه السلام</span>`. Translate the surrounding
explanation. Do not ask AI to invent a Quran or hadith translation, replace a
citation, or reinterpret the quoted Arabic. If a quotation needs an approved
translation that you cannot verify, flag it for review.

Keep the source's page and quiz sequence. Use MDX comments (`{/* ... */}`), not
HTML comments (`<!-- ... -->`). Keep tags balanced and Markdown formatting valid.
See [Working with MDX Content](mdx-content.md).

For YAML text you edit, prefer double quotes, as described in the
[writing rules](../TRACKER.md#frontmatter--critical). Escape an embedded `"` as
`\"`. If retaining a single-quoted YAML string, escape an apostrophe by doubling
it (`''`). Preserve types and avoid reformatting unrelated fields.

Some fields, such as reference `tags`, may also be used for filtering. If you
cannot tell whether a value is a display label or an application identifier,
leave it unchanged and ask in the PR instead of guessing.

### Questions and answer choices

Translate **all** options, including incorrect ones. Preserve their order, IDs,
and `correctOptionId`. Make sure the intended answer is still correct after
translation, distractors remain distinct, and the explanation supports the same
answer. Pay special attention to words such as "not", "except", "first", and
"only". Do not repair a suspected source error by changing the answer key; report
the source issue with its file and question ID.

## Language and tone

**Natural native expression is the priority.** Write as a fluent speaker would
teach this subject to another speaker of the language. The reader should feel
the story, reflection, and encouragement in familiar phrasing, rather than have
to work through English expressions rendered word by word.

Rebuild sentences when your language expresses the idea differently: change word
order, split or combine sentences, and choose idiomatic phrasing with the same
meaning. Preserve the source's emphasis, warmth, dignity, and emotional effect
without adding drama or new claims. Keep all information and the same lesson
page/quiz boundaries even when sentence boundaries change.

For example, "carry the heaviest trust" may describe a grave responsibility,
and "keep your streak alive" encourages continuing a learning habit. Translate
those ideas using expressions native readers understand; do not mechanically
translate "carry" or "alive" if that sounds awkward or misleading. Preserve the
actual meaning, and leave factual and scriptural quotations faithful to their
verified source.

Read the translation aloud, then read it without looking at the English. Would
a native speaker naturally say this? Does the passage teach clearly and carry
the intended feeling? Rewrite sentences that sound translated, even when each
individual word is technically correct.

- Use a respectful, reverent tone for Prophet Muhammad ﷺ, other Prophets, and
  Companions. Preserve the source's honorifics.
- Keep content dignified, clear, and engaging. Lessons should teach through a
  flowing narrative; UI labels should be concise and easy to act on.
- Use consistent established names and transliterations for people, places, and
  Islamic terms. Check existing translations and keep a short terminology list
  in your PR for new choices, especially section and unit names.
- Explain specialized terms where the source explains them. Preserve distinctions
  such as Nabi/Rasul instead of flattening them into a misleading translation.
- Preserve dates, quantities, chronology, quotations, evidence, and qualifications
  such as "reported", "approximately", or "scholars differ".
- Keep the source's historical and theological meaning. Do not add personal
  opinions, sectarian attacks, invented facts, or new religious claims.
- Adapt idioms, rhetorical questions, and encouragement to the way native speakers
  express them, preserving their purpose and tone. Check grammar,
  punctuation, spelling, gender, number, and politeness for the target language.

If the English source appears wrong or conflicts with another source file, record
the exact file and concern in the PR or an issue. Keep translation work separate
from historical or theological corrections that need maintainer review.

## Choose your workflow

### GitHub browser editor

1. [Fork the repository](https://github.com/SultanZain/LearnSeerahContent/fork)
   to your account. Make sure your fork includes `dev`; if the fork dialog offers
   to copy only the default branch and it is not `dev`, disable that option.
2. In your fork, select `dev` and create a branch such as
   `translation/id-first-lessons` from it.
3. Open the English file and copy its raw contents. Use **Add file -> Create new
   file** to create the matching target path, then translate it. For an existing
   translation, use **Edit** on its current file.
4. Read every file and every line before committing it through the browser;
   browser commits publish your edits to your fork. Use small commits and review
   the final diff as well.
5. Choose **Contribute -> Open pull request**. Verify the base repository is
   `SultanZain/LearnSeerahContent` and the base branch is **`dev`**.

### Local editor and Git

Install Git. Node.js and pnpm are only needed for optional parsing or data tools;
you can translate files in an editor without installing dependencies.

Fork the repository first, then replace `YOUR-GITHUB-USERNAME` in these commands:

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/LearnSeerahContent.git
cd LearnSeerahContent
git remote add upstream https://github.com/SultanZain/LearnSeerahContent.git
git fetch upstream
git switch --create translation/id-first-lessons upstream/dev
git rev-parse HEAD
```

The last command prints the source commit. Record it for the PR before making
translation commits, so reviewers know which English revision you used.

Copy and translate the selected files. Review their complete contents, and check
the change scope:

```bash
git status --short
git diff --check
git diff
```

`git diff` does not show the contents of new, untracked files. Read those in the
editor too. After reviewing, stage just the files in your batch:

```bash
git add content/lessons/id/lesson-1.mdx content/sections/id/foundations-of-faith.mdx
git diff --cached --check
git diff --cached
git commit -m "Translate first lesson and its section into Indonesian"
git push --set-upstream origin translation/id-first-lessons
```

Include `frontend/id.json` in staging only if you worked on it. Avoid `git add .`
so generated files and unrelated changes stay out of the PR. Finish the full
human review **before `git push`**.

Open the PR on GitHub with base **`dev`**. For a later batch, fetch upstream and
start a fresh branch from `upstream/dev`. If updating an open PR, commit and push
to that same working branch; synchronize with `upstream/dev` when needed and
resolve conflicts without overwriting other translations.

### Frontend UI: manual editing or GitLocalize

The `frontend/` folder contains **translation dictionaries**, not a runnable web
frontend. There is no `pnpm dev` script in this repository.

For manual editing, compare `frontend/en.json` with `frontend/{locale}.json` and
translate string values. Preserve every key, the object structure, arrays, and
their order. For example:

```json
{
  "navigation": { "home": "Beranda" },
  "lessonOf": "Pelajaran {n} dari {total}"
}
```

This is an illustrative fragment, not a complete replacement dictionary. Keep
tokens such as `{n}`, `{total}`, `{lang}`, `{date}`, and `{percent}` unchanged.
You may move them within a sentence to suit your language, but do not rename,
remove, or translate them. Preserve escapes such as `\n` and any markup. Do not
translate the `LearnSeerah` brand name.

Alternatively, use [GitLocalize](https://gitlocalize.com/repo/10684):

1. Sign in, choose your target language, and open the frontend UI strings.
2. Translate and review each string with its context and placeholders.
3. Use the available review/submission flow to propose the translation.
4. Verify the resulting GitHub PR targets **`dev`**. If the integration proposes
   another base branch, have it corrected before merge. Ask maintainers if your
   language is not available or you cannot change the submission target.

GitLocalize is an alternative for UI strings; lessons, sections, timeline, and
other source content still use their matching language folders.

## AI-assisted translations

AI can help draft, compare, or polish translations. Share the repository link
(`https://github.com/SultanZain/LearnSeerahContent`) or a local checkout, the source
files, existing target-language examples, and these instructions:

- [AGENTS.md](../../AGENTS.md)
- This translator guide
- [AI translation prompts](translation-prompts.md)
- [MDX rules](mdx-content.md), [lesson structure](../lesson-authoring.md), and the
  [writing rules](../TRACKER.md#writing-rules) when translating lessons

Give a precise target language, file list, and terminology choices. Work in small
batches so the assistant can read each complete file and you can verify every
result. If it cannot open the repository, provide the relevant file text and docs
directly rather than assuming it read them.

Use AI output as a draft. Compare it with the source for omissions, changed
meaning, invented details, altered citations, and broken syntax. Then read the
translation on its own for tone, fluency, and learner comprehension. Review
metadata and quiz options as carefully as the body. AI self-review and valid
syntax do not replace a fluent human's line-by-line review.

Tell the assistant explicitly to avoid literal translation and to write for
native readers. Ask it to rework copied English sentence structures, literal
phrasing, and unfamiliar idioms while preserving meaning and the source's feeling. A fluent
human must judge whether the result actually sounds natural.

If you cannot confidently review the target language, request a fluent reviewer
and describe that limitation in a draft PR. Do not label the translation reviewed
or ready to publish. Before sharing that draft, still read every file and line
for the source meaning and structure you can verify, and clearly disclose the
remaining language review. Never claim that an AI check was a human review.

## Before pushing: review checklist

- [ ] I read every changed file and every line, including frontmatter, UI strings,
      quiz choices, and explanations, before pushing or submitting.
- [ ] I compared with the English source for completeness, factual meaning,
      quotations, uncertainty, numbers, dates, and citation identity.
- [ ] I read the target text on its own for natural language, respectful tone,
      grammar, spelling, and consistent terminology. Its phrasing and idioms
      sound natural to native speakers and preserve the intended feeling.
- [ ] Each translated lesson has its matching section in the target language;
      section titles and repeated unit names are consistent.
- [ ] Filenames, slugs, IDs, answer keys, order values, links, components, Arabic
      text, honorifics, and page/quiz markers are preserved.
- [ ] All quiz options are translated and the intended answer still works.
- [ ] UI keys, nesting, array order, placeholders, and escapes are preserved.
- [ ] I checked YAML/JSON syntax where applicable and reviewed the Git diff,
      including new files. I did not include maps, CSVs, generated indexes, or
      unrelated changes as manual translations.
- [ ] My PR targets **`dev`** and states any source problems, fallback text,
      missing coverage, AI assistance, or pending fluent review honestly.

### Optional local syntax checks

For a UI dictionary, Node.js can check JSON syntax without dependencies:

```bash
node -e "JSON.parse(require('fs').readFileSync('frontend/id.json', 'utf8')); console.log('Valid JSON');"
```

To check a lesson's YAML frontmatter, install the repository dependencies once
with `pnpm install`, then run:

```bash
node -e "require('gray-matter')(require('fs').readFileSync('content/lessons/id/lesson-1.mdx', 'utf8')); console.log('Frontmatter parsed');"
```

Repeat for each changed MDX file or ask your assistant to check the batch. These
commands check parsing only; they do not validate translation quality, matching
UI keys, lesson relationships, or MDX rendering. This repo has no configured
test/build/preview script. The real UI review happens on the development site.

## Pull requests and real UI testing

All translation PRs target **`dev`**, including PRs from forks, language branches,
and GitLocalize. Create a working branch from `dev`; do not push directly to
`dev` or `production`, or open translation PRs against `production`.

Use the [PR template](../../.github/pull_request_template.md) and include:

- Language and code; the source revision/commit you translated from.
- Files, lesson/section or timeline range, and whether this is a complete or
  partial batch. Note any existing files you updated.
- Terminology decisions, including exact translated unit and section names.
- Whether AI helped and what human review and syntax checks were completed.
- Source uncertainties, remaining language review, and new-locale setup or
  map/Chronicle regeneration needed from maintainers.

Maintainers review and merge accepted translations into `dev`. After the dev
site has updated, translations are available for testing at
[https://dev.learnseerah.com](https://dev.learnseerah.com). Select your language
and check the files you changed in context:

1. Section cards, guidebooks, unit grouping, and lesson titles.
2. Complete lesson flow, page transitions, questions, answers, and explanations.
3. Timeline titles, dates, places, and event text.
4. UI labels, menus, dialogs, interpolated values, long text, and narrow screens.
5. Arabic quotations, honorifics, and text direction for RTL languages.
6. Maps and Chronicle after maintainers refresh their generated data.

If you still see old text, use the app's freshness setting or flush its cache and
reload. If a language, file, or visualization is still missing, report it with the
PR, locale, and affected page; it may need registration or a generated-data
refresh. Submit corrections through another PR to `dev`.

Production at [learnseerah.com](https://learnseerah.com) follows a separate
maintainer release after testing. A merge to `dev` is the development testing
stage, not a production release.

### Adding a new language

The `id` examples show how to prepare Indonesian files; they do not imply that
Indonesian is already enabled. Currently,
`.github/workflows/generate-paths.js` lists `en`, `ar`, `ur`, and `bn` in
`SUPPORTED_LOCALES`.

For a new locale, state **"New locale: id (Indonesian)"** in the PR. Maintainers
need to register the locale in the path generator and application language
configuration, generate its indexes/manifest, and configure any required UI,
map, or Chronicle support. These integration steps can be coordinated alongside
your first reviewed translation batch. Do not manually translate `paths/en.json`
into `paths/id.json` or copy another language's Chronicle sheet URL.

For an existing locale, the Generate Locale Paths workflow refreshes indexes
when the relevant content is pushed to its configured branches, including `dev`.
Translators should leave generated indexes and manifest hashes to that workflow.
