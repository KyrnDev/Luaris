<script setup>
	import LxButton from './LxButton.vue';
</script>

# Button

The button component is a versatile and customizable UI element that can be used for various actions in your application. It supports multiple variants, sizes, and states to fit different use cases.

## Settings

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `primary \| secondary \| success \| warning \| danger \| ghost \| plain \| accent \| info` | `primary` | The visual style of the button. |
| `size` | `2xs \| xs \| sm \| md \| lg \| xl \| 2xl` | `md` | The size of the button. |
| `type` | `button \| submit \| reset` | `button` | The HTML button type. |
| `disabled` | `boolean` | `false` | Whether the button is disabled. |
| `loading` | `boolean` | `false` | Whether the button is in a loading state. |
| `fullWidth` | `boolean` | `false` | Whether the button should take up the full width of its container. |
| `label` | `string` | `''` | The text label of the button. |
| `ariaLabel` | `string` | `''` | The aria-label attribute for accessibility. |
| `icon` | `string` | `''` | The name of the icon to display in the button. |
| `iconOrder` | `icon-left \| icon-right` | `icon-left` | The position of the icon in relation to the label. |

## Styles

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxButton class="lx-margin-right--sm" label="Primary" variant="primary" />
	<LxButton class="lx-margin-right--sm" label="Secondary" variant="secondary" />
	<LxButton class="lx-margin-right--sm" label="Accent" variant="accent" />
	<LxButton class="lx-margin-right--sm" label="Info" variant="info" />
	<LxButton class="lx-margin-right--sm" label="Success" variant="success" />
	<LxButton class="lx-margin-right--sm" label="Warning" variant="warning" />
	<LxButton class="lx-margin-right--sm" label="Danger" variant="danger" />
</div>

<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm" label="Primary" variant="primary" />
<LxButton class="lx-margin-right--sm" label="Secondary" variant="secondary" />
<LxButton class="lx-margin-right--sm" label="Accent" variant="accent" />
<LxButton class="lx-margin-right--sm" label="Info" variant="info" />
<LxButton class="lx-margin-right--sm" label="Success" variant="success" />
<LxButton class="lx-margin-right--sm" label="Warning" variant="warning" />
<LxButton class="lx-margin-right--sm" label="Danger" variant="danger" />
```
</details>

## Sizes

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxButton class="lx-margin-right--sm" label="2xs" variant="primary" size="2xs" />
	<LxButton class="lx-margin-right--sm" label="xs" variant="primary" size="xs" />
	<LxButton class="lx-margin-right--sm" label="sm" variant="primary" size="sm" />
	<LxButton class="lx-margin-right--sm" label="md" variant="primary" size="md" />
	<LxButton class="lx-margin-right--sm" label="lg" variant="primary" size="lg" />
	<LxButton class="lx-margin-right--sm" label="xl" variant="primary" size="xl" />
	<LxButton class="lx-margin-right--sm" label="2xl" variant="primary" size="2xl" />
</div>

<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm" label="2xs" variant="primary" size="2xs" />
<LxButton class="lx-margin-right--sm" label="xs" variant="primary" size="xs" />
<LxButton class="lx-margin-right--sm" label="sm" variant="primary" size="sm" />
<LxButton class="lx-margin-right--sm" label="md" variant="primary" size="md" />
<LxButton class="lx-margin-right--sm" label="lg" variant="primary" size="lg" />
<LxButton class="lx-margin-right--sm" label="xl" variant="primary" size="xl" />
<LxButton class="lx-margin-right--sm" label="2xl" variant="primary" size="2xl" />
```
</details>

## States

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxButton class="lx-margin-right--sm" label="Loading" variant="primary" loading />
	<LxButton class="lx-margin-right--sm" label="Disabled" variant="primary" disabled />
</div>

<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm" label="Loading" variant="primary" loading />
<LxButton class="lx-margin-right--sm" label="Disabled" variant="primary" disabled />
```
</details>

## Layout

<LxButton class="lx-margin-right--sm lx-margin-top--sm" label="Full Width" variant="primary" fullWidth />

<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm lx-margin-top--sm" label="Full Width" variant="primary" fullWidth />
```
</details>

## Icon

<div style="display: flex; gap: 0.1rem; flex-wrap: wrap;">
	<LxButton class="lx-margin-right--sm" label="Icon Left" variant="primary" icon="poo" />
	<LxButton class="lx-margin-right--sm" label="Icon Right" variant="primary" icon="poo" iconOrder="right" />
</div>

## Slots

The button component also supports slots for more custom content.

### Slot: Icon

Can allow you to add a custom icon to the button, such as an SVG or a font icon with custom styling.

<LxButton class="lx-margin-right--sm" variant="primary">
	Car
	<template #icon>
		<i class="fa-duotone fa-car lx-font-size--xl" />
	</template>
</LxButton>

<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm" variant="primary">
	Car
	<template #icon>
		<i class="fa-duotone fa-car lx-font-size--xl" />
	</template>
</LxButton>
```
</details>

### Slot: Leading

The leading slot allows you to add content before the button label, such as contextual information.

<LxButton class="lx-margin-right--sm" variant="primary">
	<template #leading>
		<p>$</p>
	</template>
	Button
</LxButton>

<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm" variant="primary">
	<template #leading>
		<p>£</p>
	</template>
	Button
</LxButton>
```
</details>

### Slot: Trailing

The trailing slot allows you to add content after the button label, such as a badge or an additional icon.

<LxButton class="lx-margin-right--sm" variant="primary">
	Button
	<template #trailing>
		<p>!</p>
	</template>
</LxButton>


<details>
<summary>Show code</summary>

```html
<LxButton class="lx-margin-right--sm" variant="primary">
	Button
	<template #trailing>
		<p>!</p>
	</template>
</LxButton>
```
</details>
