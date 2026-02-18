# @luaris/runtime-vue

`@luaris/runtime-vue` is the Vue runtime renderer for Luaris composition data.

It consumes JSON that follows the **`@luaris/dsl`** contract/schema and renders it using components from **`@luaris/ui`**.

## Purpose

This package is responsible for turning DSL-compatible composition data into real Vue-rendered UI.

## Data Input

Runtime data can be provided through any transport layer, including:

- HTTP
- WebSocket
- Server-sent events
- Local/static JSON sources

As long as the payload follows `@luaris/dsl`, `@luaris/runtime-vue` should be able to render it.

## Relationship to Other Packages

- `@luaris/dsl`: source of schema/types/contracts.
- `@luaris/compose` and `@luaris/compose-jsx`: producers of DSL-compatible JSON.
- `@luaris/ui`: component library used by the runtime for rendering.

## Status

This package is in early development and expected to evolve before `1.0.0`.

## Examples

TBC
