import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxInput from '../LxInput.vue';

describe('LxInput', () => {
	it('emits update and change when typing', async () => {
		const wrapper = mount(LxInput, {
			props: {
				modelValue: '',
			},
		});

		await wrapper.find('input').setValue('Alice');

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('Alice');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe('Alice');
	});

	it('shows error message and aria-invalid', () => {
		const wrapper = mount(LxInput, {
			props: {
				modelValue: '',
				error: 'Required',
			},
		});

		expect(wrapper.find('.lx-input__message--error').text()).toContain('Required');
		expect(wrapper.find('input').attributes('aria-invalid')).toBe('true');
	});

	it('shows hint when there is no error and resolves custom id', () => {
		const wrapper = mount(LxInput, {
			attrs: {
				id: 'email-field',
			},
			props: {
				modelValue: '',
				hint: 'Optional field',
			},
		});

		expect(wrapper.find('.lx-input__message').text()).toContain('Optional field');
		expect(wrapper.find('input').attributes('id')).toBe('email-field');
	});

	it('renders leading and trailing addon slots', () => {
		const wrapper = mount(LxInput, {
			props: {
				modelValue: '',
			},
			slots: {
				leading: '<span>£</span>',
				trailing: '<span>.00</span>',
			},
		});

		expect(wrapper.findAll('.lx-input__addon')).toHaveLength(2);
	});

	it('generates id and name when attrs are not provided', () => {
		const wrapper = mount(LxInput, {
			props: {
				modelValue: '',
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('id')).toBeTruthy();
		expect(input.attributes('name')).toBe(input.attributes('id'));
	});

	it('uses an empty string by default when model is omitted', () => {
		const wrapper = mount(LxInput);
		expect((wrapper.find('input').element as HTMLInputElement).value).toBe('');
	});
});
