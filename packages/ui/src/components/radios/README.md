# LxRadios

`LxRadios` renders a radio group from options with stack/inline layouts and optional card-style option presentation.

It can also render custom option content via the `option` slot.

## Import

```ts
import { LxRadios } from '@luaris/ui';
```

```ts
import { LxRadios } from '@luaris/ui/components/radios';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | auto-generated | Radio group name. |
| `options` | `ILxRadiosOption[]` | `[]` | Radio option list. |
| `disabled` | `boolean` | `false` | Disables the full group. |
| `layout` | `'stack' \| 'inline'` | `'stack'` | Layout for radio items. |
| `card` | `boolean` | `false` | Enables card-style option rendering. |
| `space` | `TLayoutsLength` | `'var(--lx-size-space-md)'` | Gap for card mode content spacing. |

`ILxRadiosOption`:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Display label. |
| `value` | `TFormValue` | Option value. |
| `disabled` | `boolean \| undefined` | Disables this option. |

## Model

| Model | Type |
| --- | --- |
| `v-model` | `TFormValue` |

## Emits

This component has no custom emits. `v-model` handles updates.

## Slots

| Slot | Slot Props | Description |
| --- | --- | --- |
| `option` | `{ option, index, checked }` | Custom content for each card option. Enabling this slot triggers card layout mode. |

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-base`
- `--lx-colour-surface-border`
- `--lx-colour-primary`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-sm`
- `--lx-size-radius-pill`
- `--lx-size-control-height-lg`
- `--lx-size-space-md`
- `--lx-motion-duration-fast`
- `--lx-motion-easing-standard`

## Examples

### Basic Stacked Group

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRadios } from '@luaris/ui';

	const status = ref('active');
	const options = [
		{ label: 'Active', value: 'active' },
		{ label: 'Paused', value: 'paused' },
		{ label: 'Archived', value: 'archived' },
	];
</script>

<template>
	<LxRadios v-model="status" :options="options" />
</template>
```

### Inline Group

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRadios } from '@luaris/ui';

	const density = ref('comfortable');
	const options = [
		{ label: 'Compact', value: 'compact' },
		{ label: 'Comfortable', value: 'comfortable' },
	];
</script>

<template>
	<LxRadios v-model="density" :options="options" layout="inline" />
</template>
```

### Card Mode with Custom Slot

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRadios } from '@luaris/ui';

	const tier = ref('pro');
	const options = [
		{ label: 'Starter', value: 'starter' },
		{ label: 'Pro', value: 'pro' },
		{ label: 'Enterprise', value: 'enterprise' },
	];
</script>

<template>
	<LxRadios v-model="tier" :options="options" card layout="inline">
		<template #option="{ option, checked }">
			<strong>{{ option.label }}</strong>
			<div>{{ checked ? 'Selected' : 'Select this plan' }}</div>
		</template>
	</LxRadios>
</template>
```

## Style Overrides

```vue
<template>
	<LxRadios class="plan-radios" v-model="value" :options="options" card />
</template>

<style scoped>
	.plan-radios :deep(.lx-radios__card) {
		border-radius: var(--lx-size-radius-md);
	}
</style>
```
