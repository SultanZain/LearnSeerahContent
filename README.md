<div align="center">

# Learn Seerah Content Repository

[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/SultanZain/LearnSeerahContent/pulls)
[![GitHub Last commit](https://img.shields.io/github/last-commit/SultanZain/LearnSeerahContent.svg)](https://github.com/SultanZain/LearnSeerahContent/commits/dev)
[![Live CMS](https://img.shields.io/badge/Live%20CMS-Click%20to%20Visit-blue)](https://learnseerah.com/admin/)

</div>


This repository contains the structured content (primarily in Markdown/MDX format) used to generate the **[LearnSeerah](https://learnseerah.com/)** educational resource.

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
├── timeline-v2.json
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
├── seerah/
│   └── {lang}/
│       └── {section}.mdx
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
> File and folder names must follow consistent naming and structure across all languages. And MUST not contain non-ASCII characters nor any spaces and symbols, hyphens(-) can be used.
>
> Maps are not Supported in CMS, use [GeoJson.io](https://geojson.io/) <br>
> Frontend UI Translations are managed using [GitLocalize](https://gitlocalize.com/repo/10684)

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

* Create a new branch (e.g., `feature/new-section-badr`, `fix/typo-migration`).
* Follow existing `.mdx` examples for structure and style.
* Write clear commit messages and PR titles.
* Submit PRs to the `dev` branch.

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
* Once approved, it will be merged into `production`.

### 6. Content Guidelines

* **Accuracy** — Base content on reliable Islamic sources.
* **Clarity** — Keep language simple and clear.
* **Respect** — Maintain an appropriate tone.
* **Citations** — Include references where necessary.

---

## 🌐 Frontend UI Translations

Our frontend interface is localized using **GitLocalize**, enabling the community to contribute translations easily.

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

1. Visit the GitLocalize page
2. Choose your language
3. Submit translations directly in the browser

---

## 📜 Code of Conduct

We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct.md). Please be kind, inclusive, and constructive in all interactions.

---

## Contributors

Thanks to all contributors:

[![Contributors](https://contrib.rocks/image?repo=SultanZain/LearnSeerahContent)](https://github.com/SultanZain/LearnSeerahContent/graphs/contributors)


Thank you for supporting the **LearnSeerah** project!
