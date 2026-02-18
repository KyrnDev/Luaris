# LxSkeleton

`LxSkeleton` renders loading placeholders for content previews.

It supports text/rect/circle variants, optional shimmer animation, configurable count, and custom width/height.

## Import

```ts
import { LxSkeleton } from '@luaris/ui';
```

```ts
import { LxSkeleton } from '@luaris/ui/components/skeleton';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | `1` | Number of placeholder items rendered. |
| `variant` | `'text' \| 'rect' \| 'circle'` | `'text'` | Placeholder shape. |
| `animated` | `boolean` | `true` | Enables shimmer animation. |
| `width` | `string` | `''` | Optional width override for each item. |
| `height` | `string` | `''` | Optional height override for each item. |

## Emits

This component has no emits.

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-sunken`
- `--lx-colour-surface-border`
- `--lx-size-radius-sm`
- `--lx-size-radius-md`
- `--lx-size-radius-pill`
- `--lx-size-space-xs`

## Examples

### Text Skeleton

```vue
<template>
	<LxSkeleton :count="3" variant="text" />
</template>
```

### Card-like Rect Skeleton

```vue
<template>
	<LxSkeleton variant="rect" width="100%" height="6rem" />
</template>
```

### Avatar Placeholder

```vue
<template>
	<LxSkeleton variant="circle" width="3rem" height="3rem" />
</template>
```

### Static (No Animation)

```vue
<template>
	<LxSkeleton :count="2" :animated="false" />
</template>
```

## Style Overrides

```vue
<template>
	<LxSkeleton class="subtle-skeleton" />
</template>

<style scoped>
	.subtle-skeleton :deep(.lx-skeleton__item) {
		opacity: 0.7;
	}
</style>
```
