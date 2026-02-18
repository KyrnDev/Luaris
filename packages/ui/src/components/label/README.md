# LxLabel

`LxLabel` is a field wrapper component that pairs a label with a form control.

It can auto-generate control ids/names, supports default and inline display modes, and can reverse label/control order.

## Import

```ts
import { LxLabel } from '@luaris/ui';
```

```ts
import { LxLabel } from '@luaris/ui/components/label';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `''` | Label text when `label` slot is not provided. |
| `display` | `'default' \| 'inline'` | `'default'` | Layout mode (`default`: stacked, `inline`: label and control side-by-side). |
| `reverse` | `boolean` | `false` | Reverses label/control order for the chosen layout. |
| `controlId` | `string` | `''` | Explicit control id. Auto-generated if omitted. |
| `controlName` | `string` | `''` | Explicit control name. Falls back to resolved control id if omitted. |

## Emits

This component has no emits.

## Slots

| Slot | Slot Props | Description |
| --- | --- | --- |
| `default` | `{ controlId: string, controlName: string }` | Control content slot; use provided values on your input/select/etc for id/name linkage. |
| `label` | none | Custom label content; overrides `text` prop. |

## Theme Tokens Used

- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-colour-surface-text`
- `--lx-font-size-sm`
- `--lx-font-weight-medium`

## Examples

### Basic (Stacked)

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput, LxLabel } from '@luaris/ui';

	const email = ref('');
</script>

<template>
	<LxLabel text="Email address">
		<template #default="{ controlId, controlName }">
			<LxInput
				:id="controlId"
				:name="controlName"
				v-model="email"
				type="email"
			/>
		</template>
	</LxLabel>
</template>
```

### Inline Layout

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput, LxLabel } from '@luaris/ui';

	const query = ref('');
</script>

<template>
	<LxLabel text="Search" display="inline">
		<template #default="{ controlId, controlName }">
			<LxInput :id="controlId" :name="controlName" v-model="query" />
		</template>
	</LxLabel>
</template>
```

### Reverse Order

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxLabel, LxSwitch } from '@luaris/ui';

	const enabled = ref(false);
</script>

<template>
	<LxLabel text="Enable alerts" display="inline" reverse>
		<template #default="{ controlId, controlName }">
			<LxSwitch :id="controlId" :name="controlName" v-model="enabled" />
		</template>
	</LxLabel>
</template>
```

### Custom Label Slot

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxInput, LxLabel } from '@luaris/ui';

	const username = ref('');
</script>

<template>
	<LxLabel>
		<template #label>
			<span>Username <small>(required)</small></span>
		</template>
		<template #default="{ controlId, controlName }">
			<LxInput :id="controlId" :name="controlName" v-model="username" />
		</template>
	</LxLabel>
</template>
```

## Style Overrides

```vue
<template>
	<LxLabel class="compact-label" text="Name">
		<template #default="{ controlId }">
			<input :id="controlId" />
		</template>
	</LxLabel>
</template>

<style scoped>
	.compact-label {
		gap: 0.25rem;
	}

	.compact-label :deep(.lx-label__text) {
		font-size: 0.75rem;
		text-transform: uppercase;
	}
</style>
```
