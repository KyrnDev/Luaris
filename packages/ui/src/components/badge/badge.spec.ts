import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxBadge from './LxBadge.vue';

describe('LxBadge', () => {
	it('computes CSS variable values from the current props', () => {
		const wrapper = mount(LxBadge, {
			props: {
				variant: 'success',
				size: 'lg',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingInline: string,
				getControlPaddingBlock: string,
				getVariant: string,
				getTextColour: string,
			},
		}).setupState;

		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingInline).toBe('var(--lx-size-control-padding-inline-lg)');
		expect(setupState.getControlPaddingBlock).toBe('var(--lx-size-control-padding-block-lg)');
		expect(setupState.getVariant).toBe('var(--lx-colour-success)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-success)');
	});

	it('renders with default classes when no props are provided', () => {
		const wrapper = mount(LxBadge);
		const badge = wrapper.get('.lx-badge');
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingInline: string,
				getControlPaddingBlock: string,
				getVariant: string,
				getTextColour: string,
			},
		}).setupState;

		expect(badge.classes()).toContain('lx-badge');
		expect(badge.text()).toBe('');
		expect(setupState.getSize).toBe('var(--lx-font-size-md)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-md)');
		expect(setupState.getControlPaddingInline).toBe('var(--lx-size-control-padding-inline-md)');
		expect(setupState.getControlPaddingBlock).toBe('var(--lx-size-control-padding-block-md)');
		expect(setupState.getVariant).toBe('var(--lx-colour-primary)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-primary)');
	});

	it('renders the label prop content', () => {
		const wrapper = mount(LxBadge, {
			props: {
				label: 'Beta',
			},
		});

		expect(wrapper.get('.lx-badge').text()).toBe('Beta');
	});

	it('applies custom variant and size token values', () => {
		const wrapper = mount(LxBadge, {
			props: {
				label: 'New',
				variant: 'success',
				size: 'lg',
			},
		});
		const badge = wrapper.get('.lx-badge');
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingInline: string,
				getControlPaddingBlock: string,
				getVariant: string,
				getTextColour: string,
			},
		}).setupState;

		expect(badge.text()).toBe('New');
		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingInline).toBe('var(--lx-size-control-padding-inline-lg)');
		expect(setupState.getControlPaddingBlock).toBe('var(--lx-size-control-padding-block-lg)');
		expect(setupState.getVariant).toBe('var(--lx-colour-success)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-success)');
	});

	it('renders default slot content after the label', () => {
		const wrapper = mount(LxBadge, {
			props: {
				label: 'Inbox',
			},
			slots: {
				default: '<strong>3</strong>',
			},
		});
		const badge = wrapper.get('.lx-badge');

		expect(badge.text()).toContain('Inbox');
		expect(badge.text()).toContain('3');
		expect(badge.html()).toContain('<strong>3</strong>');
	});

	it('renders slot content on its own when label is omitted', () => {
		const wrapper = mount(LxBadge, {
			slots: {
				default: '<span class="count">7</span>',
			},
		});
		const badge = wrapper.get('.lx-badge');

		expect(badge.text()).toBe('7');
		expect(badge.find('.count').exists()).toBe(true);
	});

	it('updates token values and text when props change', async () => {
		const wrapper = mount(LxBadge, {
			props: {
				label: 'Draft',
				variant: 'warning',
				size: 'sm',
			},
		});

		await wrapper.setProps({
			label: 'Published',
			variant: 'danger',
			size: 'lg',
		});

		const badge = wrapper.get('.lx-badge');
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingInline: string,
				getControlPaddingBlock: string,
				getVariant: string,
				getTextColour: string,
			},
		}).setupState;

		expect(badge.text()).toBe('Published');
		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingInline).toBe('var(--lx-size-control-padding-inline-lg)');
		expect(setupState.getControlPaddingBlock).toBe('var(--lx-size-control-padding-block-lg)');
		expect(setupState.getVariant).toBe('var(--lx-colour-danger)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-danger)');
	});
});
