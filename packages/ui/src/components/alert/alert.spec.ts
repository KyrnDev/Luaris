import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxAlert from './LxAlert.vue';

describe('LxAlert', () => {
	it('computes CSS variable values from the current props', () => {
		const wrapper = mount(LxAlert, {
			props: {
				variant: 'success',
				size: 'lg',
				contentPadding: 'xl',
				borderRadius: 'lg',
				borderWidth: 'thick',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlGap: string,
				getContentPadding: string,
				getBorderRadius: string,
				getBorderWidth: string,
				getBorderColour: string,
				getAccentColour: string,
			},
		}).setupState;

		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlGap).toBe('var(--lx-size-control-gap-lg)');
		expect(setupState.getContentPadding).toBe('var(--lx-size-space-xl)');
		expect(setupState.getBorderRadius).toBe('var(--lx-size-radius-lg)');
		expect(setupState.getBorderWidth).toBe('var(--lx-size-border-width-thick)');
		expect(setupState.getBorderColour).toBe('var(--lx-colour-success)');
		expect(setupState.getAccentColour).toBe('var(--lx-colour-success)');
	});

	it('assigns alert semantics to warning and danger variants', () => {
		const wrapper = mount(LxAlert, {
			props: {
				variant: 'warning',
				title: 'Warning',
			},
		});
		const root = wrapper.get('.lx-alert');

		expect(root.attributes('role')).toBe('alert');
		expect(root.attributes('aria-live')).toBe('assertive');
		expect(root.attributes('aria-atomic')).toBe('true');
	});

	it('assigns status semantics to info variants by default', () => {
		const wrapper = mount(LxAlert, {
			props: {
				variant: 'info',
				title: 'Info',
			},
		});
		const root = wrapper.get('.lx-alert');

		expect(root.attributes('role')).toBe('status');
		expect(root.attributes('aria-live')).toBe('polite');
	});

	it('uses default state icons when no icon is provided', () => {
		const wrapper = mount(LxAlert, {
			props: {
				variant: 'danger',
				title: 'Failed',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				resolvedIcon: string,
			},
		}).setupState;

		expect(setupState.resolvedIcon).toBe('circle-xmark');
		expect(wrapper.find('.lx-alert__icon').exists()).toBe(true);
	});

	it('allows the default state icon to be overridden', () => {
		const wrapper = mount(LxAlert, {
			props: {
				variant: 'warning',
				icon: 'fa-regular fa-bell',
				title: 'Custom',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				resolvedIcon: string,
			},
		}).setupState;

		expect(setupState.resolvedIcon).toBe('fa-regular fa-bell');
	});

	it('prefers the content slot over the default slot and content prop', () => {
		const wrapper = mount(LxAlert, {
			props: {
				content: 'Prop content',
			},
			slots: {
				default: '<p class="default-content">Default content</p>',
				content: '<p class="named-content">Named content</p>',
			},
		});

		expect(wrapper.find('.named-content').exists()).toBe(true);
		expect(wrapper.find('.default-content').exists()).toBe(false);
		expect(wrapper.text()).not.toContain('Prop content');
	});
});
