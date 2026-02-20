<template>
	<section class="lx-data-table" :class="[`lx-data-table--${props.variant}`, `lx-data-table--${props.density}`]">
		<div class="lx-data-table__surface">
			<table>
				<thead>
					<tr>
						<th
							v-for="column in props.columns"
							:key="column.key"
							:class="[`is-${column.align || 'left'}`]"
							:style="{ width: column.width || undefined }"
						>
							<button
								v-if="isColumnSortable(column)"
								type="button"
								class="lx-data-table__sort-button"
								@click="toggleSort(column)"
							>
								<span>{{ column.heading }}</span>
								<span class="lx-data-table__sort-icon" :class="{ 'is-active': sortKey === column.key }">
									{{ sortKey === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕' }}
								</span>
							</button>
							<span v-else>{{ column.heading }}</span>
						</th>
					</tr>
					<tr v-if="showColumnFilters" class="lx-data-table__filters-row">
						<th
							v-for="column in props.columns"
							:key="`filter-${String(column.key)}`"
							:class="[`is-${column.align || 'left'}`]"
						>
							<template v-if="isColumnFilterable(column)">
								<slot
									:name="`filter-${String(column.key)}`"
									:column="column"
									:column-key="column.key"
									:filter-model="getColumnFilterModel(column)"
									:filter-type="getColumnFilterType(column)"
									:filter-options="getFilterOptionsWithAll(column)"
									:clear="() => clearColumnFilter(column)"
								>
									<div v-if="getColumnFilterType(column) === 'date-range'" class="lx-data-table__range-filter">
										<LxDateRangePicker
											v-model="getDateRangePickerModel(column).value"
										/>
									</div>
									<div v-else-if="getColumnFilterType(column) === 'dropdown'" class="lx-data-table__dropdown-filter">
										<LxDropdown
											:label="getDropdownLabel(column)"
											:options="getDropdownFilterOptions(column)"
											@select="onDropdownFilterSelect(column, $event)"
										/>
									</div>
									<LxRadios
										v-else-if="getColumnFilterType(column) === 'radios'"
										v-model="getSelectFilterModel(column).value"
										:options="getFilterOptionsWithAll(column)"
										layout="inline"
										space="var(--lx-size-space-xs)"
									/>
									<LxCombobox
										v-else-if="getColumnFilterType(column) === 'combobox'"
										v-model="getSelectFilterModel(column).value"
										:options="getFilterOptionsWithAll(column)"
										:placeholder="getColumnFilterPlaceholder(column)"
										:multiple="false"
										:tags="false"
										:search-on-new-line="false"
									/>
									<LxSelect
										v-else-if="isSelectLikeFilter(column)"
										v-model="getSelectFilterModel(column).value"
										size="sm"
										:options="getSelectFilterOptions(column)"
										:aria-label="`Filter ${column.heading}`"
									/>
									<div v-else-if="getColumnFilterType(column) === 'switch'" class="lx-data-table__switch-filter">
										<LxSwitch
											v-model="getSwitchFilterModel(column).value"
											:aria-label="`Filter ${column.heading} on only`"
										/>
										<span>On only</span>
									</div>
									<LxInput
										v-else-if="getColumnFilterType(column) === 'number'"
										v-model="getNumberFilterTextModel(column).value"
										type="number"
										size="sm"
										:placeholder="getColumnFilterPlaceholder(column)"
										:aria-label="`Filter ${column.heading}`"
									/>
									<LxDatePicker
										v-else-if="getColumnFilterType(column) === 'date'"
										v-model="getDateFilterModel(column).value"
										:aria-label="`Filter ${column.heading}`"
									/>
									<LxInput
										v-else
										v-model.trim="getTextFilterModel(column).value"
										type="search"
										size="sm"
										:placeholder="getColumnFilterPlaceholder(column)"
										:aria-label="`Filter ${column.heading}`"
									/>
								</slot>
							</template>
							<template v-else />
						</th>
					</tr>
					<template v-else />
				</thead>
				<tbody v-if="paginatedRows.length > 0">
					<tr v-for="(row, rowIndex) in paginatedRows" :key="getRowKey(row, rowIndex)">
						<td
							v-for="(column, columnIndex) in props.columns"
							:key="`${String(column.key)}-${columnIndex}`"
							:class="[`is-${column.align || 'left'}`]"
						>
							<slot
								:name="`col-${String(column.key)}`"
								:row="row"
								:value="getRawValue(row, column)"
								:column="column"
								:column-key="column.key"
								:row-index="((currentPage - 1) * resolvedItemsPerPage) + rowIndex"
								:column-index="columnIndex"
							>
								{{ getDisplayValue(row, column) }}
							</slot>
						</td>
					</tr>
				</tbody>
				<template v-else />
			</table>

			<div v-if="paginatedRows.length === 0" class="lx-data-table__empty">
				<slot name="empty">
					{{ props.emptyText }}
				</slot>
			</div>
			<template v-else />
		</div>

		<footer class="lx-data-table__pagination">
			<p class="lx-data-table__meta">
				Page {{ currentPage }} / {{ totalPages }} · {{ sortedRows.length }} total
			</p>
			<div class="lx-data-table__pagination-actions">
				<LxButton
					variant="plain"
					size="xs"
					:disabled="!hasActiveFilters"
					@click="clearFilters"
				>
					Clear Filters
				</LxButton>
				<LxButton
					variant="plain"
					size="xs"
					:disabled="currentPage <= 1"
					@click="currentPage -= 1"
				>
					Previous
				</LxButton>
				<LxButton
					variant="plain"
					size="xs"
					:disabled="currentPage >= totalPages"
					@click="currentPage += 1"
				>
					Next
				</LxButton>
			</div>
		</footer>
	</section>
</template>

<script setup lang="ts" generic="TRow extends object">
	import { computed, ref, watch } from 'vue';
	import { LxButton } from '../button';
	import { LxCombobox } from '../combobox';
	import { LxDatePicker } from '../date-picker';
	import { LxDateRangePicker } from '../date-range-picker';
	import { LxDropdown } from '../dropdown';
	import { LxInput } from '../input';
	import { LxRadios } from '../radios';
	import { LxSelect } from '../select';
	import { LxSwitch } from '../switch';
	import { useFilters } from './composables/useFilters';
	import { useSorting } from './composables/useSorting';
	import type { ILxDataTableColumn, ILxDataTableProps, TLxDataTableColumnKey } from './types';

	const props = withDefaults(defineProps<ILxDataTableProps<TRow>>(), {
		itemsPerPage: 25,
		sortable: true,
		filterable: true,
		initialSortKey: '',
		initialSortDirection: 'asc',
		variant: 'default',
		density: 'md',
		emptyText: 'No rows found.',
		filterFn: undefined,
		sortFn: undefined,
	});

	const {
		clearColumnFilter,
		clearFilters,
		columnFilters,
		filteredRows,
		getColumnFilterModel,
		getColumnFilterPlaceholder,
		getColumnFilterType,
		getDateFilterModel,
		getDateRangePickerModel,
		getDropdownFilterOptions,
		getDropdownLabel,
		getFilterOptionsWithAll,
		getNumberFilterTextModel,
		getSelectFilterModel,
		getSelectFilterOptions,
		getSwitchFilterModel,
		getTextFilterModel,
		hasActiveFilters,
		isColumnFilterable,
		isSelectLikeFilter,
		onDropdownFilterSelect,
		showColumnFilters,
	} = useFilters(props);

	const {
		isColumnSortable,
		sortDirection,
		sortKey,
		sortedRows,
		toggleSort,
	} = useSorting(props, filteredRows);

	const currentPage = ref(1);
	const resolvedItemsPerPage = computed(() => Math.max(1, props.itemsPerPage));

	const getRawValue = <TKey extends TLxDataTableColumnKey<TRow>>(row: TRow, column: ILxDataTableColumn<TRow, TKey>): TRow[TKey] => {
		return row[column.key];
	};

	const getDisplayValue = <TKey extends TLxDataTableColumnKey<TRow>>(row: TRow, column: ILxDataTableColumn<TRow, TKey>): string | number => {
		const raw = getRawValue(row, column);
		if (column.format) {
			return column.format(raw, row);
		}

		return typeof raw === 'number' || typeof raw === 'string' ? raw : String(raw ?? '');
	};

	const totalPages = computed(() => {
		return Math.max(1, Math.ceil(sortedRows.value.length / resolvedItemsPerPage.value));
	});

	const paginatedRows = computed(() => {
		const start = (currentPage.value - 1) * resolvedItemsPerPage.value;
		return sortedRows.value.slice(start, start + resolvedItemsPerPage.value);
	});

	const getRowKey = (row: TRow, rowIndex: number): string => {
		const idValue = (row as { id?: unknown }).id;
		if (typeof idValue === 'string' || typeof idValue === 'number') {
			return String(idValue);
		}

		return `${rowIndex}`;
	};

	watch([sortKey, sortDirection], () => {
		currentPage.value = 1;
	});

	watch(columnFilters, () => {
		currentPage.value = 1;
	}, { deep: true });

	watch(totalPages, nextPageCount => {
		if (currentPage.value > nextPageCount) {
			currentPage.value = nextPageCount;
		}
	});
</script>

<style scoped lang="scss">
	.lx-data-table {
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-data-table__pagination {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
		justify-content: space-between;
	}

	.lx-data-table__meta {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		margin: 0;
		white-space: nowrap;
	}

	.lx-data-table__surface {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		overflow: auto;
	}

	.lx-data-table table {
		border-collapse: collapse;
		min-width: 100%;
		width: 100%;
	}

	.lx-data-table th,
	.lx-data-table td {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
		text-align: left;
		vertical-align: middle;
	}

	.lx-data-table tr:last-child td {
		border-bottom: none;
	}

	.lx-data-table th {
		background: color-mix(in srgb, var(--lx-colour-surface-sunken) 60%, var(--lx-colour-surface-raised));
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-data-table__filters-row th {
		background: var(--lx-colour-surface-raised);
		padding-bottom: var(--lx-size-space-xs);
		padding-top: var(--lx-size-space-xs);
	}

	.lx-data-table__filters-row :deep(.lx-input),
	.lx-data-table__filters-row :deep(.lx-select),
	.lx-data-table__filters-row :deep(.lx-combobox),
	.lx-data-table__filters-row :deep(.lx-date-picker),
	.lx-data-table__filters-row :deep(.lx-date-range-picker) {
		width: 100%;
	}

	.lx-data-table__filters-row :deep(.lx-combobox__control) {
		min-height: var(--lx-size-control-height-sm);
	}

	.lx-data-table__filters-row :deep(.lx-date-picker input),
	.lx-data-table__filters-row :deep(.lx-date-range-picker input) {
		font-size: var(--lx-font-size-xs);
		min-height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-xs);
	}

	.lx-data-table__filters-row :deep(.lx-date-range-picker__row) {
		gap: var(--lx-size-space-2xs);
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.lx-data-table td {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
	}

	.lx-data-table th.is-center,
	.lx-data-table td.is-center {
		text-align: center;
	}

	.lx-data-table th.is-right,
	.lx-data-table td.is-right {
		text-align: right;
	}

	.lx-data-table__sort-button {
		align-items: center;
		appearance: none;
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
		display: inline-flex;
		font: inherit;
		gap: var(--lx-size-space-2xs);
		padding: 0;
	}

	.lx-data-table__sort-icon {
		opacity: 0.5;
	}

	.lx-data-table__sort-icon.is-active {
		opacity: 1;
	}

	.lx-data-table__filter-input {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		font: inherit;
		font-size: var(--lx-font-size-xs);
		height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-xs);
		width: 100%;
	}

	.lx-data-table__filter-input:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 1px;
	}

	.lx-data-table__range-filter {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-data-table__switch-filter {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-data-table__dropdown-filter :deep(.lx-dropdown__trigger) {
		font-size: var(--lx-font-size-xs);
		height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-xs);
	}

	.lx-data-table__dropdown-filter :deep(.lx-dropdown__menu) {
		min-width: 10rem;
	}

	.lx-data-table__filters-row :deep(.lx-radios) {
		gap: var(--lx-size-space-xs);
	}

	.lx-data-table__filters-row :deep(.lx-radios .lx-radio) {
		font-size: var(--lx-font-size-xs);
	}

	.lx-data-table--striped tbody tr:nth-child(even) td {
		background: color-mix(in srgb, var(--lx-colour-surface-sunken) 35%, transparent);
	}

	.lx-data-table--minimal .lx-data-table__surface {
		background: transparent;
		border: none;
		border-radius: 0;
	}

	.lx-data-table--minimal th,
	.lx-data-table--minimal td {
		padding-left: var(--lx-size-space-sm);
		padding-right: var(--lx-size-space-sm);
	}

	.lx-data-table--sm th,
	.lx-data-table--sm td {
		padding-bottom: var(--lx-size-space-xs);
		padding-top: var(--lx-size-space-xs);
	}

	.lx-data-table--lg th,
	.lx-data-table--lg td {
		padding-bottom: var(--lx-size-space-md);
		padding-top: var(--lx-size-space-md);
	}

	.lx-data-table__empty {
		color: var(--lx-colour-surface-text-muted);
		padding: var(--lx-size-space-lg);
		text-align: center;
	}

	.lx-data-table__pagination-actions {
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}
</style>
