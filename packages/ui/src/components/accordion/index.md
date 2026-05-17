<script setup lang="ts">
	import LxAccordion from './LxAccordion.vue';
	import LxAccordionItem from './LxAccordionItem.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import { COLOURS, SIZES, SURFACE_COLOURS } from '../../helpers/constants';
	import { ref } from 'vue';

	const controlledOpen = ref(true);
</script>

# Accordion

The Accordion component is a structured set of collapsible items built with the same shared colour, sizing, and disclosure rules as the platform details component. Use it when you want related sections to coordinate as a group, either allowing one panel at a time or multiple open panels.

By default, accordion items are visually connected into a single stacked control. If you want separated items instead, use `connected="false"` or compose multiple `LxDetails` components directly.

[[toc]]

## Settings

### `LxAccordion`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` | `boolean` | `false` | Whether multiple accordion items can stay open at the same time. |
| `connected` | `boolean` | `true` | Whether accordion items should render as one connected stack instead of separated panels. |
| `variant` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `raised` | The default summary surface for child items. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `md` | The default control size for child items. |
| `gap` | [TSizes](/types/theme.html#type-tsizes) | `md` | The vertical gap between accordion items when `connected` is `false`. |
| `contentPadding` | [TSizes](/types/theme.html#type-tsizes) | `size` | The default content padding for child items. |
| `contentLineHeight` | [TFontLineHeights](/types/theme.html#type-tfontlineheights) | `normal` | The default line-height token for child item content. |
| `contentBackgroundColour` | [TSurfaceColours](/types/theme.html#type-tsurfacecolours) \| `transparent` | `raised`, or `transparent` when `variant="transparent"` | The default content surface for child items. |
| `borderRadius` | [TRadiusSize](/types/theme.html#type-tradiussize) | `md` | The default outer border radius for child items. |
| `borderWidth` | [TBorderWidths](/types/theme.html#type-tborderwidths) | `thin` | The default border width for child items. |

### `LxAccordionItem`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string?` | `undefined` | Optional summary title text displayed before any `summary` slot content. |
| `icon` | `string?` | `undefined` | Optional summary icon displayed before the title. |
| `content` | `string` | `''` | Optional plain text content used when no `content` or default slot is provided. |
| `variant` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | inherits from `LxAccordion` | Overrides the summary surface for this item. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | inherits from `LxAccordion` | Overrides the shared control size for this item. |
| `contentPadding` | [TSizes](/types/theme.html#type-tsizes) | inherits from `LxAccordion`, then `size` | Overrides the content padding for this item. |
| `contentLineHeight` | [TFontLineHeights](/types/theme.html#type-tfontlineheights) | inherits from `LxAccordion` | Overrides the line-height token for this item content. |
| `contentBackgroundColour` | [TSurfaceColours](/types/theme.html#type-tsurfacecolours) \| `transparent` | inherits from `LxAccordion` | Overrides the content surface for this item. |
| `borderRadius` | [TRadiusSize](/types/theme.html#type-tradiussize) | inherits from `LxAccordion` | Overrides the outer border radius for this item. |
| `borderWidth` | [TBorderWidths](/types/theme.html#type-tborderwidths) | inherits from `LxAccordion` | Overrides the border width for this item. |
| `disabled` | `boolean` | `false` | Prevents the item from being toggled and applies a disabled visual state. |
| `value` | `string?` | generated | Optional stable identifier used internally by the accordion group. |

## Events

### `LxAccordionItem`

| Event | Description |
| --- | --- |
| `update:open` | Emitted when the item disclosure state changes, for use with `v-model:open`. |

## Usage

<LxAccordion>
	<LxAccordionItem title="Billing" icon="receipt">
		<template #summary>
			<span>Updated 2 hours ago</span>
		</template>
		<template #content>
			<p>Review invoices, payment status, and settlement details.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Shipping" icon="truck-fast">
		<template #content>
			<p>Track dispatch state and estimated delivery windows.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Support" icon="life-ring">
		<template #content>
			<p>Escalations, ownership, and customer conversation history.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>

<details>
<summary>Show code</summary>

```html
<LxAccordion>
	<LxAccordionItem title="Billing" icon="receipt">
		<template #summary>
			<span>Updated 2 hours ago</span>
		</template>
		<template #content>
			<p>Review invoices, payment status, and settlement details.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Shipping" icon="truck-fast">
		<template #content>
			<p>Track dispatch state and estimated delivery windows.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Support" icon="life-ring">
		<template #content>
			<p>Escalations, ownership, and customer conversation history.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>
```
</details>

## Single Or Multiple

By default, an accordion behaves as a single-open group. Set `multiple` to allow several items to stay open together.

<LxFlex direction="column" gap="xl" class="lx-margin-top--xl">
	<LxAccordion>
		<LxAccordionItem title="Single-open item 1" icon="list">
			<template #content>
				<p>Opening one item closes the others in this group.</p>
			</template>
		</LxAccordionItem>
		<LxAccordionItem title="Single-open item 2" icon="list-check">
			<template #content>
				<p>This follows classic accordion behaviour.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
	<LxAccordion multiple>
		<LxAccordionItem title="Multi-open item 1" icon="layer-group">
			<template #content>
				<p>Multiple sections can stay expanded here.</p>
			</template>
		</LxAccordionItem>
		<LxAccordionItem title="Multi-open item 2" icon="boxes-stacked">
			<template #content>
				<p>This is useful for FAQs and grouped references.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxAccordion>
	<LxAccordionItem title="Single-open item 1" icon="list">
		<template #content>
			<p>Opening one item closes the others in this group.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Single-open item 2" icon="list-check">
		<template #content>
			<p>This follows classic accordion behaviour.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>

<LxAccordion multiple>
	<LxAccordionItem title="Multi-open item 1" icon="layer-group">
		<template #content>
			<p>Multiple sections can stay expanded here.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Multi-open item 2" icon="boxes-stacked">
		<template #content>
			<p>This is useful for FAQs and grouped references.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>
```
</details>

## Connected Or Separate

Accordions are connected by default so the group reads as one control. Set `connected` to `false` when you explicitly want separated cards instead.

<LxFlex direction="column" gap="xl" class="lx-margin-top--xl">
	<LxAccordion>
		<LxAccordionItem title="Connected item 1" icon="grip-lines">
			<template #content>
				<p>This is the default accordion presentation.</p>
			</template>
		</LxAccordionItem>
		<LxAccordionItem title="Connected item 2" icon="grip-lines">
			<template #content>
				<p>The items share one outer silhouette.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
	<LxAccordion :connected="false" gap="md">
		<LxAccordionItem title="Separate item 1" icon="square">
			<template #content>
				<p>This behaves more like a curated stack of details panels.</p>
			</template>
		</LxAccordionItem>
		<LxAccordionItem title="Separate item 2" icon="square">
			<template #content>
				<p>Use this when the grouped shell is not desired.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxAccordion>
	<LxAccordionItem title="Connected item 1" icon="grip-lines">
		<template #content>
			<p>This is the default accordion presentation.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Connected item 2" icon="grip-lines">
		<template #content>
			<p>The items share one outer silhouette.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>

<LxAccordion :connected="false" gap="md">
	<LxAccordionItem title="Separate item 1" icon="square">
		<template #content>
			<p>This behaves more like a curated stack of details panels.</p>
		</template>
	</LxAccordionItem>
	<LxAccordionItem title="Separate item 2" icon="square">
		<template #content>
			<p>Use this when the grouped shell is not desired.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>
```
</details>

## Variants

The accordion supports both semantic colours and semantic surfaces, with item-level overrides when needed.

<LxFlex direction="column" gap="md">
	<LxAccordion v-for="variant in COLOURS" :key="variant" :variant="variant">
		<LxAccordionItem :title="`${variant} accordion`" icon="palette">
			<template #content>
				<p>Uses <code>{{ variant }}</code> as the summary surface.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
</LxFlex>

<LxFlex direction="column" gap="md" class="lx-margin-top--xl">
	<LxAccordion v-for="variant in SURFACE_COLOURS" :key="variant" :variant="variant">
		<LxAccordionItem :title="`${variant} accordion`" icon="layer-group">
			<template #content>
				<p>Uses the <code>{{ variant }}</code> surface token.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxAccordion variant="primary">
	<LxAccordionItem title="Primary accordion" icon="palette">
		<template #content>
			<p>Uses <code>primary</code> as the summary surface.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>

<LxAccordion variant="raised">
	<LxAccordionItem title="Raised accordion" icon="layer-group">
		<template #content>
			<p>Uses the <code>raised</code> surface token.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>
```
</details>

## Sizes

<LxFlex direction="column" gap="md">
	<LxAccordion v-for="size in SIZES" :key="size" :size="size">
		<LxAccordionItem :title="`${size} accordion`" icon="ruler-combined">
			<template #content>
				<p>This item follows the shared <code>{{ size }}</code> control scale.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxAccordion v-for="size in SIZES" :key="size" :size="size">
		<LxAccordionItem :title="`${size} accordion`" icon="ruler-combined">
			<template #content>
				<p>This item follows the shared <code>{{ size }}</code> control scale.</p>
			</template>
		</LxAccordionItem>
	</LxAccordion>
</LxFlex>
```
</details>

## Controlled Open State

Each item supports `v-model:open`, which works alongside the parent accordion coordination rules.

<LxAccordion class="lx-margin-top--xl">
	<LxAccordionItem v-model:open="controlledOpen" title="Initially open item" icon="toggle-on">
		<template #content>
			<p>This item starts expanded.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>

<details>
<summary>Show code</summary>

```html
<LxAccordion>
	<LxAccordionItem v-model:open="controlledOpen" title="Initially open item" icon="toggle-on">
		<template #content>
			<p>This item starts expanded.</p>
		</template>
	</LxAccordionItem>
</LxAccordion>
```
</details>

## Slots

### Slot: `summary`

Adds extra inline content to the summary row after the icon and title, and before the chevrons.

### Slot: `content`

Provides named content for the expanded panel. This takes priority over the default slot and the `content` prop.

### Slot: `default`

Provides fallback expanded content when the named `content` slot is not used.
