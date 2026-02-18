# LxModal

`LxModal` is a portal-based dialog component for overlays, popups, and panels.

It supports position and animation variants, close controls (`outside`, `escape`, close button), custom sizing, and header/footer slots.

## Import

```ts
import { LxModal } from '@luaris/ui';
```

```ts
import { LxModal } from '@luaris/ui/components/modal';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | Controls modal visibility. |
| `title` | `string` | `''` | Header title when no `header` slot is used. |
| `position` | `'center' \| 'left' \| 'right' \| 'top' \| 'bottom'` | `'center'` | Panel alignment in viewport. |
| `animation` | `'none' \| 'fade' \| 'slide'` | `'none'` | Entry animation style. |
| `closeOnBackdrop` | `boolean` | `true` | Closes when clicking outside panel. |
| `closeOnEscape` | `boolean` | `true` | Closes when pressing `Escape`. |
| `showBackdrop` | `boolean` | `true` | Shows backdrop layer. |
| `showClose` | `boolean` | `false` | Shows built-in close button in header. |
| `panelClass` | `string` | `''` | Extra class applied to modal panel element. |
| `width` | `string` | `''` | Explicit panel width. |
| `maxWidth` | `string` | `'80vw'` | Panel max width. |
| `maxHeight` | `string` | `'80vh'` | Panel max height. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | Open/closed state. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `value: boolean` | Emitted on open/close state changes. |
| `close` | none | Emitted whenever modal closes via internal close logic. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Modal body content. |
| `header` | Custom header content (replaces title display). |
| `footer` | Footer content area (only rendered when slot exists). |

## Behaviour Notes

- Rendered via `<Teleport to="body">`.
- Uses `v-click-outside` on panel for outside-click close behaviour.
- `Escape` listener is attached on mount and removed on unmount.
- `aria-labelledby` is connected when a header is present.

## Theme Tokens Used

- `--lx-colour-surface-overlay`
- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-md`
- `--lx-size-space-md`
- `--lx-size-space-lg`
- `--lx-font-weight-semibold`
- `--lx-motion-duration-normal`
- `--lx-motion-easing-standard`

## Examples

### Basic Controlled Modal

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxButton, LxModal } from '@luaris/ui';

	const open = ref(false);
</script>

<template>
	<LxButton @click="open = true">Open modal</LxButton>

	<LxModal v-model="open" title="Confirm" show-close>
		<p>Are you sure you want to continue?</p>
	</LxModal>
</template>
```

### Position + Slide Animation

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxModal } from '@luaris/ui';

	const open = ref(true);
</script>

<template>
	<LxModal
		v-model="open"
		title="Side panel"
		position="right"
		animation="slide"
		show-close
	/>
</template>
```

### Custom Header and Footer

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxButton, LxModal } from '@luaris/ui';

	const open = ref(true);
</script>

<template>
	<LxModal v-model="open" :show-close="false">
		<template #header>
			<h3>Custom title bar</h3>
		</template>

		<p>Body content in modal.</p>

		<template #footer>
			<LxButton variant="secondary" @click="open = false">Close</LxButton>
		</template>
	</LxModal>
</template>
```

### Sizing + Close Rules

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxModal } from '@luaris/ui';

	const open = ref(true);
</script>

<template>
	<LxModal
		v-model="open"
		title="Large content"
		width="min(90vw, 56rem)"
		max-height="85vh"
		:close-on-backdrop="false"
		:close-on-escape="true"
	/>
</template>
```

## Style Overrides

```vue
<template>
	<LxModal v-model="open" panel-class="project-modal" title="Theme" />
</template>

<style scoped>
	:deep(.project-modal) {
		border-color: var(--lx-colour-accent);
	}

	:deep(.project-modal .lx-modal__header) {
		background: var(--lx-colour-surface-sunken);
	}
</style>
```
