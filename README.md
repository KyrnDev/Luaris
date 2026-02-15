# 🌙 Luaris Framework

Luaris is a Vue-first UI ecosystem that can scale into a full application platform.

The core idea is simple: keep UI building blocks well-designed and strongly typed, then add protocol and runtime layers when you need declarative interfaces or deeper integration.

You can adopt one package at a time, or use the whole stack.

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
| `@luaris/protocol` | Typed schema for UI structure, events, and actions |
| `@luaris/runtime-vue` | Vue runtime that renders protocol definitions with `@luaris/ui` |
| `@luaris/protocol-jsx` | JSX authoring layer that compiles to the protocol schema |
| `@luaris/server` | Backend layer for actions, routing, and structured app logic |

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

Luaris starts with UI components, then expands into protocol-driven frontend and backend tooling.

Use as much or as little of the framework as your project needs.
