import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxIconPicker from '../LxIconPicker.vue';
import type { ILxIconRegistryEntry } from '../types';

const buildRegistry = (count: number): ILxIconRegistryEntry[] => {
	return Array.from({ length: count }, (unused, index) => {
		void unused;
		return {
			name: `icon-${index + 1}`,
			keywords: [`keyword-${index + 1}`],
			styles: ['solid', 'regular'],
			families: ['classic'],
			licences: ['free', 'pro'],
			styleSources: {
				solid: ['free', 'pro'],
				regular: ['pro'],
			},
		};
	});
};

describe('LxIconPicker', () => {
	it('renders enough icons to fill at least 3 rows in inline mode', () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: buildRegistry(30),
			},
		});

		expect(wrapper.findAll('.lx-icon-picker__tile')).toHaveLength(15);
		expect(wrapper.text()).toContain('30 results');
	});

	it('filters icons by search and emits selected icon/style', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: buildRegistry(4),
			},
		});

		await wrapper.find('.lx-icon-picker__search').setValue('icon-3');
		expect(wrapper.findAll('.lx-icon-picker__tile')).toHaveLength(1);

		await wrapper.find('.lx-icon-picker__tile').trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
			name: 'icon-3',
			style: 'solid',
		});
		expect(wrapper.find('.lx-icon-picker__tile').attributes('title')).toContain('Icon 3');
	});

	it('shows styles for selected icon and updates selected style', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						name: 'camera',
						keywords: ['photo'],
						styles: ['solid', 'regular'],
						families: ['classic'],
						licences: ['free', 'pro'],
						styleSources: {
							solid: ['free'],
							regular: ['pro'],
						},
					},
				],
				modelValue: {
					name: 'camera',
					style: 'solid',
				},
			},
		});

		expect(wrapper.find('.lx-icon-picker__style-section').exists()).toBe(true);
		const chips = wrapper.findAll('.lx-icon-picker__style-chip');
		expect(chips).toHaveLength(2);
		await chips[1]?.trigger('click');

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
			name: 'camera',
			style: 'regular',
		});
	});

	it('supports popup mode and opens picker panel from trigger button', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				registry: buildRegistry(8),
				modelValue: {
					name: 'icon-2',
					style: 'solid',
				},
			},
		});

		expect(wrapper.find('.lx-icon-picker__panel').exists()).toBe(false);
		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		expect(document.body.querySelector('.lx-modal')).not.toBeNull();
		expect(document.body.querySelector('.lx-icon-picker__panel--modal')).not.toBeNull();
	});
});
