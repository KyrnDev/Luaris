# LxTimePicker

`LxTimePicker` is a typed wrapper around a native HTML time input (`type='time'`).

It provides consistent token-based styling, `v-model` support, generated `id/name` fallback, and a `change` emit when the value changes.

## Import

```ts
import { LxTimePicker } from '@luaris/ui';
```

```ts
import { LxTimePicker } from '@luaris/ui/components/time-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `string` | `''` | Minimum selectable time (`HH:mm`). |
| `max` | `string` | `''` | Maximum selectable time (`HH:mm`). |
| `step` | `number \| string` | `60` | Time step in seconds. |
| `disabled` | `boolean` | `false` | Disables the input. |

Note: attributes such as `id`, `name`, and `aria-label` can also be passed directly and are forwarded to the input.

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string` | `''` | Selected time value (`HH:mm`). |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: string` | Emitted whenever the model value changes. |

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-space-xs`
- `--lx-size-space-sm`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTimePicker } from '@luaris/ui';

	const startTime = ref('09:00');
</script>

<template>
	<LxTimePicker v-model="startTime" />
</template>
```

### Bounded Time

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTimePicker } from '@luaris/ui';

	const meetingTime = ref('');
</script>

<template>
	<LxTimePicker
		v-model="meetingTime"
		min="08:00"
		max="18:00"
		:step="300"
	/>
</template>
```

## Style Overrides

```vue
<template>
	<LxTimePicker class="compact-time" v-model="timeValue" />
</template>

<style scoped>
	.compact-time :deep(input) {
		padding: 0.35rem 0.55rem;
		border-radius: var(--lx-size-radius-sm);
	}
</style>
```
