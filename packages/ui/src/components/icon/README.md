# LxIcon

`LxIcon` is a Font Awesome wrapper component for consistent icon usage in Luaris.

It maps typed style and size props to Font Awesome classes and supports accessibility, animation, and fixed-width alignment options.

## Import

```ts
import { LxIcon } from '@luaris/ui';
```

```ts
import { LxIcon } from '@luaris/ui/components/icon';
```

## Prerequisite

`LxIcon` expects Font Awesome CSS to already be available in your app (for example via kit or package CSS).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | required | Icon name without prefix (for example `user`, `xmark`, `calendar`). |
| `iconStyle` | `TLxIconStyle` | `'solid'` | Font Awesome style family. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Icon size class mapping. `md` means no explicit size class. |
| `spin` | `boolean` | `false` | Adds spinning animation (`fa-spin`). |
| `pulse` | `boolean` | `false` | Adds pulsing animation (`fa-pulse`). |
| `fixedWidth` | `boolean` | `false` | Adds fixed-width alignment class (`fa-fw`). |
| `label` | `string` | `''` | Accessible label for non-decorative icons. |
| `decorative` | `boolean` | `true` | When `true`, sets `aria-hidden="true"`. |

`TLxIconStyle` values:

- `solid`
- `regular`
- `brands`
- `light`
- `duotone`
- `thin`
- `sharp-solid`
- `sharp-regular`
- `sharp-light`
- `sharp-thin`
- `sharp-duotone`

## Emits

This component has no emits.

## Slots

This component has no slots.

## Theme Tokens Used

`LxIcon` does not use any theme CSS variables directly.

## Class Mapping Notes

- `name="user"` => `fa-user`
- `iconStyle="solid"` => `fa-solid`
- `iconStyle="sharp-solid"` => `fa-sharp fa-solid`
- `size="md"` => no size class
- `size="2xl"` => `fa-2xl`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxIcon } from '@luaris/ui';
</script>

<template>
	<LxIcon name="user" />
</template>
```

### Style Variants

```vue
<script setup lang="ts">
	import { LxIcon } from '@luaris/ui';
</script>

<template>
	<LxIcon name="heart" icon-style="solid" />
	<LxIcon name="heart" icon-style="regular" />
	<LxIcon name="github" icon-style="brands" />
	<LxIcon name="star" icon-style="sharp-solid" />
</template>
```

### Size, Spin, Pulse, Fixed Width

```vue
<script setup lang="ts">
	import { LxIcon } from '@luaris/ui';
</script>

<template>
	<LxIcon name="spinner" spin size="lg" />
	<LxIcon name="circle-notch" pulse size="xl" />
	<LxIcon name="check" fixed-width />
</template>
```

### Accessible Non-decorative Icon

```vue
<script setup lang="ts">
	import { LxIcon } from '@luaris/ui';
</script>

<template>
	<LxIcon
		name="triangle-exclamation"
		:decorative="false"
		label="Warning"
		icon-style="solid"
	/>
</template>
```

## Style Overrides

Because this component renders an `<i>` element, you can style it directly:

```vue
<template>
	<LxIcon class="status-icon" name="circle" />
</template>

<style scoped>
	.status-icon {
		color: var(--lx-colour-success);
		font-size: 1.25rem;
	}
</style>
```
