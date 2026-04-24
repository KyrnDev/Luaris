# Notes

When writing components, you must:

- Create a `types.ts` file, this should export any types related to the component, alongside Prop types.
- Create a `Lx<ComponentName>.vue` file, this should contain the actual component implementation.
- Create an `index.ts` file, this should export the component and any related types.
- Create an `index.md` file, this should contain the documentation for the component, this will be used by VitePress to generate the documentation site.
- Add the component to the `components` array in `packages/ui/.vitepress/config.ts`, this will ensure that the component is included in the documentation site.
- Add the component to the `package.json` file, this will ensure that the component is importable from the package.
- Add the component to the `vite.config.ts` file, this will ensure that the component is included in the build process.

When writing documentation for components, you should:

- Use the `LxFlex` component to create examples of the component in use, this will ensure that the examples are consistent and visually appealing.
- Use the `details` and `summary` HTML elements to create collapsible sections for code examples, this will keep the documentation clean and easy to read.
- Define the settings at the top, talk about the various props for that component, i.e. every potential prop value.
- Define the usage.
- Define the slots, for each slot, provide a description of what the slot is for and an example of how to use it.
