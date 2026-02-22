import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import LxSortableBranch from '../LxSortableBranch.vue';

describe('LxSortableBranch', () => {
	it('renders branch entries and forwards drag/drop callbacks', async () => {
		const onDragStart = vi.fn();
		const onDragOver = vi.fn();
		const onDrop = vi.fn();
		const onDragEnd = vi.fn();

		const wrapper = mount(LxSortableBranch, {
			props: {
				items: [{ id: 'a', children: [{ id: 'a-1' }] }],
				pathPrefix: [],
				level: 0,
				getChildren: (item: any) => item.children || [],
				resolveKey: (item: any, path: number[]) => item.id || path.join('-'),
				isDropTarget: () => false,
				isDragging: () => false,
				onDragStart,
				onDragOver,
				onDrop,
				onDragEnd,
			},
		});

		expect(wrapper.findAll('.lx-sortable__entry').length).toBeGreaterThan(0);
		await wrapper.find('.lx-sortable__item').trigger('dragstart');
		await wrapper.find('.lx-sortable__item').trigger('dragend');
		await wrapper.find('.lx-sortable__ghost').trigger('dragover');
		await wrapper.find('.lx-sortable__ghost').trigger('drop');
		const trailingGhost = wrapper.findAll('.lx-sortable__ghost').at(-1);
		expect(trailingGhost).toBeTruthy();
		await trailingGhost!.trigger('dragover');
		await trailingGhost!.trigger('drop');
		await wrapper.find('.lx-sortable__inside-drop').trigger('dragover');
		await wrapper.find('.lx-sortable__inside-drop').trigger('drop');
		expect(onDragStart).toHaveBeenCalled();
		expect(onDragEnd).toHaveBeenCalled();
		expect(onDragOver).toHaveBeenCalled();
		expect(onDrop).toHaveBeenCalled();
	});

	it('renders nested branch class and custom slot content', () => {
		const wrapper = mount(LxSortableBranch, {
			props: {
				items: [{ id: 'b' }],
				pathPrefix: [0],
				level: 1,
				getChildren: () => [],
				resolveKey: () => 'k',
				isDropTarget: () => true,
				isDragging: () => true,
				onDragStart: vi.fn(),
				onDragOver: vi.fn(),
				onDrop: vi.fn(),
				onDragEnd: vi.fn(),
			},
			slots: {
				item: '<span class="custom-item">slot-item</span>',
			},
		});

		expect(wrapper.find('.lx-sortable__branch.is-nested').exists()).toBe(true);
		expect(wrapper.find('.custom-item').exists()).toBe(true);
		expect(wrapper.find('.lx-sortable__item.is-dragging').exists()).toBe(true);
		expect(wrapper.findAll('.is-drop-target').length).toBeGreaterThan(0);
	});
});
