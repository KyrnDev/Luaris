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
			attachTo: document.body,
			attrs: {
				id: 'popup-colour-id',
				name: 'popup-colour-name',
				'aria-label': 'Popup colour',
			},
			props: {
				popup: true,
				modelValue: { hex: '#123456', alpha: 0.5 },
			},
		});

		const modal = document.body.querySelector('.lx-modal') as HTMLElement;
			expect(modal).not.toBeNull();
			expect(modal.style.display).toBe('none');
			await wrapper.find('.lx-colour-picker__trigger').trigger('click');
			await wrapper.vm.$nextTick();
			expect(modal.style.display).not.toBe('none');

			const popupColourInput = document.body.querySelector<HTMLInputElement>('.lx-modal input[type="color"]');
			expect(popupColourInput).not.toBeNull();
			expect(popupColourInput?.id).toBe('popup-colour-id');
			expect(popupColourInput?.name).toBe('popup-colour-name');
			expect(popupColourInput?.getAttribute('aria-label')).toBe('Popup colour');
			popupColourInput!.value = '#654321';
			popupColourInput!.dispatchEvent(new Event('input', { bubbles: true }));

			const popupAlpha = document.body.querySelector<HTMLInputElement>('.lx-modal input[aria-label="Alpha"]');
			expect(popupAlpha).not.toBeNull();
			popupAlpha!.value = '0.25';
			popupAlpha!.dispatchEvent(new Event('input', { bubbles: true }));

			const popupFormats = document.body.querySelectorAll<HTMLButtonElement>('.lx-modal .lx-colour-picker__format');
			popupFormats[0]?.click();
			await wrapper.vm.$nextTick();
			expect(document.body.textContent).toContain('HEX');

			const modalComponent = wrapper.findComponent({ name: 'LxModal' });
			modalComponent.vm.$emit('update:modelValue', false);
			await wrapper.vm.$nextTick();
			expect(modal.style.display).toBe('none');
			wrapper.unmount();
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

	it('clamps alpha and handles clipboard copy failures', async () => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: vi.fn(async () => {
					throw new Error('copy failed');
				}),
			},
			configurable: true,
		});

		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#00ff00', alpha: 0.5 },
				formats: ['hsla', 'hsl'],
				defaultFormat: 'hsla',
			},
		});

		await wrapper.find('input[aria-label="Alpha"]').setValue('2');
		const updated = wrapper.emitted('update:modelValue')?.some(payload => payload[0]?.alpha === 1);
		expect(updated).toBe(true);

			await wrapper.find('.lx-colour-picker__output').trigger('click');
			expect(wrapper.find('.lx-colour-picker__output').text()).toContain('hsl(');
			expect(wrapper.find('.lx-tooltip__content').text()).toContain('Click to copy');
		});

	it('supports hsl output, copied timeout reset, and alpha clamping from prop updates', async () => {
		vi.useFakeTimers();
		const clipboardWrite = vi.fn(async () => undefined);
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: clipboardWrite,
			},
			configurable: true,
		});

		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#336699', alpha: 0.5 },
				formats: ['hsl', 'rgba'],
				defaultFormat: 'hsl',
			},
		});

		expect(wrapper.find('.lx-colour-picker__output').text()).toContain('hsl(');
		await wrapper.find('.lx-colour-picker__output').trigger('click');
		expect(wrapper.find('.lx-tooltip__content').text()).toContain('Copied');
		vi.advanceTimersByTime(1200);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-tooltip__content').text()).toContain('Click to copy');

		await wrapper.setProps({
			modelValue: { hex: '#336699', alpha: -2 },
		});
		await wrapper.vm.$nextTick();
		const clamped = wrapper.emitted('update:modelValue')?.some(payload => payload[0]?.alpha === 0);
		expect(clamped).toBe(true);
		expect(clipboardWrite).toHaveBeenCalled();

		vi.useRealTimers();
	});

	it('handles negative hue normalisation and empty formats fallback', async () => {
		const wrapper = mount(LxColourPicker, {
			props: {
				modelValue: { hex: '#ff00ff', alpha: 1 },
				formats: [],
				defaultFormat: 'hex',
			},
		});

		expect(wrapper.find('.lx-colour-picker__output').text()).toContain('rgba(255, 0, 255, 1)');

		await wrapper.setProps({
			modelValue: { hex: '#ff00ff', alpha: 1 },
			formats: ['hsl'],
			defaultFormat: 'hsl',
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-colour-picker__output').text()).toContain('hsl(300 100% 50%)');
	});

	it('supports popup mode with alpha hidden', async () => {
		const wrapper = mount(LxColourPicker, {
			attachTo: document.body,
			props: {
				popup: true,
				showAlpha: false,
				modelValue: { hex: '#123456', alpha: 1 },
			},
		});

		await wrapper.find('.lx-colour-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();
		expect(document.body.querySelector('.lx-modal input[aria-label="Alpha"]')).toBeNull();
		wrapper.unmount();
	});
});
