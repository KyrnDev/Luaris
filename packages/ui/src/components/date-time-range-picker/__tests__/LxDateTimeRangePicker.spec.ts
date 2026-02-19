import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDateTimeRangePicker from '../LxDateTimeRangePicker.vue';

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
});
