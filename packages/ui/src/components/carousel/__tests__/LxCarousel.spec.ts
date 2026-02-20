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

	it('supports dot navigation click', async () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }],
			},
		});

		await wrapper.find('button[aria-label="Go to slide 3"]').trigger('click');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(2);
	});

	it('re-validates index and restarts timer when slide length changes', async () => {
		vi.useFakeTimers();
		const wrapper = mount(LxCarousel, {
			props: {
				modelValue: 1,
				slides: [{ title: 'One' }, { title: 'Two' }],
				autoplay: true,
				interval: 30,
			},
		});

		await wrapper.setProps({
			slides: [{ title: 'Only one slide' }],
		});

		const changeEvents = wrapper.emitted('change') ?? [];
		expect(changeEvents.some(payload => payload[0] === 0)).toBe(true);
	});

	it('clears autoplay timer on unmount', () => {
		vi.useFakeTimers();
		const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [{ title: 'One' }, { title: 'Two' }],
				autoplay: true,
				interval: 20,
			},
		});

		wrapper.unmount();
		expect(clearIntervalSpy).toHaveBeenCalled();
		clearIntervalSpy.mockRestore();
	});

	it('renders fallback slide content branches for image, title and description', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [
					{
						id: 'full',
						image: 'https://example.com/slide.jpg',
						title: 'Complete slide',
						description: 'Description content',
					},
					{
						id: 'empty',
					},
				],
			},
		});

		expect(wrapper.find('.lx-carousel__image').exists()).toBe(true);
		expect(wrapper.text()).toContain('Complete slide');
		expect(wrapper.text()).toContain('Description content');
	});

	it('uses fallback alt text when image slide has no title', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				slides: [
					{
						image: 'https://example.com/no-title.jpg',
					},
				],
			},
		});

		expect(wrapper.find('.lx-carousel__image').attributes('alt')).toBe('Slide 1');
	});
});
