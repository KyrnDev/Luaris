# LxInput

`LxInput` is a styled text input component with optional hint/error messaging and leading/trailing slot add-ons.

It supports typed variants, sizes, native input types, and a string `v-model`.

## Import

```ts
import { LxInput } from '@luaris/ui';
```

```ts
import { LxInput } from '@luaris/ui/components/input';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hint` | `string` | `''` | Helper text shown below the field when no error is present. |
| `error` | `string` | `''` | Error message shown below the field; also marks the input as invalid. |
| `placeholder` | `string` | `''` | Native placeholder text. |
| `type` | `InputTypeHTMLAttribute` | `'text'` | Native input type (`text`, `email`, `password`, etc). |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Border colour variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height size. |
| `disabled` | `boolean` | `false` | Disables input editing. |
| `readonly` | `boolean` | `false` | Makes input read-only. |

Note: extra attributes (`id`, `name`, `autocomplete`, etc) are forwarded to the inner `<input>`.

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string` | `''` | Input value. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: string` | Emitted on each input update. |

## Slots

| Slot | Description |
| --- | --- |
| `leading` | Content displayed before the input text. |
| `trailing` | Content displayed after the input text. |

## Accessibility Notes

- Sets `aria-invalid` when `error` is provided.
- Sets `aria-describedby` to hint/error message id when message text is present.

## Theme Tokens Used

- `--lx-colour-surface-border`
- `--lx-colour-surface-raised`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-colour-primary`
- `--lx-colour-secondary`
- `--lx-colour-danger`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-control-height-sm`
- `--lx-size-control-height-md`
- `--lx-size-control-height-lg`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-font-size-xs`
- `--lx-motion-duration-fast`
- `--lx-motion-easing-standard`

Local variables used:

- `--lx-input-border`
- `--lx-input-background`
- `--lx-input-text`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput } from '@luaris/ui';

	const value = ref('');
</script>

<template>
	<LxInput v-model="value" placeholder="Enter your name" />
</template>
```

### Hint and Error

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput } from '@luaris/ui';

	const email = ref('');
</script>

<template>
	<LxInput v-model="email" type="email" hint="We will never share your email" />
	<LxInput v-model="email" type="email" error="Please enter a valid email address" />
</template>
```

### Size and Variant

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput } from '@luaris/ui';

	const query = ref('');
</script>

<template>
	<LxInput v-model="query" size="sm" variant="default" placeholder="Small" />
	<LxInput v-model="query" size="md" variant="primary" placeholder="Primary" />
	<LxInput v-model="query" size="lg" variant="secondary" placeholder="Secondary" />
</template>
```

### Leading and Trailing Add-ons

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxIcon, LxInput } from '@luaris/ui';

	const search = ref('');
</script>

<template>
	<LxInput v-model="search" placeholder="Search">
		<template #leading>
			<LxIcon name="magnifying-glass" />
		</template>
		<template #trailing>
			<kbd>⌘K</kbd>
		</template>
	</LxInput>
</template>
```

### Disabled and Readonly

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput } from '@luaris/ui';

	const apiKey = ref('pk_live_xxx');
</script>

<template>
	<LxInput v-model="apiKey" readonly />
	<LxInput v-model="apiKey" disabled />
</template>
```

## Style Overrides

```vue
<template>
	<LxInput class="auth-input" v-model="email" placeholder="you@example.com" />
</template>

<style scoped>
	.auth-input {
		--lx-input-border: var(--lx-colour-accent);
	}

	.auth-input :deep(.lx-input__field-wrapper) {
		border-width: 2px;
	}
</style>
```
