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
				getControlPaddingX: string,
				getVariant: string,
				getTextColour: string,
			},
		}).setupState;

		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingX).toBe('var(--lx-size-control-padding-x-lg)');
		expect(setupState.getVariant).toBe('var(--lx-colour-success)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-success)');
	});

	it('renders with default classes when no props are provided', () => {
		const wrapper = mount(LxBadge);
		const badge = wrapper.get('.lx-badge');

		expect(badge.classes()).toContain('lx-badge');
		expect(badge.classes()).toContain('lx-badge--primary');
		expect(badge.classes()).toContain('lx-badge--md');
		expect(badge.text()).toBe('');
	});

	it('renders the label prop content', () => {
		const wrapper = mount(LxBadge, {
			props: {
				label: 'Beta',
			},
		});

		expect(wrapper.get('.lx-badge').text()).toBe('Beta');
	});

	it('applies custom variant and size classes', () => {
		const wrapper = mount(LxBadge, {
			props: {
				label: 'New',
				variant: 'success',
				size: 'lg',
			},
		});
		const badge = wrapper.get('.lx-badge');

		expect(badge.classes()).toContain('lx-badge--success');
		expect(badge.classes()).toContain('lx-badge--lg');
		expect(badge.text()).toBe('New');
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

	it('updates classes and text when props change', async () => {
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
				getControlPaddingX: string,
				getVariant: string,
				getTextColour: string,
			},
		}).setupState;

		expect(badge.classes()).toContain('lx-badge--danger');
		expect(badge.classes()).toContain('lx-badge--lg');
		expect(badge.classes()).not.toContain('lx-badge--warning');
		expect(badge.classes()).not.toContain('lx-badge--sm');
		expect(badge.text()).toBe('Published');
		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingX).toBe('var(--lx-size-control-padding-x-lg)');
		expect(setupState.getVariant).toBe('var(--lx-colour-danger)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-danger)');
	});
});
