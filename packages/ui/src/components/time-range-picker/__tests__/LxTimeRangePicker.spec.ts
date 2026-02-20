import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTimeRangePicker from '../LxTimeRangePicker.vue';

describe('LxTimeRangePicker', () => {
	it('renders start to end layout by default', () => {
		const wrapper = mount(LxTimeRangePicker);
		expect(wrapper.find('.lx-time-range-picker__separator').text()).toBe('to');
		expect(wrapper.findAll('input')).toHaveLength(2);
	});

	it('updates range object model', async () => {
		const wrapper = mount(LxTimeRangePicker, {
			props: {
				modelValue: [],
			},
		});

		const inputs = wrapper.findAll('input');
		await inputs[0]?.setValue('09:00');
		await inputs[1]?.setValue('17:00');

		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['09:00', '17:00']);
	});

	it('applies min/max/step props to both inputs', () => {
		const wrapper = mount(LxTimeRangePicker, {
			props: {
				modelValue: [],
				min: '08:00',
				max: '20:00',
				step: 300,
			},
		});

		const [start, end] = wrapper.findAll('input');
		expect(start?.attributes('min')).toBe('08:00');
		expect(start?.attributes('max')).toBe('20:00');
		expect(start?.attributes('step')).toBe('300');
		expect(end?.attributes('max')).toBe('20:00');
		expect(end?.attributes('step')).toBe('300');
	});

	it('updates dynamic min/max when paired value exists and clears values correctly', async () => {
		const wrapper = mount(LxTimeRangePicker, {
			props: {
				modelValue: ['09:00', '17:00'],
				min: '08:00',
				max: '20:00',
			},
		});

		let [start, end] = wrapper.findAll('input');
		expect(start?.attributes('max')).toBe('17:00');
		expect(end?.attributes('min')).toBe('09:00');

		await end?.setValue('');
		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['09:00']);

		await start?.setValue('');
		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([]);
		expect(wrapper.emitted('change')?.length).toBeGreaterThan(0);

		[start, end] = wrapper.findAll('input');
		expect(start?.attributes('max')).toBe('20:00');
		expect(end?.attributes('min')).toBe('08:00');
	});

	it('disables the fieldset when disabled prop is true', () => {
		const wrapper = mount(LxTimeRangePicker, {
			props: {
				modelValue: [],
				disabled: true,
			},
		});

		expect(wrapper.find('fieldset').attributes('disabled')).toBeDefined();
	});
});
