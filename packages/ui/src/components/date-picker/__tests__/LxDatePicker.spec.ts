import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDatePicker from '../LxDatePicker.vue';

describe('LxDatePicker', () => {
	it('emits date changes', async () => {
		const wrapper = mount(LxDatePicker, {
			props: {
				modelValue: '',
			},
		});

		await wrapper.find('input').setValue('2026-02-13');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('2026-02-13');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe('2026-02-13');
	});
});
