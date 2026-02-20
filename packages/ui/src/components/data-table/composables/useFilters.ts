import { computed, ref } from 'vue';
import type { ComputedRef, Ref, WritableComputedRef } from 'vue';
import type { ILxDateRangeValue } from '../../date-range-picker/types';
import type {
	ILxDataTableColumn,
	ILxDataTableDateRangeFilter,
	ILxDataTableFiltersComposable,
	ILxDataTableFilterOption,
	ILxDataTableProps,
	TLxDataTableColumnFilters,
	TLxDataTableFilterType,
} from '../types';

export const useFilters = <TRow extends object>(props: ILxDataTableProps<TRow>): ILxDataTableFiltersComposable<TRow> => {
	const columnFilters = ref({}) as Ref<TLxDataTableColumnFilters<TRow>>;
	const normalise = (value: unknown): string => String(value ?? '').toLowerCase();
	const isDateString = (value: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(value);

	const getSampleValue = (column: ILxDataTableColumn<TRow>): unknown => {
		for (const row of props.rows) {
			const value = row[column.key];
			if (value !== null && value !== undefined && value !== '') {
				return value;
			}
		}

		return undefined;
	};

	const getColumnFilterType = (column: ILxDataTableColumn<TRow>): TLxDataTableFilterType => {
		if (column.filterType) {
			return column.filterType;
		}

		const sampleValue = getSampleValue(column);
		if (typeof sampleValue === 'number') {
			return 'number';
		}

		if (typeof sampleValue === 'boolean') {
			return 'switch';
		}

		if (sampleValue instanceof Date) {
			return 'date';
		}

		if (typeof sampleValue === 'string' && isDateString(sampleValue)) {
			return 'date';
		}

		return 'text';
	};

	const isSelectLikeFilter = (column: ILxDataTableColumn<TRow>): boolean => {
		const filterType = getColumnFilterType(column);
		return filterType === 'select';
	};

	const getDefaultFilterValue = (filterType: TLxDataTableFilterType): unknown => {
		if (filterType === 'date-range') {
			return {
				from: null,
				to: null,
			} satisfies ILxDataTableDateRangeFilter;
		}

		if (filterType === 'date') {
			return null;
		}

		if (filterType === 'switch') {
			return '';
		}

		return '';
	};

	const getColumnFilterValue = (column: ILxDataTableColumn<TRow>): unknown => {
		const current = columnFilters.value[column.key];
		if (current !== undefined) {
			return current;
		}

		return getDefaultFilterValue(getColumnFilterType(column));
	};

	const setColumnFilterValue = (column: ILxDataTableColumn<TRow>, value: unknown): void => {
		columnFilters.value = {
			...columnFilters.value,
			[column.key]: value,
		};
	};

	const clearColumnFilter = (column: ILxDataTableColumn<TRow>): void => {
		setColumnFilterValue(column, getDefaultFilterValue(getColumnFilterType(column)));
	};

	const isColumnFilterable = (column: ILxDataTableColumn<TRow>): boolean => {
		if (!props.filterable) {
			return false;
		}

		return column.filterable !== false;
	};

	const getFilterOptions = (column: ILxDataTableColumn<TRow>): ILxDataTableFilterOption[] => {
		if (column.filterOptions && column.filterOptions.length > 0) {
			return column.filterOptions;
		}

		const values = new Set<string>();
		for (const row of props.rows) {
			const value = column.filterValue ? column.filterValue(row) : row[column.key];
			if (value === null || value === undefined || value === '') {
				continue;
			}

			values.add(String(value));
		}

		return Array.from(values)
			.sort((left, right) => left.localeCompare(right))
			.map(value => ({
				label: value,
				value,
			}));
	};

	const getFilterOptionsWithAll = (column: ILxDataTableColumn<TRow>): ILxDataTableFilterOption[] => {
		const options = getFilterOptions(column);
		const hasAllOption = options.some(option => option.value === '');
		if (hasAllOption) {
			return options;
		}

		return [
			{
				label: 'All',
				value: '',
			},
			...options,
		];
	};

	const isFilterEmpty = (column: ILxDataTableColumn<TRow>, value: unknown): boolean => {
		const filterType = getColumnFilterType(column);
		if (filterType === 'date-range') {
			const rangeValue = value as ILxDataTableDateRangeFilter;
			return !rangeValue?.from && !rangeValue?.to;
		}

		if (filterType === 'date') {
			return !(value instanceof Date) || Number.isNaN(value.getTime());
		}

		if (filterType === 'switch') {
			return value !== true;
		}

		return String(value ?? '').trim().length === 0;
	};

	const getColumnFilterModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<unknown> => {
		return computed({
			get: () => getColumnFilterValue(column),
			set: value => {
				setColumnFilterValue(column, value);
			},
		});
	};

	const getTextFilterModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<string> => {
		return computed({
			get: () => String(getColumnFilterValue(column) ?? ''),
			set: value => {
				setColumnFilterValue(column, value);
			},
		});
	};

	const getDateFilterModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<Date | null> => {
		return computed({
			get: () => {
				const value = getColumnFilterValue(column);
				if (value instanceof Date && !Number.isNaN(value.getTime())) {
					return value;
				}

				return null;
			},
			set: value => {
				setColumnFilterValue(column, value);
			},
		});
	};

	const getNumberFilterModel = (column: ILxDataTableColumn<TRow>): ComputedRef<number | ''> => {
		return computed(() => {
			const value = getColumnFilterValue(column);
			if (typeof value === 'number') {
				return value;
			}

			if (typeof value === 'string' && value.trim().length > 0) {
				const parsed = Number(value);
				return Number.isNaN(parsed) ? '' : parsed;
			}

			return '';
		});
	};

	const getNumberFilterTextModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<string> => {
		return computed({
			get: () => {
				const numberValue = getNumberFilterModel(column).value;
				return numberValue === '' ? '' : String(numberValue);
			},
			set: value => {
				if (value.trim().length === 0) {
					setColumnFilterValue(column, '');
					return;
				}

				const parsedValue = Number(value);
				setColumnFilterValue(column, Number.isNaN(parsedValue) ? '' : parsedValue);
			},
		});
	};

	const getSelectFilterModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<string> => {
		return computed({
			get: () => String(getColumnFilterValue(column) ?? ''),
			set: value => {
				setColumnFilterValue(column, value);
			},
		});
	};

	const getSwitchFilterModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<boolean> => {
		return computed({
			get: () => getColumnFilterValue(column) === true,
			set: checked => {
				setColumnFilterValue(column, checked ? true : '');
			},
		});
	};

	const getDateRangeFilterModel = (column: ILxDataTableColumn<TRow>): ComputedRef<ILxDataTableDateRangeFilter> => {
		return computed(() => {
			const value = getColumnFilterValue(column);
			if (typeof value === 'object' && value !== null && 'from' in value && 'to' in value) {
				return value as ILxDataTableDateRangeFilter;
			}

			return {
				from: null,
				to: null,
			};
		});
	};

	const getDateRangePickerModel = (column: ILxDataTableColumn<TRow>): WritableComputedRef<ILxDateRangeValue> => {
		return computed({
			get: () => {
				const range = getDateRangeFilterModel(column).value;
				const nextRange: Date[] = [];
				if (range.from instanceof Date && !Number.isNaN(range.from.getTime())) {
					nextRange[0] = range.from;
				}
				if (range.to instanceof Date && !Number.isNaN(range.to.getTime())) {
					nextRange[1] = range.to;
				}
				return nextRange;
			},
			set: value => {
				setColumnFilterValue(column, {
					from: value[0] ?? null,
					to: value[1] ?? null,
				} satisfies ILxDataTableDateRangeFilter);
			},
		});
	};

	const getSelectFilterOptions = (column: ILxDataTableColumn<TRow>): ILxDataTableFilterOption[] => {
		return getFilterOptionsWithAll(column);
	};

	const getDropdownFilterOptions = (column: ILxDataTableColumn<TRow>): ILxDataTableFilterOption[] => {
		return getFilterOptionsWithAll(column);
	};

	const getColumnFilterPlaceholder = (column: ILxDataTableColumn<TRow>): string => {
		const filterType = getColumnFilterType(column);
		if (filterType === 'select' || filterType === 'combobox' || filterType === 'dropdown' || filterType === 'radios') {
			return 'All';
		}

		if (column.filterPlaceholder && column.filterPlaceholder.trim().length > 0) {
			return column.filterPlaceholder;
		}

		return `Filter ${column.heading}`;
	};

	const getDropdownLabel = (column: ILxDataTableColumn<TRow>): string => {
		const currentValue = String(getColumnFilterValue(column) ?? '');
		if (currentValue.length === 0) {
			return getColumnFilterPlaceholder(column);
		}

		const matched = getFilterOptionsWithAll(column).find(option => option.value === currentValue);
		return matched?.label || currentValue;
	};

	const onDropdownFilterSelect = (column: ILxDataTableColumn<TRow>, value: string | number): void => {
		setColumnFilterValue(column, String(value));
	};

	const showColumnFilters = computed(() => props.columns.some(column => isColumnFilterable(column)));

	const hasActiveFilters = computed(() => {
		return props.columns.some(column => {
			if (!isColumnFilterable(column)) {
				return false;
			}

			return !isFilterEmpty(column, getColumnFilterValue(column));
		});
	});

	const clearFilters = (): void => {
		const nextFilters: TLxDataTableColumnFilters<TRow> = {};
		for (const column of props.columns) {
			if (!isColumnFilterable(column)) {
				continue;
			}

			nextFilters[column.key] = getDefaultFilterValue(getColumnFilterType(column));
		}
		columnFilters.value = nextFilters;
	};

	const filteredRows = computed(() => {
		const filterableColumns = props.columns.filter(column => isColumnFilterable(column));

		return props.rows.filter(row => {
			if (props.filterFn) {
				if (!(props.filterFn(row, columnFilters.value, props.columns) ?? true)) {
					return false;
				}
			}

			for (const column of filterableColumns) {
				const filterValue = getColumnFilterValue(column);
				if (isFilterEmpty(column, filterValue)) {
					continue;
				}

				if (column.filterPredicate) {
					if (!column.filterPredicate(row, filterValue, column)) {
						return false;
					}
					continue;
				}

				const filterType = getColumnFilterType(column);
				const rowValue = row[column.key];

				if (filterType === 'number') {
					const numericFilter = Number(filterValue);
					if (Number.isNaN(numericFilter)) {
						continue;
					}

					const numericValue = Number(rowValue);
					if (Number.isNaN(numericValue) || numericValue !== numericFilter) {
						return false;
					}
					continue;
				}

				if (filterType === 'date-range') {
					const dateRangeFilter = filterValue as ILxDataTableDateRangeFilter;
					const dateValue = rowValue instanceof Date ? rowValue : new Date(String(rowValue ?? ''));
					if (Number.isNaN(dateValue.getTime())) {
						return false;
					}

					if (dateRangeFilter.from instanceof Date && !Number.isNaN(dateRangeFilter.from.getTime())) {
						const fromDate = new Date(
							dateRangeFilter.from.getFullYear(),
							dateRangeFilter.from.getMonth(),
							dateRangeFilter.from.getDate(),
							0,
							0,
							0,
							0,
						);
						if (dateValue.getTime() < fromDate.getTime()) {
							return false;
						}
					}

					if (dateRangeFilter.to instanceof Date && !Number.isNaN(dateRangeFilter.to.getTime())) {
						const toDate = new Date(
							dateRangeFilter.to.getFullYear(),
							dateRangeFilter.to.getMonth(),
							dateRangeFilter.to.getDate(),
							23,
							59,
							59,
							999,
						);
						if (dateValue.getTime() > toDate.getTime()) {
							return false;
						}
					}
					continue;
				}

				if (filterType === 'date') {
					const dateFilter = filterValue as Date;

					const rowDate = rowValue instanceof Date
						? rowValue
						: new Date(String(rowValue ?? ''));
					if (Number.isNaN(rowDate.getTime())) {
						return false;
					}

					const sameDay = (
						rowDate.getFullYear() === dateFilter.getFullYear()
						&& rowDate.getMonth() === dateFilter.getMonth()
						&& rowDate.getDate() === dateFilter.getDate()
					);
					if (!sameDay) {
						return false;
					}
					continue;
				}

				if (filterType === 'switch') {
					if (filterValue === true && rowValue !== true) {
						return false;
					}
					continue;
				}

				if (filterType === 'select' || filterType === 'combobox' || filterType === 'dropdown' || filterType === 'radios') {
					const filterText = normalise(filterValue);
					const valueText = column.filterValue ? normalise(column.filterValue(row)) : normalise(rowValue);
					if (valueText !== filterText) {
						return false;
					}
					continue;
				}

				const filterText = normalise(filterValue);
				const valueText = column.filterValue ? normalise(column.filterValue(row)) : normalise(rowValue);
				if (!valueText.includes(filterText)) {
					return false;
				}
			}

			return true;
		});
	});

	return {
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
	};
};
