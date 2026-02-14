import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDropdown from '../LxDropdown.vue';

describe('LxDropdown', () => {
	it('emits selected option value', async () => {
		const wrapper = mount(LxDropdown, {
			props: {
				label: 'Actions',
				options: [
					{ label: 'Edit', value: 'edit' },
				],
			},
		});

		await wrapper.find('button[role="menuitem"]').trigger('click');
		expect(wrapper.emitted('select')?.[0]?.[0]).toBe('edit');
	});

	it('tracks open state from details toggle', async () => {
		const wrapper = mount(LxDropdown, {
			props: {
				options: [{ label: 'One', value: 'one' }],
			},
		});

		const details = wrapper.find('details').element as HTMLDetailsElement;
		details.open = true;
		await wrapper.find('details').trigger('toggle');

		expect(wrapper.find('summary').attributes('aria-expanded')).toBe('true');
	});

	it('renders without menu items when options are empty', () => {
		const wrapper = mount(LxDropdown, {
			props: {
				label: 'Empty',
				options: [],
			},
		});

		expect(wrapper.findAll('button[role="menuitem"]')).toHaveLength(0);
	});

	it('closes when escape key is pressed on menu', async () => {
		const wrapper = mount(LxDropdown, {
			props: {
				options: [{ label: 'One', value: 'one' }],
			},
		});

		const details = wrapper.find('details').element as HTMLDetailsElement;
		details.open = true;
		await wrapper.find('details').trigger('toggle');
		await wrapper.find('.lx-dropdown__menu').trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('summary').attributes('aria-expanded')).toBe('false');
	});
});
