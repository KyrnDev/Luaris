# LxSelect

`LxSelect` is a styled wrapper around native `<select>` for single-choice option selection.

It supports typed values, size variants, disabled options, and both `update:modelValue` and `change` emits.

## Import

```ts
import { LxSelect } from '@luaris/ui';
```

```ts
import { LxSelect } from '@luaris/ui/components/select';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `TLxSelectValue` | `''` | Selected option value. |
| `options` | `ILxSelectOption[]` | `[]` | Select options. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height size. |
| `disabled` | `boolean` | `false` | Disables the select control. |

`ILxSelectOption`:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Option label. |
| `value` | `TLxSelectValue` | Option value. |
| `disabled` | `boolean \| undefined` | Disables this option. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `TLxSelectValue` | `''` |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `value: TLxSelectValue` | Emitted on selection change. |
| `change` | `value: TLxSelectValue` | Emitted on selection change. |

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-control-height-sm`
- `--lx-size-control-height-md`
- `--lx-size-control-height-lg`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-size-space-md`
- `--lx-size-space-lg`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSelect } from '@luaris/ui';

	const country = ref('de');
	const options = [
		{ label: 'Germany', value: 'de' },
		{ label: 'France', value: 'fr' },
		{ label: 'Spain', value: 'es' },
	];
</script>

<template>
	<LxSelect v-model="country" :options="options" />
</template>
```

### Sizes and Disabled Option

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSelect } from '@luaris/ui';

	const value = ref('standard');
	const options = [
		{ label: 'Standard', value: 'standard' },
		{ label: 'Premium', value: 'premium', disabled: true },
	];
</script>

<template>
	<LxSelect v-model="value" :options="options" size="sm" />
	<LxSelect v-model="value" :options="options" size="lg" />
</template>
```

## Style Overrides

```vue
<template>
	<LxSelect class="project-select" v-model="selected" :options="options" />
</template>

<style scoped>
	.project-select :deep(.lx-select__field-wrapper) {
		border-color: var(--lx-colour-accent);
	}
</style>
```
