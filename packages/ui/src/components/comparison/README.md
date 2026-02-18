# LxComparison

`LxComparison` is a before/after comparison component.

It renders left and right slot content, then uses a draggable range handle to reveal more or less of the left panel over the right panel.

## Import

```ts
import { LxComparison } from '@luaris/ui';
```

```ts
import { LxComparison } from '@luaris/ui/components/comparison';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialSplit` | `number` | `50` | Initial split percentage value applied on mount. |
| `min` | `number` | `0` | Minimum slider value. |
| `max` | `number` | `100` | Maximum slider value. |
| `step` | `number` | `1` | Slider step. |
| `label` | `string` | `'Comparison slider'` | Accessible label for the comparison region. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `number` | `50` | Current split position value. |

## Emits

This component has no custom emits. Use `v-model` to react to value changes.

## Slots

| Slot | Description |
| --- | --- |
| `left` | Content for the left side (clipped by current split). |
| `right` | Content for the right side (base layer). |

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-inverse`
- `--lx-colour-primary`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-md`
- `--lx-size-radius-pill`

## Examples

### Basic Comparison

```vue
<script setup lang="ts">
	import { LxComparison } from '@luaris/ui';
</script>

<template>
	<LxComparison>
		<template #left>
			<img src="/images/before.jpg" alt="Before" style="width: 100%; height: 100%; object-fit: cover;">
		</template>
		<template #right>
			<img src="/images/after.jpg" alt="After" style="width: 100%; height: 100%; object-fit: cover;">
		</template>
	</LxComparison>
</template>
```

### Controlled Split with `v-model`

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxComparison } from '@luaris/ui';

	const split = ref(35);
</script>

<template>
	<LxComparison v-model="split" :step="5" label="Image comparison" />
	<p>Split: {{ split }}%</p>
</template>
```

### Custom Min/Max Range

```vue
<script setup lang="ts">
	import { LxComparison } from '@luaris/ui';
</script>

<template>
	<LxComparison :min="10" :max="90" :initial-split="45" />
</template>
```

## Style Overrides

```vue
<template>
	<LxComparison class="editor-comparison">
		<template #left><div class="pane">Version A</div></template>
		<template #right><div class="pane">Version B</div></template>
	</LxComparison>
</template>

<style scoped>
	.editor-comparison :deep(.lx-comparison__grip) {
		border-color: var(--lx-colour-accent);
	}

	.editor-comparison :deep(.lx-comparison__divider::before) {
		background: var(--lx-colour-accent);
	}
</style>
```
