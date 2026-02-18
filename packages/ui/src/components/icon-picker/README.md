# LxIconPicker

`LxIconPicker` provides searchable Font Awesome icon selection with style support (`solid`, `regular`, `duotone`, etc), family/licence filters, and optional popup mode.

It works with a registry dataset (defaulting to `fa-registry.json`) and returns the selected icon name + style through `v-model`.

## Import

```ts
import { LxIconPicker } from '@luaris/ui';
```

```ts
import { LxIconPicker } from '@luaris/ui/components/icon-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `registry` | `ILxIconRegistryEntry[]` | internal `fa-registry.json` | Source icon metadata registry. |
| `placeholder` | `string` | `'Search icons'` | Search input placeholder. |
| `showSettings` | `boolean` | `true` | Shows licence/family/style filter controls. |
| `pageSize` | `number \| undefined` | `undefined` | Optional fixed page size (still respects minimum dynamic rows). |
| `columns` | `number` | `5` | Initial target column count. |
| `rows` | `number` | `5` | Reserved for API compatibility (current grid rows are driven by mode + width). |
| `popup` | `boolean` | `false` | Enables popup modal picker mode with trigger button. |
| `popupTitle` | `string` | `'Choose icon'` | Modal title in popup mode. |
| `popupPosition` | `TLxModalPosition` | `'center'` | Modal position in popup mode. |
| `popupAnimation` | `TLxModalAnimation` | `'fade'` | Modal animation in popup mode. |
| `popupWidth` | `string` | `'min(80vw, 28rem)'` | Popup modal width. |
| `popupMaxWidth` | `string` | `'28rem'` | Popup modal max width. |
| `popupMaxHeight` | `string` | `'80vh'` | Popup modal max height. |
| `closeOnSelect` | `boolean` | `true` | Auto closes popup when an icon is selected (popup mode only). |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `ILxIconPickerValue \| null` | `null` | Selected icon object. |

`ILxIconPickerValue`:

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Icon name (without FA prefix). |
| `style` | `TLxIconStyle` | Selected icon style. |

## Emits

This component has no custom emits. Use `v-model` updates.

## Slots

This component has no slots.

## Data Types

`ILxIconRegistryEntry` (for custom `registry`) expects:

- `name: string`
- `keywords: string[]`
- `styles: TLxIconStyle[]`
- `families: ('classic' | 'sharp' | 'brands')[]`
- `licences: ('free' | 'pro')[]`
- `styleSources: Partial<Record<TLxIconStyle, ('free' | 'pro')[]>>`

## Behaviour Notes

- Search matches icon `name` and `keywords`.
- Filtering honours selected licences, families, and styles.
- Grid columns auto-adjust using `ResizeObserver` + container width.
- Non-popup mode keeps at least 3 rows of tile space.
- Popup mode targets at least 5 rows.
- If a selected style becomes unavailable after filters change, style is adjusted to the first available style.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-colour-primary`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-sm`
- `--lx-size-space-2xs`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-size-space-md`
- `--lx-size-control-height-md`
- `--lx-font-size-xs`
- `--lx-font-size-sm`
- `--lx-font-size-lg`
- `--lx-font-weight-semibold`

## Examples

### Basic Inline Picker

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxIconPicker } from '@luaris/ui';
	import type { ILxIconPickerValue } from '@luaris/ui/components/icon-picker';

	const icon = ref<ILxIconPickerValue | null>(null);
</script>

<template>
	<LxIconPicker v-model="icon" />
	<p v-if="icon">Selected: {{ icon.style }} / {{ icon.name }}</p>
</template>
```

### Popup Mode

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxIconPicker } from '@luaris/ui';

	const icon = ref(null);
</script>

<template>
	<LxIconPicker
		v-model="icon"
		popup
		popup-title="Select an icon"
		popup-position="center"
		popup-animation="fade"
		:close-on-select="true"
	/>
</template>
```

### Restrict UI and Dataset

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxIconPicker } from '@luaris/ui';
	import type { ILxIconRegistryEntry } from '@luaris/ui/components/icon-picker';

	const icon = ref(null);

	const compactRegistry: ILxIconRegistryEntry[] = [
		{
			name: 'user',
			keywords: ['person', 'account'],
			styles: ['solid', 'regular'],
			families: ['classic'],
			licences: ['free'],
			styleSources: {
				solid: ['free'],
				regular: ['free'],
			},
		},
	];
</script>

<template>
	<LxIconPicker
		v-model="icon"
		:registry="compactRegistry"
		:show-settings="false"
		:columns="4"
	/>
</template>
```

## Style Overrides

```vue
<template>
	<LxIconPicker class="brand-icon-picker" v-model="icon" />
</template>

<style scoped>
	.brand-icon-picker :deep(.lx-icon-picker__tile.is-selected) {
		border-color: var(--lx-colour-accent);
	}

	.brand-icon-picker :deep(.lx-icon-picker__style-chip.is-selected) {
		box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--lx-colour-accent) 35%, transparent);
	}
</style>
```
