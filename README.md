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

## 📋 The Plan

While I am working on this project, I am focusing on building everything out in stages, to avoid getting overwhelmed by the scope.

- 🚧 Build the core UI component library (`@luaris/ui`)
- ❌ Build the shared DSL/contracts package (`@luaris/dsl`)
- ❌ Build the composition engine (`@luaris/compose`)
- ❌ Build the JSX/TSX composition layer (`@luaris/compose-jsx`)
- ❌ Build the Vue runtime (`@luaris/runtime-vue`)
- ❌ Build the application framework (`@luaris/app`)

After each package has been created, I shall get to building out the documentation, and examples. Currently I am looking at potentially working with the [Storybook](https://storybook.js.org/) tool, but I have never used it before, so it might take me a while to get it up and running and understand how it works. If anyone is confident with it and wants to help out, please let me know, as I would really appreciate the help.

## 🤝 Contributing

There is a separate section for [Contributing](CONTRIBUTING.md), but in general, if you want to contribute, I would highly appreciate it, the scope of this project is huge, and I know it's a large undertaking, but after building [Sodacore](https://github.com/sodacore/core) and seeing how much I used it within my own personal projects, I am really motivated to try and build an ecosystem that can cover everything I would need.

For anyone looking at [Sodacore](https://github.com/sodacore/core) and wondering whether this version would also use TypeScript legacy decorators, the answer is no. My intention with the backend framework is to offer a more functional approach, with less magic, as much as decorators offered some great features, and I absolutely don't regret using them, I found that in some ways, just to offer small features, like defining a middleware, I would need a class with a decorator to deal with that, which then made it tedious to write simple things, some things I was able to get around.

Going forward, for this project, I want to focus on the core features using a functional design, and then if I decide I want to offer a class-based approach as well. I do, personally, like class-based approach, thinking like MVC - then I will most likely add it as a "wrapper" around the core features, so you can almost use both.

If you want to get involved with the development and even the design decisions, then feel free to create a discussion, otherwise, if you want to contribute code, then just create a pull request, and I will review it as soon as I can.
