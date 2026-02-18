# LxCard

`LxCard` is a structured surface container for grouped content.

It supports optional header/footer areas, configurable inner padding, interactive mode, and selected state styling.

## Import

```ts
import { LxCard } from '@luaris/ui';
```

```ts
import { LxCard } from '@luaris/ui/components/card';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Header text when no `header` slot is provided. |
| `interactive` | `boolean` | `false` | Enables interactive hover treatment (`cursor`, lift, border transition). |
| `padding` | `TLayoutsLength` | `'var(--lx-size-space-lg)'` | Content padding for header/body/footer sections. |
| `selected` | `boolean` | `false` | Applies selected outline style. |

## Emits

This component has no emits.

## Slots

| Slot | Description |
| --- | --- |
| `default` | Main card body content. |
| `header` | Replaces the header content. If omitted, `title` is used. |
| `footer` | Optional footer content. |

## Theme Tokens Used

`LxCard` uses the following theme tokens:

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-primary`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-lg`
- `--lx-size-space-lg`
- `--lx-font-size-md`
- `--lx-font-weight-semibold`
- `--lx-motion-duration-fast`
- `--lx-motion-easing-standard`

It also sets/uses a local variable:

- `--lx-card-padding`

## Examples

### Basic Card

```vue
<script setup lang="ts">
	import { LxCard } from '@luaris/ui';
</script>

<template>
	<LxCard title="Account">
		<p>Manage your profile and security settings.</p>
	</LxCard>
</template>
```

### Card with Header and Footer Slots

```vue
<script setup lang="ts">
	import { LxButton, LxCard } from '@luaris/ui';
</script>

<template>
	<LxCard>
		<template #header>
			<h3>Billing</h3>
		</template>

		<p>Your next invoice is due on 14 March.</p>

		<template #footer>
			<LxButton variant="secondary" size="sm">View invoices</LxButton>
		</template>
	</LxCard>
</template>
```

### Interactive and Selected

```vue
<script setup lang="ts">
	import { LxCard } from '@luaris/ui';
</script>

<template>
	<LxCard interactive>
		<p>Clickable card surface.</p>
	</LxCard>

	<LxCard selected>
		<p>Currently selected option.</p>
	</LxCard>
</template>
```

### Custom Padding

```vue
<script setup lang="ts">
	import { LxCard } from '@luaris/ui';
</script>

<template>
	<LxCard title="Compact" padding="0.75rem">
		<p>Reduced spacing card.</p>
	</LxCard>
</template>
```

## Style Overrides

Override local card values per instance:

```vue
<template>
	<LxCard class="product-card" title="Pro Plan">
		<p>Everything in Team, plus analytics.</p>
	</LxCard>
</template>

<style scoped>
	.product-card {
		--lx-card-padding: 1.25rem;
	}

	.product-card :deep(.lx-card__header) {
		background: var(--lx-colour-surface-sunken);
	}
</style>
```

You can also customise selected state globally:

```scss
.lx-card--selected {
	outline-color: var(--lx-colour-accent);
}
```
