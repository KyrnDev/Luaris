import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import LxResizable from '../LxResizable.vue';

describe('LxResizable', () => {
	it('resizes with pointer events and emits model update on end', async () => {
		let scheduled: FrameRequestCallback | null = null;
		vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
			scheduled = cb;
			return 1;
		});
		vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

		const wrapper = mount(LxResizable, {
			props: {
				'modelValue': { width: 300, height: 200 },
				'onUpdate:modelValue': (value: { width: number, height: number }) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				default: '<div>panel</div>',
			},
		});

		const handle = wrapper.find('.lx-resizable__handle').element as HTMLElement;
		handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 100, clientY: 100 }));
		document.dispatchEvent(new PointerEvent('pointermove', { clientX: 180, clientY: 150 }));
		scheduled?.(10);
		document.dispatchEvent(new PointerEvent('pointerup'));
		scheduled?.(20);
		await wrapper.vm.$nextTick();
		const value = wrapper.props('modelValue') as { width: number, height: number };
		expect(value.width).toBeGreaterThan(300);
		expect(value.height).toBeGreaterThan(200);
	});

	it('respects orientation modes', async () => {
		const wrapper = mount(LxResizable, {
			props: {
				'modelValue': { width: 300, height: 200 },
				'mode': 'vertical',
				'onUpdate:modelValue': (value: { width: number, height: number }) => wrapper.setProps({ modelValue: value }),
			},
		});
		const handle = wrapper.find('.lx-resizable__handle').element as HTMLElement;
		handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }));
		document.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, clientY: 100 }));
		document.dispatchEvent(new PointerEvent('pointerup'));
		await wrapper.vm.$nextTick();
		const value = wrapper.props('modelValue') as { width: number, height: number };
		expect(value.width).toBe(300);
		expect(value.height).toBeGreaterThan(200);
	});

	it('covers horizontal mode and empty pending frame commit path', async () => {
		let callback: FrameRequestCallback | null = null;
		vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
			callback = cb;
			return 2;
		});
		vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

		const wrapper = mount(LxResizable, {
			props: {
				'modelValue': { width: 300, height: 200 },
				'mode': 'horizontal',
				'onUpdate:modelValue': (value: { width: number, height: number }) => wrapper.setProps({ modelValue: value }),
			},
		});
		const handle = wrapper.find('.lx-resizable__handle').element as HTMLElement;
		handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 10 }));
		document.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 80 }));
		document.dispatchEvent(new PointerEvent('pointermove', { clientX: 60, clientY: 90 }));
		document.dispatchEvent(new PointerEvent('pointerup'));
		callback?.(16);
		await wrapper.vm.$nextTick();
		const value = wrapper.props('modelValue') as { width: number, height: number };
		expect(value.width).toBeGreaterThan(300);
		expect(value.height).toBe(200);
	});
});
