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
| `name` | `string` | `''` | The name of the icon to display. This should be the Font Awesome icon name, without the `fa-` prefix. For example, `home` for the `fa-home` icon. |
| `iconStyle` | `string` | `'solid'` | The style of the icon. This should be one of the Font Awesome styles, such as `solid`, `regular`, `light`, `duotone`, or `brands`. |
| `size` | `string` | `'md'` | The size of the icon. This can be one of the following: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. |
| `spin` | `boolean` | `false` | Whether the icon should spin. |
| `pulse` | `boolean` | `false` | Whether the icon should pulse. |
| `fixedWidth` | `boolean` | `false` | Whether the icon should have a fixed width. This can be useful for aligning icons in a list or menu. |
| `label` | `string` | `''` | The aria-label for the icon, for accessibility purposes. This should be a descriptive label of the icon's meaning or function. |
| `decorative` | `boolean` | `false` | Whether the icon is purely decorative. If true, the icon will be hidden from assistive technologies and should not have a label. This is useful for icons that are purely visual and do not convey any meaningful information. |

## Styles

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxIcon name="home" iconStyle="solid" />
	<LxIcon name="home" iconStyle="regular" />
	<LxIcon name="home" iconStyle="light" />
	<LxIcon name="home" iconStyle="duotone" />
	<LxIcon name="github" iconStyle="brands" />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="home" iconStyle="solid" />
<LxIcon name="home" iconStyle="regular" />
<LxIcon name="home" iconStyle="light" />
<LxIcon name="home" iconStyle="duotone" />
<LxIcon name="github" iconStyle="brands" />
```
</details>

## Sizes

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxIcon name="home" iconStyle="solid" size="2xs" />
	<LxIcon name="home" iconStyle="solid" size="xs" />
	<LxIcon name="home" iconStyle="solid" size="sm" />
	<LxIcon name="home" iconStyle="solid" size="md" />
	<LxIcon name="home" iconStyle="solid" size="lg" />
	<LxIcon name="home" iconStyle="solid" size="xl" />
	<LxIcon name="home" iconStyle="solid" size="2xl" />
	<LxIcon name="home" iconStyle="solid" size="3xl" />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="home" iconStyle="solid" size="2xs" />
<LxIcon name="home" iconStyle="solid" size="xs" />
<LxIcon name="home" iconStyle="solid" size="sm" />
<LxIcon name="home" iconStyle="solid" size="md" />
<LxIcon name="home" iconStyle="solid" size="lg" />
<LxIcon name="home" iconStyle="solid" size="xl" />
<LxIcon name="home" iconStyle="solid" size="2xl" />
<LxIcon name="home" iconStyle="solid" size="3xl" />
```
</details>

## States

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxIcon name="spinner" iconStyle="solid" spin />
	<LxIcon name="spinner" iconStyle="solid" pulse />
</div>

<details>
<summary>Show code</summary>

```html
<LxIcon name="spinner" iconStyle="solid" spin />
<LxIcon name="spinner" iconStyle="solid" pulse />
```
</details>
