# LxDateTimeRangePicker

`LxDateTimeRangePicker` composes `LxDateRangePicker` and `LxTimeRangePicker` into one typed model.

It is useful for booking windows, schedules, and filtered time spans where date and time ranges must stay in sync.

## Import

```ts
import { LxDateTimeRangePicker } from '@luaris/ui';
```

```ts
import { LxDateTimeRangePicker } from '@luaris/ui/components/date-time-range-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dateMin` | `string` | `''` | Minimum date (`YYYY-MM-DD`). |
| `dateMax` | `string` | `''` | Maximum date (`YYYY-MM-DD`). |
| `timeMin` | `string` | `''` | Minimum time (`HH:mm`). |
| `timeMax` | `string` | `''` | Maximum time (`HH:mm`). |
| `timeStep` | `number \| string` | `60` | Time step in seconds. |
| `disabled` | `boolean` | `false` | Disables all controls. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `ILxDateTimeRangePickerValue` | `{ startDate: '', startTime: '', endDate: '', endTime: '' }` |

`ILxDateTimeRangePickerValue`:

| Field | Type |
| --- | --- |
| `startDate` | `string` |
| `startTime` | `string` |
| `endDate` | `string` |
| `endTime` | `string` |

## Emits

| Event | Payload |
| --- | --- |
| `change` | `value: ILxDateTimeRangePickerValue` |

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-text-muted`
- `--lx-size-space-2xs`
- `--lx-size-space-sm`
- `--lx-font-size-xs`

Plus all tokens used by:
- `LxDateRangePicker`
- `LxTimeRangePicker`

## Example

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDateTimeRangePicker } from '@luaris/ui';

	const value = ref({
		startDate: '2026-05-01',
		startTime: '09:00',
		endDate: '2026-05-02',
		endTime: '17:00',
	});
</script>

<template>
	<LxDateTimeRangePicker
		v-model="value"
		date-min="2026-01-01"
		date-max="2026-12-31"
		time-min="08:00"
		time-max="20:00"
		:time-step="300"
	/>
</template>
```
