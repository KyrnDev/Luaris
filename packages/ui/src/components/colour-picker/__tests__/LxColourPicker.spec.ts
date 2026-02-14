import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxColourPicker from '../LxColourPicker.vue';

describe('LxColourPicker', () => {
	it('updates colour value and emits change', async () => {
		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#000000', alpha: 1 },
			},
		});

		await wrapper.find('input[type="color"]').setValue('#ffffff');
		expect(wrapper.emitted('update:modelValue')?.length).toBeGreaterThan(0);
		expect(wrapper.text()).toContain('rgba(');
	});
});
