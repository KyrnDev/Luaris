# LxBadge

`LxBadge` is a compact semantic status label for short text values such as `New`, `Beta`, or `Active`.

It supports semantic variants, size options, and a default slot when you want full content control.

## Import

```ts
import { LxBadge } from '@luaris/ui';
```

```ts
import { LxBadge } from '@luaris/ui/components/badge';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `''` | Badge text when no slot content is provided. |
| `variant` | `TVariant` | `'primary'` | Colour variant (`primary`, `secondary`, `accent`, `info`, `success`, `warning`, `danger`, etc). |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size. |

## Emits

This component has no emits.

## Slots

| Slot | Description |
| --- | --- |
| `default` | Replaces the `text` prop content. |

## Theme Tokens Used

`LxBadge` uses the following theme tokens:

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
- `--lx-size-radius-pill`
- `--lx-font-weight-semibold`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxBadge } from '@luaris/ui';
</script>

<template>
	<LxBadge text="New" />
</template>
```

### Variants and Sizes

```vue
<script setup lang="ts">
	import { LxBadge } from '@luaris/ui';
</script>

<template>
	<LxBadge text="Info" variant="info" size="sm" />
	<LxBadge text="Success" variant="success" size="md" />
	<LxBadge text="Warning" variant="warning" size="md" />
	<LxBadge text="Danger" variant="danger" size="sm" />
</template>
```

### Slot Content

```vue
<script setup lang="ts">
	import { LxBadge, LxIcon } from '@luaris/ui';
</script>

<template>
	<LxBadge variant="accent">
		<LxIcon icon="sparkles" size="xs" />
		<span>Featured</span>
	</LxBadge>
</template>
```

## Style Overrides

Override local badge variables:

```vue
<template>
	<LxBadge class="release-badge" text="RC" />
</template>

<style scoped>
	.release-badge {
		--lx-badge-background: var(--lx-colour-secondary);
		--lx-badge-text: var(--lx-colour-on-secondary);
		letter-spacing: 0.04em;
	}
</style>
```

Or target size classes directly:

```scss
.lx-badge--md {
	padding: 0.35rem 0.7rem;
}
```
