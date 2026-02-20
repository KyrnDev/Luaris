import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDateTimeRangePicker from '../LxDateTimeRangePicker.vue';
import { LxDateRangePicker } from '../../date-range-picker';
import { LxTimeRangePicker } from '../../time-range-picker';

describe('LxDateTimeRangePicker', () => {
	it('updates combined range model from composed controls', async () => {
		const wrapper = mount(LxDateTimeRangePicker, {
			props: {
				modelValue: [],
			},
		});

		const inputs = wrapper.findAll('input');
		await inputs[0]?.setValue('2026-04-01');
		await inputs[1]?.setValue('2026-04-10');
		await inputs[2]?.setValue('09:00');
		await inputs[3]?.setValue('17:30');

		const updates = wrapper.emitted('update:modelValue');
		expect(updates?.length).toBeGreaterThan(0);
		const updatedRange = updates?.at(-1)?.[0] as Date[] | undefined;
		expect(updatedRange?.[0]).toBeInstanceOf(Date);
		expect(updatedRange?.[1]).toBeInstanceOf(Date);
		expect(updatedRange?.[0]?.getHours()).toBe(9);
		expect(updatedRange?.[1]?.getHours()).toBe(17);
		expect(updatedRange?.[1]?.getMinutes()).toBe(30);
	});

	it('passes constraints to inner range pickers', () => {
		const wrapper = mount(LxDateTimeRangePicker, {
			props: {
				modelValue: [],
				dateMin: '2026-01-01',
				dateMax: '2026-12-31',
				timeMin: '08:00',
				timeMax: '20:00',
				timeStep: 300,
			},
		});

		const inputs = wrapper.findAll('input');
		expect(inputs[0]?.attributes('min')).toBe('2026-01-01');
		expect(inputs[1]?.attributes('max')).toBe('2026-12-31');
		expect(inputs[2]?.attributes('min')).toBe('08:00');
		expect(inputs[3]?.attributes('max')).toBe('20:00');
		expect(inputs[2]?.attributes('step')).toBe('300');
		expect(inputs[3]?.attributes('step')).toBe('300');
	});

	it('merges updated date and time ranges from child updates', async () => {
		const wrapper = mount(LxDateTimeRangePicker, {
			props: {
				modelValue: [
					new Date(2026, 3, 1, 9, 0),
					new Date(2026, 3, 10, 17, 30),
				],
			},
		});

		wrapper.findComponent(LxDateRangePicker).vm.$emit('update:modelValue', [
			new Date(2026, 4, 5),
			new Date(2026, 4, 8),
		]);
		await wrapper.vm.$nextTick();

		wrapper.findComponent(LxTimeRangePicker).vm.$emit('update:modelValue', ['08:15', '18:45']);
		await wrapper.vm.$nextTick();

		const updatedRange = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date[] | undefined;
		expect(updatedRange?.[0]?.getFullYear()).toBe(2026);
		expect(updatedRange?.[0]?.getMonth()).toBe(4);
		expect(updatedRange?.[0]?.getDate()).toBe(5);
		expect(updatedRange?.[0]?.getHours()).toBe(8);
		expect(updatedRange?.[0]?.getMinutes()).toBe(15);
		expect(updatedRange?.[1]?.getFullYear()).toBe(2026);
		expect(updatedRange?.[1]?.getMonth()).toBe(4);
		expect(updatedRange?.[1]?.getDate()).toBe(8);
		expect(updatedRange?.[1]?.getHours()).toBe(18);
		expect(updatedRange?.[1]?.getMinutes()).toBe(45);
	});

	it('ignores invalid time text when merging date-time values', async () => {
		const wrapper = mount(LxDateTimeRangePicker, {
			props: {
				modelValue: [
					new Date(2026, 5, 1, 9, 0),
					new Date(2026, 5, 2, 10, 0),
				],
			},
		});

		wrapper.findComponent(LxTimeRangePicker).vm.$emit('update:modelValue', ['aa:bb', '12:30']);
		await wrapper.vm.$nextTick();

		const updatedRange = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date[] | undefined;
		expect(updatedRange?.[0]).toBeUndefined();
		expect(updatedRange?.[1]).toBeInstanceOf(Date);
		expect(updatedRange?.[1]?.getHours()).toBe(12);
		expect(updatedRange?.[1]?.getMinutes()).toBe(30);
	});

	it('handles partial updates when one side of the range is missing or invalid', async () => {
		const wrapper = mount(LxDateTimeRangePicker, {
			props: {
				modelValue: [
					new Date(2026, 6, 1, 9, 0),
					new Date(2026, 6, 2, 10, 0),
				],
			},
		});

		wrapper.findComponent(LxDateRangePicker).vm.$emit('update:modelValue', [
			undefined,
			new Date(2026, 6, 5),
		] as unknown as Date[]);
		await wrapper.vm.$nextTick();

		wrapper.findComponent(LxTimeRangePicker).vm.$emit('update:modelValue', ['09:30', 'not-a-time']);
		await wrapper.vm.$nextTick();

		const updatedRange = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Date[] | undefined;
		expect(updatedRange?.[0]).toBeUndefined();
		expect(updatedRange?.[1]).toBeUndefined();
	});
});
