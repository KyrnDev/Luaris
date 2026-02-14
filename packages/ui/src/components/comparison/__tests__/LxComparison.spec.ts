import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxComparison from '../LxComparison.vue';

describe('LxComparison', () => {
	it('updates split model via range input', async () => {
		const wrapper = mount(LxComparison, {
			props: {
				modelValue: 40,
			},
		});

		await wrapper.find('input[type="range"]').setValue(70);
		const updateEvents = wrapper.emitted('update:modelValue') || [];
		expect(updateEvents[updateEvents.length - 1]?.[0]).toBe(70);
	});
});
