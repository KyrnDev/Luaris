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
| `padding` | TSizes | `md` | The padding size for the card content, which can be set to one of the predefined size values (e.g., `xs`, `sm`, `md`, `lg`, `xl`, etc.). |

## Usage

<LxCard>
	<template #header>
		<h2 style="line-height: 1.1; margin: 0; padding: 0; border: none;">Card Title</h2>
	</template>
	<template #default>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</template>
	<template #footer>
		<LxFlex>
			<LxButton label="Action 1" variant="primary" size="sm" />
			<LxButton label="Action 2" variant="secondary" size="sm" />
		</LxFlex>
	</template>
</LxCard>

<details>
<summary>Show code</summary>

```html
<LxCard>
	<template #header>
		<h2>Card Title</h2>
	</template>
	<template #default>
		<p>This is the main content of the card. It can include text, images, or any other elements you want to display.</p>
	</template>
	<template #footer>
		<LxFlex>
			<LxButton label="Action 1" variant="primary" size="sm" />
			<LxButton label="Action 2" variant="secondary" size="sm" />
		</LxFlex>
	</template>
</LxCard>
```
</details>
