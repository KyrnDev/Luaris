# LxDataTable

`LxDataTable` is a typed, token-driven data table with:

- per-column sorting
- per-column filtering (built-in and custom)
- pagination
- dynamic column and filter slots

It is designed for data-driven UIs where you want strong typing for row keys and predictable extension points.

## Import

```ts
import { LxDataTable } from '@luaris/ui';
```

```ts
import { LxDataTable } from '@luaris/ui/components/data-table';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `TRow[]` | required | Data rows. |
| `columns` | `ILxDataTableColumn<TRow>[]` | required | Column definitions (headings, keys, filter/sort config). |
| `itemsPerPage` | `number` | `25` | Rows per page. |
| `sortable` | `boolean` | `true` | Enables sorting globally. |
| `filterable` | `boolean` | `true` | Enables filtering globally. |
| `initialSortKey` | `Extract<keyof TRow, string> \| ''` | `''` | Initial sort column key. |
| `initialSortDirection` | `'asc' \| 'desc'` | `'asc'` | Initial sort direction. |
| `variant` | `'default' \| 'striped' \| 'minimal'` | `'default'` | Visual style variant. |
| `density` | `'sm' \| 'md' \| 'lg'` | `'md'` | Row/header density. |
| `emptyText` | `string` | `'No rows found.'` | Fallback text for empty state. |
| `filterFn` | `TLxDataTableFilterFn<TRow>` | `undefined` | Optional global filter hook (runs before built-in per-column filtering). |
| `sortFn` | `TLxDataTableSortFn<TRow>` | `undefined` | Optional global sort hook. |

### `ILxDataTableColumn<TRow>` fields

| Field | Type | Description |
| --- | --- | --- |
| `key` | `Extract<keyof TRow, string>` | Row key to render/filter/sort. |
| `heading` | `string` | Header label. |
| `sortable` | `boolean \| undefined` | Per-column sort enable/disable. |
| `filterable` | `boolean \| undefined` | Per-column filter enable/disable. |
| `width` | `string \| undefined` | Header/cell width (e.g. `'12rem'`). |
| `align` | `'left' \| 'center' \| 'right' \| undefined` | Cell/header alignment. |
| `format` | `(value, row) => string \| number` | Display formatter for rendered cell value. |
| `sortValue` | `(row) => string \| number \| Date \| null \| undefined` | Custom sort value extractor. |
| `filterValue` | `(row) => string` | Custom filter value extractor. |
| `filterType` | `'text' \| 'number' \| 'date' \| 'date-range' \| 'select' \| 'combobox' \| 'dropdown' \| 'radios' \| 'switch'` | Filter control type override. |
| `filterPlaceholder` | `string \| undefined` | Custom placeholder for text-like filters. Option-style filters always use `All` for no-filter state. |
| `filterOptions` | `ILxDataTableFilterOption[] \| undefined` | Explicit options for option-style filters. |
| `filterPredicate` | `(row, filterValue, column) => boolean` | Custom per-column filter behaviour. |

### `ILxDataTableFilterOption`

| Field | Type |
| --- | --- |
| `label` | `string` |
| `value` | `string` |

## Emits

`LxDataTable` has no custom emits.

State changes are internal (sorting/filtering/pagination UI) unless you provide custom slot controls and bind your own handlers.

## Slots

### Static slots

| Slot | Description |
| --- | --- |
| `empty` | Replaces default empty state text block. |

### Dynamic column cell slots

Slot name format:

- `col-{columnKey}` (example: `col-name`, `col-status`)

Slot props:

- `row`: full row object (`TRow`)
- `value`: raw column value (`row[column.key]`)
- `column`: full column config
- `column-key`: key string
- `row-index`: absolute row index (across pages)
- `column-index`: column index

### Dynamic filter slots

Slot name format:

- `filter-{columnKey}` (example: `filter-status`, `filter-createdAt`)

Slot props:

- `column`: full column config
- `column-key`: key string
- `filter-model`: writable computed model for this filter value
- `filter-type`: resolved filter type for this column
- `filter-options`: resolved options (includes `All` option for option-style filters)
- `clear`: helper function to clear this column’s filter

## Behaviour Notes

- Sort cycle per sortable header:
	1. first click: `asc`
	2. second click: `desc`
	3. third click: reset (unsorted)
- Option-style filters (`select`, `combobox`, `dropdown`, `radios`) include default `All` (`value: ''`) meaning no filter.
- Built-in filter controls are rendered under headings only (no global top filter row).
- Pagination metadata includes current page and total filtered rows.
- `Clear Filters` resets all active column filters to their no-filter defaults.

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-base`
- `--lx-colour-surface-border`
- `--lx-colour-surface-sunken`
- `--lx-colour-surface-text`
- `--lx-colour-surface-text-muted`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-md`
- `--lx-size-radius-xs`
- `--lx-size-space-2xs`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-size-space-md`
- `--lx-size-space-lg`
- `--lx-size-control-height-sm`
- `--lx-font-size-xs`
- `--lx-font-size-sm`
- `--lx-font-weight-semibold`

## Examples

### 1) Typed Basic Table

```vue
<script setup lang='ts'>
	import { ref } from 'vue';
	import { LxDataTable } from '@luaris/ui';
	import type { ILxDataTableColumn } from '@luaris/ui/components/data-table';

	interface IUserRow {
		id: number,
		name: string,
		role: string,
		status: 'active' | 'paused',
		revenue: number,
		joinedAt: string,
	}

	const rows = ref<IUserRow[]>([
		{ id: 1, name: 'Alice', role: 'Engineer', status: 'active', revenue: 12000, joinedAt: '2026-02-10' },
		{ id: 2, name: 'Ben', role: 'Designer', status: 'paused', revenue: 8500, joinedAt: '2026-02-11' },
	]);

	const columns: ILxDataTableColumn<IUserRow>[] = [
		{ key: 'name', heading: 'Name', sortable: true, filterable: true },
		{ key: 'role', heading: 'Role', sortable: true, filterable: true },
		{
			key: 'revenue',
			heading: 'Revenue',
			sortable: true,
			filterable: true,
			filterType: 'number',
			align: 'right',
			format: value => `£${Number(value).toLocaleString('en-GB')}`,
		},
	];
</script>

<template>
	<LxDataTable :rows='rows' :columns='columns' />
</template>
```

### 2) Built-in Filter Types

```vue
<script setup lang='ts'>
	import { LxDataTable } from '@luaris/ui';
	import type { ILxDataTableColumn } from '@luaris/ui/components/data-table';

	interface IRow {
		id: number,
		status: 'active' | 'paused',
		role: string,
		team: string,
		stage: 'new' | 'won',
		billable: boolean,
		lastLogin: string,
		createdAt: string,
	}

	const rows: IRow[] = [
		{ id: 1, status: 'active', role: 'Engineer', team: 'Core', stage: 'won', billable: true, lastLogin: '2026-02-12', createdAt: '2026-02-11' },
		{ id: 2, status: 'paused', role: 'Designer', team: 'Growth', stage: 'new', billable: false, lastLogin: '2026-02-10', createdAt: '2026-02-10' },
	];

	const columns: ILxDataTableColumn<IRow>[] = [
		{
			key: 'status',
			heading: 'Status',
			filterType: 'select',
			filterOptions: [
				{ label: 'Active', value: 'active' },
				{ label: 'Paused', value: 'paused' },
			],
		},
		{
			key: 'role',
			heading: 'Role',
			filterType: 'combobox',
			filterOptions: [
				{ label: 'Engineer', value: 'Engineer' },
				{ label: 'Designer', value: 'Designer' },
			],
		},
		{ key: 'team', heading: 'Team', filterType: 'dropdown' },
		{ key: 'stage', heading: 'Stage', filterType: 'radios' },
		{ key: 'billable', heading: 'Billable', filterType: 'switch' },
		{ key: 'lastLogin', heading: 'Last Login', filterType: 'date' },
		{ key: 'createdAt', heading: 'Created', filterType: 'date-range' },
	];
</script>

<template>
	<LxDataTable :rows='rows' :columns='columns' />
</template>
```

### 3) Dynamic Cell Slot (`col-{key}`)

```vue
<script setup lang='ts'>
	import { LxDataTable, LxBadge } from '@luaris/ui';

	const rows = [
		{ id: 1, name: 'Alice', status: 'active' },
		{ id: 2, name: 'Ben', status: 'paused' },
	];

	const columns = [
		{ key: 'name', heading: 'Name' },
		{ key: 'status', heading: 'Status' },
	];
</script>

<template>
	<LxDataTable :rows='rows' :columns='columns'>
		<template #col-status='{ value }'>
			<LxBadge :text='String(value)' :variant='value === "active" ? "success" : "warning"' />
		</template>
	</LxDataTable>
</template>
```

### 4) Dynamic Filter Slot (`filter-{key}`)

```vue
<script setup lang='ts'>
	import { LxDataTable, LxSelect } from '@luaris/ui';

	const rows = [
		{ id: 1, status: 'active', name: 'Alice' },
		{ id: 2, status: 'paused', name: 'Ben' },
	];

	const columns = [
		{ key: 'status', heading: 'Status', filterable: true },
		{ key: 'name', heading: 'Name' },
	];

	const customFilterOptions = [
		{ label: 'All', value: '' },
		{ label: 'Active only', value: 'active' },
		{ label: 'Paused only', value: 'paused' },
	];
</script>

<template>
	<LxDataTable :rows='rows' :columns='columns'>
		<template #filter-status='{ filterModel }'>
			<LxSelect v-model='filterModel.value' :options='customFilterOptions' size='sm' />
		</template>
	</LxDataTable>
</template>
```

### 5) Custom `filterFn` and `sortFn`

```vue
<script setup lang='ts'>
	import { LxDataTable } from '@luaris/ui';

	const rows = [
		{ id: 1, name: 'Alice', status: 'active', revenue: 12000 },
		{ id: 2, name: 'Ben', status: 'paused', revenue: 9000 },
		{ id: 3, name: 'Cara', status: 'active', revenue: 21000 },
	];

	const columns = [
		{ key: 'name', heading: 'Name', sortable: true },
		{ key: 'revenue', heading: 'Revenue', sortable: true },
	];

	const filterFn = row => row.status === 'active';
	const sortFn = (left, right, context) => {
		if (context.column.key === 'revenue') {
			return left.revenue - right.revenue;
		}

		return String(left[context.column.key]).localeCompare(String(right[context.column.key]));
	};
</script>

<template>
	<LxDataTable
		:rows='rows'
		:columns='columns'
		:filter-fn='filterFn'
		:sort-fn='sortFn'
	/>
</template>
```

### 6) Variants and Density

```vue
<template>
	<LxDataTable :rows='rows' :columns='columns' variant='default' density='md' />
	<LxDataTable :rows='rows' :columns='columns' variant='striped' density='sm' />
	<LxDataTable :rows='rows' :columns='columns' variant='minimal' density='lg' />
</template>
```

## Style Overrides

```vue
<template>
	<LxDataTable class='project-table' :rows='rows' :columns='columns' />
</template>

<style scoped>
	.project-table :deep(.lx-data-table__surface) {
		border-radius: var(--lx-size-radius-md);
	}

	.project-table :deep(.lx-data-table th) {
		letter-spacing: 0.01em;
	}

	.project-table :deep(.lx-data-table__pagination-actions) {
		gap: var(--lx-size-space-sm);
	}
</style>
```
