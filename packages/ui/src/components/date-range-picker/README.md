# LxDateRangePicker

`LxDateRangePicker` is a two-field date range input for selecting start and end dates.

It uses native date inputs, keeps constraints in sync (`start <= end`), and exposes a typed object model.

## Import

```ts
import { LxDateRangePicker } from '@luaris/ui';
```

```ts
import { LxDateRangePicker } from '@luaris/ui/components/date-range-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `string` | `''` | Earliest allowed date (`YYYY-MM-DD`). |
| `max` | `string` | `''` | Latest allowed date (`YYYY-MM-DD`). |
| `disabled` | `boolean` | `false` | Disables both date inputs via fieldset. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `ILxDateRangeValue` | `{ start: '', end: '' }` | Selected date range object. |

`ILxDateRangeValue`:

| Field | Type | Description |
| --- | --- | --- |
| `start` | `string` | Start date (`YYYY-MM-DD`). |
| `end` | `string` | End date (`YYYY-MM-DD`). |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: ILxDateRangeValue` | Emitted whenever range value changes. |

## Slots

This component has no slots.

## Behaviour Notes

- The start input uses `max` from `value.end` (if set), otherwise `props.max`.
- The end input uses `min` from `value.start` (if set), otherwise `props.min`.
- This keeps date selection order valid while still using native browser date controls.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-space-2xs`
- `--lx-size-space-sm`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDateRangePicker } from '@luaris/ui';
	import type { ILxDateRangeValue } from '@luaris/ui/components/date-range-picker';

	const range = ref<ILxDateRangeValue>({
		start: '',
		end: '',
	});
</script>

<template>
	<LxDateRangePicker v-model="range" />
</template>
```

### Constrained Range

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDateRangePicker } from '@luaris/ui';

	const bookingRange = ref({
		start: '2026-04-10',
		end: '2026-04-18',
	});
</script>

<template>
	<LxDateRangePicker
		v-model="bookingRange"
		min="2026-01-01"
		max="2026-12-31"
	/>
</template>
```

### Listen for Changes

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDateRangePicker } from '@luaris/ui';

	const range = ref({ start: '', end: '' });

	const onChange = (next: { start: string, end: string }) => {
		console.log('Range changed:', next);
	};
</script>

<template>
	<LxDateRangePicker v-model="range" @change="onChange" />
</template>
```

### Disabled

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDateRangePicker } from '@luaris/ui';

	const archivedRange = ref({ start: '2025-01-01', end: '2025-01-31' });
</script>

<template>
	<LxDateRangePicker v-model="archivedRange" disabled />
</template>
```

## Style Overrides

```vue
<template>
	<LxDateRangePicker class="compact-range" v-model="range" />
</template>

<style scoped>
	.compact-range :deep(input) {
		padding: 0.35rem 0.55rem;
	}

	.compact-range :deep(.lx-date-range-picker__grid) {
		grid-template-columns: 1fr;
	}
</style>
```
