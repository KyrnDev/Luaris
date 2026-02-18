# LxCombobox

`LxCombobox` is a searchable option picker that supports both single and multi-select modes.

It can render selected values as removable tags or as a selected list with checkboxes, and includes keyboard navigation and click-outside close behaviour.

## Import

```ts
import { LxCombobox } from '@luaris/ui';
```

```ts
import { LxCombobox } from '@luaris/ui/components/combobox';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `ILxComboboxOption[] \| string[]` | `[]` | Option source. Strings are normalised to `{ label, value }`. |
| `placeholder` | `string` | `'Search or select'` | Input placeholder. |
| `disabled` | `boolean` | `false` | Disables input and option interactions. |
| `id` | `string` | `''` | Optional input id fallback (used if no attribute `id` is passed). |
| `multiple` | `boolean` | `true` | Enables multi-select mode. |
| `tags` | `boolean` | `true` | In multi mode, show selected values as removable chips when `true`, or checkbox list when `false`. |
| `searchOnNewLine` | `boolean` | `true` | In tag mode, puts search input on a new line (`true`) or inline with tags (`false`). |
| `openByDefault` | `boolean` | `false` | Opens dropdown initially. |
| `alwaysVisible` | `boolean` | `false` | Keeps menu visible at all times. |
| `filterable` | `boolean` | `true` | Enables filtering by typed query. |

`ILxComboboxOption`:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Display text. |
| `value` | `string` | Stored option value. |
| `disabled` | `boolean \| undefined` | Disables this option only. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| string[]` | `''` | Selected value(s). In multi mode it should be `string[]`; in single mode it should be `string`. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `value: string \| string[]` | Emitted when selection changes. |

## Slots

This component has no public slots.

## Behaviour Notes

- Uses built-in `v-click-outside` to close the menu when focus leaves the component.
- Keyboard support includes:
  - `ArrowDown` / `ArrowUp` to move highlight
  - `Enter` to select highlighted option
  - `Escape` to close menu
  - `Backspace` in multi mode with empty query removes the last selected value

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-colour-surface-sunken`
- `--lx-colour-primary`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-sm`
- `--lx-size-radius-md`
- `--lx-size-radius-pill`
- `--lx-size-control-height-md`
- `--lx-size-space-2xs`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-font-size-sm`
- `--lx-font-line-height-tight`
- `--lx-font-line-height-normal`

## Examples

### Single Select

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxCombobox } from '@luaris/ui';

	const country = ref('');
	const options = ['France', 'Germany', 'Italy', 'Spain', 'Portugal'];
</script>

<template>
	<LxCombobox
		v-model="country"
		:options="options"
		:multiple="false"
		placeholder="Choose a country"
	/>
</template>
```

### Multi Select with Tags

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxCombobox } from '@luaris/ui';

	const stack = ref<string[]>(['Vue']);
	const options = ['Vue', 'TypeScript', 'Vitest', 'Bun', 'SCSS'];
</script>

<template>
	<LxCombobox
		v-model="stack"
		:options="options"
		multiple
		tags
		:search-on-new-line="true"
	/>
</template>
```

### Multi Select with Checkbox List

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxCombobox } from '@luaris/ui';

	const selected = ref<string[]>([]);
	const options = [
		{ label: 'Email alerts', value: 'email' },
		{ label: 'Push notifications', value: 'push' },
		{ label: 'SMS alerts', value: 'sms', disabled: true },
	];
</script>

<template>
	<LxCombobox
		v-model="selected"
		:options="options"
		multiple
		:tags="false"
	/>
</template>
```

### Always Visible + Open by Default

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxCombobox } from '@luaris/ui';

	const values = ref<string[]>([]);
	const options = ['Alpha', 'Beta', 'Gamma', 'Delta'];
</script>

<template>
	<LxCombobox
		v-model="values"
		:options="options"
		multiple
		always-visible
		open-by-default
	/>
</template>
```

### Non-filterable Dropdown Behaviour

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxCombobox } from '@luaris/ui';

	const value = ref('');
	const options = ['One', 'Two', 'Three'];
</script>

<template>
	<LxCombobox
		v-model="value"
		:options="options"
		:multiple="false"
		:filterable="false"
	/>
</template>
```

## Style Overrides

```vue
<template>
	<LxCombobox class="project-combobox" v-model="selected" :options="options" multiple />
</template>

<style scoped>
	.project-combobox :deep(.lx-combobox__chip) {
		border-radius: var(--lx-size-radius-sm);
	}

	.project-combobox :deep(.lx-combobox__menu) {
		max-height: 18rem;
	}

	.project-combobox :deep(.lx-combobox__menu li.is-selected .lx-combobox__option-control) {
		background: color-mix(in srgb, var(--lx-colour-accent) 20%, transparent);
	}
</style>
```
