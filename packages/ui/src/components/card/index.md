<script setup lang="ts">
	import LxCard from './LxCard.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import LxButton from '../button/LxButton.vue';
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

<LxFlex>
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
<LxFlex>
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
