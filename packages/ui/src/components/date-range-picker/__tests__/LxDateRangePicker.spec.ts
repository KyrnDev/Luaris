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

	it('clears start and end values when inputs are emptied', async () => {
		const wrapper = mount(LxDateRangePicker, {
			props: {
				modelValue: [
					new Date(2026, 1, 1),
					new Date(2026, 1, 10),
				],
			},
		});

		const api = (wrapper.vm as {
			$: {
				setupState: {
					startDate: string,
					endDate: string,
				},
			},
		}).$.setupState;

		api.endDate = '';
		api.startDate = '';
		await wrapper.vm.$nextTick();

		const updatedValue = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date[] | undefined;
		expect(updatedValue).toEqual([]);
	});

	it('parses invalid date inputs safely', () => {
		const wrapper = mount(LxDateRangePicker);
		const api = (wrapper.vm as {
			$: {
				setupState: {
					parseDateFromInput: (value: string) => Date | undefined,
				},
			},
		}).$.setupState;

		expect(api.parseDateFromInput('2026-00-12')).toBeUndefined();
		expect(api.parseDateFromInput('Infinity-01-01')).toBeUndefined();
		expect(api.parseDateFromInput('2026-12-31')).toBeInstanceOf(Date);
	});
});
