# 🌙 Luaris Framework

Luaris is a Vue-first ecosystem that scales from a component library to a full application framework.

The core idea is simple: keep UI building blocks strongly typed, define shared contracts in a DSL, compose pages declaratively, then render them through runtime packages.

You can adopt one package at a time, or use the full stack.

## ✨ Why Luaris

- Build with a clean Vue component library
- Keep contracts typed and predictable
- Describe UI declaratively when needed
- Integrate frontend and backend concerns without extra ceremony
- Maintain a consistent developer experience across packages

## 📦 Package Overview

| Package | Purpose |
| --- | --- |
| `@luaris/ui` | Vue 3 component library built with TypeScript and SCSS |
| `@luaris/dsl` | Canonical schema/types/contracts shared between composition and runtime packages |
| `@luaris/compose` | Class-based page composition engine that outputs DSL-compatible JSON |
| `@luaris/compose-jsx` | JSX/TSX composition layer that compiles to DSL-compatible JSON |
| `@luaris/runtime-vue` | Vue runtime that renders DSL-compatible JSON with `@luaris/ui` |
| `@luaris/app` | Opinionated MVC-style app framework with HTTP/WebSocket server support |

## 🧩 `@luaris/ui` Example

All UI components use the `Lx` prefix:

```vue
<LxFlex gap="md">
	<LxInput placeholder="Email address" />
	<LxButton>Submit</LxButton>
</LxFlex>
```

`@luaris/ui` works as a standalone component library, so you do not need the other packages unless you want them.

## 🧭 Design Principles

- Modular by default: each package is useful on its own
- Strong core contracts: stable, versionable, typed
- Extensible architecture: easy to grow without rewrites
- Vue-first focus: depth over broad but shallow support
- Consistent APIs and naming across the ecosystem

## 🚀 Direction

Luaris starts with UI components, then expands into a DSL-driven composition and runtime model, with an application framework on top.

Use as much or as little of the framework as your project needs.
