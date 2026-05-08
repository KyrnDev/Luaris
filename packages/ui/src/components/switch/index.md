<script setup>
	import LxSwitch from './LxSwitch.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import { COLOURS } from '../../helpers/constants';
</script>

# Switch

The switch component is a UI element that allows users to toggle between two states, typically "on" and "off". It is commonly used for settings, preferences, or any binary choice in an application, it provides a more intuitive and visually appealing way to represent a boolean option compared to a traditional checkbox.

[[toc]]

## Settings

The Switch component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | [TColours](/types/theme.html#type-tcolours) | `primary` | The visual style of the switch. |
| `disabled` | `boolean` | `false` | Whether the switch is disabled. |

## Variants

The Switch component supports the following variants:

<LxFlex wrap>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="primary" />
		<p class="lx-margin--none">Primary</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="secondary" />
		<p class="lx-margin--none">Secondary</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="accent" />
		<p class="lx-margin--none">Accent</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="info" />
		<p class="lx-margin--none">Info</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="success" />
		<p class="lx-margin--none">Success</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="danger" />
		<p class="lx-margin--none">Danger</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="white" />
		<p class="lx-margin--none">White</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="black" />
		<p class="lx-margin--none">Black</p>
	</LxFlex>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="primary" />
		<p class="lx-margin--none">Primary</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="secondary" />
		<p class="lx-margin--none">Secondary</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="accent" />
		<p class="lx-margin--none">Accent</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="info" />
		<p class="lx-margin--none">Info</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="success" />
		<p class="lx-margin--none">Success</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="danger" />
		<p class="lx-margin--none">Danger</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="white" />
		<p class="lx-margin--none">White</p>
	</LxFlex>
	<LxFlex direction="column" gap="0">
		<LxSwitch variant="black" />
		<p class="lx-margin--none">Black</p>
	</LxFlex>
</LxFlex>
```
</details>

## Sizes

The Switch component supports the following sizes:

<LxFlex wrap>
	<LxSwitch size="2xs" />
	<LxSwitch size="xs" />
	<LxSwitch size="sm" />
	<LxSwitch size="md" />
	<LxSwitch size="lg" />
	<LxSwitch size="xl" />
	<LxSwitch size="2xl" />
	<LxSwitch size="3xl" />
</LxFlex>
