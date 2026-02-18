import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import LxDataTable from '../LxDataTable.vue';
import type { ILxDataTableColumn } from '../types';

interface IRow {
	id?: number,
	name: string,
	role: string,
	status: 'active' | 'paused',
	team: 'core' | 'growth',
	stage: 'new' | 'won',
	billable: boolean,
	revenue: number,
	lastLogin: string,
	joinedAt: string,
}

const rows: IRow[] = [
	{
		id: 1,
		name: 'Alice',
		role: 'Engineer',
		status: 'active',
		team: 'core',
		stage: 'won',
		billable: true,
		revenue: 1200,
		lastLogin: '2026-02-10',
		joinedAt: '2026-02-10',
	},
	{
		id: 2,
		name: 'Bob',
		role: 'Designer',
		status: 'paused',
		team: 'growth',
		stage: 'new',
		billable: false,
		revenue: 800,
		lastLogin: '2026-02-11',
		joinedAt: '2026-02-11',
	},
	{
		id: 3,
		name: 'Cara',
		role: 'Engineer',
		status: 'active',
		team: 'core',
		stage: 'new',
		billable: true,
		revenue: 2000,
		lastLogin: '2026-02-12',
		joinedAt: '2026-02-12',
	},
];

const baseColumns: ILxDataTableColumn<IRow>[] = [
	{ key: 'name', heading: 'Name', sortable: true, filterable: true },
	{ key: 'revenue', heading: 'Revenue', sortable: true, filterable: true, filterType: 'number' },
	{ key: 'lastLogin', heading: 'Last Login', sortable: true, filterable: true, filterType: 'date' },
	{ key: 'joinedAt', heading: 'Joined', sortable: true, filterable: true, filterType: 'date-range' },
	{
		key: 'status',
		heading: 'Status',
		sortable: true,
		filterable: true,
		filterType: 'select',
		filterOptions: [
			{ label: 'Active', value: 'active' },
			{ label: 'Paused', value: 'paused' },
		],
	},
	{
		key: 'role',
		heading: 'Role',
		sortable: true,
		filterable: true,
		filterType: 'combobox',
		filterOptions: [
			{ label: 'Engineer', value: 'Engineer' },
			{ label: 'Designer', value: 'Designer' },
		],
	},
	{
		key: 'team',
		heading: 'Team',
		sortable: true,
		filterable: true,
		filterType: 'dropdown',
		filterOptions: [
			{ label: 'Core', value: 'core' },
			{ label: 'Growth', value: 'growth' },
		],
	},
	{
		key: 'stage',
		heading: 'Stage',
		sortable: true,
		filterable: true,
		filterType: 'radios',
		filterOptions: [
			{ label: 'New', value: 'new' },
			{ label: 'Won', value: 'won' },
		],
	},
	{ key: 'billable', heading: 'Billable', sortable: true, filterable: true, filterType: 'switch' },
];

const mountTable = (columns: ILxDataTableColumn<IRow>[] = baseColumns, customRows: IRow[] = rows) => {
	return mount(LxDataTable<IRow>, {
		props: {
			columns,
			rows: customRows,
			itemsPerPage: 2,
		},
	});
};

describe('LxDataTable', () => {
	it('renders rows, applies custom cell slot, and uses custom empty slot', async () => {
		const wrapper = mount(LxDataTable<IRow>, {
			props: {
				columns: [{ key: 'name', heading: 'Name' }],
				rows,
			},
			slots: {
				// eslint-disable-next-line ts/naming-convention
				'col-name': ({ value }) => h('strong', { class: 'name-cell' }, String(value).toUpperCase()),
			},
		});

		expect(wrapper.findAll('tbody tr')).toHaveLength(3);
		expect(wrapper.find('.name-cell').text()).toBe('ALICE');

		await wrapper.setProps({ rows: [] });
		expect(wrapper.find('.lx-data-table__empty').text()).toContain('No rows found.');
	});

	it('cycles sorting asc, desc, then reset', async () => {
		const wrapper = mount(LxDataTable<IRow>, {
			props: {
				columns: [{ key: 'name', heading: 'Name', sortable: true }],
				rows,
			},
		});

		const sortButton = wrapper.find('.lx-data-table__sort-button');
		await sortButton.trigger('click');
		let rowNames = wrapper.findAll('tbody tr td').map(cell => cell.text());
		expect(rowNames).toEqual(['Alice', 'Bob', 'Cara']);

		await sortButton.trigger('click');
		rowNames = wrapper.findAll('tbody tr td').map(cell => cell.text());
		expect(rowNames).toEqual(['Cara', 'Bob', 'Alice']);

		await sortButton.trigger('click');
		rowNames = wrapper.findAll('tbody tr td').map(cell => cell.text());
		expect(rowNames).toEqual(['Alice', 'Bob', 'Cara']);
	});

	it('supports text, number, and date filters', async () => {
		const wrapper = mountTable([
			{ key: 'name', heading: 'Name', filterType: 'text', filterable: true },
			{ key: 'revenue', heading: 'Revenue', filterType: 'number', filterable: true },
			{ key: 'lastLogin', heading: 'Last Login', filterType: 'date', filterable: true },
		]);

		const searchInput = wrapper.find('input[type="search"]');
		await searchInput.setValue('ali');
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);

		await searchInput.setValue('');
		const numberInput = wrapper.find('input[type="number"]');
		await numberInput.setValue('800');
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);

		await numberInput.setValue('');
		const dateInputs = wrapper.findAll('input[type="date"]');
		await dateInputs[0]?.setValue('2026-02-12');
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);
	});

	it('supports date-range filtering', async () => {
		const wrapper = mountTable([
			{ key: 'joinedAt', heading: 'Joined', filterType: 'date-range', filterable: true },
			{ key: 'name', heading: 'Name' },
		]);

		const dateInputs = wrapper.findAll('input[type="date"]');
		await dateInputs[0]?.setValue('2026-02-11');
		await dateInputs[1]?.setValue('2026-02-12');
		expect(wrapper.findAll('tbody tr')).toHaveLength(2);
	});

	it('supports select, combobox, dropdown, radios, and switch filters with default All option', async () => {
		const wrapper = mountTable([
			baseColumns[4]!,
			baseColumns[5]!,
			baseColumns[6]!,
			baseColumns[7]!,
			baseColumns[8]!,
			{ key: 'name', heading: 'Name' },
		]);

		const select = wrapper.find('select');
		expect(select.find('option').text()).toBe('All');
		await select.setValue('paused');
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);

		await select.setValue('');
		const comboInput = wrapper.find('input[role="combobox"]');
		await comboInput.trigger('focus');
		await wrapper.findAll('.lx-combobox__option-control')[2]?.trigger('click');
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);

		await comboInput.setValue('');
		await wrapper.find('.lx-dropdown__trigger').trigger('click');
		await wrapper.findAll('.lx-dropdown__item')[2]?.trigger('click');
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);

		const radioInput = wrapper.findAll('.lx-radio input')[1];
		await radioInput?.setValue(true);
		expect(wrapper.findAll('tbody tr')).toHaveLength(1);

		const switchInput = wrapper.find('input[role="switch"]');
		await switchInput.setValue(true);
		expect(wrapper.findAll('tbody tr').length).toBeLessThanOrEqual(1);
	});

	it('supports custom filter slot model and clear filters action', async () => {
		const wrapper = mount(LxDataTable<IRow>, {
			props: {
				columns: [
					{ key: 'status', heading: 'Status', filterType: 'select', filterable: true },
					{ key: 'name', heading: 'Name' },
				],
				rows,
			},
			slots: {
				// eslint-disable-next-line ts/naming-convention
				'filter-status': ({ filterModel }) => h('button', {
					class: 'custom-filter',
					onClick: () => {
						filterModel.value = 'active';
					},
				}, 'set custom filter'),
			},
		});

		expect(wrapper.find('.custom-filter').exists()).toBe(true);
		await wrapper.find('.custom-filter').trigger('click');
		const clearButton = wrapper.findAll('button').find(button => button.text() === 'Clear Filters');
		expect(clearButton?.attributes('disabled')).toBeUndefined();
		await clearButton?.trigger('click');
		expect(clearButton?.attributes('disabled')).toBeDefined();
	});

	it('supports custom filterFn and sortFn callbacks', async () => {
		const filterFn = vi.fn((row: IRow) => row.status === 'active');
		const sortFn = vi.fn((left: IRow, right: IRow) => left.revenue - right.revenue);

		const wrapper = mount(LxDataTable<IRow>, {
			props: {
				columns: [
					{ key: 'name', heading: 'Name', sortable: true },
					{ key: 'revenue', heading: 'Revenue', sortable: true },
				],
				rows,
				filterFn,
				sortFn,
			},
		});

		expect(filterFn).toHaveBeenCalled();
		await wrapper.findAll('.lx-data-table__sort-button')[1]?.trigger('click');
		expect(sortFn).toHaveBeenCalled();
	});

	it('handles pagination and row keys without id', async () => {
		// eslint-disable-next-line ts/no-unused-vars
		const noIdRows: IRow[] = rows.map(({ id, ...row }) => row);
		const wrapper = mount(LxDataTable<IRow>, {
			props: {
				columns: [{ key: 'name', heading: 'Name' }],
				rows: noIdRows,
				itemsPerPage: 1,
			},
		});

		expect(wrapper.find('.lx-data-table__meta').text()).toContain('Page 1 / 3');
		await wrapper.findAll('button').find(button => button.text() === 'Next')?.trigger('click');
		expect(wrapper.find('.lx-data-table__meta').text()).toContain('Page 2 / 3');
		await wrapper.findAll('button').find(button => button.text() === 'Previous')?.trigger('click');
		expect(wrapper.find('.lx-data-table__meta').text()).toContain('Page 1 / 3');
	});
});
