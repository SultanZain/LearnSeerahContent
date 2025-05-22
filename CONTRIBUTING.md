# Contributing Guide

Thank you for contributing!

## Workflow

1. Fork the repo or create a feature branch from `dev`.
2. Make your changes.
3. Open a pull request **into `dev` branch**.
4. Once tested and reviewed, changes will be manually merged into `main`.

## Rules

- ✅ Contributors can push to `dev` or feature branches.
- ❌ No one (except maintainers) can push directly to `main`.
- ✅ All changes to `main` must come through a pull request from `dev` and be reviewed/tested.


## Branch Strategy

- `production` → 🚫 No direct pushes. Only maintainers can merge after testing.
- `dev` → ✅ All feature PRs go here.
- `feature/xyz` → ✅ Make changes here and open PR to `dev`.

## Workflow

1. Base your work on `dev`.
2. Push changes to a feature branch.
3. Create a PR into `dev`.
4. After review and testing, maintainers will merge `dev` into `production`.
