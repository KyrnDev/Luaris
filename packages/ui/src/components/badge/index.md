<script setup lang="ts">
	import LxBadge from './LxBadge.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import LxIcon from '../icon/LxIcon.vue';
</script>

# Badge

The Badge component is a versatile UI element used to display small pieces of information, such as counts, statuses, or labels. It can be used in various contexts, such as indicating the number of notifications, showing the status of an item, or categorizing content.

[[toc]]

## Settings

The Badge component accepts several props to customize its appearance and behavior:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | [TColours](/types/theme.html#type-tcolours) | `primary` | The visual style of the badge. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `md` | The size of the badge. |
| `label` | `string?` | `undefined` | The text label of the badge, optional, can use default slot instead. |

## Variants

<LxFlex wrap>
	<LxBadge variant="primary">Primary</LxBadge>
	<LxBadge variant="secondary">Secondary</LxBadge>
	<LxBadge variant="accent">Accent</LxBadge>
	<LxBadge variant="info">Info</LxBadge>
	<LxBadge variant="success">Success</LxBadge>
	<LxBadge variant="warning">Warning</LxBadge>
	<LxBadge variant="danger">Danger</LxBadge>
	<LxBadge variant="white">White</LxBadge>
	<LxBadge variant="black">Black</LxBadge>
	<LxBadge variant="transparent">Transparent</LxBadge>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxBadge variant="primary">Primary</LxBadge>
	<LxBadge variant="secondary">Secondary</LxBadge>
	<LxBadge variant="accent">Accent</LxBadge>
	<LxBadge variant="info">Info</LxBadge>
	<LxBadge variant="success">Success</LxBadge>
	<LxBadge variant="warning">Warning</LxBadge>
	<LxBadge variant="danger">Danger</LxBadge>
	<LxBadge variant="white">White</LxBadge>
	<LxBadge variant="black">Black</LxBadge>
	<LxBadge variant="transparent">Transparent</LxBadge>
</LxFlex>
```
</details>

## Sizes

<LxFlex wrap>
	<LxBadge size="xs">Extra Small</LxBadge>
	<LxBadge size="sm">Small</LxBadge>
	<LxBadge size="md">Medium</LxBadge>
	<LxBadge size="lg">Large</LxBadge>
	<LxBadge size="xl">Extra Large</LxBadge>
	<LxBadge size="2xl">2X Large</LxBadge>
	<LxBadge size="3xl">3X Large</LxBadge>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxBadge size="xs">Extra Small</LxBadge>
	<LxBadge size="sm">Small</LxBadge>
	<LxBadge size="md">Medium</LxBadge>
	<LxBadge size="lg">Large</LxBadge>
	<LxBadge size="xl">Extra Large</LxBadge>
	<LxBadge size="2xl">2X Large</LxBadge>
	<LxBadge size="3xl">3X Large</LxBadge>
</LxFlex>
```
</details>

## Slots

The Badge component does offer a default slot for custom content, allowing you to include icons, text, or any other elements within the badge.

<LxFlex>
	<LxBadge variant="primary">
		<LxFlex gap="0.5rem" align="center">
			<span>Is Magical?</span>
			<LxIcon name="check" />
		</LxFlex>
	</LxBadge>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex>
	<LxBadge variant="primary">
		<LxFlex gap="0.5rem" align="center">
			<span>Is Magical?</span>
			<LxIcon name="check" />
		</LxFlex>
	</LxBadge>
</LxFlex>
```
</details>
