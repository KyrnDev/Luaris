# LxDateTimePicker

`LxDateTimePicker` composes `LxDatePicker` and `LxTimePicker` into a single typed value.

Default layout is inline: `[date] at [time]`.

## Import

```ts
import { LxDateTimePicker } from '@luaris/ui';
```

```ts
import { LxDateTimePicker } from '@luaris/ui/components/date-time-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dateMin` | `string` | `''` | Minimum date (`YYYY-MM-DD`). |
| `dateMax` | `string` | `''` | Maximum date (`YYYY-MM-DD`). |
| `timeMin` | `string` | `''` | Minimum time (`HH:mm`). |
| `timeMax` | `string` | `''` | Maximum time (`HH:mm`). |
| `timeStep` | `number \| string` | `60` | Time step in seconds. |
| `disabled` | `boolean` | `false` | Disables both controls. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `ILxDateTimePickerValue` | `{ date: '', time: '' }` |

`ILxDateTimePickerValue`:

| Field | Type |
| --- | --- |
| `date` | `string` |
| `time` | `string` |

## Emits

| Event | Payload |
| --- | --- |
| `change` | `value: ILxDateTimePickerValue` |

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-text-muted`
- `--lx-size-space-sm`
- `--lx-font-size-sm`

Plus all tokens used by:
- `LxDatePicker`
- `LxTimePicker`

## Example

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDateTimePicker } from '@luaris/ui';

	const value = ref({
		date: '2026-04-14',
		time: '09:30',
	});
</script>

<template>
	<LxDateTimePicker
		v-model="value"
		date-min="2026-01-01"
		date-max="2026-12-31"
		time-min="08:00"
		time-max="20:00"
		:time-step="300"
	/>
</template>
```
