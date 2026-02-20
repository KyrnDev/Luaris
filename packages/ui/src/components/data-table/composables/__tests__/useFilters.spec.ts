import { describe, expect, it } from 'vitest';
import { useFilters } from '../useFilters';
import type { ILxDataTableColumn, ILxDataTableProps } from '../../types';

interface IRow {
	name: string,
	score: number,
	active: boolean,
	status: 'active' | 'paused',
	role: 'Engineer' | 'Designer',
	team: 'core' | 'growth',
	stage: 'new' | 'won',
	joinedAt: string,
	createdAt: Date,
}

const rows: IRow[] = [
	{
		name: 'Alice',
		score: 100,
		active: true,
		status: 'active',
		role: 'Engineer',
		team: 'core',
		stage: 'won',
		joinedAt: '2026-02-10',
		createdAt: new Date('2026-02-10'),
	},
	{
		name: 'Bob',
		score: 80,
		active: false,
		status: 'paused',
		role: 'Designer',
		team: 'growth',
		stage: 'new',
		joinedAt: '2026-02-11',
		createdAt: new Date('2026-02-11'),
	},
];

const columns: ILxDataTableColumn<IRow>[] = [
	{ key: 'name', heading: 'Name', filterable: true },
	{ key: 'score', heading: 'Score', filterable: true, filterType: 'number' },
	{ key: 'active', heading: 'Active', filterable: true, filterType: 'switch' },
	{ key: 'status', heading: 'Status', filterable: true, filterType: 'select' },
	{ key: 'role', heading: 'Role', filterable: true, filterType: 'combobox' },
	{ key: 'team', heading: 'Team', filterable: true, filterType: 'dropdown' },
	{ key: 'stage', heading: 'Stage', filterable: true, filterType: 'radios' },
	{ key: 'joinedAt', heading: 'Joined', filterable: true, filterType: 'date-range' },
	{ key: 'createdAt', heading: 'Created', filterable: true, filterType: 'date' },
];

const makeProps = (overrides: Partial<ILxDataTableProps<IRow>> = {}): ILxDataTableProps<IRow> => ({
	rows,
	columns,
	filterable: true,
	sortable: true,
	...overrides,
});

describe('useFilters', () => {
	it('resolves filter types, placeholders, options, and labels', () => {
		const filters = useFilters(makeProps());

		expect(filters.showColumnFilters.value).toBe(true);
		expect(filters.getColumnFilterType(columns[0]!)).toBe('text');
		expect(filters.getColumnFilterType(columns[1]!)).toBe('number');
		expect(filters.getColumnFilterType(columns[2]!)).toBe('switch');
		expect(filters.isSelectLikeFilter(columns[3]!)).toBe(true);
		expect(filters.isSelectLikeFilter(columns[0]!)).toBe(false);

		const statusOptions = filters.getSelectFilterOptions(columns[3]!);
		expect(statusOptions[0]).toEqual({
			label: 'All',
			value: '',
		});

		const statusModel = filters.getSelectFilterModel(columns[3]!);
		statusModel.value = 'active';
		expect(filters.getDropdownLabel(columns[3]!)).toBe('active');
		expect(filters.getColumnFilterPlaceholder(columns[3]!)).toBe('All');

		filters.onDropdownFilterSelect(columns[5]!, 'core');
		expect(filters.getDropdownLabel(columns[5]!)).toBe('core');
	});

	it('filters rows across text, number, date, date-range, switch and select-like filters', () => {
		const filters = useFilters(makeProps());

		filters.getTextFilterModel(columns[0]!).value = 'ali';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);

		filters.clearColumnFilter(columns[0]!);
		filters.getNumberFilterTextModel(columns[1]!).value = '80';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);

		filters.clearColumnFilter(columns[1]!);
		filters.getDateFilterModel(columns[8]!).value = new Date('2026-02-10');
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);

		filters.clearColumnFilter(columns[8]!);
		filters.getDateRangePickerModel(columns[7]!).value = [
			new Date('2026-02-11'),
			new Date('2026-02-11'),
		];
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);

		filters.clearColumnFilter(columns[7]!);
		filters.getSwitchFilterModel(columns[2]!).value = true;
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);

		filters.clearColumnFilter(columns[2]!);
		filters.getSelectFilterModel(columns[3]!).value = 'paused';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);
		filters.getSelectFilterModel(columns[4]!).value = 'Designer';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);
		filters.getSelectFilterModel(columns[5]!).value = 'growth';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);
		filters.getSelectFilterModel(columns[6]!).value = 'new';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);
	});

	it('clears filters and honours filterable/filterFn/filterPredicate branches', () => {
		const withPredicateColumns: ILxDataTableColumn<IRow>[] = [
			{
				key: 'name',
				heading: 'Name',
				filterable: true,
				filterPredicate: row => row.name.startsWith('A'),
			},
			{
				key: 'score',
				heading: 'Score',
				filterable: false,
			},
		];
		const filters = useFilters(makeProps({
			columns: withPredicateColumns,
			filterFn: row => row.score >= 100,
		}));

		expect(filters.isColumnFilterable(withPredicateColumns[1]!)).toBe(false);
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);

		const model = filters.getColumnFilterModel(withPredicateColumns[0]!);
		model.value = 'a';
		expect(filters.hasActiveFilters.value).toBe(true);
		filters.clearFilters();
		expect(filters.hasActiveFilters.value).toBe(false);

		const noFilterable = useFilters(makeProps({
			filterable: false,
		}));
		expect(noFilterable.showColumnFilters.value).toBe(false);
		expect(noFilterable.filteredRows.value).toEqual(rows);
	});

	it('covers inferred types and filter option branches', () => {
		interface IInferRow {
			blank: string,
			amount: number,
			flag: boolean,
			dateObject: Date,
			dateString: string,
			text: string,
			choice: string,
		}

		const inferRows: IInferRow[] = [
			{
				blank: '',
				amount: 42,
				flag: true,
				dateObject: new Date('2026-03-10'),
				dateString: '2026-03-11',
				text: 'Alpha',
				choice: 'A',
			},
			{
				blank: '',
				amount: 7,
				flag: false,
				dateObject: new Date('2026-03-12'),
				dateString: 'not-a-date',
				text: 'Beta',
				choice: '',
			},
		];
		const inferColumns: ILxDataTableColumn<IInferRow>[] = [
			{ key: 'blank', heading: 'Blank', filterable: true },
			{ key: 'amount', heading: 'Amount', filterable: true },
			{ key: 'flag', heading: 'Flag', filterable: true },
			{ key: 'dateObject', heading: 'Date Obj', filterable: true },
			{ key: 'dateString', heading: 'Date Str', filterable: true },
			{ key: 'text', heading: 'Text', filterable: true },
			{
				key: 'choice',
				heading: 'Choice',
				filterable: true,
				filterOptions: [
					{ label: 'All', value: '' },
					{ label: 'A', value: 'A' },
				],
			},
		];
		const filters = useFilters<IInferRow>({
			rows: inferRows,
			columns: inferColumns,
			filterable: true,
			sortable: true,
		});

		expect(filters.getColumnFilterType(inferColumns[0]!)).toBe('text');
		expect(filters.getColumnFilterType(inferColumns[1]!)).toBe('number');
		expect(filters.getColumnFilterType(inferColumns[2]!)).toBe('switch');
		expect(filters.getColumnFilterType(inferColumns[3]!)).toBe('date');
		expect(filters.getColumnFilterType(inferColumns[4]!)).toBe('date');

		const fromFilterOptions = filters.getFilterOptionsWithAll(inferColumns[5]!);
		expect(fromFilterOptions[0]).toEqual({ label: 'All', value: '' });
		expect(fromFilterOptions.some(option => option.value === 'Alpha')).toBe(true);
		expect(fromFilterOptions.some(option => option.value === 'Beta')).toBe(true);

		// Branch where supplied options already contain "All".
		const providedOptions = filters.getFilterOptionsWithAll(inferColumns[6]!);
		expect(providedOptions).toEqual([
			{ label: 'All', value: '' },
			{ label: 'A', value: 'A' },
		]);
	});

	it('covers filter model getter/setter branches', () => {
		const filters = useFilters(makeProps());

		const textModel = filters.getTextFilterModel(columns[0]!);
		expect(textModel.value).toBe('');
		textModel.value = 'Alice';
		expect(textModel.value).toBe('Alice');

		const dateModel = filters.getDateFilterModel(columns[8]!);
		expect(dateModel.value).toBeNull();
		dateModel.value = new Date('2026-02-10');
		expect(dateModel.value).toBeInstanceOf(Date);
		filters.getColumnFilterModel(columns[8]!).value = 'invalid';
		expect(dateModel.value).toBeNull();

		const numberModel = filters.getNumberFilterTextModel(columns[1]!);
		expect(numberModel.value).toBe('');
		numberModel.value = '100';
		expect(numberModel.value).toBe('100');
		numberModel.value = '';
		expect(numberModel.value).toBe('');
		numberModel.value = 'abc';
		expect(numberModel.value).toBe('');

		const switchModel = filters.getSwitchFilterModel(columns[2]!);
		expect(switchModel.value).toBe(false);
		switchModel.value = true;
		expect(switchModel.value).toBe(true);
		switchModel.value = false;
		expect(switchModel.value).toBe(false);

		filters.getColumnFilterModel(columns[7]!).value = {
			from: new Date('2026-02-10'),
			to: new Date('2026-02-11'),
		};
		expect(filters.getDateRangePickerModel(columns[7]!).value).toEqual([
			new Date('2026-02-10'),
			new Date('2026-02-11'),
		]);
		filters.getColumnFilterModel(columns[7]!).value = 'bad-range';
		expect(filters.getDateRangePickerModel(columns[7]!).value).toEqual([]);

		const pickerModel = filters.getDateRangePickerModel(columns[7]!);
		pickerModel.value = [new Date('2026-02-10')];
		expect(filters.getColumnFilterModel(columns[7]!).value).toEqual({
			from: new Date('2026-02-10'),
			to: null,
		});
	});

	it('covers placeholder, dropdown label and selection fallback branches', () => {
		const placeholderColumns: ILxDataTableColumn<IRow>[] = [
			{ key: 'status', heading: 'Status', filterable: true, filterType: 'select' },
			{ key: 'role', heading: 'Role', filterable: true, filterType: 'combobox' },
			{ key: 'team', heading: 'Team', filterable: true, filterType: 'dropdown' },
			{ key: 'stage', heading: 'Stage', filterable: true, filterType: 'radios' },
			{ key: 'name', heading: 'Name', filterable: true, filterPlaceholder: '  Name query  ' },
			{ key: 'score', heading: 'Score', filterable: true },
		];
		const filters = useFilters(makeProps({
			columns: placeholderColumns,
		}));

		expect(filters.getColumnFilterPlaceholder(placeholderColumns[0]!)).toBe('All');
		expect(filters.getColumnFilterPlaceholder(placeholderColumns[1]!)).toBe('All');
		expect(filters.getColumnFilterPlaceholder(placeholderColumns[2]!)).toBe('All');
		expect(filters.getColumnFilterPlaceholder(placeholderColumns[3]!)).toBe('All');
		expect(filters.getColumnFilterPlaceholder(placeholderColumns[4]!)).toBe('  Name query  ');
		expect(filters.getColumnFilterPlaceholder(placeholderColumns[5]!)).toBe('Filter Score');

		expect(filters.getDropdownLabel(placeholderColumns[0]!)).toBe('All');
		filters.onDropdownFilterSelect(placeholderColumns[0]!, 'unknown');
		expect(filters.getDropdownLabel(placeholderColumns[0]!)).toBe('unknown');
		filters.onDropdownFilterSelect(placeholderColumns[0]!, 'active');
		expect(filters.getDropdownLabel(placeholderColumns[0]!)).toBe('active');
	});

	it('covers filteredRows branches for all filter types', () => {
		interface IBranchRow {
			name: string,
			score: unknown,
			joinedAt: unknown,
			createdAt: unknown,
			active: boolean,
			status: string,
			role: string,
		}

		const branchRows: IBranchRow[] = [
			{
				name: 'Alice',
				score: 100,
				joinedAt: '2026-02-10',
				createdAt: new Date('2026-02-10'),
				active: true,
				status: 'active',
				role: 'Engineer',
			},
			{
				name: 'Bob',
				score: 'oops',
				joinedAt: 'not-a-date',
				createdAt: 'not-a-date',
				active: false,
				status: 'paused',
				role: 'Designer',
			},
		];
		const branchColumns: ILxDataTableColumn<IBranchRow>[] = [
			{ key: 'name', heading: 'Name', filterable: true },
			{ key: 'score', heading: 'Score', filterable: true, filterType: 'number' },
			{ key: 'joinedAt', heading: 'Joined', filterable: true, filterType: 'date-range' },
			{ key: 'createdAt', heading: 'Created', filterable: true, filterType: 'date' },
			{ key: 'active', heading: 'Active', filterable: true, filterType: 'switch' },
			{ key: 'status', heading: 'Status', filterable: true, filterType: 'select' },
			{
				key: 'role',
				heading: 'Role',
				filterable: true,
				filterType: 'dropdown',
				filterValue: row => row.role.toLowerCase(),
			},
		];

		const filters = useFilters<IBranchRow>({
			rows: branchRows,
			columns: branchColumns,
			filterable: true,
			sortable: true,
			filterFn: row => row.name !== 'Blocked',
		});

		// Number: NaN filter continues, then valid filter rejects mismatched/NaN row.
		filters.getNumberFilterTextModel(branchColumns[1]!).value = 'abc';
		expect(filters.filteredRows.value).toHaveLength(2);
		filters.getNumberFilterTextModel(branchColumns[1]!).value = '100';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);
		filters.clearColumnFilter(branchColumns[1]!);

		// Date-range invalid row date -> false branch.
		filters.getDateRangePickerModel(branchColumns[2]!).value = [new Date('2026-02-09')];
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);
		// To-date out of range branch.
		filters.getDateRangePickerModel(branchColumns[2]!).value = [undefined as unknown as Date, new Date('2026-02-09')];
		expect(filters.filteredRows.value).toEqual([]);
		filters.clearColumnFilter(branchColumns[2]!);

		// Date filter invalid row date branch and same-day mismatch branch.
		filters.getDateFilterModel(branchColumns[3]!).value = new Date('2026-02-10');
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);
		filters.getDateFilterModel(branchColumns[3]!).value = new Date('2026-02-11');
		expect(filters.filteredRows.value).toEqual([]);
		filters.clearColumnFilter(branchColumns[3]!);

		// Switch true branch.
		filters.getSwitchFilterModel(branchColumns[4]!).value = true;
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);
		filters.getSwitchFilterModel(branchColumns[4]!).value = false;
		expect(filters.filteredRows.value).toHaveLength(2);

		// Select-like exact matching (and mismatch) branches.
		filters.getSelectFilterModel(branchColumns[5]!).value = 'paused';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Bob']);
		filters.getSelectFilterModel(branchColumns[5]!).value = 'missing';
		expect(filters.filteredRows.value).toEqual([]);
		filters.clearColumnFilter(branchColumns[5]!);

		// Dropdown with filterValue function branch.
		filters.getSelectFilterModel(branchColumns[6]!).value = 'engineer';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);
		filters.clearColumnFilter(branchColumns[6]!);

		// Text includes branch.
		filters.getTextFilterModel(branchColumns[0]!).value = 'ali';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['Alice']);
		filters.getTextFilterModel(branchColumns[0]!).value = 'zzz';
		expect(filters.filteredRows.value).toEqual([]);
	});

	it('covers filterFn undefined fallback and column predicate failure branch', () => {
		interface IPredicateRow {
			name: string,
		}

		const predicateRows: IPredicateRow[] = [
			{ name: 'A' },
			{ name: 'B' },
		];
		const predicateColumns: ILxDataTableColumn<IPredicateRow>[] = [
			{
				key: 'name',
				heading: 'Name',
				filterable: true,
				filterPredicate: row => row.name === 'A',
			},
		];

		const filters = useFilters<IPredicateRow>({
			rows: predicateRows,
			columns: predicateColumns,
			filterable: true,
			sortable: true,
			filterFn: () => undefined,
		});

		filters.getTextFilterModel(predicateColumns[0]!).value = 'x';
		expect(filters.filteredRows.value.map(row => row.name)).toEqual(['A']);
	});

	it('covers non-Date fallback parsing branches for date and date-range filters', () => {
		interface IDateStringRow {
			joined: string,
			created: string,
		}

		const dateRows: IDateStringRow[] = [
			{ joined: '2026-03-01', created: '2026-03-01' },
			{ joined: '2026-03-02', created: '2026-03-02' },
			{ joined: null as unknown as string, created: null as unknown as string },
		];
		const dateColumns: ILxDataTableColumn<IDateStringRow>[] = [
			{ key: 'joined', heading: 'Joined', filterable: true, filterType: 'date-range' },
			{ key: 'created', heading: 'Created', filterable: true, filterType: 'date' },
		];

		const filters = useFilters<IDateStringRow>({
			rows: dateRows,
			columns: dateColumns,
			filterable: true,
			sortable: true,
		});

		filters.getDateRangePickerModel(dateColumns[0]!).value = [new Date('2026-03-02')];
		expect(filters.filteredRows.value).toEqual([{ joined: '2026-03-02', created: '2026-03-02' }]);
		filters.clearColumnFilter(dateColumns[0]!);

		filters.getDateFilterModel(dateColumns[1]!).value = new Date('2026-03-01');
		expect(filters.filteredRows.value).toEqual([{ joined: '2026-03-01', created: '2026-03-01' }]);
	});

	it('covers remaining value-normalisation and fallback branches', () => {
		interface IEdgeRow {
			label: string | null,
			status: string | null,
			amount: string | number,
			joined: Date | string | null,
			created: Date | string | null,
		}

		const edgeRows: IEdgeRow[] = [
			{
				label: null,
				status: 'active',
				amount: 10,
				joined: new Date('2026-01-10'),
				created: new Date('2026-01-10'),
			},
			{
				label: 'Beta',
				status: null,
				amount: 'not-number',
				joined: '2026-01-11',
				created: 'invalid-date',
			},
		];
		const edgeColumns: ILxDataTableColumn<IEdgeRow>[] = [
			{
				key: 'label',
				heading: 'Label',
				filterable: true,
				filterValue: row => String(row.label ?? ''),
			},
			{
				key: 'status',
				heading: 'Status',
				filterable: true,
				filterType: 'select',
			},
			{
				key: 'amount',
				heading: 'Amount',
				filterable: true,
				filterType: 'number',
			},
			{
				key: 'joined',
				heading: 'Joined',
				filterable: true,
				filterType: 'date-range',
			},
			{
				key: 'created',
				heading: 'Created',
				filterable: true,
				filterType: 'date',
			},
		];

		const filters = useFilters<IEdgeRow>({
			rows: edgeRows,
			columns: edgeColumns,
			filterable: true,
			sortable: true,
		});

		// getFilterOptions skip-null/empty branch and filterValue branch.
		const statusOptions = filters.getFilterOptionsWithAll(edgeColumns[1]!);
		expect(statusOptions.some(option => option.value === 'active')).toBe(true);
		expect(filters.getDropdownFilterOptions(edgeColumns[1]!).length).toBeGreaterThan(0);
		expect(filters.getFilterOptionsWithAll(edgeColumns[0]!).length).toBeGreaterThan(0);

		// getTextFilterModel/getSelectFilterModel nullish fallback.
		filters.getColumnFilterModel(edgeColumns[0]!).value = null;
		expect(filters.getTextFilterModel(edgeColumns[0]!).value).toBe('');
		filters.getColumnFilterModel(edgeColumns[1]!).value = null;
		expect(filters.getSelectFilterModel(edgeColumns[1]!).value).toBe('');
		expect(filters.getDropdownLabel(edgeColumns[1]!)).toBe('All');

		// Number filter: parsed string branch and NaN parsed branch.
		filters.getColumnFilterModel(edgeColumns[2]!).value = '10';
		expect(filters.getNumberFilterTextModel(edgeColumns[2]!).value).toBe('10');
		filters.getColumnFilterModel(edgeColumns[2]!).value = 12;
		expect(filters.getNumberFilterTextModel(edgeColumns[2]!).value).toBe('12');
		filters.getColumnFilterModel(edgeColumns[2]!).value = 'NaN';
		expect(filters.getNumberFilterTextModel(edgeColumns[2]!).value).toBe('');
		// numericFilter NaN branch in filteredRows.
		filters.getColumnFilterModel(edgeColumns[2]!).value = 'abc';
		expect(filters.filteredRows.value).toHaveLength(2);
		// numericValue NaN branch in filteredRows.
		filters.getColumnFilterModel(edgeColumns[2]!).value = 10;
		expect(filters.filteredRows.value.map(row => row.label)).toEqual([null]);
		filters.clearColumnFilter(edgeColumns[2]!);

		// Select-like branch with null row value to exercise nullish normalisation.
		filters.getSelectFilterModel(edgeColumns[1]!).value = 'active';
		expect(filters.filteredRows.value.map(row => row.label)).toEqual([null]);
		filters.clearColumnFilter(edgeColumns[1]!);

		// Date-range branch where rowValue is Date (true side), then fallback parse side.
		filters.getDateRangePickerModel(edgeColumns[3]!).value = [new Date('2026-01-10')];
		expect(filters.filteredRows.value).toHaveLength(2);
		filters.getDateRangePickerModel(edgeColumns[3]!).value = [new Date('2026-01-12')];
		expect(filters.filteredRows.value).toEqual([]);
		filters.getDateRangePickerModel(edgeColumns[3]!).value = [new Date('2026-01-11')];
		expect(filters.filteredRows.value.map(row => row.label)).toEqual(['Beta']);
		filters.clearColumnFilter(edgeColumns[3]!);

		// Date filter with Date row path and invalid string row false branch.
		filters.clearColumnFilter(edgeColumns[0]!);
		filters.clearColumnFilter(edgeColumns[1]!);
		filters.clearColumnFilter(edgeColumns[2]!);
		filters.getDateFilterModel(edgeColumns[4]!).value = new Date('2026-01-10');
		expect(filters.filteredRows.value.map(row => row.label)).toEqual([null]);
		filters.clearColumnFilter(edgeColumns[4]!);

		// Text filter using filterValue function path and includes false branch.
		filters.getTextFilterModel(edgeColumns[0]!).value = 'beta';
		expect(filters.filteredRows.value.map(row => row.label)).toEqual(['Beta']);
		filters.getTextFilterModel(edgeColumns[0]!).value = 'missing';
		expect(filters.filteredRows.value).toEqual([]);
	});
});
