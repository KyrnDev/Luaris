# LxTextarea

`LxTextarea` is a multiline text input with optional character counter and resize control.

It supports typed string `v-model`, row limits, max length, and disabled/readonly states.

## Import

```ts
import { LxTextarea } from '@luaris/ui';
```

```ts
import { LxTextarea } from '@luaris/ui/components/textarea';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | `''` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables textarea input. |
| `readonly` | `boolean` | `false` | Makes textarea read-only. |
| `minRows` | `number` | `3` | Initial `rows` value. |
| `maxRows` | `number` | `12` | Maximum visual height (calculated with `1.5em` row estimate). |
| `maxLength` | `number` | `0` | Optional maximum character length. `0` means no maxlength attribute. |
| `resizable` | `boolean` | `true` | Enables vertical resize when true, disables resize when false. |
| `showCounter` | `boolean` | `false` | Shows `current / max` counter when `maxLength` is set. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `string` | `''` |

## Emits

| Event | Payload |
| --- | --- |
| `change` | `value: string` |

## Slots

This component has no slots.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-font-size-xs`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTextarea } from '@luaris/ui';

	const notes = ref('');
</script>

<template>
	<LxTextarea v-model="notes" placeholder="Write your notes" />
</template>
```

### Counter + Max Length

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTextarea } from '@luaris/ui';

	const bio = ref('');
</script>

<template>
	<LxTextarea
		v-model="bio"
		:max-length="240"
		show-counter
		:min-rows="4"
	/>
</template>
```

### Non-resizable Readonly

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxTextarea } from '@luaris/ui';

	const log = ref('System generated output...');
</script>

<template>
	<LxTextarea v-model="log" readonly :resizable="false" :min-rows="6" />
</template>
```

## Style Overrides

```vue
<template>
	<LxTextarea class="compact-textarea" v-model="value" />
</template>

<style scoped>
	.compact-textarea :deep(textarea) {
		padding: 0.4rem 0.55rem;
		border-radius: var(--lx-size-radius-sm);
	}
</style>
```
