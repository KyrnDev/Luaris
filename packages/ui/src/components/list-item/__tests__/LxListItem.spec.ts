import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxListItem from '../LxListItem.vue';

describe('LxListItem', () => {
	it('emits select when clickable', async () => {
		const wrapper = mount(LxListItem, {
			props: {
				value: 'abc',
				clickable: true,
			},
			slots: {
				default: 'Item',
			},
		});

		await wrapper.trigger('click');
		expect(wrapper.emitted('select')?.[0]?.[0]).toBe('abc');
	});

	it('supports disabled and selected classes', async () => {
		const wrapper = mount(LxListItem, {
			props: {
				clickable: true,
				disabled: true,
				selected: true,
			},
		});

		expect(wrapper.classes()).toContain('is-selected');
		expect(wrapper.classes()).toContain('is-disabled');
		await wrapper.trigger('click');
		expect(wrapper.emitted('select')).toBeUndefined();
	});
});
