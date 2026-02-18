# LxRadio

`LxRadio` is a single radio control component for choosing one value within a shared group.

It is typically used directly for simple cases, or via `LxRadios` for grouped rendering.

## Import

```ts
import { LxRadio } from '@luaris/ui';
```

```ts
import { LxRadio } from '@luaris/ui/components/radio';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `TFormValue` | required | Value represented by this radio option. |
| `label` | `string` | `''` | Label text shown next to the dot. |
| `disabled` | `boolean` | `false` | Disables this radio control. |
| `name` | `string` | `''` | Group name fallback if no `name` attribute is passed. |
| `id` | `string` | `''` | Input id fallback if no `id` attribute is passed. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `TFormValue` | `undefined` |

## Emits

This component has no custom emits. `v-model` handles updates.

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-primary`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-pill`
- `--lx-size-space-xs`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRadio } from '@luaris/ui';

	const payment = ref('card');
</script>

<template>
	<LxRadio v-model="payment" name="payment" value="card" label="Card" />
	<LxRadio v-model="payment" name="payment" value="bank" label="Bank transfer" />
</template>
```

### Disabled Option

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRadio } from '@luaris/ui';

	const plan = ref('starter');
</script>

<template>
	<LxRadio v-model="plan" name="plan" value="starter" label="Starter" />
	<LxRadio v-model="plan" name="plan" value="enterprise" label="Enterprise" disabled />
</template>
```

## Style Overrides

```vue
<template>
	<LxRadio class="accent-radio" v-model="value" value="a" label="Option A" />
</template>

<style scoped>
	.accent-radio :deep(.lx-radio__dot) {
		border-color: var(--lx-colour-accent);
	}
</style>
```
