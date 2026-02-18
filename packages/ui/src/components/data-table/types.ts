import type { ComputedRef, Ref, WritableComputedRef } from 'vue';
import type { ILxDateRangeValue } from '../date-range-picker/types';

export type TLxDataTableSortDirection = 'asc' | 'desc';
export type TLxDataTableAlign = 'left' | 'center' | 'right';
export type TLxDataTableVariant = 'default' | 'striped' | 'minimal';
export type TLxDataTableDensity = 'sm' | 'md' | 'lg';
export type TLxDataTableColumnKey<TRow extends object> = Extract<keyof TRow, string>;
export type TLxDataTableColumnFilters<TRow extends object> = Partial<Record<TLxDataTableColumnKey<TRow>, unknown>>;
export type TLxDataTableFilterType = (
	'text'
	| 'number'
	| 'date'
	| 'date-range'
	| 'select'
	| 'combobox'
	| 'dropdown'
	| 'radios'
	| 'switch'
);

export interface ILxDataTableDateRangeFilter {
	from: string,
	to: string,
}

export interface ILxDataTableFilterOption {
	label: string,
	value: string,
}

export interface ILxDataTableColumn<
	TRow extends object,
	TKey extends TLxDataTableColumnKey<TRow> = TLxDataTableColumnKey<TRow>,
> {
	key: TKey,
	heading: string,
	sortable?: boolean,
	filterable?: boolean,
	width?: string,
	align?: TLxDataTableAlign,
	format?: (value: TRow[TKey], row: TRow) => string | number,
	sortValue?: (row: TRow) => string | number | Date | null | undefined,
	filterValue?: (row: TRow) => string,
	filterType?: TLxDataTableFilterType,
	filterPlaceholder?: string,
	filterOptions?: ILxDataTableFilterOption[],
	filterPredicate?: (row: TRow, filterValue: unknown, column: ILxDataTableColumn<TRow, TKey>) => boolean,
}

export type TLxDataTableFilterFn<TRow extends object> = (
	row: TRow,
	activeFilters: TLxDataTableColumnFilters<TRow>,
	columns: readonly ILxDataTableColumn<TRow>[],
) => boolean;

export type TLxDataTableSortFn<TRow extends object> = (
	left: TRow,
	right: TRow,
	context: {
		column: ILxDataTableColumn<TRow>,
		direction: TLxDataTableSortDirection,
	},
) => number;

export interface ILxDataTableProps<TRow extends object> {
	rows: TRow[],
	columns: ILxDataTableColumn<TRow>[],
	itemsPerPage?: number,
	sortable?: boolean,
	filterable?: boolean,
	initialSortKey?: TLxDataTableColumnKey<TRow> | '',
	initialSortDirection?: TLxDataTableSortDirection,
	variant?: TLxDataTableVariant,
	density?: TLxDataTableDensity,
	emptyText?: string,
	filterFn?: TLxDataTableFilterFn<TRow>,
	sortFn?: TLxDataTableSortFn<TRow>,
}

export interface ILxDataTableFiltersComposable<TRow extends object> {
	clearColumnFilter: (column: ILxDataTableColumn<TRow>) => void,
	clearFilters: () => void,
	columnFilters: Ref<TLxDataTableColumnFilters<TRow>>,
	filteredRows: ComputedRef<TRow[]>,
	getColumnFilterModel: (column: ILxDataTableColumn<TRow>) => WritableComputedRef<unknown>,
	getColumnFilterPlaceholder: (column: ILxDataTableColumn<TRow>) => string,
	getColumnFilterType: (column: ILxDataTableColumn<TRow>) => TLxDataTableFilterType,
	getDateRangePickerModel: (column: ILxDataTableColumn<TRow>) => WritableComputedRef<ILxDateRangeValue>,
	getDropdownFilterOptions: (column: ILxDataTableColumn<TRow>) => ILxDataTableFilterOption[],
	getDropdownLabel: (column: ILxDataTableColumn<TRow>) => string,
	getFilterOptionsWithAll: (column: ILxDataTableColumn<TRow>) => ILxDataTableFilterOption[],
	getNumberFilterTextModel: (column: ILxDataTableColumn<TRow>) => WritableComputedRef<string>,
	getSelectFilterModel: (column: ILxDataTableColumn<TRow>) => WritableComputedRef<string>,
	getSelectFilterOptions: (column: ILxDataTableColumn<TRow>) => ILxDataTableFilterOption[],
	getSwitchFilterModel: (column: ILxDataTableColumn<TRow>) => WritableComputedRef<boolean>,
	getTextFilterModel: (column: ILxDataTableColumn<TRow>) => WritableComputedRef<string>,
	hasActiveFilters: ComputedRef<boolean>,
	isColumnFilterable: (column: ILxDataTableColumn<TRow>) => boolean,
	isSelectLikeFilter: (column: ILxDataTableColumn<TRow>) => boolean,
	onDropdownFilterSelect: (column: ILxDataTableColumn<TRow>, value: string | number) => void,
	showColumnFilters: ComputedRef<boolean>,
}

export interface ILxDataTableSortingComposable<TRow extends object> {
	isColumnSortable: (column: ILxDataTableColumn<TRow>) => boolean,
	sortDirection: Ref<TLxDataTableSortDirection>,
	sortKey: Ref<TLxDataTableColumnKey<TRow> | ''>,
	sortedRows: ComputedRef<TRow[]>,
	toggleSort: (column: ILxDataTableColumn<TRow>) => void,
}
