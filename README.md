<div align="center">

# Learn Seerah Content Repository

[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/SultanZain/LearnSeerahContent/pulls)
[![GitHub Last commit](https://img.shields.io/github/last-commit/SultanZain/LearnSeerahContent.svg)](https://github.com/SultanZain/LearnSeerahContent/commits/dev)
[![Live CMS](https://img.shields.io/badge/Live%20CMS-Click%20to%20Visit-blue)](https://learnseerah.com/admin/)

</div>


This repository contains the structured content (primarily in Markdown/MDX format) used to generate the **[LearnSeerah](https://learnseerah.com/)** educational resource.

**Translating? Start with the [translator guide](docs/contributing/translations.md).**
Write for native speakers using natural phrasing and idioms, preserving the
meaning and feeling of the source rather than translating word for word. The
guide covers copying `en` files into your language (for example `id` for Indonesian),
lessons and their sections, timeline translations, frontend UI strings, and review.
Use the [AI prompt templates](docs/contributing/translation-prompts.md) and
[AGENTS.md](AGENTS.md) when working with an assistant. Translation PRs target
**`dev`**; after merge and the development site's update, review them on
[dev.learnseerah.com](https://dev.learnseerah.com).

>[!TIP]
> 🚀 **New! LearnSeerah CMS is Live**
> Easily contribute without needing GitHub knowledge!
> 👉 [Access the CMS](https://learnseerah.com/admin/) to add/edit Seerah content with a visual editor.
> All changes are securely committed via GitHub pull requests automatically through API requests.

>[!CAUTION]
> Bengali translations are currently a work in progress and may contain errors or inconsistencies.
> They are **not finalized**.

> [!NOTE]
> 🙏 Special thanks to [Khaled Tanem](https://www.linkedin.com/in/khaled-tanim/) for his efforts in translating the Bengali content.
>
> Bengali translations are currently under active review.
> We invite Bengali speakers to review the content and help improve accuracy, clarity, and readability.
>
> To preview and help review the latest updates, visit:
> 👉 https://dev.learnseerah.com
> 
> If you find issues, please open an issue or submit a pull request.

---

## Table of Contents

* [Contents](#contents)
* [Translator guide](docs/contributing/translations.md)
* [AI translation prompts](docs/contributing/translation-prompts.md)
* [Contributing](#contributing)

  * [1. Reporting Issues](#1-reporting-issues)
  * [2. Submitting Changes (Pull Requests)](#2-submitting-changes-pull-requests)
  * [3. Alternative Submission via Email](#3-alternative-submission-via-email-if-facing-difficulties)
  * [4. Branch Management](#4-branch-management)
  * [5. Review Process](#5-review-process)
  * [6. Content Guidelines](#6-content-guidelines)
  * [7. Frontend UI Translations](#-frontend-ui-translations)
* [Code of Conduct](#-code-of-conduct)

---

## Contents

The content within this repository is organized following this structure:

```markdown
# {lang} : Language code  (e.g., en, ur, ar)
# {year} : Plain CE Year (e.g, 571, 610)
# {id}   : Integer Number of order (e.g, 1, 2)
content/
|
├── chronicle.json
|
├── glossary/
│   └── {lang}/
│       └── {term}.mdx
│
├── quiz/
│   └── {lang}/
│       └── {quiz-name}.mdx
│
├── references/
│   └── {lang}/
│       └── {reference}.mdx
│
├── sections/
│   └── {lang}/
│       └── {section}.mdx
│
├── lessons/
│   └── {lang}/
│       └── lesson-{index}.mdx
|
├── maps/
│   └── {lang}/
|       ├── storymap.geojson
│       └── areas.geojson
│
└── timeline/
    └── {lang}/
        └── {year}-event-{id}.mdx

frontend/
|
└── {lang}.json

```

>[!CAUTION]
> Keep the source filenames and slugs unchanged across languages. Names use ASCII letters, numbers, and hyphens; translated file contents can use your language's script.
>
> Translate `content/timeline/{lang}/*.mdx` for Timeline, map event text, and Chronicle. Maps and Chronicle use generated timeline data; translators do not manually translate GeoJSON or CSV exports. Maintainers handle generation and integration.
>
> Translate lessons together with their matching sections. Frontend UI strings can be edited manually in `frontend/{lang}.json` or through [GitLocalize](https://gitlocalize.com/repo/10684).

---

## Contributing

We welcome contributions to improve and expand the Seerah content. Please follow these guidelines:
>[!IMPORTANT]
> **Maintain a respectful and reverent tone** when writing about the Prophet Muhammad (ﷺ) and related topics.

### 1. Reporting Issues

If you find any errors, inconsistencies, or areas for improvement:

* Open a new issue in this repository.
* Clearly describe the problem with references to file/line if applicable.

### 2. Submitting Changes (Pull Requests)

**✅ DO:**

* Create a new branch from `dev` (e.g., `translation/id-first-lessons`, `feature/new-section-badr`, `fix/typo-migration`).
* Follow existing `.mdx` examples for structure and style.
* Write clear commit messages and PR titles.
* Submit PRs to the `dev` branch.
* For translations, read every changed file and every line before pushing or submitting, including AI-generated drafts.

**🚫 DO NOT:**

* Push directly to `dev` or `production`.

### 3. Alternative Submission via Email (If Facing Difficulties)

You may email your content to:

**Address: [sultan.zain004@outlook.com](mailto:sultan.zain004@outlook.com)**
Subject: `[LearnSeerah] New Content Request`

Email Body:

```
Content Type: {content_type}
Content Name: {content_name}
Content: {your content here}
```

### 4. Branch Management

Branches are automatically deleted after merge to keep the repo clean.

### 5. Review Process

* Your PR will be reviewed and may receive feedback.
* Once approved, it will be merged into `dev`. After the development site's update, test the changes in the real UI at [dev.learnseerah.com](https://dev.learnseerah.com).
* New languages need maintainer registration; map and Chronicle translations need their generated-data refresh. See the [translator guide](docs/contributing/translations.md).
* Maintainers handle the separate release to `production` after testing.

### 6. Content Guidelines

* **Accuracy** — Base content on reliable Islamic sources.
* **Clarity** — Keep language simple and clear.
* **Respect** — Maintain an appropriate tone.
* **Citations** — Include references where necessary.

---

## 🌐 Frontend UI Translations

UI translation dictionaries live in `frontend/{lang}.json`. Copy `frontend/en.json`
to a new language file, or update the existing translation, keeping keys and
placeholders unchanged. You can edit manually or use **GitLocalize**. Both routes
submit PRs to **`dev`**. Follow the [UI translation workflow](docs/contributing/translations.md#frontend-ui-manual-editing-or-gitlocalize).

➡️ Contribute or track progress:
[https://gitlocalize.com/repo/10684](https://gitlocalize.com/repo/10684)

---

### UI Translation Progress

| Language | Progress                                                     | Language   | Progress                                                       |
| -------- | ------------------------------------------------------------ | ---------- | -------------------------------------------------------------- |
| Arabic   | ![Arabic](https://gitlocalize.com/repo/10684/ar/badge.svg)   | Bengali    | ![Bengali](https://gitlocalize.com/repo/10684/bn/badge.svg)    |
| Chinese  | ![Chinese](https://gitlocalize.com/repo/10684/zh/badge.svg)  | French     | ![French](https://gitlocalize.com/repo/10684/fr/badge.svg)     |
| German   | ![German](https://gitlocalize.com/repo/10684/de/badge.svg)   | Indonesian | ![Indonesian](https://gitlocalize.com/repo/10684/id/badge.svg) |
| Japanese | ![Japanese](https://gitlocalize.com/repo/10684/ja/badge.svg) | Korean     | ![Korean](https://gitlocalize.com/repo/10684/ko/badge.svg)     |
| Malay    | ![Malay](https://gitlocalize.com/repo/10684/ms/badge.svg)    | Pashto     | ![Pashto](https://gitlocalize.com/repo/10684/ps/badge.svg)     |
| Persian  | ![Persian](https://gitlocalize.com/repo/10684/fa/badge.svg)  | Portuguese | ![Portuguese](https://gitlocalize.com/repo/10684/pt/badge.svg) |
| Russian  | ![Russian](https://gitlocalize.com/repo/10684/ru/badge.svg)  | Sindhi     | ![Sindhi](https://gitlocalize.com/repo/10684/sd/badge.svg)     |
| Spanish  | ![Spanish](https://gitlocalize.com/repo/10684/es/badge.svg)  | Turkish    | ![Turkish](https://gitlocalize.com/repo/10684/tr/badge.svg)    |
| Urdu     | ![Urdu](https://gitlocalize.com/repo/10684/ur/badge.svg)     |            |                                                                |


---

## 🤝 Help Translate

We welcome contributions to improve translations and add new languages.

1. Read the [translator guide](docs/contributing/translations.md) and choose a small batch.
2. Translate source content in matching language folders, and UI strings manually or in GitLocalize.
3. Review every file and line for accuracy, natural language, tone, and errors before pushing or submitting.
4. Open a PR to **`dev`**, then review the merged translation on [dev.learnseerah.com](https://dev.learnseerah.com).

---

## 📜 Code of Conduct

We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct.md). Please be kind, inclusive, and constructive in all interactions.

---

## Contributors

Thanks to all contributors:

[![Contributors](https://contrib.rocks/image?repo=SultanZain/LearnSeerahContent)](https://github.com/SultanZain/LearnSeerahContent/graphs/contributors)


Thank you for supporting the **LearnSeerah** project!
