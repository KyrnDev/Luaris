import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxAvatar from '../LxAvatar.vue';

describe('LxAvatar', () => {
	it('renders initials fallback from name', () => {
		const wrapper = mount(LxAvatar, {
			props: {
				name: 'Jane Doe',
			},
		});

		expect(wrapper.text()).toContain('JD');
	});

	it('emits activate on click and keyboard when clickable', async () => {
		const wrapper = mount(LxAvatar, {
			props: {
				name: 'Jane Doe',
				clickable: true,
			},
		});

		await wrapper.trigger('click');
		await wrapper.trigger('keydown', { key: 'Enter' });

		expect(wrapper.emitted('activate')).toHaveLength(2);
	});

	it('falls back to question mark and ignores keyboard when not clickable', async () => {
		const wrapper = mount(LxAvatar);
		await wrapper.trigger('keydown', { key: 'Enter' });

		expect(wrapper.text()).toContain('?');
		expect(wrapper.emitted('activate')).toBeUndefined();
	});

	it('uses default Avatar aria label when clickable and no name is provided', () => {
		const wrapper = mount(LxAvatar, {
			props: {
				clickable: true,
			},
		});

		expect(wrapper.attributes('aria-label')).toBe('Avatar');
	});

	it('does not emit on click when not clickable and ignores non-activation keys', async () => {
		const wrapper = mount(LxAvatar, {
			props: {
				clickable: false,
			},
		});

		await wrapper.trigger('click');
		await wrapper.trigger('keydown', { key: 'Tab' });
		expect(wrapper.emitted('activate')).toBeUndefined();
	});

	it('renders image and swaps to fallback on image error', async () => {
		const wrapper = mount(LxAvatar, {
			props: {
				src: '/avatar.png',
				name: 'Jane Doe',
			},
		});

		expect(wrapper.find('img').exists()).toBe(true);
		await wrapper.find('img').trigger('error');
		expect(wrapper.find('.lx-avatar__fallback').exists()).toBe(true);
	});

	it('prefers alt text and supports space key activation', async () => {
		const wrapper = mount(LxAvatar, {
			props: {
				src: '/avatar.png',
				alt: 'Profile avatar',
				clickable: true,
			},
		});

		expect(wrapper.attributes('aria-label')).toBe('Profile avatar');
		await wrapper.trigger('keydown', { key: ' ' });
		expect(wrapper.emitted('activate')).toHaveLength(1);
	});
});
