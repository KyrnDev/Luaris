# LxDrawer

`LxDrawer` is a modal-backed panel that slides or fades in from an edge (`left`, `right`, `top`, `bottom`).

It is built on top of `LxModal` and provides a drawer layout with header, body, and close controls.

## Import

```ts
import { LxDrawer } from '@luaris/ui';
```

```ts
import { LxDrawer } from '@luaris/ui/components/drawer';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | Controls drawer open state. |
| `title` | `string` | `''` | Fallback header title when no `header` slot is provided. |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Drawer anchor side. |
| `animation` | `'none' \| 'fade' \| 'slide'` | `'none'` | Open/close animation style. |
| `closeOnBackdrop` | `boolean` | `true` | Closes drawer when clicking the backdrop. |
| `closeOnEscape` | `boolean` | `true` | Closes drawer when pressing `Escape`. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Open state for the drawer. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `value: boolean` | Emitted on open/close changes. |
| `close` | none | Emitted when drawer closes via button/backdrop/escape/programmatic close. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Drawer body content. |
| `header` | Replaces the header title area. |

## Theme Tokens Used

- `--lx-colour-surface-border`
- `--lx-size-border-width-hairline`
- `--lx-size-space-md`
- `--lx-size-space-lg`
- `--lx-font-weight-semibold`

## Examples

### Basic Controlled Drawer

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxButton, LxDrawer } from '@luaris/ui';

	const open = ref(false);
</script>

<template>
	<LxButton @click="open = true">Open drawer</LxButton>

	<LxDrawer v-model="open" title="Settings">
		<p>Drawer content goes here.</p>
	</LxDrawer>
</template>
```

### Side and Animation Variants

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxButton, LxDrawer } from '@luaris/ui';

	const fromLeft = ref(false);
</script>

<template>
	<LxButton @click="fromLeft = true">Open left drawer</LxButton>

	<LxDrawer
		v-model="fromLeft"
		title="Navigation"
		side="left"
		animation="slide"
	/>
</template>
```

### Custom Header Slot

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDrawer } from '@luaris/ui';

	const open = ref(true);
</script>

<template>
	<LxDrawer v-model="open">
		<template #header>
			<div style="display: flex; gap: 0.5rem; align-items: center;">
				<strong>Profile Panel</strong>
			</div>
		</template>

		<p>Custom header drawer body.</p>
	</LxDrawer>
</template>
```

### Disable Auto Close Paths

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxDrawer } from '@luaris/ui';

	const open = ref(true);
</script>

<template>
	<LxDrawer
		v-model="open"
		title="Confirm action"
		:close-on-backdrop="false"
		:close-on-escape="false"
	/>
</template>
```

## Style Overrides

```vue
<template>
	<LxDrawer class="admin-drawer" v-model="open" title="Admin tools" />
</template>

<style scoped>
	.admin-drawer :deep(.lx-drawer__header) {
		background: var(--lx-colour-surface-sunken);
	}

	.admin-drawer :deep(.lx-drawer__body) {
		padding: var(--lx-size-space-xl);
	}
</style>
```
