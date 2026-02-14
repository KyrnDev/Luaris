import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSlider from '../LxSlider.vue';

describe('LxSlider', () => {
	it('emits model and change on value update', async () => {
		const wrapper = mount(LxSlider, {
			props: {
				modelValue: 10,
			},
		});

		await wrapper.find('input').setValue(50);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(50);
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(50);
	});
});
