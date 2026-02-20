import { computed } from 'vue';
import { describe, expect, it } from 'vitest';
import { useSorting } from '../useSorting';
import type { ILxDataTableColumn, ILxDataTableProps } from '../../types';

interface IRow {
	name: string,
	score: number,
	createdAt: Date,
	notes?: string | null,
}

const rows: IRow[] = [
	{ name: 'Charlie', score: 30, createdAt: new Date('2026-01-03') },
	{ name: 'Alice', score: 10, createdAt: new Date('2026-01-01') },
	{ name: 'Bob', score: 20, createdAt: new Date('2026-01-02') },
];

const columns: ILxDataTableColumn<IRow>[] = [
	{ key: 'name', heading: 'Name', sortable: true },
	{ key: 'score', heading: 'Score', sortable: true },
	{ key: 'createdAt', heading: 'Created', sortable: true },
];

const makeProps = (overrides: Partial<ILxDataTableProps<IRow>> = {}): ILxDataTableProps<IRow> => ({
	rows,
	columns,
	sortable: true,
	filterable: true,
	...overrides,
});

describe('useSorting', () => {
	it('toggles sorting asc, desc, and reset', () => {
		const sorting = useSorting(makeProps(), computed(() => rows));

		sorting.toggleSort(columns[0]!);
		expect(sorting.sortKey.value).toBe('name');
		expect(sorting.sortDirection.value).toBe('asc');
		expect(sorting.sortedRows.value.map(row => row.name)).toEqual(['Alice', 'Bob', 'Charlie']);

		sorting.toggleSort(columns[0]!);
		expect(sorting.sortDirection.value).toBe('desc');
		expect(sorting.sortedRows.value.map(row => row.name)).toEqual(['Charlie', 'Bob', 'Alice']);

		sorting.toggleSort(columns[0]!);
		expect(sorting.sortKey.value).toBe('');
		expect(sorting.sortDirection.value).toBe('asc');
		expect(sorting.sortedRows.value).toEqual(rows);
	});

	it('supports custom sort function and disabled sortable mode', () => {
		const withSortFn = useSorting(
			makeProps({
				sortFn: (left, right, context) => {
					if (context.direction === 'asc') {
						return left.score - right.score;
					}
					return right.score - left.score;
				},
			}),
			computed(() => rows),
		);

		withSortFn.toggleSort(columns[1]!);
		expect(withSortFn.sortedRows.value.map(row => row.score)).toEqual([10, 20, 30]);

		const nonSortable = useSorting(
			makeProps({
				sortable: false,
			}),
			computed(() => rows),
		);
		nonSortable.toggleSort(columns[1]!);
		expect(nonSortable.sortKey.value).toBe('');
		expect(nonSortable.isColumnSortable(columns[1]!)).toBe(false);
	});

	it('handles date values and unknown initial sort key safely', () => {
		const sorting = useSorting(
			makeProps({
				initialSortKey: 'missing' as keyof IRow & string,
				initialSortDirection: 'desc',
			}),
			computed(() => rows),
		);
		expect(sorting.sortedRows.value).toEqual(rows);

		sorting.toggleSort(columns[2]!);
		expect(sorting.sortedRows.value.map(row => row.createdAt.toISOString().slice(0, 10))).toEqual([
			'2026-01-01',
			'2026-01-02',
			'2026-01-03',
		]);
	});

	it('covers sortValue/date/null paths and equal comparisons', () => {
		const rowsWithNulls: IRow[] = [
			{ name: 'Same', score: 1, createdAt: new Date('2026-01-02'), notes: null },
			{ name: 'Same', score: 1, createdAt: new Date('2026-01-01'), notes: 'Alpha' },
		];
		const columnsWithSortValues: ILxDataTableColumn<IRow>[] = [
			{
				key: 'createdAt',
				heading: 'Created',
				sortable: true,
				sortValue: row => row.createdAt,
			},
			{
				key: 'notes',
				heading: 'Notes',
				sortable: true,
				sortValue: row => row.notes,
			},
		];
		const sorting = useSorting(
			{
				rows: rowsWithNulls,
				columns: columnsWithSortValues,
				sortable: true,
				filterable: true,
			},
			computed(() => rowsWithNulls),
		);

		// Date branch in toComparable via sortValue.
		sorting.toggleSort(columnsWithSortValues[0]!);
		expect(sorting.sortedRows.value.map(row => row.createdAt.toISOString().slice(0, 10))).toEqual([
			'2026-01-01',
			'2026-01-02',
		]);

		// String/null fallback branch in toComparable via sortValue.
		sorting.toggleSort(columnsWithSortValues[1]!);
		expect(sorting.sortedRows.value.map(row => row.notes ?? '')).toEqual([
			'',
			'Alpha',
		]);

		// Equal comparison returns 0.
		sorting.toggleSort({
			key: 'name',
			heading: 'Name',
			sortable: true,
		});
		expect(sorting.sortedRows.value.map(row => row.name)).toEqual(['Same', 'Same']);
	});

	it('covers numeric comparable path and equal numeric comparisons', () => {
		const numericRows: IRow[] = [
			{ name: 'A', score: 10, createdAt: new Date('2026-01-01') },
			{ name: 'B', score: 10, createdAt: new Date('2026-01-02') },
			{ name: 'C', score: 5, createdAt: new Date('2026-01-03') },
		];
		const numericColumns: ILxDataTableColumn<IRow>[] = [
			{ key: 'score', heading: 'Score', sortable: true },
		];
		const sorting = useSorting(
			{
				rows: numericRows,
				columns: numericColumns,
				sortable: true,
				filterable: true,
			},
			computed(() => numericRows),
		);

		sorting.toggleSort(numericColumns[0]!);
		expect(sorting.sortedRows.value.map(row => row.score)).toEqual([5, 10, 10]);
	});
});
