# LxDropdown

`LxDropdown` is a lightweight action menu component built on top of native `<details>/<summary>` semantics.

It renders a trigger label and a menu of options, emits selection values, supports disabled items, and closes on outside click or `Escape`.

## Import

```ts
import { LxDropdown } from '@luaris/ui';
```

```ts
import { LxDropdown } from '@luaris/ui/components/dropdown';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `'Options'` | Trigger text and menu aria label. |
| `options` | `ILxDropdownOption[]` | `[]` | Menu options list. |

`ILxDropdownOption`:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Option display text. |
| `value` | `TLxDropdownValue` | Payload emitted when option is selected. |
| `disabled` | `boolean \| undefined` | Disables a specific option. |

`TLxDropdownValue` is based on `TFormValue` (shared form value union type).

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `select` | `value: TLxDropdownValue` | Emitted when an option is chosen. |

## Slots

This component has no slots.

## Behaviour Notes

- Uses `v-click-outside` to close when clicking away.
- Closes on `Escape` while menu is focused.
- Uses `LxButton` internally for menu items.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-surface-sunken`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-sm`
- `--lx-size-radius-md`
- `--lx-size-space-2xs`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-size-space-md`

## Examples

### Basic Dropdown

```vue
<script setup lang="ts">
	import { LxDropdown } from '@luaris/ui';

	const options = [
		{ label: 'Edit', value: 'edit' },
		{ label: 'Duplicate', value: 'duplicate' },
		{ label: 'Delete', value: 'delete' },
	];

	const onSelect = (value: string | number | boolean | null) => {
		console.log('Selected:', value);
	};
</script>

<template>
	<LxDropdown label="Actions" :options="options" @select="onSelect" />
</template>
```

### Disabled Option

```vue
<script setup lang="ts">
	import { LxDropdown } from '@luaris/ui';

	const options = [
		{ label: 'Open', value: 'open' },
		{ label: 'Archive', value: 'archive', disabled: true },
	];
</script>

<template>
	<LxDropdown label="Document" :options="options" />
</template>
```

### Typed Values

```vue
<script setup lang="ts">
	import { LxDropdown } from '@luaris/ui';

	const options = [
		{ label: 'Priority: Low', value: 1 },
		{ label: 'Priority: Medium', value: 2 },
		{ label: 'Priority: High', value: 3 },
	];

	const onPriority = (value: number | string | boolean | null) => {
		console.log('Priority value:', value);
	};
</script>

<template>
	<LxDropdown label="Set priority" :options="options" @select="onPriority" />
</template>
```

## Style Overrides

```vue
<template>
	<LxDropdown class="project-dropdown" label="Menu" :options="options" />
</template>

<style scoped>
	.project-dropdown :deep(.lx-dropdown__menu) {
		min-width: 16rem;
	}

	.project-dropdown :deep(.lx-dropdown__trigger) {
		border-color: var(--lx-colour-accent);
	}
</style>
```
