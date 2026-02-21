import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxPagination from '../LxPagination.vue';

describe('LxPagination', () => {
	it('navigates pages and emits change', async () => {
		const wrapper = mount(LxPagination, {
			props: {
				total: 120,
				pageSize: 25,
			},
		});

		expect(wrapper.text()).toContain('Page 1 of 5');
		const buttons = wrapper.findAll('.lx-button');
		await buttons[1]?.trigger('click');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(2);
		await buttons[0]?.trigger('click');
		expect(wrapper.emitted('change')?.at(-1)?.[0]).toBe(1);
	});

	it('renders ellipsis and page-size control', async () => {
		const wrapper = mount(LxPagination, {
			props: {
				total: 500,
				pageSize: 10,
				maxButtons: 5,
				showPageSize: true,
				pageSizeOptions: [10, 20],
			},
		});

		expect(wrapper.text()).toContain('…');
		const pageButtons = wrapper.findAll('.lx-pagination__page');
		await pageButtons[0]?.trigger('click');
		await pageButtons[1]?.trigger('click');

		const select = wrapper.find('select');
		await select.setValue('20');
		expect(wrapper.emitted('update:pageSize')?.[0]?.[0]).toBe(20);
	});

	it('covers end-window page calculations near last page', async () => {
		const wrapper = mount(LxPagination, {
			props: {
				modelValue: 10,
				total: 100,
				pageSize: 10,
				maxButtons: 5,
			},
		});

		expect(wrapper.text()).toContain('Page 10 of 10');
		expect(wrapper.text()).toContain('…');
	});
});
