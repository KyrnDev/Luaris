# LxProgress

`LxProgress` displays determinate or indeterminate progress in horizontal, vertical, or ring forms.

It supports semantic variants, size controls, and optional percentage labels.

## Import

```ts
import { LxProgress } from '@luaris/ui';
```

```ts
import { LxProgress } from '@luaris/ui/components/progress';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Current value. |
| `max` | `number` | `100` | Maximum value. |
| `variant` | `TVariant` | `'primary'` | Progress colour variant. |
| `orientation` | `'horizontal' \| 'vertical' \| 'ring'` | `'horizontal'` | Progress visual orientation/type. |
| `showLabel` | `boolean` | `false` | Shows percentage label. |
| `indeterminate` | `boolean` | `false` | Shows indeterminate fill treatment. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Size preset (or ring size in px when number). |

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
- `--lx-colour-surface-sunken`
- `--lx-colour-surface-raised`
- `--lx-colour-surface-text-muted`
- `--lx-size-radius-pill`
- `--lx-size-space-xs`
- `--lx-font-size-xs`
- `--lx-motion-duration-normal`
- `--lx-motion-easing-standard`

Local variables:

- `--lx-progress-colour`
- `--lx-progress-size`
- `--lx-progress-percent`

## Examples

### Horizontal

```vue
<template>
	<LxProgress :value="42" :max="100" show-label />
</template>
```

### Vertical

```vue
<template>
	<LxProgress orientation="vertical" :value="68" size="lg" />
</template>
```

### Ring

```vue
<template>
	<LxProgress orientation="ring" :value="75" show-label :size="84" />
</template>
```

### Indeterminate

```vue
<template>
	<LxProgress indeterminate variant="accent" />
</template>
```

## Style Overrides

```vue
<template>
	<LxProgress class="accent-progress" :value="60" />
</template>

<style scoped>
	.accent-progress {
		--lx-progress-colour: var(--lx-colour-accent);
	}
</style>
```
