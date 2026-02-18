# @luaris/compose-jsx

`@luaris/compose-jsx` is an extension layer for `@luaris/compose` that enables **JSX/TSX authoring** while still targeting the same JSON composition output.

It is designed for developers who prefer component-like authoring ergonomics, but want the resulting structure to remain serialisable and runtime-agnostic.

The output schema and structural contracts are sourced from **`@luaris/dsl`**.

## Purpose

With `@luaris/compose-jsx`, you can:

- Define composition structures using JSX/TSX syntax.
- Compile/transform JSX definitions into the same JSON schema used by `@luaris/compose`, aligned to `@luaris/dsl`.
- Reuse the same runtime rendering pipeline (for example `@luaris/runtime-vue`).

## Relationship to `@luaris/compose`

- `@luaris/compose` is the core composition model and class API.
- `@luaris/compose-jsx` is an authoring layer on top of that model.
- `@luaris/dsl` provides the canonical types and contracts both packages target.

Both should produce equivalent composition JSON so teams can mix class-based and JSX-based authoring styles as needed.

## Intended Workflow

1. Write composition definitions in TSX.
2. Transform definitions into `@luaris/dsl`-compatible composition JSON.
3. Hand JSON to runtime renderers (for example Vue runtime) for actual rendering.

## Why This Exists

- Improved developer ergonomics for JSX-heavy teams.
- A bridge between declarative TSX authoring and JSON-first runtime contracts.
- Better portability of composed output across runtimes.

## Status

This package is currently in early development and the API is expected to evolve before `1.0.0`.

## Examples

TBC
