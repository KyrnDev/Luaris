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

		const modal = document.body.querySelector('.lx-modal') as HTMLElement;
		expect(modal).not.toBeNull();
		expect(modal.style.display).not.toBe('none');
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

	it('renders header/footer variants and panel style/class options', () => {
		const withoutHeader = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				showBackdrop: false,
				showClose: false,
				title: '',
				width: '',
				maxWidth: '',
			},
		});

		expect(document.body.querySelector('.lx-modal__backdrop')).toBeNull();
		const hiddenHeader = document.body.querySelector('.lx-modal__header') as HTMLElement;
		expect(hiddenHeader).not.toBeNull();
		expect(hiddenHeader.style.display).toBe('none');
		const panelWithoutHeader = document.body.querySelector('.lx-modal__panel') as HTMLElement;
		expect(panelWithoutHeader.getAttribute('aria-labelledby')).toBeNull();
		expect(panelWithoutHeader.getAttribute('style')).toContain('max-height: 80vh;');
		withoutHeader.unmount();

		const withHeaderFooter = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				title: 'Panel Title',
				showClose: true,
				panelClass: 'custom-panel',
				width: '32rem',
				maxWidth: '70vw',
			},
			slots: {
				footer: '<div class="modal-footer-content">Footer content</div>',
			},
		});

		const panel = document.body.querySelector('.lx-modal__panel') as HTMLElement;
		expect(panel.className).toContain('custom-panel');
		expect(panel.getAttribute('style')).toContain('width: 32rem;');
		expect(panel.getAttribute('style')).toContain('max-width: 70vw;');
		expect(document.body.querySelector('.lx-modal__header')).not.toBeNull();
		expect(document.body.querySelector('.lx-modal__footer')).not.toBeNull();
		withHeaderFooter.unmount();
	});

	it('closes from close button and Escape key only when enabled', async () => {
		const closeButtonWrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				title: 'Closable',
				showClose: true,
			},
		});

		const closeButton = document.body.querySelector('.lx-modal__header button[aria-label="Close modal"]') as HTMLButtonElement;
		closeButton.click();
		await closeButtonWrapper.vm.$nextTick();
		expect(closeButtonWrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false);
		expect(closeButtonWrapper.emitted('close')).toHaveLength(1);
		closeButtonWrapper.unmount();

		const escapeWrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				closeOnEscape: true,
			},
		});
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await escapeWrapper.vm.$nextTick();
		expect(escapeWrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(false);
		escapeWrapper.unmount();

		const noEscapeWrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				closeOnEscape: false,
			},
		});
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await noEscapeWrapper.vm.$nextTick();
		expect(noEscapeWrapper.emitted('update:modelValue')).toBeUndefined();
		noEscapeWrapper.unmount();
	});

	it('does not render when modelValue is false and renders after opening', async () => {
		const wrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: false,
				title: 'Closed initially',
			},
		});

		const modal = document.body.querySelector('.lx-modal') as HTMLElement;
		expect(modal).not.toBeNull();
		expect(modal.style.display).toBe('none');
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();

		await wrapper.setProps({
			modelValue: true,
		});

		expect(modal.style.display).not.toBe('none');
		expect(document.body.querySelector('.lx-modal__header')).not.toBeNull();
		wrapper.unmount();
	});

	it('renders header when showClose is true even without title', () => {
		const wrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				title: '',
				showClose: true,
			},
		});

		expect(document.body.querySelector('.lx-modal__header')).not.toBeNull();
		expect(document.body.querySelector('.lx-modal__header')?.textContent).toContain('');
		wrapper.unmount();
	});

	it('renders custom header slot content', () => {
		const wrapper = mount(LxModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				title: 'Default title',
			},
			slots: {
				header: '<div class="custom-modal-header">Custom Header</div>',
			},
		});

		expect(document.body.querySelector('.custom-modal-header')?.textContent).toContain('Custom Header');
		wrapper.unmount();
	});
});
