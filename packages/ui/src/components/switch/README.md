# LxSwitch

`LxSwitch` is a boolean toggle control styled as a switch.

It supports `v-model`, disabled state, keyboard focus styling, and emits change events.

## Import

```ts
import { LxSwitch } from '@luaris/ui';
```

```ts
import { LxSwitch } from '@luaris/ui/components/switch';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables toggle interaction. |

## Model

| Model | Type | Default |
| --- | --- | --- |
| `v-model` | `boolean` | `false` |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: boolean` | Emitted when checked state changes. |

## Slots

This component has no slots.

## Accessibility Notes

- Input uses `role="switch"`.
- `aria-label` can be provided via forwarded attributes.

## Theme Tokens Used

- `--lx-colour-surface-border`
- `--lx-colour-surface-inverse`
- `--lx-colour-primary`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-standard`
- `--lx-size-radius-pill`
- `--lx-size-space-sm`
- `--lx-motion-duration-fast`
- `--lx-motion-easing-standard`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSwitch } from '@luaris/ui';

	const emailAlerts = ref(true);
</script>

<template>
	<LxSwitch v-model="emailAlerts" aria-label="Email alerts" />
</template>
```

### Disabled

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSwitch } from '@luaris/ui';

	const value = ref(false);
</script>

<template>
	<LxSwitch v-model="value" disabled aria-label="Feature toggle" />
</template>
```

### Listening to Changes

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxSwitch } from '@luaris/ui';

	const notifications = ref(false);

	const onChange = (next: boolean) => {
		console.log('Switch:', next);
	};
</script>

<template>
	<LxSwitch v-model="notifications" @change="onChange" aria-label="Notifications" />
</template>
```

## Style Overrides

```vue
<template>
	<LxSwitch class="accent-switch" v-model="value" />
</template>

<style scoped>
	.accent-switch :deep(.lx-switch input:checked + .lx-switch__track) {
		background: var(--lx-colour-accent);
	}
</style>
```
