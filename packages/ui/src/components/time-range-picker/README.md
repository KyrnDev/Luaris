# LxTimeRangePicker

`LxTimeRangePicker` is a two-field time range input for selecting start and end times.

It uses native time inputs, keeps constraints in sync (`start <= end`), and exposes a typed object model.

## Import

```ts
import { LxTimeRangePicker } from '@luaris/ui';
```

```ts
import { LxTimeRangePicker } from '@luaris/ui/components/time-range-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `string` | `''` | Earliest allowed time (`HH:mm`). |
| `max` | `string` | `''` | Latest allowed time (`HH:mm`). |
| `step` | `number \| string` | `60` | Time step in seconds. |
| `disabled` | `boolean` | `false` | Disables both time inputs via fieldset. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `ILxTimeRangeValue` | `{ start: '', end: '' }` | Selected time range object. |

`ILxTimeRangeValue`:

| Field | Type | Description |
| --- | --- | --- |
| `start` | `string` | Start time (`HH:mm`). |
| `end` | `string` | End time (`HH:mm`). |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: ILxTimeRangeValue` | Emitted whenever range value changes. |

## Slots

This component has no slots.

## Behaviour Notes

- The start input uses `max` from `value.end` (if set), otherwise `props.max`.
- The end input uses `min` from `value.start` (if set), otherwise `props.min`.
- The default display is inline: `[time] to [time]`.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-space-2xs`
- `--lx-size-space-sm`
- `--lx-font-size-sm`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTimeRangePicker } from '@luaris/ui';
	import type { ILxTimeRangeValue } from '@luaris/ui/components/time-range-picker';

	const range = ref<ILxTimeRangeValue>({
		start: '',
		end: '',
	});
</script>

<template>
	<LxTimeRangePicker v-model="range" />
</template>
```

### Constrained Range

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTimeRangePicker } from '@luaris/ui';

	const officeHours = ref({
		start: '09:00',
		end: '17:00',
	});
</script>

<template>
	<LxTimeRangePicker
		v-model="officeHours"
		min="08:00"
		max="20:00"
		:step="300"
	/>
</template>
```

## Style Overrides

```vue
<template>
	<LxTimeRangePicker class="compact-time-range" v-model="range" />
</template>

<style scoped>
	.compact-time-range :deep(input) {
		padding: 0.35rem 0.55rem;
	}
</style>
```
