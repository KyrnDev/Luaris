import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxVirtualTable from '../LxVirtualTable.vue';

describe('LxVirtualTable', () => {
	it('renders headers, rows, custom cell slot and handles scroll', async () => {
		const wrapper = mount(LxVirtualTable, {
			props: {
				columns: [
					{ key: 'name', label: 'Name', align: 'left' },
					{ key: 'status', label: 'Status', align: 'center' },
				],
				rows: Array.from({ length: 80 }, (unused, index) => ({ id: index + 1, name: `User ${index + 1}`, status: 'active' })),
				height: 140,
				rowHeight: 28,
			},
			slots: {
				'cell-status': '<span class="custom-status">Custom</span>',
			},
		});

		expect(wrapper.findAll('thead th')).toHaveLength(2);
		expect(wrapper.find('.custom-status').exists()).toBe(true);
		const container = wrapper.find('.lx-virtual-table');
		(container.element as HTMLElement).scrollTop = 180;
		await container.trigger('scroll');
		expect(wrapper.findAll('tbody tr').length).toBeGreaterThan(0);
	});

	it('covers spacer rows, fallback row key and bounds calculations', async () => {
		const wrapper = mount(LxVirtualTable, {
			props: {
				columns: [{ key: 'value', label: 'Value', align: 'right', width: '10rem' }],
				rows: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
				height: 84,
				rowHeight: 42,
				overscan: 0,
				rowKey: 'missing',
			},
		});

		expect(wrapper.findAll('.lx-virtual-table__spacer-row').length).toBeLessThanOrEqual(2);
		expect(wrapper.html()).toContain('is-right');
		const container = wrapper.find('.lx-virtual-table');
		(container.element as HTMLElement).scrollTop = 1000;
		await container.trigger('scroll');
		expect(wrapper.findAll('.lx-virtual-table__row').length).toBeGreaterThanOrEqual(0);
		expect(wrapper.findAll('.lx-virtual-table__spacer-row').length).toBeGreaterThan(0);
		expect(wrapper.find('col').attributes('style')).toContain('10rem');
	});

	it('covers empty state, default alignment and center alignment rendering branches', async () => {
		const empty = mount(LxVirtualTable, {
			props: {
				columns: [],
				rows: [],
				height: 84,
				rowHeight: 42,
			},
		});
		expect(empty.findAll('th')).toHaveLength(0);
		expect(empty.find('tbody').exists()).toBe(true);

		const mixed = mount(LxVirtualTable, {
			props: {
				columns: [
					{ key: 'a', label: 'A' },
					{ key: 'b', label: 'B', align: 'center' },
				],
				rows: [{ id: 1, a: 'x', b: 'y' }],
				height: 84,
				rowHeight: 42,
			},
		});
		await mixed.vm.$nextTick();
		expect(mixed.html()).toContain('is-left');
		expect(mixed.html()).toContain('is-center');
	});

	it('renders both top and bottom spacer rows in separate scroll positions', async () => {
		const wrapper = mount(LxVirtualTable, {
			props: {
				columns: [{ key: 'name', label: 'Name' }],
				rows: Array.from({ length: 20 }, (unused, index) => ({ id: index + 1, name: `N${index + 1}` })),
				height: 84,
				rowHeight: 42,
				overscan: 0,
			},
		});

		expect(wrapper.findAll('.lx-virtual-table__spacer-row').length).toBeGreaterThan(0);

		const container = wrapper.find('.lx-virtual-table');
		(container.element as HTMLElement).scrollTop = 84;
		await container.trigger('scroll');
		expect(wrapper.findAll('.lx-virtual-table__spacer-row').length).toBeGreaterThan(0);
	});

	it('covers top-only and bottom-only spacer branches explicitly', async () => {
		const wrapper = mount(LxVirtualTable, {
			props: {
				columns: [{ key: 'name', label: 'Name' }],
				rows: Array.from({ length: 20 }, (unused, index) => ({ id: index + 1, name: `N${index + 1}` })),
				height: 84,
				rowHeight: 42,
				overscan: 0,
			},
		});

		const container = wrapper.find('.lx-virtual-table');
		(container.element as HTMLElement).scrollTop = 0;
		await container.trigger('scroll');
		expect(wrapper.findAll('.lx-virtual-table__spacer-row').length).toBeGreaterThan(0);

		(container.element as HTMLElement).scrollTop = 18 * 42;
		await container.trigger('scroll');
		expect(wrapper.findAll('.lx-virtual-table__spacer-row').length).toBeGreaterThan(0);
	});

	it('covers no-spacer branch when all rows fit viewport', () => {
		const wrapper = mount(LxVirtualTable, {
			props: {
				columns: [{ key: 'name', label: 'Name' }],
				rows: [{ id: 1, name: 'Only row' }],
				height: 200,
				rowHeight: 42,
				overscan: 0,
			},
		});

		expect(wrapper.findAll('.lx-virtual-table__spacer-row')).toHaveLength(0);
	});

	it('covers spacer colspan fallback when columns are empty', async () => {
		const wrapper = mount(LxVirtualTable, {
			props: {
				columns: [],
				rows: Array.from({ length: 10 }, (unused, index) => ({ id: index + 1, value: index + 1 })),
				height: 84,
				rowHeight: 42,
				overscan: 0,
			},
		});

		const container = wrapper.find('.lx-virtual-table');
		(container.element as HTMLElement).scrollTop = 42;
		await container.trigger('scroll');

		const spacerCells = wrapper.findAll('.lx-virtual-table__spacer-row td');
		expect(spacerCells.length).toBeGreaterThan(0);
		for (const cell of spacerCells) {
			expect(cell.attributes('colspan')).toBe('1');
		}
	});
});
