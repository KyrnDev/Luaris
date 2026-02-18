import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type {
	ILxDataTableColumn,
	ILxDataTableProps,
	ILxDataTableSortingComposable,
	TLxDataTableColumnKey,
	TLxDataTableSortDirection,
} from '../types';

export const useSorting = <TRow extends object>(
	props: ILxDataTableProps<TRow>,
	rows: ComputedRef<TRow[]>,
): ILxDataTableSortingComposable<TRow> => {
	const sortKey = ref<TLxDataTableColumnKey<TRow> | ''>(props.initialSortKey ?? '');
	const sortDirection = ref<TLxDataTableSortDirection>(props.initialSortDirection ?? 'asc');

	const toComparable = (value: unknown): string | number => {
		if (value instanceof Date) {
			return value.getTime();
		}

		if (typeof value === 'number') {
			return value;
		}

		return String(value ?? '').toLowerCase();
	};

	const isColumnSortable = (column: ILxDataTableColumn<TRow>): boolean => {
		if (!props.sortable) {
			return false;
		}

		return column.sortable !== false;
	};

	const toggleSort = (column: ILxDataTableColumn<TRow>): void => {
		if (!isColumnSortable(column)) {
			return;
		}

		if (sortKey.value !== column.key) {
			sortKey.value = column.key;
			sortDirection.value = 'asc';
			return;
		}

		if (sortDirection.value === 'asc') {
			sortDirection.value = 'desc';
			return;
		}

		sortKey.value = '';
		sortDirection.value = 'asc';
	};

	const sortedRows = computed(() => {
		if (sortKey.value === '') {
			return rows.value;
		}

		const sortColumn = props.columns.find(column => column.key === sortKey.value);
		if (!sortColumn) {
			return rows.value;
		}

		const sorted = [...rows.value].sort((left, right) => {
			if (props.sortFn) {
				return props.sortFn(left, right, {
					column: sortColumn,
					direction: sortDirection.value,
				});
			}

			const leftRaw = sortColumn.sortValue ? sortColumn.sortValue(left) : left[sortColumn.key];
			const rightRaw = sortColumn.sortValue ? sortColumn.sortValue(right) : right[sortColumn.key];
			const leftComparable = toComparable(leftRaw);
			const rightComparable = toComparable(rightRaw);

			if (leftComparable > rightComparable) {
				return 1;
			}

			if (leftComparable < rightComparable) {
				return -1;
			}

			return 0;
		});

		return sortDirection.value === 'asc' ? sorted : sorted.reverse();
	});

	return {
		isColumnSortable,
		sortDirection: sortDirection as Ref<TLxDataTableSortDirection>,
		sortKey: sortKey as Ref<TLxDataTableColumnKey<TRow> | ''>,
		sortedRows,
		toggleSort,
	};
};
