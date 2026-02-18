# LxNumberInput

`LxNumberInput` is a numeric field component with optional plus/minus controls, min/max clamping, and step-based increments.

It supports native number attributes and exposes a typed numeric `v-model`.

## Import

```ts
import { LxNumberInput } from '@luaris/ui';
```

```ts
import { LxNumberInput } from '@luaris/ui/components/number-input';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `number` | `Number.MIN_SAFE_INTEGER` | Minimum allowed value. |
| `max` | `number` | `Number.MAX_SAFE_INTEGER` | Maximum allowed value. |
| `step` | `number` | `1` | Increment/decrement step size. |
| `disabled` | `boolean` | `false` | Disables input and controls. |
| `showControls` | `boolean` | `true` | Shows minus/plus control buttons. |
| `placeholder` | `string` | `''` | Input placeholder text. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `number` | `0` |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: number` | Emitted when value changes (typing or nudging). |

## Slots

This component has no slots.

## Behaviour Notes

- Values are clamped between `min` and `max`.
- `showControls` uses internal `LxButton` instances for consistent button styling.
- Supports forwarded input attributes via `v-bind="attrs"`.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-base`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-control-height-sm`
- `--lx-size-space-xs`
- `--lx-size-space-sm`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxNumberInput } from '@luaris/ui';

	const quantity = ref(1);
</script>

<template>
	<LxNumberInput v-model="quantity" />
</template>
```

### Min/Max/Step

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxNumberInput } from '@luaris/ui';

	const seats = ref(2);
</script>

<template>
	<LxNumberInput v-model="seats" :min="1" :max="10" :step="1" />
</template>
```

### Without Controls

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxNumberInput } from '@luaris/ui';

	const amount = ref(100);
</script>

<template>
	<LxNumberInput v-model="amount" :show-controls="false" placeholder="Enter amount" />
</template>
```

## Style Overrides

```vue
<template>
	<LxNumberInput class="price-input" v-model="price" />
</template>

<style scoped>
	.price-input :deep(.lx-number-input__field) {
		border-color: var(--lx-colour-accent);
	}
</style>
```
