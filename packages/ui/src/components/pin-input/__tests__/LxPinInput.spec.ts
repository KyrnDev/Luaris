import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxPinInput from '../LxPinInput.vue';

describe('LxPinInput', () => {
	it('updates model from input cells', async () => {
		const wrapper = mount(LxPinInput, {
			props: {
				'modelValue': '',
				'length': 4,
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const inputs = wrapper.findAll('input');
		await inputs[0]?.setValue('1');
		await inputs[1]?.setValue('2');
		expect(wrapper.props('modelValue')).toBe('12');
	});

	it('enforces numericOnly when enabled', async () => {
		const wrapper = mount(LxPinInput, {
			props: {
				'modelValue': '',
				'numericOnly': true,
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		await wrapper.find('input').setValue('a');
		expect(wrapper.props('modelValue')).toBe('');
	});

	it('supports backspace focus and mask mode', async () => {
		const wrapper = mount(LxPinInput, {
			attachTo: document.body,
			props: {
				'modelValue': '1',
				'length': 2,
				'mask': true,
				'numericOnly': false,
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const inputs = wrapper.findAll('input');
		expect(inputs[0]?.attributes('type')).toBe('password');
		await inputs[1]?.trigger('keydown', { key: 'Backspace' });
		expect(document.activeElement === inputs[0]?.element || document.activeElement === inputs[1]?.element).toBe(true);
		wrapper.unmount();
	});

	it('does not move focus on backspace when current cell has a value', async () => {
		const wrapper = mount(LxPinInput, {
			attachTo: document.body,
			props: {
				'modelValue': '12',
				'length': 2,
				'numericOnly': false,
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		const inputs = wrapper.findAll('input');
		(inputs[1]?.element as HTMLInputElement).focus();
		await inputs[1]?.trigger('keydown', { key: 'Backspace' });
		expect(document.activeElement).toBe(inputs[1]?.element);
		wrapper.unmount();
	});
});
