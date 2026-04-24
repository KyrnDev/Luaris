<script setup lang="ts">
	import LxFlex from './LxFlex.vue';
</script>

# Flex

The Flex component is a powerful layout tool that allows you to create flexible and responsive layouts with ease. It provides a simple and intuitive API for controlling the alignment, direction, and spacing of its child elements.

> [!NOTE]
> This component is designed to be a more convenient way of using CSS Flex, the aim for the Luaris project is to avoid the need for custom CSS as much as possible. This component will also be the core of a lot of the layout components.

## Settings

The Flex component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `TLayoutsNode` | `div` | The HTML element or Vue component to render as the wrapper for the flex container. This allows you to use the Flex component with different semantic elements or custom components as needed. |
| `gap` | `TLayoutsLength` | `var(--lx-spacing-md)` | The gap between the child elements in the flex container. This can be used to create space between the elements without needing to add margin to each child. |
| `rowGap` | `TLayoutsLength` | `var(--lx-spacing-md)` | The gap between rows of child elements in the flex container. This is useful when the `wrap` prop is enabled and you want to control the spacing between rows separately from the spacing between columns; inherits from `gap` if not set. |
| `columnGap` | `TLayoutsLength` | `var(--lx-spacing-md)` | The gap between columns of child elements in the flex container. This is useful when the `wrap` prop is enabled and you want to control the spacing between columns separately from the spacing between rows; inherits from `gap` if not set. |
| `wrap` | `boolean` | `false` | Whether the child elements should wrap onto multiple lines if they exceed the width of the container. When enabled, the `rowGap` and `columnGap` props can be used to control the spacing between the wrapped lines and columns. |
| `inline` | `boolean` | `false` | Whether the flex container should be rendered as an inline element. This can be useful when you want the flex container to flow with text or other inline elements. |
| `column` | `boolean` | `false` | Whether the flex direction should be set to column. This is a shorthand for setting the `direction` prop to `column`, and it will be overridden if the `direction` prop is also set. |
| `reverse` | `boolean` | `false` | Whether the flex direction should be reversed. This will reverse the order of the child elements in the flex container. If the `column` prop is also set, it will reverse the column direction instead of the row direction. |
| `direction` | `TLxFlexDirection` | `row` | The flex direction of the container. This can be set to `row`, `row-reverse`, `column`, or `column-reverse` to control the layout of the child elements. If the `column` prop is set, it will override the `direction` prop to set the direction to `column` or `column-reverse` based on the value of the `reverse` prop. |
| `align` | `TLxFlexAlign` | `stretch` | The alignment of child elements along the cross axis. This can be set to `start`, `center`, `end`, `stretch`, or `baseline` to control how the child elements are aligned vertically (for row direction) or horizontally (for column direction). |
| `justify` | `TLxFlexJustify` | `start` | The alignment of child elements along the main axis. This can be set to `start`, `center`, `end`, `between`, `around`, or `evenly` to control how the child elements are spaced horizontally (for row direction) or vertically (for column direction). |
| `fullWidth` | `boolean` | `false` | Whether the flex container should take up the full width of its parent container. When enabled, the container will stretch to fill the available horizontal space, which can be useful for creating full-width layouts or ensuring that the flex container adapts to the width of its parent. |

## Usage

The Flex component can be used to create a wide variety of layouts by combining its props in different ways. Here are some examples of how to use the Flex component:

### Example: Basic Flex Layout

<LxFlex gap="1rem" align="center" justify="between" class="lx-padding-top--lg">
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex gap="1rem" align="center" justify="between" class="lx-padding-top--lg">
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</LxFlex>
```
</details>

### Example: Column Layout with Wrapping

<LxFlex column gap="0.5rem" align="start" class="lx-padding-top--lg">
	<div>Item A</div>
	<div>Item B</div>
	<div>Item C</div>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex column gap="0.5rem" align="start" class="lx-padding-top--lg">
	<div>Item A</div>
	<div>Item B</div>
	<div>Item C</div>
</LxFlex>
```
</details>

### Example: Responsive Flex Layout

<LxFlex wrap gap="1rem" justify="center" class="lx-padding-top--lg">
	<div style="width: 200px; height: 100px; background-color: lightblue; color: #4d4d4d; padding:0.5rem;">Box 1</div>
	<div style="width: 200px; height: 100px; background-color: lightcoral; color: white; padding:0.5rem;">Box 2</div>
	<div style="width: 200px; height: 100px; background-color: lightgreen; color: #4d4d4d; padding:0.5rem;">Box 3</div>
	<div style="width: 200px; height: 100px; background-color: lightpink; color: #4d4d4d; padding:0.5rem;">Box 4</div>
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex wrap gap="1rem" justify="center" class="lx-padding-top--lg">
	<div style="width: 200px; height: 100px; background-color: lightblue; color: #4d4d4d; padding:0.5rem;">Box 1</div>
	<div style="width: 200px; height: 100px; background-color: lightcoral; color: white; padding:0.5rem;">Box 2</div>
	<div style="width: 200px; height: 100px; background-color: lightgreen; color: #4d4d4d; padding:0.5rem;">Box 3</div>
	<div style="width: 200px; height: 100px; background-color: lightpink; color: #4d4d4d; padding:0.5rem;">Box 4</div>
</LxFlex>
```
</details>
