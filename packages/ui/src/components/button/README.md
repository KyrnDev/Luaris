# LxButton

`LxButton` is the core action component for clicks, submits, and inline action controls.

It supports semantic variants, full size scale, loading/disabled states, icon placement, and content slots.

## Import

```ts
import { LxButton } from '@luaris/ui';
```

```ts
import { LxButton } from '@luaris/ui/components/button';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'plain' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Visual style variant. |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Control size. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `loading` | `boolean` | `false` | Shows spinner and disables interaction. |
| `fullWidth` | `boolean` | `false` | Makes button expand to container width. |
| `label` | `string` | `''` | Fallback label text when default slot is not used. |
| `ariaLabel` | `string \| undefined` | `undefined` | Accessible label for icon-only or custom content usage. |
| `icon` | `string` | `''` | Font Awesome icon name passed to internal `LxIcon`. |
| `iconOrder` | `'left' \| 'right'` | `'left'` | Icon position relative to label content. |

Note: non-prop attributes are forwarded to the root `<button>` via `v-bind="attrs"`.

## Emits

This component has no custom emits. Use native events such as `@click`.

## Slots

| Slot | Description |
| --- | --- |
| `default` | Main button label/content (overrides `label` prop). |
| `leading` | Content shown before label. |
| `trailing` | Content shown after label. |

## Theme Tokens Used

`LxButton` uses the following theme tokens:

- `--lx-colour-primary`
- `--lx-colour-secondary`
- `--lx-colour-accent`
- `--lx-colour-info`
- `--lx-colour-success`
- `--lx-colour-warning`
- `--lx-colour-danger`
- `--lx-colour-on-primary`
- `--lx-colour-on-secondary`
- `--lx-colour-on-accent`
- `--lx-colour-on-info`
- `--lx-colour-on-success`
- `--lx-colour-on-warning`
- `--lx-colour-on-danger`
- `--lx-colour-focus-ring`
- `--lx-colour-surface-text`
- `--lx-colour-surface-sunken`
- `--lx-colour-surface-border`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-md`
- `--lx-size-radius-pill`
- `--lx-size-control-height-2xs`
- `--lx-size-control-height-xs`
- `--lx-size-control-height-sm`
- `--lx-size-control-height-md`
- `--lx-size-control-height-lg`
- `--lx-size-control-height-xl`
- `--lx-size-control-height-2xl`
- `--lx-size-space-sm`
- `--lx-size-space-md`
- `--lx-size-space-lg`
- `--lx-size-space-xl`
- `--lx-size-space-2xl`
- `--lx-font-size-sm`
- `--lx-font-weight-semibold`
- `--lx-font-line-height-tight`
- `--lx-motion-duration-fast`
- `--lx-motion-duration-normal`
- `--lx-motion-easing-standard`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxButton } from '@luaris/ui';
</script>

<template>
	<LxButton>Save</LxButton>
</template>
```

### Variants and Sizes

```vue
<script setup lang="ts">
	import { LxButton } from '@luaris/ui';
</script>

<template>
	<LxButton variant="primary" size="sm">Primary</LxButton>
	<LxButton variant="secondary" size="md">Secondary</LxButton>
	<LxButton variant="ghost" size="lg">Ghost</LxButton>
	<LxButton variant="danger" size="xl">Delete</LxButton>
</template>
```

### Loading and Disabled

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxButton } from '@luaris/ui';

	const isSaving = ref(false);
</script>

<template>
	<LxButton :loading="isSaving">Saving...</LxButton>
	<LxButton disabled variant="plain">Disabled</LxButton>
</template>
```

### Icon Order

```vue
<script setup lang="ts">
	import { LxButton } from '@luaris/ui';
</script>

<template>
	<LxButton icon="arrow-left" icon-order="left">Back</LxButton>
	<LxButton icon="arrow-right" icon-order="right">Next</LxButton>
</template>
```

### Leading and Trailing Slots

```vue
<script setup lang="ts">
	import { LxButton, LxBadge } from '@luaris/ui';
</script>

<template>
	<LxButton variant="accent">
		<template #leading>
			<span>⚡</span>
		</template>
		Launch
		<template #trailing>
			<LxBadge size="sm" text="Beta" />
		</template>
	</LxButton>
</template>
```

### Full Width Submit

```vue
<script setup lang="ts">
	import { LxButton } from '@luaris/ui';
</script>

<template>
	<form>
		<LxButton type="submit" full-width>Submit Form</LxButton>
	</form>
</template>
```

## Style Overrides

Use per-instance CSS custom properties:

```vue
<template>
	<LxButton class="cta-button">Upgrade</LxButton>
</template>

<style scoped>
	.cta-button {
		--lx-button-background: var(--lx-colour-accent);
		--lx-button-border: var(--lx-colour-accent);
		--lx-button-text: var(--lx-colour-on-accent);
	}
</style>
```

Or target specific variants globally:

```scss
.lx-button--ghost {
	border-width: 2px;
}
```
