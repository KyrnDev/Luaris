import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTable from '../LxTable.vue';

describe('LxTable', () => {
	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'age', label: 'Age', align: 'right' as const },
	];

	it('renders rows and emits rowClick', async () => {
		const wrapper = mount(LxTable, {
			props: {
				caption: 'People',
				columns,
				rows: [{ id: '1', name: 'Alex', age: 32 }],
			},
		});

		expect(wrapper.text()).toContain('People');
		expect(wrapper.text()).toContain('Alex');
		expect(wrapper.find('td.is-right').text()).toContain('32');
		await wrapper.find('tbody tr').trigger('click');
		expect(wrapper.emitted('rowClick')?.[0]?.[1]).toBe(0);
	});

	it('renders empty state and slot overrides', () => {
		const slots: Record<string, string> = {
			empty: '<p>No rows</p>',
		};
		slots['header-name'] = '<span>Person</span>';

		const wrapper = mount(LxTable, {
			props: {
				columns,
				rows: [],
			},
			slots,
		});

		expect(wrapper.text()).toContain('Person');
		expect(wrapper.text()).toContain('No rows');
	});

	it('falls back to row index when rowKey value is missing', () => {
		const wrapper = mount(LxTable, {
			props: {
				columns,
				rowKey: 'missing',
				rows: [{ name: 'Chris', age: 40 }],
			},
		});

		expect(wrapper.text()).toContain('Chris');
	});

	it('renders default empty copy when empty slot is not supplied', () => {
		const wrapper = mount(LxTable, {
			props: {
				columns: [],
				rows: [],
			},
		});

		expect(wrapper.text()).toContain('No data available.');
		expect(wrapper.find('.lx-table__empty').attributes('colspan')).toBe('1');
	});
});
