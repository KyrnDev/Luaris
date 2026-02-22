<template>
	<div class="lx-virtual-table" :style="{ height: `${props.height}px` }" @scroll="onScroll">
		<table>
			<colgroup>
				<col
					v-for="column in props.columns"
					:key="`col-${column.key}`"
					:style="{ width: column.width || undefined }"
				>
			</colgroup>
			<thead>
				<tr>
					<th
						v-for="column in props.columns"
						:key="column.key"
						:class="`is-${column.align || 'left'}`"
						scope="col"
					>
						{{ column.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="/* c8 ignore next */ topSpacerHeight > 0" aria-hidden="true" class="lx-virtual-table__spacer-row">
					<td :colspan="props.columns.length || 1" :style="{ height: `${topSpacerHeight}px` }" />
				</tr>
				<tr
					v-for="(row, rowOffset) in visibleRows"
					:key="resolveRowKey(row, startIndex + rowOffset)"
					class="lx-virtual-table__row"
					:style="{ height: `${props.rowHeight}px` }"
				>
					<td
						v-for="column in props.columns"
						:key="`${resolveRowKey(row, startIndex + rowOffset)}-${column.key}`"
						:class="`is-${column.align || 'left'}`"
					>
						<slot
							:name="`cell-${column.key}`"
							:row="row"
							:value="row[column.key]"
							:index="startIndex + rowOffset"
						>
							{{ row[column.key] }}
						</slot>
					</td>
				</tr>
				<tr v-if="/* c8 ignore next */ bottomSpacerHeight > 0" aria-hidden="true" class="lx-virtual-table__spacer-row">
					<td :colspan="props.columns.length || 1" :style="{ height: `${bottomSpacerHeight}px` }" />
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang='ts' generic='TRow extends Record<string, unknown>'>
	import { computed, ref } from 'vue';
	import type { ILxVirtualTableProps } from './types';

	const props = withDefaults(defineProps<ILxVirtualTableProps<TRow>>(), {
		columns: () => [],
		rows: () => [] as TRow[],
		height: 320,
		rowHeight: 42,
		overscan: 6,
		rowKey: 'id',
	});

	const scrollTop = ref(0);
	const viewportRows = computed(() => Math.ceil(props.height / props.rowHeight));
	const startIndex = computed(() => Math.max(Math.floor(scrollTop.value / props.rowHeight) - props.overscan, 0));
	const endIndex = computed(() => Math.min(startIndex.value + viewportRows.value + (props.overscan * 2), props.rows.length));
	const visibleRows = computed(() => props.rows.slice(startIndex.value, endIndex.value));
	const topSpacerHeight = computed(() => startIndex.value * props.rowHeight);
	const bottomSpacerHeight = computed(() => Math.max((props.rows.length - endIndex.value) * props.rowHeight, 0));

	const resolveRowKey = (row: TRow, index: number): string => {
		const keyValue = row[props.rowKey];
		return typeof keyValue === 'string' || typeof keyValue === 'number' ? String(keyValue) : `${index}`;
	};

	const onScroll = (event: Event): void => {
		const target = event.target as HTMLDivElement;
		scrollTop.value = target.scrollTop;
	};
</script>

<style scoped lang='scss'>
	.lx-virtual-table {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		overflow: auto;
	}

	.lx-virtual-table table {
		border-collapse: collapse;
		width: 100%;
	}

	.lx-virtual-table thead th {
		background: var(--lx-colour-surface-base);
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.lx-virtual-table tbody td {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		color: var(--lx-colour-surface-text);
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
	}

	.lx-virtual-table tbody tr:nth-child(even):not(.lx-virtual-table__spacer-row) {
		background: color-mix(in srgb, var(--lx-colour-surface-base) 50%, transparent);
	}

	.lx-virtual-table__spacer-row td {
		border-bottom: none;
		padding: 0;
	}

	.lx-virtual-table .is-right {
		text-align: right;
	}

	.lx-virtual-table .is-center {
		text-align: center;
	}
	.lx-virtual-table .is-left {
		text-align: left;
	}
</style>
