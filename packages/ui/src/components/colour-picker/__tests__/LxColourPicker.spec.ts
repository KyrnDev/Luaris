import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import LxColourPicker from '../LxColourPicker.vue';

describe('LxColourPicker', () => {
	it('updates colour value, supports format switching and copy', async () => {
		const clipboardWrite = vi.fn(async () => undefined);
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: clipboardWrite,
			},
			configurable: true,
		});

		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#000000', alpha: 1 },
			},
		});

		await wrapper.find('input[type="color"]').setValue('#ffffff');
		expect(wrapper.emitted('update:modelValue')?.length).toBeGreaterThan(0);
		await wrapper.findAll('.lx-colour-picker__format')[0]?.trigger('click');
		expect(wrapper.text()).toContain('#FFFFFF');
		expect(wrapper.find('.lx-tooltip__content').text()).toContain('Click to copy');
		await wrapper.find('.lx-colour-picker__output').trigger('click');
		expect(clipboardWrite).toHaveBeenCalled();
	});
});
