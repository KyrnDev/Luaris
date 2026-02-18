# LxColourPicker

`LxColourPicker` is a colour input component with alpha support, multiple output formats, copy-to-clipboard output, and optional popup mode.

It supports inline panel usage and popup modal usage through built-in modal props.

## Import

```ts
import { LxColourPicker } from '@luaris/ui';
```

```ts
import { LxColourPicker } from '@luaris/ui/components/colour-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables all controls. |
| `showAlpha` | `boolean` | `true` | Shows alpha slider (0 to 1). |
| `formats` | `TLxColourFormat[]` | `['hex', 'rgb', 'rgba', 'hsl', 'hsla']` | Available output format buttons. |
| `defaultFormat` | `TLxColourFormat` | `'rgba'` | Initial selected output format. |
| `popup` | `boolean` | `false` | Renders picker inside `LxModal` opened by a trigger button. |
| `popupTitle` | `string` | `'Pick a colour'` | Modal title in popup mode. |
| `popupPosition` | `TLxModalPosition` | `'center'` | Popup modal position. |
| `popupAnimation` | `TLxModalAnimation` | `'fade'` | Popup modal animation. |
| `popupWidth` | `string` | `'min(92vw, 30rem)'` | Modal width in popup mode. |
| `popupMaxWidth` | `string` | `'30rem'` | Modal max width in popup mode. |
| `popupMaxHeight` | `string` | `'min(82dvh, 32rem)'` | Modal max height in popup mode. |

`TLxColourFormat` values:

- `'hex'`
- `'rgb'`
- `'rgba'`
- `'hsl'`
- `'hsla'`

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `ILxColourValue` | `{ hex: '#3b82f6', alpha: 1 }` |

`ILxColourValue`:

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Base hex colour (`#RRGGBB`). |
| `alpha` | `number` | Alpha value from `0` to `1`. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: ILxColourValue` | Emitted whenever colour value changes (after alpha clamping). |

## Slots

This component has no public slots.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-base`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-primary`
- `--lx-colour-on-primary`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-xs`
- `--lx-size-radius-sm`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-size-control-height-md`
- `--lx-font-size-xs`
- `--lx-font-size-sm`
- `--lx-font-family-mono`
- `--lx-font-weight-semibold`

## Examples

### Basic Inline Picker

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxColourPicker } from '@luaris/ui';
	import type { ILxColourValue } from '@luaris/ui/components/colour-picker';

	const colour = ref<ILxColourValue>({
		hex: '#0ea5e9',
		alpha: 0.85,
	});
</script>

<template>
	<LxColourPicker v-model="colour" />
</template>
```

### Restrict Formats and Disable Alpha

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxColourPicker } from '@luaris/ui';

	const colour = ref({ hex: '#ef4444', alpha: 1 });
</script>

<template>
	<LxColourPicker
		v-model="colour"
		:show-alpha="false"
		:formats="['hex', 'rgb']"
		default-format="hex"
	/>
</template>
```

### Popup Mode

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxColourPicker } from '@luaris/ui';

	const colour = ref({ hex: '#10b981', alpha: 0.9 });
</script>

<template>
	<LxColourPicker
		v-model="colour"
		popup
		popup-title="Theme Accent"
		popup-position="right"
		popup-animation="slide"
		popup-max-width="28rem"
	/>
</template>
```

### Disabled

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxColourPicker } from '@luaris/ui';

	const colour = ref({ hex: '#64748b', alpha: 0.7 });
</script>

<template>
	<LxColourPicker v-model="colour" disabled />
</template>
```

## Style Overrides

Use scoped overrides for local custom presentation:

```vue
<template>
	<LxColourPicker class="brand-colour-picker" v-model="colour" />
</template>

<style scoped>
	.brand-colour-picker :deep(.lx-colour-picker__output) {
		border-style: dashed;
	}

	.brand-colour-picker :deep(.lx-colour-picker__format.is-active) {
		background: var(--lx-colour-accent);
		border-color: var(--lx-colour-accent);
		color: var(--lx-colour-on-accent);
	}
</style>
```
