import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTimePicker from '../LxTimePicker.vue';

describe('LxTimePicker', () => {
	it('emits time changes', async () => {
		const wrapper = mount(LxTimePicker, {
			props: {
				modelValue: '',
			},
		});

		await wrapper.find('input').setValue('09:30');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('09:30');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe('09:30');
	});

	it('applies min/max/step props to input', () => {
		const wrapper = mount(LxTimePicker, {
			props: {
				modelValue: '',
				min: '09:00',
				max: '18:00',
				step: 300,
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('min')).toBe('09:00');
		expect(input.attributes('max')).toBe('18:00');
		expect(input.attributes('step')).toBe('300');
	});
});
