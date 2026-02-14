import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDrawer from '../LxDrawer.vue';

describe('LxDrawer', () => {
	it('renders when open and emits close on outside click', async () => {
		const wrapper = mount(LxDrawer, {
			attachTo: globalThis.document.body,
			props: {
				modelValue: true,
				title: 'Drawer',
			},
		});

		const backdrop = document.body.querySelector('.lx-modal__backdrop');
		expect(backdrop).not.toBeNull();
		(backdrop as HTMLButtonElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false);
		expect(wrapper.emitted('close')).toHaveLength(1);
		wrapper.unmount();
	});

	it('closes on Escape when enabled and ignores when disabled', async () => {
		const enabled = mount(LxDrawer, {
			attachTo: document.body,
			props: {
				modelValue: true,
				closeOnEscape: true,
				closeOnBackdrop: false,
			},
		});

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await enabled.vm.$nextTick();
		expect(enabled.emitted('close')).toHaveLength(1);
		enabled.unmount();

		const disabled = mount(LxDrawer, {
			attachTo: document.body,
			props: {
				modelValue: true,
				closeOnEscape: false,
				closeOnBackdrop: false,
			},
		});

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await disabled.vm.$nextTick();
		expect(disabled.emitted('close')).toBeUndefined();
		disabled.unmount();
	});

	it('does not render drawer shell when modelValue is false', () => {
		const wrapper = mount(LxDrawer, {
			attachTo: document.body,
			props: {
				modelValue: false,
				side: 'left',
			},
		});

		expect(document.body.querySelector('.lx-modal')).toBeNull();
		wrapper.unmount();
	});

	it('toggles visibility when modelValue changes', async () => {
		const wrapper = mount(LxDrawer, {
			attachTo: document.body,
			props: {
				modelValue: false,
			},
		});

		expect(document.body.querySelector('.lx-modal')).toBeNull();
		await wrapper.setProps({ modelValue: true });
		expect(document.body.querySelector('.lx-modal')).not.toBeNull();
		wrapper.unmount();
	});

	it('emits close when close button is clicked', async () => {
		const wrapper = mount(LxDrawer, {
			attachTo: document.body,
			props: {
				modelValue: true,
				title: 'Drawer',
			},
		});

		const closeButton = document.body.querySelector('.lx-drawer__close-button');
		expect(closeButton).not.toBeNull();
		(closeButton as HTMLButtonElement).click();
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false);
		expect(wrapper.emitted('close')).toHaveLength(1);
		wrapper.unmount();
	});

	it('applies side and animation classes', () => {
		const wrapper = mount(LxDrawer, {
			attachTo: document.body,
			props: {
				modelValue: true,
				side: 'top',
				animation: 'slide',
			},
		});

		const drawer = document.body.querySelector('.lx-modal');
		expect(drawer?.className).toContain('lx-modal--top');
		expect(drawer?.className).toContain('lx-modal--slide');
		wrapper.unmount();
	});
});
