import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxCarousel from './LxCarousel.vue';

const items = Array.from({ length: 12 }, (_, index) => ({
	src: `/image-${index + 1}.jpg`,
	alt: `Image ${index + 1}`,
	title: `Slide ${index + 1}`,
}));

describe('LxCarousel', () => {
	it('computes token-driven values from props', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items,
				gap: 'lg',
				buttonVariant: 'success',
				dotSize: 'xl',
				motionDuration: 'slow',
				motionEasing: 'emphasised',
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getGap: string,
				getDotSize: string,
				getDotActiveWidth: string,
				getDotColour: string,
				getTrackTransition: string,
			},
		}).setupState;

		expect(setupState.getGap).toBe('var(--lx-size-space-lg)');
		expect(setupState.getDotSize).toBe('var(--lx-size-control-icon-xl)');
		expect(setupState.getDotActiveWidth).toBe('calc(var(--lx-size-control-icon-xl) * 2)');
		expect(setupState.getDotColour).toBe('var(--lx-colour-success)');
		expect(setupState.getTrackTransition).toBe('transform var(--lx-motion-duration-slow) var(--lx-motion-easing-emphasised)');
	});

	it('chunks items into pages using itemsPerView', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items: items.slice(0, 5),
				itemsPerView: 2,
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				pages: { src: string, alt: string, title?: string }[][],
				totalPages: number,
			},
		}).setupState;

		expect(setupState.totalPages).toBe(3);
		expect(setupState.pages).toHaveLength(3);
		expect(setupState.pages[0]).toHaveLength(2);
		expect(setupState.pages[2]).toHaveLength(1);
	});

	it('disables edge navigation when repeat is false', async () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items: items.slice(0, 3),
			},
		});

		const prevButton = wrapper.get('.lx-carousel__button--prev');
		expect(prevButton.attributes('disabled')).toBeDefined();

		await wrapper.get('.lx-carousel__button--next').trigger('click');
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				currentPage: number,
			},
		}).setupState;

		expect(setupState.currentPage).toBe(1);
	});

	it('wraps navigation when repeat is true', async () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items: items.slice(0, 4),
				itemsPerView: 2,
				repeat: true,
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				currentPage: number,
			},
		}).setupState;

		await wrapper.get('.lx-carousel__button--next').trigger('click');
		expect(setupState.currentPage).toBe(1);

		await wrapper.get('.lx-carousel__button--next').trigger('click');
		expect(setupState.currentPage).toBe(0);
	});

	it('auto-enables virtualization for collections over ten items', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items,
				itemsPerView: 2,
			},
		});
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				shouldVirtualize: boolean,
				renderedPages: { src: string, alt: string, title?: string }[][],
			},
		}).setupState;

		expect(setupState.shouldVirtualize).toBe(true);
		expect(setupState.renderedPages.length).toBeLessThan(6);
	});

	it('renders the expected number of progress dots', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items: items.slice(0, 6),
				itemsPerView: 2,
			},
		});

		expect(wrapper.findAll('.lx-carousel__dot')).toHaveLength(3);
	});

	it('renders custom overlay slot content for each visible item', () => {
		const wrapper = mount(LxCarousel, {
			props: {
				items: items.slice(0, 2).map((item, index) => ({
					...item,
					badge: index === 0 ? 'Featured' : 'New',
				})),
			},
			slots: {
				overlay: '<span class="overlay-badge">{{ item.badge }}</span>',
			},
		});

		const overlays = wrapper.findAll('.overlay-badge');
		expect(overlays).toHaveLength(2);
		expect(overlays[0].text()).toBe('Featured');
		expect(overlays[1].text()).toBe('New');
	});
});
