<script setup lang="ts">
	import LxDetails from './LxDetails.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import { COLOURS, SIZES, SURFACE_COLOURS } from '../../helpers/constants';
	import { ref } from 'vue';

	const controlledOpen = ref(true);
</script>

# Details

The Details component is a collapsible section that can be used to display additional information or content. It is similar to the HTML `<details>` element, but with support for custom styling and content.

[[toc]]

## Settings

The Details component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `raised` | The summary surface colour. Core colours use their matching `on-*` token, while surface colours use the shared text token. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `md` | The shared control size for summary height, spacing, icon size, and typography. |
| `title` | `string?` | `undefined` | Optional summary title text displayed before any `summary` slot content. |
| `icon` | `string?` | `undefined` | Optional summary icon displayed before the title. |
| `content` | `string` | `''` | Optional plain text content used when no `content` or default slot is provided. |
| `contentPadding` | [TSizes](/types/theme.html#type-tsizes) | `size` | Optional content padding token. When omitted, the content padding follows the current `size`. |
| `contentLineHeight` | [TFontLineHeights](/types/theme.html#type-tfontlineheights) | `normal` | The line-height token used for the content area. |
| `contentBackgroundColour` | [TSurfaceColours](/types/theme.html#type-tsurfacecolours) \| `transparent` | `raised`, or `transparent` when `variant="transparent"` | The surface colour used for the expanded content area. |
| `borderRadius` | [TRadiusSize](/types/theme.html#type-tradiussize) | `md` | The outer border radius of the details container. |
| `borderWidth` | [TBorderWidths](/types/theme.html#type-tborderwidths) | `thin` | The border width used for the container and open-state divider. |
| `disabled` | `boolean` | `false` | Prevents toggling and applies a disabled visual state. |

## Events

The Details component supports the following model event:

| Event | Description |
| --- | --- |
| `update:open` | Emitted when the disclosure state changes, for use with `v-model:open`. |

## Usage

<LxDetails title="Billing details" icon="receipt" variant="primary">
	<template #summary>
		<span>Updated 2 hours ago</span>
	</template>
	<template #content>
		<p>
			Detailed content goes here
		</p>
	</template>
</LxDetails>

<details>
<summary>Show code</summary>

```html
<LxDetails title="Billing details" icon="receipt" variant="primary">
	<template #summary>
		<span>Updated 2 hours ago</span>
	</template>
	<template #content>
		<p>
			Detailed content goes here
		</p>
	</template>
</LxDetails>
```
</details>

## Sizes

The Details component supports different sizes, which can be set using the `size` prop. The available sizes are:

<LxFlex direction="column" gap="md">
	<LxDetails v-for="size in SIZES" :key="size" :size="size" icon="car">
		<template #summary>
			{{ size }} Details
		</template>
		<template #content>
			<p>
				Detailed content goes here
			</p>
		</template>
	</LxDetails>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxDetails v-for="size in SIZES" :key="size" :size="size" icon="car">
		<template #summary>
			{{ size }} Details
		</template>
		<template #content>
			<p>
				Detailed content goes here
			</p>
		</template>
	</LxDetails>
</LxFlex>
```
</details>

## Variants

The `variant` prop supports both semantic colours and semantic surfaces from the platform palette.

> [!INFO]
> `variant="transparent"` removes the outer border and defaults both the summary and content surfaces to transparent.

<LxFlex direction="column" gap="md">
	<LxDetails v-for="variant in COLOURS" :key="variant" :variant="variant" :title="`${variant} details`" icon="circle-info">
		<template #content>
			<p>Uses <code>{{ variant }}</code> as the summary surface.</p>
		</template>
	</LxDetails>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxDetails v-for="variant in COLOURS" :key="variant" :variant="variant" :title="`${variant} details`" icon="circle-info">
		<template #content>
			<p>Uses <code>{{ variant }}</code> as the summary surface.</p>
		</template>
	</LxDetails>
</LxFlex>
```
</details>

<LxFlex direction="column" gap="md" class="lx-margin-top--xl">
	<LxDetails
		v-for="variant in SURFACE_COLOURS"
		:key="variant"
		:variant="variant"
		:title="`${variant} details`"
		icon="layer-group"
	>
		<template #content>
			<p>Uses <code>{{ variant }}</code> from the shared surface tokens.</p>
		</template>
	</LxDetails>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md" class="lx-margin-top--xl">
	<LxDetails
		v-for="variant in SURFACE_COLOURS"
		:key="variant"
		:variant="variant"
		:title="`${variant} details`"
		icon="layer-group"
	>
		<template #content>
			<p>Uses <code>{{ variant }}</code> from the shared surface tokens.</p>
		</template>
	</LxDetails>
</LxFlex>
```
</details>

## Controlled Open State

You can control the disclosure state with `v-model:open`.

<LxDetails v-model:open="controlledOpen" title="Always open example">
	<template #content>
		<p>
			This example starts open using the shared component model.
		</p>
	</template>
</LxDetails>

<details>
<summary>Show code</summary>

```html
<LxDetails v-model:open="controlledOpen" title="Always open example">
	<template #content>
		<p>
			This example starts open using the shared component model.
		</p>
	</template>
</LxDetails>
```
</details>

## Summary Order

When icon, title, and the `summary` slot are all provided, the summary content order is:

1. icon
2. title
3. summary slot content
4. chevrons

## Slots

The Details component provides the following slots:

### Slot: `summary`

Adds extra inline content to the summary row after the icon and title, and before the chevrons.

### Slot: `content`

Provides named content for the expanded panel. This takes priority over the default slot and the `content` prop.

### Slot: `default`

Provides fallback expanded content when the named `content` slot is not used.
