import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxRating from '../LxRating.vue';

describe('LxRating', () => {
	it('sets selected rating value', async () => {
		const wrapper = mount(LxRating, {
			props: {
				max: 5,
			},
		});

		await wrapper.findAll('.lx-rating__item')[2]?.trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(3);
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(3);
	});

	it('applies size class', () => {
		const wrapper = mount(LxRating, {
			props: {
				size: 'xl',
			},
		});

		expect(wrapper.classes()).toContain('lx-rating--xl');
	});
});
