# LxThemeSelector

`LxThemeSelector` is a theme switcher UI for choosing active application theme values (`light`, `dark`, `high-contrast`).

It integrates with `useTheme` and updates `document.documentElement.dataset.theme`.

## Import

```ts
import { LxThemeSelector } from '@luaris/ui';
```

```ts
import { LxThemeSelector } from '@luaris/ui/components/theme-selector';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `themes` | `ILxThemeOption[]` | `[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'high-contrast', label: 'High Contrast' }]` | Theme options rendered as selectable buttons. |

`ILxThemeOption`:

| Field | Type | Description |
| --- | --- | --- |
| `value` | `TLxTheme` | Theme key (`light`, `dark`, `high-contrast`). |
| `label` | `string` | Display label. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `update:theme` | `theme: TLxTheme` | Emitted when theme changes. |
| `change` | `theme: TLxTheme` | Emitted when theme changes. |

## Slots

This component has no slots.

## Behaviour Notes

- On mount, resolves initial theme from:
  1. existing `html[data-theme]`, then
  2. system preferences (via `useTheme`/`useColourScheme`), then
  3. fallback `light`.
- Selecting an option updates `document.documentElement.dataset.theme`.

## Theme Tokens Used

- `--lx-colour-surface-text-muted`
- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-sunken`
- `--lx-colour-surface-text`
- `--lx-colour-primary`
- `--lx-colour-surface-inverse`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-pill`
- `--lx-size-space-2xs`
- `--lx-size-space-md`
- `--lx-font-size-sm`
- `--lx-font-weight-medium`
- `--lx-font-weight-semibold`
- `--lx-motion-duration-fast`
- `--lx-motion-easing-standard`

## Examples

### Basic Theme Selector

```vue
<script setup lang="ts">
	import { LxThemeSelector } from '@luaris/ui';
</script>

<template>
	<LxThemeSelector />
</template>
```

### Handle Theme Changes

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxThemeSelector } from '@luaris/ui';
	import type { TLxTheme } from '@luaris/ui/components/theme-selector/types';

	const currentTheme = ref<TLxTheme>('light');

	const onThemeChange = (theme: TLxTheme) => {
		currentTheme.value = theme;
		console.log('Theme changed to', theme);
	};
</script>

<template>
	<LxThemeSelector @change="onThemeChange" />
	<p>Active theme: {{ currentTheme }}</p>
</template>
```

### Custom Theme Labels

```vue
<script setup lang="ts">
	import { LxThemeSelector } from '@luaris/ui';

	const customThemes = [
		{ value: 'light', label: 'Day' },
		{ value: 'dark', label: 'Night' },
		{ value: 'high-contrast', label: 'High Contrast' },
	] as const;
</script>

<template>
	<LxThemeSelector :themes="customThemes" />
</template>
```

## Style Overrides

```vue
<template>
	<LxThemeSelector class="compact-theme-selector" />
</template>

<style scoped>
	.compact-theme-selector :deep(.lx-theme-selector__options) {
		padding: 0.1rem;
	}

	.compact-theme-selector :deep(.lx-theme-selector__option.is-active) {
		background: var(--lx-colour-accent);
	}
</style>
```
