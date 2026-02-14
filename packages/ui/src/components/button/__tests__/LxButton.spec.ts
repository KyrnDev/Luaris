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

	it('supports explicit disabled state', () => {
		const wrapper = mount(LxButton, {
			props: {
				disabled: true,
			},
		});

		expect(wrapper.attributes('disabled')).toBeDefined();
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

	it('renders icon on the left by default', () => {
		const wrapper = mount(LxButton, {
			props: {
				icon: 'house',
			},
			slots: {
				default: 'Home',
			},
		});

		const childrenClasses = wrapper.find('button').element.children[0]?.className || '';
		expect(childrenClasses).toContain('lx-button__icon');
		expect(wrapper.find('.fa-house').exists()).toBe(true);
	});

	it('does not render an empty label wrapper for icon-only buttons', () => {
		const wrapper = mount(LxButton, {
			props: {
				icon: 'house',
			},
		});

		expect(wrapper.find('.lx-button__label').exists()).toBe(false);
	});

	it('renders icon on the right when requested', () => {
		const wrapper = mount(LxButton, {
			props: {
				icon: 'arrow-right',
				iconOrder: 'right',
			},
			slots: {
				default: 'Continue',
			},
		});

		const buttonChildren = Array.from(wrapper.find('button').element.children);
		const lastClass = buttonChildren[buttonChildren.length - 1]?.className || '';
		expect(lastClass).toContain('lx-button__icon');
		expect(wrapper.find('.fa-arrow-right').exists()).toBe(true);
	});
});
