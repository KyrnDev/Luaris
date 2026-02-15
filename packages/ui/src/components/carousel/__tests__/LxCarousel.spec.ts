import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LxCarousel from '../LxCarousel.vue';

describe('LxCarousel', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders slides and changes index', async () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [{ title: 'One' }, { title: 'Two' }],
			},
		});

		await wrapper.find('button[aria-label="Next slide"]').trigger('click');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(1);
	});

	it('applies slide animation mode', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [{ title: 'One' }, { title: 'Two' }],
				animation: 'slide',
			},
		});

		expect(wrapper.findAll('.lx-carousel__slide')[0]?.classes()).toContain('is-slide');
	});

	it('clamps index when loop is disabled', async () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [{ title: 'One' }, { title: 'Two' }],
				loop: false,
			},
		});

		await wrapper.find('button[aria-label="Previous slide"]').trigger('click');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(0);
	});

	it('handles empty slide sets without crashing', async () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [],
			},
		});

		await wrapper.find('button[aria-label="Next slide"]').trigger('click');
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('autoplays when enabled', async () => {
		vi.useFakeTimers();
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [{ title: 'One' }, { title: 'Two' }],
				autoplay: true,
				interval: 50,
			},
		});

		vi.advanceTimersByTime(60);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('change')?.length).toBeGreaterThan(0);
	});
});
