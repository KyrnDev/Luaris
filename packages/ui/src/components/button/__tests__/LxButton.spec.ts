import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxButton from '../LxButton.vue';

describe('LxButton', () => {
	it('renders label and variant classes', () => {
		const wrapper = mount(LxButton, {
			props: {
				label: 'Save',
				variant: 'accent',
				size: 'lg',
			},
		});

		expect(wrapper.text()).toContain('Save');
		expect(wrapper.classes()).toContain('lx-button--accent');
		expect(wrapper.classes()).toContain('lx-button--lg');
	});

	it('disables button while loading', () => {
		const wrapper = mount(LxButton, {
			props: {
				loading: true,
			},
		});

		expect(wrapper.attributes('disabled')).toBeDefined();
		expect(wrapper.find('.lx-button__spinner').exists()).toBe(true);
	});

	it('renders leading/trailing slots and full width class', () => {
		const wrapper = mount(LxButton, {
			props: {
				fullWidth: true,
			},
			slots: {
				leading: '<span>+</span>',
				default: 'Action',
				trailing: '<span>→</span>',
			},
		});

		expect(wrapper.classes()).toContain('lx-button--full-width');
		expect(wrapper.find('.lx-button__leading').exists()).toBe(true);
		expect(wrapper.find('.lx-button__trailing').exists()).toBe(true);
	});
});
