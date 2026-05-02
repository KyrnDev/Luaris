<script setup>
	import LxFlex from '../flex/LxFlex.vue';
	import LxButton from './LxButton.vue';
</script>

# Button

The button component is a versatile and customizable UI element that can be used for various actions in your application. It supports multiple variants, sizes, and states to fit different use cases.

[[toc]]

## Settings

The Button component accepts the following props:

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
| `active` | `boolean` | `false` | Whether the button is in an active state. |
| `borderRadius` | `none \| sm \| md \| lg \| pill \| full \| pill` | The border radius of the button. |
| `borderWidth` | `none \| thin \| thick` | The border width of the button, used for the invert hover mode. |
| `hoverMode` | `default \| invert` | `default` | The hover mode of the button, which changes the hover effect. |
| `group` | `start \| middle \| end` | `undefined` | The group position of the button, used for visually connecting buttons that are part of the same action group. |

## Styles

The button component supports various styles through its `variant` prop. Each variant applies different colors and visual treatments to the button, allowing you to choose the one that best fits your design needs.

<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Primary" variant="primary" />
	<LxButton class="lx-margin-right--sm" label="Secondary" variant="secondary" />
	<LxButton class="lx-margin-right--sm" label="Accent" variant="accent" />
	<LxButton class="lx-margin-right--sm" label="Info" variant="info" />
	<LxButton class="lx-margin-right--sm" label="Success" variant="success" />
	<LxButton class="lx-margin-right--sm" label="Warning" variant="warning" />
	<LxButton class="lx-margin-right--sm" label="Danger" variant="danger" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Primary" variant="primary" />
	<LxButton class="lx-margin-right--sm" label="Secondary" variant="secondary" />
	<LxButton class="lx-margin-right--sm" label="Accent" variant="accent" />
	<LxButton class="lx-margin-right--sm" label="Info" variant="info" />
	<LxButton class="lx-margin-right--sm" label="Success" variant="success" />
	<LxButton class="lx-margin-right--sm" label="Warning" variant="warning" />
	<LxButton class="lx-margin-right--sm" label="Danger" variant="danger" />
</LxFlex>
```
</details>

## Sizes

The button component supports multiple sizes through its `size` prop, allowing you to choose the appropriate size for different contexts in your application.

<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="2xs" variant="primary" size="2xs" />
	<LxButton class="lx-margin-right--sm" label="xs" variant="primary" size="xs" />
	<LxButton class="lx-margin-right--sm" label="sm" variant="primary" size="sm" />
	<LxButton class="lx-margin-right--sm" label="md" variant="primary" size="md" />
	<LxButton class="lx-margin-right--sm" label="lg" variant="primary" size="lg" />
	<LxButton class="lx-margin-right--sm" label="xl" variant="primary" size="xl" />
	<LxButton class="lx-margin-right--sm" label="2xl" variant="primary" size="2xl" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="2xs" variant="primary" size="2xs" />
	<LxButton class="lx-margin-right--sm" label="xs" variant="primary" size="xs" />
	<LxButton class="lx-margin-right--sm" label="sm" variant="primary" size="sm" />
	<LxButton class="lx-margin-right--sm" label="md" variant="primary" size="md" />
	<LxButton class="lx-margin-right--sm" label="lg" variant="primary" size="lg" />
	<LxButton class="lx-margin-right--sm" label="xl" variant="primary" size="xl" />
	<LxButton class="lx-margin-right--sm" label="2xl" variant="primary" size="2xl" />
</LxFlex>
```
</details>

## States

The button component supports different states such as loading and disabled, which can be used to indicate that an action is in progress or that the button is not currently interactive.

<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Loading" variant="primary" loading />
	<LxButton class="lx-margin-right--sm" label="Disabled" variant="primary" disabled />
	<LxButton class="lx-margin-right--sm" label="Active" variant="primary" active />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Loading" variant="primary" loading />
	<LxButton class="lx-margin-right--sm" label="Disabled" variant="primary" disabled />
	<LxButton class="lx-margin-right--sm" label="Active" variant="primary" active />
</LxFlex>
```
</details>

## Hover Modes

The button component supports two different hover modes, default and invert, which can be set using the `hoverMode` prop. The default hover mode changes the background color of the button on hover using the `hover` colour state. The `invert` mode instead applies a border that on hover will set the text colour and border colour to the variant colour and the background to transparent.

<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Hover Default" variant="primary" />
	<LxButton class="lx-margin-right--sm" label="Hover Invert" variant="primary" hoverMode="invert" />
</LxFlex>

## Layout

The button component can also be configured to take up the full width of its container, which can be useful for creating more prominent call-to-action buttons.

<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm lx-margin-top--sm" label="Full Width" variant="primary" fullWidth />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm lx-margin-top--sm" label="Full Width" variant="primary" fullWidth />
</LxFlex>
```
</details>

## Icon

The button component supports adding an icon to the left or right of the label using the `icon` and `iconOrder` props. This can be used to enhance the visual appeal of the button or to provide additional context about the action it performs.

<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Icon Left" variant="primary" icon="poo" />
	<LxButton class="lx-margin-right--sm" label="Icon Right" variant="primary" icon="poo" iconOrder="right" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="0.1rem" wrap>
	<LxButton class="lx-margin-right--sm" label="Icon Left" variant="primary" icon="poo" />
	<LxButton class="lx-margin-right--sm" label="Icon Right" variant="primary" icon="poo" iconOrder="right" />
</LxFlex>
```
</details>

## Grouping

The button component supports grouping through the `group` prop, which can be set to 'start', 'middle', or 'end'. This allows you to visually connect buttons that are part of the same action group, such as a set of related options or a multi-step process.

> [!INFO]
> I decided on this design rather than using a wrapper component for button groups, as it allows for more flexibility in how the buttons are grouped and styled, without the need for an additional component.

<LxFlex gap="0rem" class="lx-padding-bottom--md" wrap>
	<LxButton label="Start" variant="primary" size="md" group="start" />
	<LxButton label="Middle" variant="primary" size="md" group="middle" />
	<LxButton label="End" variant="primary" size="md" group="end" />
</LxFlex>

<LxFlex gap="0.3rem" wrap>
	<LxButton label="Start" variant="primary" size="md" group="start" />
	<LxButton label="Middle" variant="primary" size="md" group="middle" />
	<LxButton label="End" variant="primary" size="md" group="end" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="0rem" wrap>
	<LxButton label="Start" variant="primary" size="md" group="start" />
	<LxButton label="Middle" variant="primary" size="md" group="middle" />
	<LxButton label="End" variant="primary" size="md" group="end" />
</LxFlex>

<LxFlex gap="0.3rem" wrap>
	<LxButton label="Start" variant="primary" size="md" group="start" />
	<LxButton label="Middle" variant="primary" size="md" group="middle" />
	<LxButton label="End" variant="primary" size="md" group="end" />
</LxFlex>
```
</details>

## Slots

The button component also supports slots for more custom content.

### Slot: Default

You can use the button's default slot like a normal slot.

<LxButton class="lx-margin-right--sm" variant="primary">
	Custom Label
</LxButton>

### Slot: Icon

Can allow you to add a custom icon to the button, such as an SVG or a font icon with custom styling, note you can also use the `iconOrder` prop to position the icon on the left or right of the label, it will use the same slot.

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
