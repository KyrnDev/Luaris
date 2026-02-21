import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTreeItem from '../LxTreeItem.vue';

describe('LxTreeItem', () => {
	it('emits select and toggle events', async () => {
		const wrapper = mount(LxTreeItem, {
			props: {
				node: {
					id: 'a',
					label: 'Node A',
				},
				hasChildren: true,
				expandOnClick: true,
			},
		});

		await wrapper.find('.lx-tree-item__toggle').trigger('click');
		await wrapper.find('.lx-tree-item__label').trigger('click');
		await wrapper.find('.lx-tree-item__label').trigger('dblclick');

		expect(wrapper.emitted('toggle')?.length).toBe(2);
		expect(wrapper.emitted('select')?.length).toBe(1);
	});

	it('handles icon slot and disabled branch', async () => {
		const wrapper = mount(LxTreeItem, {
			props: {
				node: {
					id: 'b',
					label: 'Node B',
					icon: 'folder',
					disabled: true,
				},
				hasChildren: false,
				selected: true,
			},
		});

		expect(wrapper.classes()).toContain('is-selected');
		expect(wrapper.classes()).toContain('is-disabled');
		expect(wrapper.find('.lx-tree-item__icon').exists()).toBe(true);
		await wrapper.find('.lx-tree-item__label').trigger('click');
		expect(wrapper.emitted('select')).toBeUndefined();
	});
});
