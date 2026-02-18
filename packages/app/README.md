# @luaris/app

`@luaris/app` is the opinionated application framework for building full projects on top of Luaris.

It provides a functional, MVC-styled architecture and integrates the wider Luaris stack so developers can focus on product delivery instead of low-level plumbing.

## Purpose

`@luaris/app` is intended to offer:

- A structured MVC-style application foundation.
- Tight integration with:
	- `@luaris/ui`
	- `@luaris/runtime-vue`
	- `@luaris/compose` / `@luaris/compose-jsx`
	- `@luaris/dsl`
- Server-side HTTP and WebSocket support for framework-driven applications.

## Framework Direction

This package is intentionally opinionated.

It aims to reduce decision fatigue and eliminate common setup overhead, including routing and app structure concerns, so teams can spend more time building product features.

## What It Will Handle

- Application structure and conventions.
- Routing strategy (opinionated defaults).
- Runtime + composition integration flow.
- Server runtime concerns (HTTP/WebSocket entrypoints).

## Design Goals

- Fast runtime characteristics.
- Powerful defaults for real application development.
- Strong integration across all Luaris packages.
- Clear conventions over configuration-heavy setup.

## Status

This package is in early development and expected to evolve before `1.0.0`.

## Examples

TBC
