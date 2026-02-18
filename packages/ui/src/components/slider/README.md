# LxSlider

`LxSlider` is a numeric range input component with optional live value display.

It wraps native `type="range"` with token-based styling and typed `v-model` updates.

## Import

```ts
import { LxSlider } from '@luaris/ui';
```

```ts
import { LxSlider } from '@luaris/ui/components/slider';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | `number` | `0` | Minimum slider value. |
| `max` | `number` | `100` | Maximum slider value. |
| `step` | `number` | `1` | Slider step interval. |
| `disabled` | `boolean` | `false` | Disables slider interaction. |
| `showValue` | `boolean` | `true` | Displays current value text to the right. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `number` | `0` |

## Emits

| Event | Payload |
| --- | --- |
| `change` | `value: number` |

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-primary`
- `--lx-colour-surface-text-muted`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-font-size-xs`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSlider } from '@luaris/ui';

	const volume = ref(25);
</script>

<template>
	<LxSlider v-model="volume" />
</template>
```

### Custom Range and Step

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSlider } from '@luaris/ui';

	const opacity = ref(0.5);
</script>

<template>
	<LxSlider v-model="opacity" :min="0" :max="1" :step="0.05" />
</template>
```

### Hide Value Display

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSlider } from '@luaris/ui';

	const progress = ref(40);
</script>

<template>
	<LxSlider v-model="progress" :show-value="false" />
</template>
```

## Style Overrides

```vue
<template>
	<LxSlider class="accent-slider" v-model="value" />
</template>

<style scoped>
	.accent-slider :deep(input[type='range']) {
		accent-color: var(--lx-colour-accent);
	}
</style>
```
