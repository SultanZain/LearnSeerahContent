# Contributing to LearnSeerah

We welcome content improvements, translations, documentation, and tooling fixes.
For translation work, start with the [translator guide](docs/contributing/translations.md)
and use the [AI prompt templates](docs/contributing/translation-prompts.md) if an
assistant helps you. Agents should read [AGENTS.md](AGENTS.md).

## 📚 General Workflow

1. **Start from `dev`** and create a working branch, for example
   `translation/id-first-lessons` or `fix/timeline-typo`.
2. **Make a focused change.** Preserve existing work and include only the files
   you intended to change.
3. **Review before publishing your branch.** For translations, read every changed
   file and every line, including metadata, quiz options, and AI drafts. Check
   fidelity to the source, natural language, respectful tone, and syntax.
4. **Commit and push your working branch**, then open a PR to **`dev`** in
   `SultanZain/LearnSeerahContent`. This also applies to forks, language branches,
   and GitLocalize submissions. Use the [PR template](.github/pull_request_template.md).
5. **Maintainer review and development testing.** Accepted changes merge into
   `dev`. After the development site's update, translations are available for
   real UI testing at [dev.learnseerah.com](https://dev.learnseerah.com).
6. **Production release.** Maintainers promote tested changes to `production`
   separately; contributors do not open translation PRs against `production`.

> [!CAUTION]
> Push to your own working branch, not directly to `dev` or `production`.
> Every translation PR must have **`dev` as its base branch**.

## 📌 Branch Strategy Summary

- `production` → Live release branch, managed by maintainers after testing.
- `dev` → Development and translation review branch; all contribution PRs target it.
- `translation/*`, `feature/*`, `fix/*` → Working branches created from `dev`.

## Translation essentials

- Prefer natural native expression over literal wording. Adapt sentence structure
  and idioms to reach native readers while preserving the source's meaning,
  teaching intent, feeling, and respectful tone.
- Copy English files to the matching locale folder, such as
  `content/lessons/en/lesson-1.mdx` to `content/lessons/id/lesson-1.mdx`.
  Keep filenames, slugs, IDs, ordering, and technical syntax unchanged.
- Translate lessons and their matching sections together. Keep each translated
  unit name identical across the lessons in that unit.
- Translate `content/timeline/{locale}/*.mdx` for Timeline, map event text, and
  Chronicle. Do not manually translate map GeoJSON, Chronicle CSVs/sheets, or
  generated `paths/` files. Maintainers handle generation and integration.
- Translate UI string values in `frontend/{locale}.json` manually or use
  [GitLocalize](https://gitlocalize.com/repo/10684). Preserve keys and placeholders.
- AI may draft or review translations, but a human must read every file and line
  before pushing or submitting. State AI use and any pending fluent review in
  the PR; never label an AI review as a human review.
- For a new language, mention the locale code in your PR so maintainers can enable
  it in generated indexes and the application. Copying a folder alone does not
  register a new locale. Maps and Chronicle also need their export/import step.

## 📖 Detailed Guides

For more specific and in-depth guidelines on contributing to different parts of the platform, please see the documents below:

- [Scripts and Tooling Usage](./docs/contributing/scripts.md)
- [Working with MDX Content](./docs/contributing/mdx-content.md)
- [Translator Guide](./docs/contributing/translations.md)
- [AI Translation Prompt Templates](./docs/contributing/translation-prompts.md)
- [Lesson and Section Structure](./docs/lesson-authoring.md)
- [Agent Instructions](./AGENTS.md)

---

Thank you again for making LearnSeerah better!
