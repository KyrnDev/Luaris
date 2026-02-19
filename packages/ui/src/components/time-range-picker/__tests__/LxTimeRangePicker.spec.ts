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
});
