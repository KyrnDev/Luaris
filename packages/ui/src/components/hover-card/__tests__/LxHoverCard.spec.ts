import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LxHoverCard from '../LxHoverCard.vue';

describe('LxHoverCard', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('opens and closes on hover delays', async () => {
		vi.useFakeTimers();
		const wrapper = mount(LxHoverCard, {
			props: {
				openDelay: 10,
				closeDelay: 10,
			},
			slots: {
				default: '<button>Hover me</button>',
				content: '<div>Content</div>',
			},
		});

		await wrapper.trigger('mouseenter');
		vi.advanceTimersByTime(10);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-hover-card__content').exists()).toBe(true);

		await wrapper.trigger('mouseleave');
		vi.advanceTimersByTime(10);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-hover-card__content').exists()).toBe(false);
	});

	it('does not open when disabled and clears pending timers', async () => {
		vi.useFakeTimers();
		const wrapper = mount(LxHoverCard, {
			props: { disabled: true, openDelay: 30, closeDelay: 30, placement: 'left' },
			slots: { default: 'A', content: 'B' },
		});
		expect(wrapper.find('.is-left').exists()).toBe(true);

		await wrapper.trigger('mouseenter');
		await wrapper.trigger('mouseleave');
		await wrapper.trigger('mouseenter');
		vi.advanceTimersByTime(35);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-hover-card__content').exists()).toBe(false);
	});

	it('covers close path when no open timer exists', async () => {
		vi.useFakeTimers();
		const wrapper = mount(LxHoverCard, {
			slots: { default: 'A', content: 'B' },
		});
		await wrapper.trigger('mouseleave');
		vi.advanceTimersByTime(120);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-hover-card__content').exists()).toBe(false);
	});
});
