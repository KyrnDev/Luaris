# LxDivider

`LxDivider` is a simple separator component used to visually split content sections.

It supports horizontal and vertical orientations and includes appropriate separator semantics for accessibility.

## Import

```ts
import { LxDivider } from '@luaris/ui';
```

```ts
import { LxDivider } from '@luaris/ui/components/divider';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the divider. |

## Emits

This component has no emits.

## Slots

This component has no slots.

## Accessibility

- Uses `role="separator"`.
- Sets `aria-orientation` based on the `orientation` prop.

## Theme Tokens Used

- `--lx-colour-surface-border`
- `--lx-size-border-width-hairline`

## Examples

### Horizontal Divider

```vue
<script setup lang="ts">
	import { LxDivider } from '@luaris/ui';
</script>

<template>
	<section>
		<p>Profile settings</p>
		<LxDivider />
		<p>Security settings</p>
	</section>
</template>
```

### Vertical Divider

```vue
<script setup lang="ts">
	import { LxDivider, LxFlex } from '@luaris/ui';
</script>

<template>
	<LxFlex align="center" gap="md">
		<span>Monthly</span>
		<LxDivider orientation="vertical" />
		<span>Yearly</span>
	</LxFlex>
</template>
```

## Style Overrides

```vue
<template>
	<LxDivider class="accent-divider" />
</template>

<style scoped>
	.accent-divider {
		background: var(--lx-colour-accent);
	}
</style>
```

Or adjust a specific orientation class:

```scss
.lx-divider--vertical {
	min-height: 2.5rem;
}
```
