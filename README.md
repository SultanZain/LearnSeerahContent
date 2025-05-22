# Learn Seerah Content Repository

This repository contains the structured content (primarily in Markdown or MDX format) used to generate the Learn Seerah educational resource. Contributions are welcome!

## Contents

The content within this repository is organized following this structure:

```markdown
content/
├── glossary/                 # Definitions of key Seerah-related terms
│   ├── {lang}/               # Language code (e.g., en, ur, ar)
│       └── {term}.mdx        # Glossary file (e.g., sahabah.mdx, malaikah.mdx)
│                             # ➤ Use lowercase, hyphenated filenames for multi-word terms
│
├── quiz/                     # Seerah-related quizzes and assessments
│   ├── {lang}/               # Language code
│       └── {quiz-name}.mdx   # Quiz file (e.g., early-life-quiz.mdx, migration-quiz.mdx)
│                             # ➤ Filenames should be descriptive and hyphenated
│
├── references/               # Source material and academic references
│   ├── {lang}/               # Language code
│       └── {reference}.mdx   # Reference file (e.g., sahih-bukhari.mdx)
│                             # ➤ Filenames should be descriptive and lowercase
│
├── seerah/                   # Core narrative of Prophet Muhammad’s (ﷺ) life
│   ├── {lang}/               # Language code
│       └── {section}.mdx     # Section file (e.g., birth.mdx, migration.mdx)
│                             # ➤ One file per section, hyphenated and lowercase
│
└── timeline/                  # Chronological events of the Seerah
    ├── {lang}/                # Language code
        └── {year}-event-{id}.mdx 

    +---------------------------------------------------------------+
    |  # AD/CE year in start of file name (e.g., 571, 622)          |
    |  ➤ After year nuumber text "event-" and a numeric ID         |
    |  # Event file (e.g., 571-event-01.mdx, 610-event-02.mdx)      |
    +---------------------------------------------------------------+
```

> [!CAUTION]
> The File/Folder names and hierarchy must be same for all languages


## Contributing

We welcome contributions to improve and expand the Seerah content. Please follow these guidelines:

> [!IMPORTANT]
> Maintain a respectful and reverent tone when writing about the Prophet Muhammad (ﷺ) and related topics.

### 1.  Reporting Issues

If you find any errors, inconsistencies, or areas that need improvement in the existing content, please:

* Open a new issue in this repository.
* Clearly describe the issue, including the specific file and section if applicable.
* Provide any relevant context or suggestions for correction.

### 2.  Submitting Changes (Pull Requests)

For content additions, modifications, or significant changes, please submit a pull request (PR) following the workflow below:

* **Do NOT** directly push to the `production` branch. All contributions must be reviewed.
* **Create a New Branch:**
    * For substantial changes or new content, create a new branch with a descriptive name (e.g., `feature/new-seerah-post-early-life`, `fix/typo-migration-timeline`).
    * For smaller changes, create a branch with a descriptive name (e.g, `fix/grammar-mistake`)

* **Make Your Changes:**
    * Ensure your content is accurate, well-written, and adheres to the existing style and structure.
    * Use Markdown or MDX for your content. **When adding new content, please refer to the existing `.mdx` files within the relevant content directory as a reference to understand the expected format and structure.**
    * If adding images or other assets, place them in an appropriate directory and link them correctly.

* **Submit a Pull Request:**
    * Once you've completed your changes, submit a pull request (PR) to the `production` branch.
    * Provide a clear and concise title for your PR (e.g., "Add: New Section on the Battle of Badr").
    * In the PR description, explain the purpose of your changes and provide any relevant details.

### 3.  Alternative Submission via Email (If Facing Difficulties)

If you find it difficult to contribute directly using Markdown or MDX, you can write your content in a document editor (like MS Word, Google Docs, etc.) and email it to:

**sultan.zain004@outlook.com**

Please use the following subject line for your email:

Subject: `[LearnSeerah] New Content Request`

And include the following information in the body of your email:

Email Body:

    Content Type: {content_type}
    Content Name: {content_name}
    Content: {content}

Replace the bracketed placeholders with the appropriate information.

### 4.  Branch Management
* Once a pull request is merged, the branch will be deleted. This keeps the repository clean and organized.

### 5.  Review Process

* Your PR will be reviewed by the repository maintainers.
* You may be asked to make revisions based on the feedback.
* Once your PR is approved, it will be merged into the `production` branch.

### 6.  Content Guidelines

* **Accuracy:** Ensure all information is accurate and based on reliable sources.
* **Clarity:** Write in a clear and concise style that is easy to understand.
* **Respect:** Maintain a respectful and reverent tone when writing about the Prophet Muhammad (ﷺ) and related topics.
* **Citations:** Cite your sources.

##  Code of Conduct

* Please abide by the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct.md).

Thank you for your contributions to the **LearnSeerah** project!