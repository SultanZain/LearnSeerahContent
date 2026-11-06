## Description

Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context.

**Base branch: `dev`.** Translation PRs, including forks and GitLocalize
submissions, must target `dev`. See the [translator guide](../docs/contributing/translations.md).

For translations, fill in the following (otherwise remove this block):

- Language and locale code:
- English source commit/revision:
- Files, lesson/section or timeline range, and complete/partial coverage:
- Translated section/unit names and terminology decisions:
- AI assistance used (if any):
- Human review completed; pending fluent review (if any):
- Source uncertainties, intentional English fallback text, or missing coverage:
- Maintainer handoff: new-locale registration or map/Chronicle regeneration needed:

## Type of change

Please select the relevant options.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Code style update (formatting, renaming)
- [ ] Refactoring (no functional changes, no API changes)
- [ ] Build or CI related changes
- [ ] Documentation update
- [ ] Translation or translation review
- [ ] Other... Please describe:

## How has this been checked?

Describe the checks actually performed, such as source comparison, human language
review, JSON/YAML parsing, or relevant tooling tests. Do not claim checks that
have not run. Real UI testing on https://dev.learnseerah.com follows merge and
the site's update; list the pages to review and mark that testing as pending here.

## Checklist

- [ ] This PR targets `dev` and contains only the intended changes.
- [ ] I reviewed all changed files, including new files, and checked the diff.
- [ ] Applicable syntax/tooling checks are described above; pending checks are explicit.
- [ ] I updated relevant documentation if the workflow or tooling changed.

For translation PRs:

- [ ] Before pushing or submitting, I read every changed file and every line,
      including AI drafts, frontmatter, quiz options, and explanations.
- [ ] A fluent human reviewed native phrasing and idioms, the intended feeling,
      respectful tone, grammar, spelling, terminology, and faithful meaning;
      any pending review is stated above.
- [ ] Filenames, IDs, ordering, citations, links, Arabic text, honorifics, Quran
      components, and page/quiz markers are preserved.
- [ ] Lessons have matching translated sections and identical unit names within
      each unit; quiz translations preserve the intended correct answer.
- [ ] UI dictionary keys, structure, arrays, placeholders, and escapes are preserved
      where applicable.
- [ ] Maps/Chronicle event wording is translated in timeline source files; this PR
      does not contain manual translations of generated exports or indexes.
- [ ] Required locale setup, generated-data refresh, and post-merge development UI
      review are identified above, including anything still pending.

## Additional context

Add any other context or links about the pull request here.
