import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxModal from '../LxModal.vue';

describe('LxModal', () => {
	it('renders when open and closes on outside click when enabled', async () => {
		const wrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				closeOnBackdrop: true,
				title: 'Test Modal',
			},
		});

		expect(document.body.querySelector('.lx-modal')).not.toBeNull();
		const backdrop = document.body.querySelector('.lx-modal__backdrop') as HTMLButtonElement;
		backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false);
		expect(wrapper.emitted('close')).toHaveLength(1);
		wrapper.unmount();
	});

	it('applies position and animation classes', () => {
		const wrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				position: 'bottom',
				animation: 'slide',
			},
		});

		const root = document.body.querySelector('.lx-modal');
		expect(root?.className).toContain('lx-modal--bottom');
		expect(root?.className).toContain('lx-modal--slide');
		wrapper.unmount();
	});

	it('does not close on outside click when closeOnBackdrop is false', async () => {
		const wrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				closeOnBackdrop: false,
			},
		});

		const backdrop = document.body.querySelector('.lx-modal__backdrop') as HTMLButtonElement;
		backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		wrapper.unmount();
	});
});
