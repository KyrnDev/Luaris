# LxFlex

`LxFlex` is a typed flexbox layout primitive for quickly composing responsive layouts with token-based spacing.

It exposes concise props for direction, wrapping, alignment, and justification while forwarding native attributes to the rendered element.

## Import

```ts
import { LxFlex } from '@luaris/ui';
```

```ts
import { LxFlex } from '@luaris/ui/components/flex';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `TLayoutsNode` | `'div'` | HTML/SVG/MathML tag used as root element. |
| `gap` | `TLayoutsLength` | `'var(--lx-size-space-md)'` | Base gap used for both row and column when specific values are not provided. |
| `rowGap` | `TLayoutsLength \| undefined` | `undefined` | Explicit row gap override. |
| `columnGap` | `TLayoutsLength \| undefined` | `undefined` | Explicit column gap override. |
| `wrap` | `boolean` | `false` | Enables `flex-wrap: wrap`. |
| `inline` | `boolean` | `false` | Uses `display: inline-flex`. |
| `column` | `boolean` | `false` | Uses column direction (`column` or `column-reverse` when `reverse` is true). |
| `reverse` | `boolean` | `false` | Reverses current direction. |
| `direction` | `TLxFlexDirection \| undefined` | `undefined` | Explicitly sets `flex-direction`; overrides `column`/`reverse` helpers. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline' \| undefined` | `undefined` | Maps to `align-items`. Defaults to `center` when omitted. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly' \| undefined` | `undefined` | Maps to `justify-content`. |
| `fullWidth` | `boolean` | `false` | Applies `width: 100%`. |

## Emits

This component has no emits.

## Slots

| Slot | Description |
| --- | --- |
| `default` | Flex container content. |

## Theme Tokens Used

- `--lx-size-space-md` (default `gap` fallback)

## Examples

### Basic Row Layout

```vue
<script setup lang="ts">
	import { LxButton, LxFlex } from '@luaris/ui';
</script>

<template>
	<LxFlex>
		<LxButton>Save</LxButton>
		<LxButton variant="secondary">Cancel</LxButton>
	</LxFlex>
</template>
```

### Wrapped Layout with Token Gap

```vue
<script setup lang="ts">
	import { LxBadge, LxFlex } from '@luaris/ui';
</script>

<template>
	<LxFlex wrap gap="var(--lx-size-space-sm)">
		<LxBadge text="Vue" />
		<LxBadge text="TypeScript" />
		<LxBadge text="Vitest" />
		<LxBadge text="SCSS" />
	</LxFlex>
</template>
```

### Column Layout with Alignment

```vue
<script setup lang="ts">
	import { LxFlex, LxInput } from '@luaris/ui';
</script>

<template>
	<LxFlex column align="stretch" gap="1rem">
		<LxInput placeholder="Email" />
		<LxInput placeholder="Password" type="password" />
	</LxFlex>
</template>
```

### Explicit Direction + Justify

```vue
<script setup lang="ts">
	import { LxButton, LxFlex } from '@luaris/ui';
</script>

<template>
	<LxFlex direction="row" justify="between" align="center" full-width>
		<LxButton variant="plain">Back</LxButton>
		<LxButton>Continue</LxButton>
	</LxFlex>
</template>
```

### Change Root Element

```vue
<script setup lang="ts">
	import { LxFlex } from '@luaris/ui';
</script>

<template>
	<LxFlex as="nav" aria-label="Secondary navigation" gap="0.75rem">
		<a href="/docs">Docs</a>
		<a href="/api">API</a>
	</LxFlex>
</template>
```

## Style Overrides

```vue
<template>
	<LxFlex class="toolbar" justify="between" full-width>
		<div>Left</div>
		<div>Right</div>
	</LxFlex>
</template>

<style scoped>
	.toolbar {
		padding: var(--lx-size-space-sm);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}
</style>
```
