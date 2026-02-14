# 🌙 Luaris Framework

*Luar* means **moonlight** in Portuguese — a quiet, steady light that brings clarity.
Luaris is built with that same idea in mind: clarity in how we design, build, and scale applications.

## What is Luaris?

Luaris is a **Vue-first UI ecosystem** that can grow into a full-stack application platform.

At its core, it provides a clean, strongly typed component library.
Around that, it adds a protocol and runtime layer that allow you to describe interfaces declaratively and run them consistently across environments.

You can use one part.
Or you can use the whole system.

## The Aim

Luaris exists to make building structured, scalable interfaces simple.

The goals are:

- Provide a well-designed Vue component system
- Keep contracts strongly typed and predictable
- Allow UI to be described declaratively when needed
- Support full-stack integration without unnecessary complexity
- Deliver a clean developer experience from start to finish

Everything should feel consistent. Nothing should feel bolted on.

## The Layers

Luaris is designed in layers. Each one works on its own.

### `@luaris/ui`

A Vue 3 component library built with TypeScript and SCSS.

All components use the `Lx` prefix:

```vue
<LxClusterLayout>
  <LxInput placeholder="Email" />
  <LxButton label="Submit" />
</LxClusterLayout>
```

You can use `@luaris/ui` in any Vue project without touching the rest of the ecosystem.

### `@luaris/protocol`

A strictly typed schema that describes UI structure, events, and actions.

It allows interfaces to be defined as structured data instead of Vue templates.
The protocol is framework-agnostic and designed to stay stable over time.

### `@luaris/runtime-vue`

The official Vue runtime.

It interprets protocol definitions and renders them using `@luaris/ui`.
It handles layout structure, slot mapping, and action dispatching.

Vue is the primary focus, but the naming leaves room for future runtimes if the ecosystem grows.

### `@luaris/protocol-jsx`

A JSX-based authoring layer for the protocol.

Instead of writing raw JSON, you can define protocol structures using typed JSX that compiles to the same schema.

### `@luaris/server`

A backend framework designed to work naturally with the protocol and runtime.

It can handle actions, routing, and structured application logic — but it can also be used independently.

## Design Principles

- **Layered and modular** — each package works on its own.
- **Strict core contracts** — predictable and versionable.
- **Extensible edges** — applications can expand safely.
- **Vue-first** — deep focus over shallow multi-framework support.
- **Consistent developer experience** across the stack.

Luaris starts as a component library.
It can grow into a complete application platform.

How far you take it is up to you. 🌙
