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
});
