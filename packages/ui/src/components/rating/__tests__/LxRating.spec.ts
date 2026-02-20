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

	it('does not update value when readonly and reflects hover state', async () => {
		const readonlyWrapper = mount(LxRating, {
			props: {
				modelValue: 2,
				readonly: true,
			},
		});

		const readonlyStars = readonlyWrapper.findAll('.lx-rating__item');
		await readonlyStars[3]?.trigger('click');
		expect(readonlyWrapper.emitted('update:modelValue')).toBeUndefined();
		expect(readonlyWrapper.emitted('change')).toBeUndefined();

		const setupState = readonlyWrapper.vm.$.setupState as {
			setValue?: (value: number) => void,
		};
		expect(typeof setupState.setValue).toBe('function');
		setupState.setValue?.(5);
		expect(readonlyWrapper.emitted('update:modelValue')).toBeUndefined();
		expect(readonlyWrapper.emitted('change')).toBeUndefined();

		const hoverWrapper = mount(LxRating, {
			props: {
				modelValue: 2,
			},
		});
		const hoverStars = hoverWrapper.findAll('.lx-rating__item');
		await hoverStars[4]?.trigger('mouseenter');
		expect(hoverStars[4]?.classes()).toContain('is-active');
		await hoverStars[4]?.trigger('mouseleave');
		expect(hoverStars[4]?.classes()).not.toContain('is-active');
	});
});
