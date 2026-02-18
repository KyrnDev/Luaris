# LxTag

`LxTag` displays labelled metadata chips with semantic variants and optional remove action.

It supports leading content and removable behaviour through a built-in button.

## Import

```ts
import { LxTag } from '@luaris/ui';
```

```ts
import { LxTag } from '@luaris/ui/components/tag';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Tag text when no default slot is provided. |
| `variant` | `TVariant` | `'secondary'` | Semantic colour variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tag size. |
| `removable` | `boolean` | `false` | Shows remove button and enables `remove` emit. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `remove` | none | Emitted when remove button is clicked. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Main tag content (overrides `label`). |
| `leading` | Leading content before tag text (icon/avatar/etc). |

## Theme Tokens Used

- `--lx-colour-primary`
- `--lx-colour-secondary`
- `--lx-colour-accent`
- `--lx-colour-info`
- `--lx-colour-success`
- `--lx-colour-warning`
- `--lx-colour-danger`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-space-xs`
- `--lx-font-size-xs`
- `--lx-font-size-sm`
- `--lx-font-size-md`
- `--lx-font-weight-medium`

Local variable:

- `--lx-tag-colour`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxTag } from '@luaris/ui';
</script>

<template>
	<LxTag label="Backend" variant="info" />
</template>
```

### Removable Tag

```vue
<script setup lang="ts">
	import { LxTag } from '@luaris/ui';

	const onRemove = () => {
		console.log('Tag removed');
	};
</script>

<template>
	<LxTag label="Design" removable @remove="onRemove" />
</template>
```

### Leading Slot

```vue
<script setup lang="ts">
	import { LxIcon, LxTag } from '@luaris/ui';
</script>

<template>
	<LxTag variant="success">
		<template #leading>
			<LxIcon name="check" size="xs" />
		</template>
		Ready
	</LxTag>
</template>
```

## Style Overrides

```vue
<template>
	<LxTag class="rounded-tag" label="Custom" />
</template>

<style scoped>
	.rounded-tag {
		border-radius: var(--lx-size-radius-pill);
	}
</style>
```
