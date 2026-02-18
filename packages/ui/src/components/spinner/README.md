# LxSpinner

`LxSpinner` is a compact loading indicator with semantic variant colours and multiple size options.

## Import

```ts
import { LxSpinner } from '@luaris/ui';
```

```ts
import { LxSpinner } from '@luaris/ui/components/spinner';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Spinner size. |
| `variant` | `TVariant` | `'primary'` | Spinner colour variant. |
| `label` | `string` | `'Loading'` | Accessible label (`aria-label`) for screen readers. |

## Emits

This component has no emits.

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-primary`
- `--lx-colour-secondary`
- `--lx-colour-accent`
- `--lx-colour-info`
- `--lx-colour-success`
- `--lx-colour-warning`
- `--lx-colour-danger`
- `--lx-size-radius-pill`

Local variable:

- `--lx-spinner-colour`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxSpinner } from '@luaris/ui';
</script>

<template>
	<LxSpinner />
</template>
```

### Sizes

```vue
<template>
	<LxSpinner size="xs" />
	<LxSpinner size="md" />
	<LxSpinner size="2xl" />
</template>
```

### Variants

```vue
<template>
	<LxSpinner variant="primary" />
	<LxSpinner variant="success" />
	<LxSpinner variant="danger" />
</template>
```

## Style Overrides

```vue
<template>
	<LxSpinner class="slow-spinner" />
</template>

<style scoped>
	.slow-spinner {
		animation-duration: 1.2s;
	}
</style>
```
