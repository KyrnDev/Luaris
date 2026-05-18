import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDetails from './LxDetails.vue';

describe('LxDetails', () => {
	it('computes CSS variable values from the current props', () => {
		const wrapper = mount(LxDetails, {
			props: {
				variant: 'success',
				size: 'lg',
				contentPadding: 'xl',
				contentBackgroundColour: 'sunken',
				borderRadius: 'lg',
				borderWidth: 'thick',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingInline: string,
				getControlPaddingBlock: string,
				getControlGap: string,
				getContentPadding: string,
				getBorderRadius: string,
				getBorderWidth: string,
				getSummaryBackground: string,
				getSummaryTextColour: string,
				getContentBackground: string,
			},
		}).setupState;

		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingInline).toBe('var(--lx-size-control-padding-inline-lg)');
		expect(setupState.getControlPaddingBlock).toBe('var(--lx-size-control-padding-block-lg)');
		expect(setupState.getControlGap).toBe('var(--lx-size-control-gap-lg)');
		expect(setupState.getContentPadding).toBe('var(--lx-size-space-xl)');
		expect(setupState.getBorderRadius).toBe('var(--lx-size-radius-lg)');
		expect(setupState.getBorderWidth).toBe('var(--lx-size-border-width-thick)');
		expect(setupState.getSummaryBackground).toBe('var(--lx-colour-success)');
		expect(setupState.getSummaryTextColour).toBe('var(--lx-colour-on-success)');
		expect(setupState.getContentBackground).toBe('var(--lx-colour-surface-sunken)');
	});

	it('uses surface tokens for surface variants', () => {
		const wrapper = mount(LxDetails, {
			props: {
				variant: 'raised',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSummaryBackground: string,
				getSummaryTextColour: string,
			},
		}).setupState;

		expect(setupState.getSummaryBackground).toBe('var(--lx-colour-surface-raised)');
		expect(setupState.getSummaryTextColour).toBe('var(--lx-colour-text)');
	});

	it('makes the transparent variant actually transparent and borderless by default', () => {
		const wrapper = mount(LxDetails, {
			props: {
				variant: 'transparent',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSummaryBackground: string,
				getSummaryTextColour: string,
				getContentBackground: string,
				getBorderWidth: string,
			},
		}).setupState;

		expect(setupState.getSummaryBackground).toBe('var(--lx-colour-transparent)');
		expect(setupState.getSummaryTextColour).toBe('var(--lx-colour-on-transparent)');
		expect(setupState.getContentBackground).toBe('var(--lx-colour-transparent)');
		expect(setupState.getBorderWidth).toBe('0');
	});

	it('renders summary content in the expected order', () => {
		const wrapper = mount(LxDetails, {
			props: {
				title: 'Account',
				icon: 'user',
			},
			slots: {
				summary: '<span class="summary-extra">Overview</span>',
			},
		});
		const summary = wrapper.get('.lx-details__summary');

		expect(summary.find('.lx-details__icon').exists()).toBe(true);
		expect(summary.find('.lx-details__title').text()).toBe('Account');
		expect(summary.find('.summary-extra').text()).toBe('Overview');
		expect(summary.find('.lx-details__chevrons').exists()).toBe(true);
		expect(summary.html()).toMatch(/lx-details__icon[\s\S]*lx-details__title[\s\S]*summary-extra[\s\S]*lx-details__chevrons/);
	});

	it('prefers the content slot over the default slot and content prop', () => {
		const wrapper = mount(LxDetails, {
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

	it('syncs the open model when toggled', async () => {
		const wrapper = mount(LxDetails, {
			props: {
				title: 'Toggle me',
			},
		});
		const details = wrapper.get('details');

		(details.element as HTMLDetailsElement).open = true;
		await details.trigger('toggle');

		expect(wrapper.emitted('update:open')).toEqual([[true]]);
	});
});
