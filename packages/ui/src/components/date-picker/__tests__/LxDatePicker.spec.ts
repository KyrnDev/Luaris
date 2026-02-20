import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDatePicker from '../LxDatePicker.vue';

describe('LxDatePicker', () => {
	it('emits date changes', async () => {
		const wrapper = mount(LxDatePicker, {
			props: {
				modelValue: null,
			},
		});

		await wrapper.find('input').setValue('2026-02-13');
		const updatedValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date | undefined;
		expect(updatedValue).toBeInstanceOf(Date);
		expect(updatedValue?.toISOString().slice(0, 10)).toBe('2026-02-13');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBeInstanceOf(Date);
	});

	it('uses explicit id, name and aria-label attrs when provided', () => {
		const wrapper = mount(LxDatePicker, {
			attrs: {
				id: 'birth-date',
				name: 'birthDate',
				'aria-label': 'Birth date',
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('id')).toBe('birth-date');
		expect(input.attributes('name')).toBe('birthDate');
		expect(input.attributes('aria-label')).toBe('Birth date');
	});

	it('parses invalid and empty dates safely', () => {
		const wrapper = mount(LxDatePicker);
		const api = (wrapper.vm as {
			$: {
				setupState: {
					parseDateFromInput: (dateText: string) => Date | null,
				},
			},
		}).$.setupState;

		expect(api.parseDateFromInput('')).toBeNull();
		expect(api.parseDateFromInput('2026-00-13')).toBeNull();
		expect(api.parseDateFromInput('Infinity-01-01')).toBeNull();
		expect(api.parseDateFromInput('2026-02-13')).toBeInstanceOf(Date);
	});
});
