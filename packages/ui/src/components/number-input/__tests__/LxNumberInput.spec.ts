import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxNumberInput from '../LxNumberInput.vue';

describe('LxNumberInput', () => {
	it('nudge controls adjust value with step', async () => {
		const wrapper = mount(LxNumberInput, {
			props: {
				modelValue: 2,
				step: 2,
			},
		});

		await wrapper.find('button[aria-label="Increase value"]').trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(4);

		await wrapper.find('button[aria-label="Decrease value"]').trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[1]?.[0]).toBe(2);
	});

	it('clamps values, respects attrs, and supports hidden controls', async () => {
		const wrapper = mount(LxNumberInput, {
			attrs: {
				'id': 'quantity',
				'name': 'quantityName',
				'aria-label': 'Quantity',
			},
			props: {
				modelValue: 5,
				min: 0,
				max: 6,
			},
		});

		const input = wrapper.find('input[type="number"]');
		expect(input.attributes('id')).toBe('quantity');
		expect(input.attributes('name')).toBe('quantityName');
		expect(input.attributes('aria-label')).toBe('Quantity');

		await wrapper.find('button[aria-label="Increase value"]').trigger('click');
		await wrapper.find('button[aria-label="Increase value"]').trigger('click');
		const updates = wrapper.emitted('update:modelValue')?.map(payload => payload[0]) || [];
		expect(updates).toContain(6);

		await input.setValue('-20');
		const last = wrapper.emitted('update:modelValue')?.at(-1)?.[0];
		expect(last).toBe(0);

		const noControls = mount(LxNumberInput, {
			props: {
				showControls: false,
				modelValue: 1,
			},
		});
		expect(noControls.find('button[aria-label="Increase value"]').exists()).toBe(false);
		expect(noControls.find('button[aria-label="Decrease value"]').exists()).toBe(false);
	});
});
