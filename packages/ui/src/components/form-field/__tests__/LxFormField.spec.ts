import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxFormField from '../LxFormField.vue';

describe('LxFormField', () => {
	it('renders label/help and provides id through slot props', () => {
		const wrapper = mount(LxFormField, {
			props: {
				label: 'Email',
				forId: 'email',
				helpText: 'We will not share this.',
				required: true,
			},
			slots: {
				default: ({ fieldId }: { fieldId: string }) => `<input id="${fieldId}" />`,
			},
		});

		expect(wrapper.find('label').attributes('for')).toBe('email');
		expect(wrapper.text()).toContain('Email');
		expect(wrapper.text()).toContain('*');
		expect(wrapper.text()).toContain('We will not share this.');
	});

	it('renders inline reverse layout and error state', () => {
		const wrapper = mount(LxFormField, {
			props: {
				display: 'inline',
				reverse: true,
				error: 'Invalid value',
			},
		});

		expect(wrapper.classes()).toContain('is-inline');
		expect(wrapper.classes()).toContain('is-reverse');
		expect(wrapper.classes()).toContain('has-error');
		expect(wrapper.find('.lx-form-field__error').text()).toContain('Invalid value');
		expect(wrapper.find('.lx-form-field__help').exists()).toBe(false);
	});

	it('supports label without required indicator', () => {
		const wrapper = mount(LxFormField, {
			props: {
				label: 'Name',
				required: false,
			},
		});

		expect(wrapper.text()).toContain('Name');
		expect(wrapper.find('sup').exists()).toBe(false);
	});
});
