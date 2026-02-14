import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDateRangePicker from '../LxDateRangePicker.vue';

describe('LxDateRangePicker', () => {
	it('updates range object model', async () => {
		const wrapper = mount(LxDateRangePicker, {
			props: {
				modelValue: { start: '', end: '' },
			},
		});

		const inputs = wrapper.findAll('input');
		await inputs[0]?.setValue('2026-02-01');
		await inputs[1]?.setValue('2026-02-10');

		expect(wrapper.emitted('update:modelValue')?.length).toBeGreaterThan(0);
	});
});
