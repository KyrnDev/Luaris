# LxDatePicker

`LxDatePicker` is a typed wrapper around a native HTML date input (`type="date"`).

It provides consistent token-based styling, `v-model` support, generated `id/name` fallback, and a `change` emit for value updates.

## Import

```ts
import { LxDatePicker } from '@luaris/ui';
```

```ts
import { LxDatePicker } from '@luaris/ui/components/date-picker';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `string` | `''` | Minimum selectable date (`YYYY-MM-DD`). |
| `max` | `string` | `''` | Maximum selectable date (`YYYY-MM-DD`). |
| `disabled` | `boolean` | `false` | Disables the input. |

Note: attributes such as `id`, `name`, and `aria-label` can also be passed directly and are forwarded to the input.

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string` | `''` | Selected date value (`YYYY-MM-DD`). |

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
	import { LxDatePicker } from '@luaris/ui';

	const date = ref('2026-03-15');
</script>

<template>
	<LxDatePicker v-model="date" />
</template>
```

### Min/Max Range

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDatePicker } from '@luaris/ui';

	const eventDate = ref('');
</script>

<template>
	<LxDatePicker
		v-model="eventDate"
		min="2026-01-01"
		max="2026-12-31"
		aria-label="Event date"
	/>
</template>
```

### Listening to Change

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDatePicker } from '@luaris/ui';

	const selectedDate = ref('');

	const onDateChange = (value: string) => {
		console.log('Selected date:', value);
	};
</script>

<template>
	<LxDatePicker v-model="selectedDate" @change="onDateChange" />
</template>
```

### Disabled

```vue
<script setup lang="ts">
	import { LxDatePicker } from '@luaris/ui';
</script>

<template>
	<LxDatePicker disabled v-model="dateValue" />
</template>
```

## Style Overrides

```vue
<template>
	<LxDatePicker class="compact-date" v-model="date" />
</template>

<style scoped>
	.compact-date :deep(input) {
		padding: 0.35rem 0.55rem;
		border-radius: var(--lx-size-radius-sm);
	}
</style>
```
