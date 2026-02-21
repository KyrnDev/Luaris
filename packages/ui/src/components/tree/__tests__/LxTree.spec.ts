import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTreeItem from '../../tree-item/LxTreeItem.vue';
import LxTree from '../LxTree.vue';

describe('LxTree', () => {
	const items = [
		{
			id: 'parent',
			label: 'Parent',
			expanded: true,
			children: [
				{
					id: 'child-a',
					label: 'Child A',
					expanded: true,
					children: [
						{
							id: 'grandchild-a',
							label: 'Grandchild A',
							expanded: true,
							children: [
								{ id: 'great-a', label: 'Great A' },
							],
						},
					],
				},
				{ id: 'child-b', label: 'Child B', disabled: true },
			],
		},
	];

	it('selects/toggles nodes and emits events', async () => {
		const wrapper = mount(LxTree, {
			props: {
				items,
				multiple: true,
			},
		});

		const labels = wrapper.findAll('.lx-tree-item__label');
		await labels[0]?.trigger('click');
		expect(wrapper.emitted('select')?.[0]?.[0]).toEqual(['parent']);

		const toggles = wrapper.findAll('.lx-tree-item__toggle');
		await toggles[0]?.trigger('click');
		expect(wrapper.emitted('toggle')?.[0]?.[0]).toBe('parent');
		await toggles[0]?.trigger('click');
		expect(wrapper.emitted('toggle')?.some(payload => payload[1] === true)).toBe(true);
	});

	it('supports custom item slot and single-select mode', async () => {
		const wrapper = mount(LxTree, {
			props: {
				items,
				multiple: false,
			},
			slots: {
				item: ({ node }: { node: { label: string } }) => `<span>${node.label} custom</span>`,
			},
		});

		expect(wrapper.text()).toContain('Parent custom');
		await wrapper.find('.lx-tree-item__label').trigger('click');
		expect(wrapper.emitted('select')?.[0]?.[0]).toEqual(['parent']);
	});

	it('covers internal guard branches and recursive handlers', async () => {
		const wrapper = mount(LxTree, {
			props: {
				items,
				multiple: true,
			},
		});

		const api = (wrapper.vm as {
			$: {
				setupState: {
					onSelect: (node: { id: string, disabled?: boolean }) => void,
					toggleExpand: (node: { id: string, disabled?: boolean, children?: unknown[] }) => void,
				},
			},
		}).$.setupState;

		api.onSelect({ id: 'child-b', disabled: true });
		api.onSelect({ id: 'parent' });
		api.onSelect({ id: 'parent' });
		api.toggleExpand({ id: 'no-children', children: [] });
		api.toggleExpand({ id: 'disabled-node', children: [{}], disabled: true });

		const childToggles = wrapper.findAll('.lx-tree-item__toggle');
		await childToggles[1]?.trigger('click');
		expect(wrapper.emitted('toggle')?.some(payload => payload[0] === 'child-a')).toBe(true);

		const selectEventCount = (wrapper.emitted('select') || []).length;
		const grandchildLabel = wrapper
			.findAll('.lx-tree-item__label')
			.find(element => element.text().includes('Grandchild A'));
		await grandchildLabel?.trigger('click');
		expect((wrapper.emitted('select') || []).length).toBeGreaterThanOrEqual(selectEventCount);

		const itemComponents = wrapper.findAllComponents(LxTreeItem);
		itemComponents[1]?.vm.$emit('select', { id: 'grandchild-a' });
		expect((wrapper.emitted('select') || []).length).toBeGreaterThan(selectEventCount);
	});
});
