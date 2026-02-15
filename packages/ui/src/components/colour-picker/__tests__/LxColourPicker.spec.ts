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

	it('supports popup mode and opens modal panel', async () => {
		const wrapper = mount(LxColourPicker, {
			props: {
				popup: true,
				modelValue: { hex: '#123456', alpha: 0.5 },
			},
		});

		expect(document.body.querySelector('.lx-modal')).toBeNull();
		await wrapper.find('.lx-colour-picker__trigger').trigger('click');
		expect(document.body.querySelector('.lx-modal')).not.toBeNull();
	});

	it('falls back to first format when default is unavailable', async () => {
		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#ff0000', alpha: 1 },
				formats: ['hex'],
				defaultFormat: 'rgba',
				showAlpha: false,
			},
		});

		expect(wrapper.find('.lx-colour-picker__alpha').exists()).toBe(false);
		expect(wrapper.find('.lx-colour-picker__output').text()).toContain('#FF0000');
	});

	it('uses copy fallback when clipboard api is unavailable', async () => {
		Object.defineProperty(navigator, 'clipboard', {
			value: undefined,
			configurable: true,
		});
		Object.defineProperty(document, 'execCommand', {
			value: vi.fn(() => true),
			configurable: true,
		});

		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#abcdef', alpha: 1 },
				formats: ['rgb'],
				defaultFormat: 'rgb',
			},
		});

		await wrapper.find('.lx-colour-picker__output').trigger('click');
		expect(document.execCommand).toHaveBeenCalledWith('copy');
	});
});
