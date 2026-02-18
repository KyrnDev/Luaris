# @luaris/dsl

`@luaris/dsl` is the canonical **contract layer** for Luaris composition and runtime packages.

It defines the shared types, schema shapes, and structural rules that other packages implement against.

## Purpose

`@luaris/dsl` exists to ensure that:

- composition builders (for example `@luaris/compose`, `@luaris/compose-jsx`) emit a consistent schema
- runtimes (for example `@luaris/runtime-vue`) consume a predictable schema
- contracts are centrally versioned and typed

## Core Responsibilities

- Define composition node interfaces and unions.
- Define page/layout/component schema contracts.
- Define shared metadata/configuration contracts.
- Define versioned compatibility boundaries between composer and runtime packages.

## How It Fits Into Luaris

High-level flow:

1. `@luaris/dsl` defines the contract.
2. `@luaris/compose` / `@luaris/compose-jsx` produce JSON that follows that contract.
3. Runtime packages consume that JSON and render output.

## Design Goals

- Strong TypeScript-first contracts.
- Clear, stable structural boundaries.
- Runtime-agnostic schema definitions.
- Forward-compatible evolution with explicit versioning.

## Non-Goals

- Rendering logic.
- UI component implementation details.
- Class-based page builder APIs.
- JSX/TSX transform implementation.

## Related Packages

- `@luaris/compose`: class-based composition API.
- `@luaris/compose-jsx`: JSX/TSX composition API.
- `@luaris/runtime-vue`: runtime renderer for DSL-compatible JSON.

## Status

This package is in early development and contracts may evolve before `1.0.0`.

## Examples

TBC
