import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxCarousel from '../LxCarousel.vue';

describe('LxCarousel', () => {
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
});
