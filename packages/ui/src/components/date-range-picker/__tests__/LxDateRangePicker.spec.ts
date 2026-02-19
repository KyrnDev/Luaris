import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDateRangePicker from '../LxDateRangePicker.vue';

describe('LxDateRangePicker', () => {
	it('renders start to end layout by default', () => {
		const wrapper = mount(LxDateRangePicker);
		expect(wrapper.find('.lx-date-range-picker__separator').text()).toBe('to');
		expect(wrapper.findAll('input')).toHaveLength(2);
	});

	it('updates range object model', async () => {
		const wrapper = mount(LxDateRangePicker, {
			props: {
				modelValue: [],
			},
		});

		const inputs = wrapper.findAll('input');
		await inputs[0]?.setValue('2026-02-01');
		await inputs[1]?.setValue('2026-02-10');

		const updatedValue = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date[] | undefined;
		expect(updatedValue?.[0]).toBeInstanceOf(Date);
		expect(updatedValue?.[1]).toBeInstanceOf(Date);
	});
});
