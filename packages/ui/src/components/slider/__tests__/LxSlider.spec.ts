import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSlider from '../LxSlider.vue';

describe('LxSlider', () => {
	it('emits model and change on value update', async () => {
		const wrapper = mount(LxSlider, {
			props: {
				modelValue: 10,
			},
		});

		await wrapper.find('input').setValue(50);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(50);
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(50);
	});

	it('uses generated id/name and default aria-label when attrs are not provided', () => {
		const wrapper = mount(LxSlider, {
			props: {
				modelValue: 25,
			},
		});

		const input = wrapper.find('input[type="range"]');
		const id = input.attributes('id');
		expect(id).toMatch(/^lx-slider-/);
		expect(input.attributes('name')).toBe(id);
		expect(input.attributes('aria-label')).toBe('Slider');
		expect(wrapper.find('.lx-slider__value').text()).toBe('25');
	});

	it('prefers attr id/name/aria-label and hides value when showValue is false', () => {
		const wrapper = mount(LxSlider, {
			attrs: {
				'id': 'volume',
				'name': 'volumeName',
				'aria-label': 'Volume',
			},
			props: {
				modelValue: 10,
				showValue: false,
				disabled: true,
				min: 5,
				max: 30,
				step: 5,
			},
		});

		const input = wrapper.find('input[type="range"]');
		expect(input.attributes('id')).toBe('volume');
		expect(input.attributes('name')).toBe('volumeName');
		expect(input.attributes('aria-label')).toBe('Volume');
		expect(input.attributes('disabled')).toBeDefined();
		expect(input.attributes('min')).toBe('5');
		expect(input.attributes('max')).toBe('30');
		expect(input.attributes('step')).toBe('5');
		expect(wrapper.find('.lx-slider__value').exists()).toBe(false);
	});
});
