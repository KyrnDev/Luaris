# LxRating

`LxRating` is an interactive rating control (for example stars) with configurable item count, size, readonly mode, and custom icon slot.

## Import

```ts
import { LxRating } from '@luaris/ui';
```

```ts
import { LxRating } from '@luaris/ui/components/rating';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `max` | `number` | `5` | Number of rating items. |
| `readonly` | `boolean` | `false` | Prevents user selection changes. |
| `allowHalf` | `boolean` | `false` | Reserved prop for half selection behaviour (currently not applied). |
| `label` | `string` | `'Rating'` | Accessible label for rating group. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Rating icon size. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `number` | `0` |

## Emits

| Event | Payload |
| --- | --- |
| `change` | `value: number` |

## Slots

| Slot | Slot Props | Description |
| --- | --- | --- |
| `icon` | `{ active: boolean, index: number }` | Custom item icon/content. Defaults to `★`. |

## Theme Tokens Used

- `--lx-colour-surface-border`
- `--lx-colour-warning`
- `--lx-size-space-xs`

Local variable:

- `--lx-rating-size`

## Examples

### Basic Star Rating

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRating } from '@luaris/ui';

	const rating = ref(3);
</script>

<template>
	<LxRating v-model="rating" />
</template>
```

### Readonly Display

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxRating } from '@luaris/ui';

	const score = ref(4);
</script>

<template>
	<LxRating v-model="score" readonly />
</template>
```

### Custom Icon Slot

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxIcon, LxRating } from '@luaris/ui';

	const score = ref(2);
</script>

<template>
	<LxRating v-model="score" size="lg">
		<template #icon="{ active }">
			<LxIcon :name="active ? 'heart' : 'heart-crack'" icon-style="solid" />
		</template>
	</LxRating>
</template>
```

## Style Overrides

```vue
<template>
	<LxRating class="brand-rating" v-model="value" />
</template>

<style scoped>
	.brand-rating :deep(.lx-rating__item.is-active) {
		color: var(--lx-colour-accent);
	}
</style>
```
