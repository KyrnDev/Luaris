<template>
	<div class="lx-table" :class="tableClasses">
		<table>
			<caption v-if="props.caption">
				{{ props.caption }}
			</caption>
			<thead>
				<tr>
					<th
						v-for="column in props.columns"
						:key="column.key"
						:style="{ width: column.width }"
						:class="`is-${column.align || 'left'}`"
						scope="col"
					>
						<slot :name="`header-${column.key}`" :column="column">
							{{ column.label }}
						</slot>
					</th>
				</tr>
			</thead>
			<tbody v-if="props.rows.length > 0">
				<tr
					v-for="(row, index) in props.rows"
					:key="resolveRowKey(row, index)"
					@click="emit('rowClick', row, index)"
				>
					<td
						v-for="column in props.columns"
						:key="column.key"
						:class="`is-${column.align || 'left'}`"
					>
						<slot
							:name="`cell-${column.key}`"
							:row="row"
							:value="row[column.key]"
							:column="column"
							:index="index"
						>
							{{ row[column.key] }}
						</slot>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<td :colspan="props.columns.length || 1" class="lx-table__empty">
						<slot name="empty">
							No data available.
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang='ts'>
	import { computed } from 'vue';
	import type { ILxTableProps, ILxTableRow } from './types';

	const props = withDefaults(defineProps<ILxTableProps>(), {
		columns: () => [],
		rows: () => [],
		caption: '',
		striped: false,
		hoverable: true,
		dense: false,
		rowKey: 'id',
	});

	const emit = defineEmits<{
		(event: 'rowClick', row: ILxTableRow, index: number): void,
	}>();

	const resolveRowKey = (row: ILxTableRow, index: number): string => {
		const value = row[props.rowKey];
		return typeof value === 'string' || typeof value === 'number' ? String(value) : `${index}`;
	};

	const tableClasses = computed(() => ({
		'is-striped': props.striped,
		'is-hoverable': props.hoverable,
		'is-dense': props.dense,
	}));
</script>

<style scoped lang='scss'>
	.lx-table {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		overflow: hidden;
		width: 100%;
	}

	.lx-table table {
		border-collapse: collapse;
		width: 100%;
	}

	.lx-table caption {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		padding: var(--lx-size-space-sm);
		text-align: left;
	}

	.lx-table th,
	.lx-table td {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
	}

	.lx-table th {
		background: var(--lx-colour-surface-base);
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-table td {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
	}

	.lx-table tbody tr:last-child td {
		border-bottom: none;
	}

	.lx-table.is-striped tbody tr:nth-child(even) {
		background: color-mix(in srgb, var(--lx-colour-surface-base) 70%, transparent);
	}

	.lx-table.is-hoverable tbody tr:hover {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-table.is-dense th,
	.lx-table.is-dense td {
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
	}

	.lx-table .is-left {
		text-align: left;
	}

	.lx-table .is-center {
		text-align: center;
	}

	.lx-table .is-right {
		text-align: right;
	}

	.lx-table__empty {
		color: var(--lx-colour-surface-text-muted);
		padding: var(--lx-size-space-lg);
		text-align: center;
	}
</style>
