import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTag from './LxTag.vue';

describe('LxTag', () => {
	it('computes CSS variable values from the current props', () => {
		const wrapper = mount(LxTag, {
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
				getControlGap: string,
				getColour: string,
				getTextColour: string,
				removeButtonLabel: string,
			},
		}).setupState;

		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingX).toBe('var(--lx-size-control-padding-x-lg)');
		expect(setupState.getControlGap).toBe('var(--lx-size-control-gap-lg)');
		expect(setupState.getColour).toBe('var(--lx-colour-success)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-success)');
		expect(setupState.removeButtonLabel).toBe('Remove tag');
	});

	it('renders default values when no props are provided', () => {
		const wrapper = mount(LxTag);
		const tag = wrapper.get('.lx-tag');
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingX: string,
				getControlGap: string,
				getColour: string,
				getTextColour: string,
			},
		}).setupState;

		expect(tag.text()).toBe('');
		expect(setupState.getSize).toBe('var(--lx-font-size-md)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-md)');
		expect(setupState.getControlPaddingX).toBe('var(--lx-size-control-padding-x-md)');
		expect(setupState.getControlGap).toBe('var(--lx-size-control-gap-md)');
		expect(setupState.getColour).toBe('var(--lx-colour-primary)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-primary)');
	});

	it('renders the label prop content', () => {
		const wrapper = mount(LxTag, {
			props: {
				label: 'Beta',
			},
		});

		expect(wrapper.get('.lx-tag').text()).toBe('Beta');
	});

	it('renders default slot content when provided', () => {
		const wrapper = mount(LxTag, {
			props: {
				label: 'Inbox',
			},
			slots: {
				default: '<strong>3</strong>',
			},
		});
		const tag = wrapper.get('.lx-tag');

		expect(tag.text()).toContain('3');
		expect(tag.html()).toContain('<strong>3</strong>');
		expect(tag.text()).not.toContain('Inbox');
	});

	it('renders leading slot content before the main content', () => {
		const wrapper = mount(LxTag, {
			props: {
				label: 'Updates',
			},
			slots: {
				leading: '<span class="leading-icon">!</span>',
			},
		});
		const tag = wrapper.get('.lx-tag');

		expect(tag.find('.leading-icon').exists()).toBe(true);
		expect(tag.text()).toContain('!');
		expect(tag.text()).toContain('Updates');
	});

	it('renders a removable action and emits remove when clicked', async () => {
		const wrapper = mount(LxTag, {
			props: {
				label: 'Draft',
				removable: true,
			},
		});

		const removeButton = wrapper.get('.lx-tag__remove');
		expect(removeButton.attributes('aria-label')).toBe('Remove Draft');

		await removeButton.trigger('click');
		expect(wrapper.emitted('remove')).toEqual([[]]);
	});

	it('updates token values and remove label when props change', async () => {
		const wrapper = mount(LxTag, {
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

		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getControlHeight: string,
				getControlPaddingX: string,
				getControlGap: string,
				getColour: string,
				getTextColour: string,
				removeButtonLabel: string,
			},
		}).setupState;

		expect(wrapper.get('.lx-tag').text()).toBe('Published');
		expect(setupState.getSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getControlHeight).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getControlPaddingX).toBe('var(--lx-size-control-padding-x-lg)');
		expect(setupState.getControlGap).toBe('var(--lx-size-control-gap-lg)');
		expect(setupState.getColour).toBe('var(--lx-colour-danger)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-danger)');
		expect(setupState.removeButtonLabel).toBe('Remove Published');
	});
});
