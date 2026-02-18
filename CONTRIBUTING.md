# Contributing to Luaris

Thanks for contributing to **Luaris**.

This document defines the expected workflow and quality bar for all contributions.

## How to Contribute

1. Fork the repository.
2. Create a feature branch from your fork, all branches should be prefixed with `feature/`, `fix/`, `chore/`, etc. (e.g. `feature/add-new-component`).
3. Implement your change with clear commits.
4. Add or update tests.
5. Run lint and tests locally.
6. Open a pull request against the main repository.

## Development Requirements

Before opening a pull request, all of the following must pass:

- `bun run lint`
- `bun run test`

Your changes must also:

- Keep test quality at least as good as before (no reduction in expected coverage/quality for touched areas).
- Include sufficient unit tests for new/changed behaviour.
- Keep docs/readme content clear and concise for changed components/features.

If your change adds or updates a component, include/update:

- Component README with props/emits/slots/examples.
- Notes on any styling tokens used.

## Pull Request Expectations

Every PR should include:

- What changed.
- Why it changed.
- How it was tested.
- Any known limitations or follow-up items.
- Any migration notes (if relevant).

## Backwards Compatibility

All contributions should assume backwards compatibility.

If a change is potentially breaking:

- Do not merge directly.
- Open a discussion first and document impact/options.
- Wait for agreement before proceeding.

## AI-Assisted Contributions

AI-assisted contributions are welcome, with additional requirements:

- Provide a detailed description of AI-generated code changes.
- Clearly describe expected impact on the codebase and behaviour.
- Confirm manual due diligence was performed (review, validation, testing).
- Ensure generated code is carefully checked for correctness, security, maintainability, and style consistency.
- Add the pull request label: **`AI Generated`**.

PRs using AI without sufficient detail or due diligence may be requested for revision before review.

## Style and Quality

- Follow existing project conventions and patterns.
- Reuse existing components/composables where appropriate.
- Keep changes scoped and focused.
- Prefer explicit typing and readable code.

## Questions / Proposals

For large features, architectural changes, or potential breaking changes, open a discussion before implementation.
