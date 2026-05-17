<script setup lang="ts">
	import LxIcon from './LxIcon.vue';
</script>

# Icon

The Icon component is a simple wrapper around the Font Awesome icon library, with support for both the free and pro icon sets. It allows you to easily add icons to your application with a consistent API.

[[toc]]

## Settings

The Icon component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `''` | The icon identifier or Font Awesome class string. Supports values such as `car`, `fa-car`, `fa-regular fa-car`, or `fa-duotone fa-car`. |
| `variant` | `string` | `'solid'` | The fallback style used only when `name` does not already include an explicit Font Awesome style class. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `'md'` | The size of the icon. This can be one of the following: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. |
| `spin` | `boolean` | `false` | Whether the icon should spin. |
| `pulse` | `boolean` | `false` | Whether the icon should pulse. |
| `fixedWidth` | `boolean` | `false` | Whether the icon should have a fixed width. This can be useful for aligning icons in a list or menu. |
| `label` | `string` | `''` | The aria-label for the icon, for accessibility purposes. This should be a descriptive label of the icon's meaning or function. |
| `decorative` | `boolean` | `false` | Whether the icon is purely decorative. If true, the icon will be hidden from assistive technologies and should not have a label. This is useful for icons that are purely visual and do not convey any meaningful information. |

## Styles

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxIcon name="home" variant="solid" />
	<LxIcon name="home" variant="regular" />
	<LxIcon name="home" variant="light" />
	<LxIcon name="home" variant="duotone" />
	<LxIcon name="github" variant="brands" />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="home" variant="solid" />
<LxIcon name="home" variant="regular" />
<LxIcon name="home" variant="light" />
<LxIcon name="home" variant="duotone" />
<LxIcon name="github" variant="brands" />
```
</details>

## Name Formats

You can pass either a simple icon name or the full Font Awesome class string. If the `name` already includes a style class such as `fa-regular` or `fa-duotone`, the component will preserve it and will not prepend the fallback `variant`.

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
	<LxIcon name="car" />
	<LxIcon name="fa-car" />
	<LxIcon name="fa-regular fa-car" />
	<LxIcon name="fa-duotone fa-car" />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="car" />
<LxIcon name="fa-car" />
<LxIcon name="fa-regular fa-car" />
<LxIcon name="fa-duotone fa-car" />
```
</details>

## Sizes

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxIcon name="home" variant="solid" size="2xs" />
	<LxIcon name="home" variant="solid" size="xs" />
	<LxIcon name="home" variant="solid" size="sm" />
	<LxIcon name="home" variant="solid" size="md" />
	<LxIcon name="home" variant="solid" size="lg" />
	<LxIcon name="home" variant="solid" size="xl" />
	<LxIcon name="home" variant="solid" size="2xl" />
	<LxIcon name="home" variant="solid" size="3xl" />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="home" variant="solid" size="2xs" />
<LxIcon name="home" variant="solid" size="xs" />
<LxIcon name="home" variant="solid" size="sm" />
<LxIcon name="home" variant="solid" size="md" />
<LxIcon name="home" variant="solid" size="lg" />
<LxIcon name="home" variant="solid" size="xl" />
<LxIcon name="home" variant="solid" size="2xl" />
<LxIcon name="home" variant="solid" size="3xl" />
```
</details>

## States

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxIcon name="spinner" variant="solid" spin />
	<LxIcon name="spinner" variant="solid" pulse />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="spinner" variant="solid" spin />
<LxIcon name="spinner" variant="solid" pulse />
```
</details>
