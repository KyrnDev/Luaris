import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxNumberInput from '../LxNumberInput.vue';

describe('LxNumberInput', () => {
	it('nudge controls adjust value with step', async () => {
		const wrapper = mount(LxNumberInput, {
			props: {
				modelValue: 2,
				step: 2,
			},
		});

		await wrapper.find('button[aria-label="Increase value"]').trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(4);
	});
});
