import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDateTimePicker from '../LxDateTimePicker.vue';

describe('LxDateTimePicker', () => {
	it('updates date/time model from composed inputs', async () => {
		const wrapper = mount(LxDateTimePicker, {
			props: {
				modelValue: null,
			},
		});

		const inputs = wrapper.findAll('input');
		await inputs[0]?.setValue('2026-03-15');
		await inputs[1]?.setValue('14:45');

		const updates = wrapper.emitted('update:modelValue');
		expect(updates?.length).toBeGreaterThan(0);
		const updatedValue = updates?.at(-1)?.[0] as Date | undefined;
		expect(updatedValue).toBeInstanceOf(Date);
		expect(updatedValue?.getFullYear()).toBe(2026);
		expect(updatedValue?.getMonth()).toBe(2);
		expect(updatedValue?.getDate()).toBe(15);
		expect(updatedValue?.getHours()).toBe(14);
		expect(updatedValue?.getMinutes()).toBe(45);
	});

	it('passes prop constraints to child controls', () => {
		const wrapper = mount(LxDateTimePicker, {
			props: {
				modelValue: null,
				dateMin: '2026-01-01',
				dateMax: '2026-12-31',
				timeMin: '08:00',
				timeMax: '20:00',
				timeStep: 300,
			},
		});

		const inputs = wrapper.findAll('input');
		expect(inputs[0]?.attributes('min')).toBe('2026-01-01');
		expect(inputs[0]?.attributes('max')).toBe('2026-12-31');
		expect(inputs[1]?.attributes('min')).toBe('08:00');
		expect(inputs[1]?.attributes('max')).toBe('20:00');
		expect(inputs[1]?.attributes('step')).toBe('300');
	});

	it('returns null when merge inputs are invalid', async () => {
		const wrapper = mount(LxDateTimePicker, {
			props: {
				modelValue: null,
			},
		});

		const api = (wrapper.vm as {
			$: {
				setupState: {
					mergeDateAndTime: (dateValue: Date | null, timeText: string) => Date | null,
				},
			},
		}).$.setupState;

		expect(api.mergeDateAndTime(null, '12:30')).toBeNull();
		expect(api.mergeDateAndTime(new Date(2026, 7, 20), '')).toBeNull();
		expect(api.mergeDateAndTime(new Date(2026, 7, 20), 'aa:bb')).toBeNull();
	});
});
