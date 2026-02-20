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

	it('uses generated id/name and default aria label when attrs are not provided', () => {
		const wrapper = mount(LxTimePicker, {
			props: {
				modelValue: '',
			},
		});

		const input = wrapper.find('input');
		const generatedId = input.attributes('id');
		expect(generatedId).toMatch(/^lx-time-picker-/);
		expect(input.attributes('name')).toBe(generatedId);
		expect(input.attributes('aria-label')).toBe('Time');
		expect(input.attributes('step')).toBe('60');
	});

	it('prefers provided id/name/aria-label attrs and supports disabled input', () => {
		const wrapper = mount(LxTimePicker, {
			attrs: {
				'id': 'meeting-time',
				'name': 'meetingTime',
				'aria-label': 'Meeting time',
			},
			props: {
				modelValue: '12:00',
				disabled: true,
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('id')).toBe('meeting-time');
		expect(input.attributes('name')).toBe('meetingTime');
		expect(input.attributes('aria-label')).toBe('Meeting time');
		expect(input.attributes('disabled')).toBeDefined();
	});
});
