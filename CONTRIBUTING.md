# Contributing to LearnSeerah

Thank you for your interest in contributing to the LearnSeerah project! We welcome all contributions, whether it's fixing bugs, improving documentation, or adding new features. 

To help ensure a smooth and consistent contribution process across the repository, Please review the guidelines below.

## 📚 General Workflow

We follow a strict branching model to ensure the stability of the application.

1. **Base your work** off the `dev` branch or the specific language branch (e.g., `i18n/bengali`).
2. **Create a feature branch** for the changes you want to make.
3. **Make your changes** and commit them.
4. **Open a Pull Request (PR)** targeting `dev` or your specific language branch.
5. **Review** — Maintainers will review, test, and finally merge the branch into `production`.

> [!CAUTION]
> - ✅ Contributors can push to `dev` or feature branches.
> - ❌ No one (except maintainers) is allowed to push directly to `production`.
> - ✅ All changes reaching `production` MUST go through a PR to `dev` and be properly tested.

## 📌 Branch Strategy Summary

- `production` → 🚫 Protected branch. Direct pushes are disabled.
- `dev` → ✅ Active development branch. All feature PRs target this branch.
- `feature/*` → ✅ Your working branches. Create these off `dev` and open PRs back into `dev`.

## 📖 Detailed Guides

For more specific and in-depth guidelines on contributing to different parts of the platform, please see the documents below:

- [Scripts and Tooling Usage](./docs/contributing/scripts.md)
- [Working with MDX Content](./docs/contributing/mdx-content.md)

---

Thank you again for making LearnSeerah better!
