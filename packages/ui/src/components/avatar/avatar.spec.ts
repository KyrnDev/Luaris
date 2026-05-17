import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxAvatar from './LxAvatar.vue';

describe('LxAvatar', () => {
	it('computes CSS variable values from the current props', () => {
		const wrapper = mount(LxAvatar, {
			props: {
				variant: 'success',
				size: 'lg',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getSize: string,
				getFontSize: string,
				getTextColour: string,
				getBackgroundColour: string,
			},
		}).setupState;

		expect(setupState.getSize).toBe('var(--lx-size-control-height-lg)');
		expect(setupState.getFontSize).toBe('var(--lx-font-size-lg)');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-success)');
		expect(setupState.getBackgroundColour).toBe('var(--lx-colour-success)');
	});

	it('renders an image when src is provided', () => {
		const wrapper = mount(LxAvatar, {
			props: {
				src: '/avatar.png',
				alt: 'Taylor Reed',
			},
		});

		const image = wrapper.get('img');
		expect(image.attributes('src')).toBe('/avatar.png');
		expect(image.attributes('alt')).toBe('Taylor Reed');
		expect(wrapper.find('.lx-avatar__initials').exists()).toBe(false);
	});

	it('renders normalized initials when no image is available', () => {
		const wrapper = mount(LxAvatar, {
			props: {
				initials: 'abc',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				normalizedInitials: string,
				hasInitials: boolean,
				accessibleLabel: string,
			},
		}).setupState;

		expect(setupState.normalizedInitials).toBe('AB');
		expect(setupState.hasInitials).toBe(true);
		expect(setupState.accessibleLabel).toBe('Avatar for AB');
		expect(wrapper.get('.lx-avatar__initials').text()).toBe('AB');
	});

	it('falls back to the user icon when no image or initials are provided', () => {
		const wrapper = mount(LxAvatar);
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				showFallbackIcon: boolean,
				accessibleLabel: string,
			},
		}).setupState;

		expect(setupState.showFallbackIcon).toBe(true);
		expect(setupState.accessibleLabel).toBe('User avatar');
		expect(wrapper.find('.lx-avatar__icon').exists()).toBe(true);
	});

	it('uses alt as the accessible label for non-image fallbacks', () => {
		const wrapper = mount(LxAvatar, {
			props: {
				initials: 'JR',
				alt: 'Jordan Rivera',
			},
		});

		expect(wrapper.get('.lx-avatar').attributes('aria-label')).toBe('Jordan Rivera');
	});
});
