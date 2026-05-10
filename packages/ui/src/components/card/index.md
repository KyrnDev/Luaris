<script setup lang="ts">
	import LxCard from './LxCard.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import LxButton from '../button/LxButton.vue';
	import { COLOURS, SURFACE_COLOURS } from '../../helpers/constants';
</script>

# Card

The Card component is a flexible container used to display content in a structured and visually appealing way. It can include various elements such as images, text, and actions, making it ideal for showcasing information in a compact format.

[[toc]]

## Settings

The Card component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `padding` | [TSizes](/types/theme.html#type-tsizes) | `md` | The padding size for the card content, which can be set to one of the predefined size values (e.g., `xs`, `sm`, `md`, `lg`, `xl`, etc.). |
| `borderSize` | [TBorderWidths](/types/theme.html#type-tborderwidths) | `thin` | The thickness of the card's border, which can be set to one of the predefined border width values (e.g., `none`, `thin`, `thick`, etc.). |
| `borderRadius` | [TSizes](/types/theme.html#type-tsizes) | `md` | The border radius of the card, which can be set to one of the predefined size values (e.g., `none`, `sm`, `md`, `lg`, `xl`, etc.). |
| `borderColour` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `border` | The color of the card's border, which can be set to one of the predefined color values. Surface colors will automatically use their "surface-" variant. |
| `contentBackgroundColour` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `raised` | The background color of the card's content area, which can be set to one of the predefined color values. Surface colors will automatically use their "surface-" variant. |
| `headerBackgroundColour` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `raised` | The background color of the card's header area, which can be set to one of the predefined color values. Surface colors will automatically use their "surface-" variant. |
| `footerBackgroundColour` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `raised` | The background color of the card's footer area, which can be set to one of the predefined color values. Surface colors will automatically use their "surface-" variant. |

## Usage

There are various ways you can use the Card component, as a simple container for content, or with a header and footer to display additional information or actions.

### Basic Card

The basic card is a simple container format to hold content and elevate it from the background.

#### Single Card

<LxFlex class="lx-padding-y--md">
	<LxCard>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>
```
</details>

#### Multiple Cards

<LxFlex class="lx-padding-y--md">
	<LxCard v-for="index in 3" :key="index">
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard v-for="index in 3" :key="index">
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>
```
</details>

### Basic Card (w/ background colours)

Additionally, you can use the `contentBackgroundColour` prop to set a custom background color for the card's content area.

#### Theme Colours

<LxFlex class="lx-padding-y--md" wrap>
	<LxCard v-for="colour in COLOURS" :key="colour" :contentBackgroundColour="colour" style="flex: 0 0 30%;">
		<p :style="{ color: `var(--lx-colour-on-${colour})` }">{{ colour }}</p>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxCard v-for="colour in COLOURS" :key="colour" :contentBackgroundColour="colour" style="flex: 0 0 30%;">
		<p :style="{ color: `var(--lx-colour-on-${colour})` }">{{ colour }}</p>
	</LxCard>
</LxFlex>
```
</details>

#### Surface Colours

<LxFlex class="lx-padding-y--md" wrap>
	<LxCard v-for="colour in SURFACE_COLOURS" :key="colour" :contentBackgroundColour="colour" style="flex: 0 0 30%;">
		<p :style="{ color: `var(--lx-colour-${colour === 'inverse' ? 'black' : 'white'})` }">{{ colour }}</p>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxCard v-for="colour in SURFACE_COLOURS" :key="colour" :contentBackgroundColour="colour" style="flex: 0 0 30%;">
		<p :style="{ color: `var(--lx-colour-${colour === 'inverse' ? 'black' : 'white'})` }">{{ colour }}</p>
	</LxCard>
</LxFlex>
```
</details>

### Card (w/ header and footer)

<LxFlex class="lx-padding-y--md">
	<LxCard v-for="index in 2" :key="index">
		<template #header>
			<h2 style="line-height: 1.1; margin: 0; padding: 0; border: none;">Card Title</h2>
		</template>
		<template #default>
			<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		</template>
		<template #footer>
			<LxFlex>
				<LxButton label="Action 1" variant="primary" />
				<LxButton label="Action 2" variant="accent" />
			</LxFlex>
		</template>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard v-for="index in 2" :key="index">
		<template #header>
			<h2>Card Title</h2>
		</template>
		<template #default>
			<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		</template>
		<template #footer>
			<LxFlex>
				<LxButton label="Action 1" variant="primary" />
				<LxButton label="Action 2" variant="accent" />
			</LxFlex>
		</template>
	</LxCard>
</LxFlex>
```
</details>

### Card (w/ header and footer background colours)

<LxFlex class="lx-padding-y--md">
	<LxCard
		headerBackgroundColour="primary"
		contentBackgroundColour="surface"
		footerBackgroundColour="success"
	>
		<template #header>
			<h2 style="line-height: 1.1; margin: 0; padding: 0; border: none; color: var(--lx-colour-on-primary);">Card Title</h2>
		</template>
		<template #default>
			<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		</template>
		<template #footer>
			<LxFlex>
				<LxButton label="Action 1" variant="primary" />
				<LxButton label="Action 2" variant="accent" />
			</LxFlex>
		</template>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard
		headerBackgroundColour="primary"
		contentBackgroundColour="surface"
		footerBackgroundColour="success"
	>
		<template #header>
			<h2 style="line-height: 1.1; margin: 0; padding: 0; border: none; color: var(--lx-colour-on-primary);">Card Title</h2>
		</template>
		<template #default>
			<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		</template>
		<template #footer>
			<LxFlex>
				<LxButton label="Action 1" variant="primary" />
				<LxButton label="Action 2" variant="accent" />
			</LxFlex>
		</template>
	</LxCard>
</LxFlex>
```
</details>

## Slots

The Card component provides the following slots for customizing its content:

### Slot: `header`

The `header` slot is used to define the content that appears in the card's header section. This is typically where you would place a title or any introductory information about the card's content.

<LxFlex class="lx-padding-y--md">
	<LxCard>
		<template #header>
			<h2 style="line-height: 1.1; margin: 0; padding: 0; border: none;">Card Title</h2>
		</template>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard>
		<template #header>
			<h2 style="line-height: 1.1; margin: 0; padding: 0; border: none;">Card Title</h2>
		</template>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>
```
</details>

### Slot: `default`

The `default` slot is used to define the main content of the card. This is where you would place the primary information or elements that you want to display within the card.

<LxFlex class="lx-padding-y--md">
	<LxCard>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		<!--
			Or you can define it using the default slot, usually when you want to include multiple other slots to make it cleaner
			<template #default>
				<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
			</template>
		-->
	</LxCard>
</LxFlex>
```
</details>

### Slot: `footer`

The `footer` slot is used to define the content that appears in the card's footer section. This is typically where you would place actions, links, or any additional information related to the card's content.

<LxFlex class="lx-padding-y--md">
	<LxCard>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		<template #footer>
			<LxFlex>
				<LxButton label="Action 1" variant="primary" />
				<LxButton label="Action 2" variant="accent" />
			</LxFlex>
		</template>
	</LxCard>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex class="lx-padding-y--md">
	<LxCard>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
		<template #footer>
			<LxFlex>
				<LxButton label="Action 1" variant="primary" />
				<LxButton label="Action 2" variant="accent" />
			</LxFlex>
		</template>
	</LxCard>
</LxFlex>
```
</details>
