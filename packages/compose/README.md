# @luaris/compose

`@luaris/compose` is the core **class-based page composition engine** for Luaris.

Its role is to let developers define pages, layouts, sections, and UI structures using fluent classes and methods, then output a consistent **JSON composition schema**.

The composition schema, types, and structural contracts are defined by **`@luaris/dsl`**.

That JSON is intended to be consumed by runtime renderers (for example `@luaris/runtime-vue`), which turn the schema into a real rendered application or website.

## Vision

`@luaris/compose` will provide:

- A class-first API for composing pages and component trees.
- Strong TypeScript support for safer composition.
- A predictable JSON output contract aligned to `@luaris/dsl`.
- Reusable composition patterns for larger applications and teams.

## How It Fits Into Luaris

High-level flow:

1. Build composition definitions with `@luaris/compose`.
2. Validate/shape output against contracts from `@luaris/dsl`.
3. Export/serialise definitions to JSON.
4. Pass JSON into a renderer such as `@luaris/runtime-vue`.
5. Runtime maps schema nodes to UI components (for example from `@luaris/ui`) and renders the page.

## Primary Responsibilities

- Composition model and builder APIs.
- JSON schema generation and normalisation using `@luaris/dsl` contracts.
- Validation-friendly structure for runtimes.
- Extensibility points for custom nodes/behaviours.

## Non-Goals

- Direct DOM rendering.
- Framework runtime concerns (handled by runtime packages).
- Styling implementation details (handled by UI/theme packages).
- Owning canonical schema contracts (handled by `@luaris/dsl`).

## Status

This package is currently in early development and the API is expected to evolve before `1.0.0`.

## Examples

TBC
