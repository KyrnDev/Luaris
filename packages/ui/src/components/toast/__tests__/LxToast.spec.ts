import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LxToast from '../LxToast.vue';

describe('LxToast', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders content and emits close', async () => {
		const wrapper = mount(LxToast, {
			props: {
				id: '1',
				text: 'Saved',
				title: 'Success',
				icon: 'i',
				timeout: 0,
			},
		});

		expect(wrapper.text()).toContain('Saved');
		expect(wrapper.find('.lx-toast__icon').exists()).toBe(true);
		await wrapper.find('.lx-toast__close').trigger('click');
		expect(wrapper.emitted('close')?.[0]).toEqual(['1']);
	});

	it('emits close with undefined id when id is missing', async () => {
		const wrapper = mount(LxToast, {
			props: {
				text: 'No id',
				timeout: 0,
			},
		});
		await wrapper.find('.lx-toast__close').trigger('click');
		expect(wrapper.emitted('close')?.[0]).toEqual([undefined]);
	});

	it('uses anchor wrapper when link provided and computes rel defaults', async () => {
		const wrapper = mount(LxToast, {
			props: {
				text: 'Open',
				link: { href: 'https://example.com', target: '_blank' },
				timeout: 0,
			},
		});
		expect(wrapper.find('a.lx-toast').exists()).toBe(true);
		expect(wrapper.find('a.lx-toast').attributes('rel')).toContain('noopener');

		await wrapper.setProps({
			link: { href: 'https://example.com', target: '_self', rel: 'noreferrer' },
		});
		expect(wrapper.find('a.lx-toast').attributes('rel')).toBe('noreferrer');
	});

	it('covers article wrapper attributes and timeout disabled branch', () => {
		const wrapper = mount(LxToast, {
			props: {
				text: 'Plain',
				timeout: 0,
			},
		});
		expect(wrapper.find('article.lx-toast').exists()).toBe(true);
		expect(wrapper.find('article.lx-toast').attributes('role')).toBe('status');
	});

	it('renders without optional title/icon header content', () => {
		const wrapper = mount(LxToast, {
			props: {
				text: 'Only text',
				timeout: 0,
			},
		});
		expect(wrapper.find('.lx-toast__icon').exists()).toBe(false);
		expect(wrapper.find('.lx-toast__title').exists()).toBe(false);
	});

	it('covers link wrapper with no target and no rel provided', () => {
		const wrapper = mount(LxToast, {
			props: {
				text: 'Link no target',
				link: { href: '/local' },
				timeout: 0,
			},
		});
		expect(wrapper.find('a.lx-toast').attributes('target')).toBe('_self');
		expect(wrapper.find('a.lx-toast').attributes('rel')).toBeUndefined();
	});

	it('auto closes when timeout elapses and cancels animation on unmount', async () => {
		const callbacks: FrameRequestCallback[] = [];
		vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback): number => {
			callbacks.push(callback);
			return callbacks.length;
		});
		const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

		const wrapper = mount(LxToast, {
			props: {
				id: 'auto',
				text: 'Auto close',
				timeout: 5000,
			},
		});

		await wrapper.vm.$nextTick();
		const firstTick = callbacks.shift();
		expect(firstTick).toBeTypeOf('function');
		firstTick?.(1000);
		const secondTick = callbacks.shift();
		expect(secondTick).toBeTypeOf('function');
		secondTick?.(7001);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('close')).toBeTruthy();

		const wrapperPending = mount(LxToast, {
			props: {
				id: 'pending',
				text: 'Pending',
				timeout: 5000,
			},
		});
		await wrapperPending.vm.$nextTick();
		wrapperPending.unmount();
		wrapper.unmount();
		expect(cancelSpy).toHaveBeenCalled();
	});

	it('does not cancel animation when no frame was scheduled', () => {
		const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
		const wrapper = mount(LxToast, {
			props: {
				text: 'No frame',
				timeout: 0,
			},
		});
		wrapper.unmount();
		expect(cancelSpy).not.toHaveBeenCalled();
	});
});
