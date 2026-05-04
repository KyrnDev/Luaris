<script setup lang="ts">
	import LxTag from './LxTag.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import LxIcon from '../icon/LxIcon.vue';
</script>

# Tag

The Tag component is a versatile UI element used to display small pieces of information, such as categories, labels, or statuses. It can be used in various contexts, such as categorizing content, indicating the status of an item, or providing additional information about an element.

[[toc]]

## Settings

The Tag component accepts several props to customize its appearance and behavior:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | [TColours](/types/theme.html#type-tcolours) | `primary` | The visual style of the tag. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `md` | The size of the tag. |
| `label` | `string?` | `undefined` | The text label of the tag, optional, can use default slot instead. |
| `removable` | `boolean` | `false` | Whether the tag can be removed by the user, emits a `remove` event when the remove action is triggered. |

## Events

The Tag component can emit the following events:

| Event | Description |
| --- | --- |
| `remove` | Emitted when the user triggers the remove action on a removable tag. |

## Variants

<LxFlex wrap>
	<LxTag variant="primary">Primary</LxTag>
	<LxTag variant="secondary">Secondary</LxTag>
	<LxTag variant="accent">Accent</LxTag>
	<LxTag variant="info">Info</LxTag>
	<LxTag variant="success">Success</LxTag>
	<LxTag variant="warning">Warning</LxTag>
	<LxTag variant="danger">Danger</LxTag>
	<LxTag variant="white">White</LxTag>
	<LxTag variant="black">Black</LxTag>
	<LxTag variant="transparent">Transparent</LxTag>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxTag variant="primary">Primary</LxTag>
	<LxTag variant="secondary">Secondary</LxTag>
	<LxTag variant="accent">Accent</LxTag>
	<LxTag variant="info">Info</LxTag>
	<LxTag variant="success">Success</LxTag>
	<LxTag variant="warning">Warning</LxTag>
	<LxTag variant="danger">Danger</LxTag>
	<LxTag variant="white">White</LxTag>
	<LxTag variant="black">Black</LxTag>
	<LxTag variant="transparent">Transparent</LxTag>
</LxFlex>
```
</details>

## Sizes

<LxFlex wrap>
	<LxTag size="xs">Extra Small</LxTag>
	<LxTag size="sm">Small</LxTag>
	<LxTag size="md">Medium</LxTag>
	<LxTag size="lg">Large</LxTag>
	<LxTag size="xl">Extra Large</LxTag>
	<LxTag size="2xl">2X Large</LxTag>
	<LxTag size="3xl">3X Large</LxTag>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxTag size="xs">Extra Small</LxTag>
	<LxTag size="sm">Small</LxTag>
	<LxTag size="md">Medium</LxTag>
	<LxTag size="lg">Large</LxTag>
	<LxTag size="xl">Extra Large</LxTag>
	<LxTag size="2xl">2X Large</LxTag>
	<LxTag size="3xl">3X Large</LxTag>
</LxFlex>
```
</details>

## States

### Removable

<LxFlex class="lx-padding-top--md" wrap>
	<LxTag removable>Removable Tag</LxTag>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxTag removable>Removable Tag</LxTag>
</LxFlex>
```
</details>

## Slots

The Tag component does offer a default slot for custom content, allowing you to include icons, text, or any other elements within the tag.

<LxFlex>
	<LxTag variant="primary">
		<LxFlex gap="0.5rem" align="center">
			<span>Is Magical?</span>
			<LxIcon name="check" />
		</LxFlex>
	</LxTag>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex>
	<LxTag variant="primary">
		<LxFlex gap="0.5rem" align="center">
			<span>Is Magical?</span>
			<LxIcon name="check" />
		</LxFlex>
	</LxTag>
</LxFlex>
```
</details>
