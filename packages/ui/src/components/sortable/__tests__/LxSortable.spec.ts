import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSortable from '../LxSortable.vue';
import LxSortableBranch from '../LxSortableBranch.vue';

describe('LxSortable', () => {
	it('hydrates from items prop and renders entries', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				items: [
					{ id: 'a', label: 'A' },
					{ id: 'b', label: 'B' },
				],
			},
			slots: {
				item: '<span class="sortable-label">{{ item.label }}</span>',
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-sortable__entry').length).toBeGreaterThan(0);
	});

	it('shows empty drop area when no data', () => {
		const wrapper = mount(LxSortable, {
			props: {
				items: [],
			},
		});
		expect(wrapper.find('.lx-sortable__empty-drop').exists()).toBe(true);
		wrapper.find('.lx-sortable__empty-drop').trigger('dragover');
		wrapper.find('.lx-sortable__empty-drop').trigger('drop');
	});

	it('covers drag/drop guards and successful sort via branch callbacks', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				'modelValue': [
					{ id: 'a', label: 'A', children: [{ id: 'a-1', label: 'A1' }] },
					{ id: 'b', label: 'B' },
				],
				'itemKey': 'id',
				'childrenKey': 'children',
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});

		const branch = wrapper.findComponent(LxSortableBranch);
		const onDragStart = branch.props('onDragStart') as (path: number[], event: DragEvent) => void;
		const onDragOver = branch.props('onDragOver') as (path: number[], mode: 'before' | 'after' | 'inside', event: DragEvent) => void;
		const onDrop = branch.props('onDrop') as (path: number[], mode: 'before' | 'after' | 'inside', event?: DragEvent) => void;
		const onDragEnd = branch.props('onDragEnd') as () => void;

		const dataTransfer = {
			effectAllowed: '',
			dropEffect: '',
			setData: () => {},
		} as unknown as DataTransfer;

		onDrop([0], 'before');
		onDragOver([0], 'before', { dataTransfer } as DragEvent);

		onDragStart([], { dataTransfer } as DragEvent);
		onDrop([0], 'before');

		onDragStart([0], { dataTransfer } as DragEvent);
		onDrop([0], 'inside');

		onDragStart([0], { dataTransfer } as DragEvent);
		onDrop([0, 0], 'after');

		onDragStart([9], { dataTransfer } as DragEvent);
		onDrop([0], 'before');

		onDragStart([0], { dataTransfer } as DragEvent);
		onDragOver([], 'inside', { dataTransfer } as DragEvent);
		onDrop([], 'inside');
		onDragEnd();

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('sort')?.length).toBeGreaterThan(0);
		expect(dataTransfer.effectAllowed).toBe('move');
		expect(dataTransfer.dropEffect).toBe('move');
	});

	it('covers non-standard keys, bad paths and dataTransfer missing branches', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				'modelValue': [
					{ key: 1, nodes: [{ key: 2 }, { key: 3 }] },
					{ key: 4, nodes: [] },
				],
				'itemKey': 'key',
				'childrenKey': 'nodes',
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});
		const branch = wrapper.findComponent(LxSortableBranch);
		const onDragStart = branch.props('onDragStart') as (path: number[], event: DragEvent) => void;
		const onDragOver = branch.props('onDragOver') as (path: number[], mode: 'before' | 'after' | 'inside', event: DragEvent) => void;
		const onDrop = branch.props('onDrop') as (path: number[], mode: 'before' | 'after' | 'inside', event?: DragEvent) => void;

		onDragStart([0, 1], {} as DragEvent);
		onDragOver([1], 'before', {} as DragEvent);
		onDrop([1], 'before');
		await wrapper.vm.$nextTick();

		// Invalid remove index / invalid head types and guard branches.
		onDragStart([0, -1], {} as DragEvent);
		onDrop([0], 'after');
		onDragStart([0, 0], {} as DragEvent);
		onDrop([999, 1], 'after');
		onDragStart([0, 0], {} as DragEvent);
		onDrop([0], 'inside');
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('sort')?.length).toBeGreaterThan(0);
	});

	it('does nothing when disabled', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				'modelValue': [{ id: 'a' }, { id: 'b' }],
				'disabled': true,
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});
		const branch = wrapper.findComponent(LxSortableBranch);
		const onDragStart = branch.props('onDragStart') as (path: number[], event: DragEvent) => void;
		const onDrop = branch.props('onDrop') as (path: number[], mode: 'before' | 'after' | 'inside', event?: DragEvent) => void;
		const dataTransfer = { setData: () => {} } as unknown as DataTransfer;

		onDragStart([0], { dataTransfer } as DragEvent);
		onDrop([1], 'after');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('sort')).toBeUndefined();
	});

	it('adjusts target path after removal when moving item to a later sibling', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				'modelValue': [
					{ id: 'a', label: 'A' },
					{ id: 'b', label: 'B' },
					{ id: 'c', label: 'C' },
				],
				'itemKey': 'id',
				'childrenKey': 'children',
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});

		const branch = wrapper.findComponent(LxSortableBranch);
		const onDragStart = branch.props('onDragStart') as (path: number[], event: DragEvent) => void;
		const onDrop = branch.props('onDrop') as (path: number[], mode: 'before' | 'after' | 'inside', event?: DragEvent) => void;

		onDragStart([0], {} as DragEvent);
		onDrop([2], 'before');
		await wrapper.vm.$nextTick();

		const latest = wrapper.emitted('sort')?.at(-1)?.[0] as Array<{ id: string }>;
		expect(latest.map(item => item.id)).toEqual(['b', 'a', 'c']);
	});

	it('covers invalid inside target branch during drop', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				'modelValue': [
					{ id: 'a', label: 'A' },
					{ id: 'b', label: 'B' },
				],
				'itemKey': 'id',
				'childrenKey': 'children',
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});

		const branch = wrapper.findComponent(LxSortableBranch);
		const onDragStart = branch.props('onDragStart') as (path: number[], event: DragEvent) => void;
		const onDrop = branch.props('onDrop') as (path: number[], mode: 'before' | 'after' | 'inside', event?: DragEvent) => void;

		onDragStart([0], {} as DragEvent);
		onDrop([999], 'inside');
		await wrapper.vm.$nextTick();

		const latest = wrapper.emitted('sort')?.at(-1)?.[0] as Array<{ id: string }>;
		expect(latest.map(item => item.id)).toEqual(['b']);
	});

	it('covers deep nested path replacement recursion during reordering', async () => {
		const wrapper = mount(LxSortable, {
			props: {
				'modelValue': [
					{
						id: 'root',
						children: [
							{
								id: 'group',
								children: [
									{ id: 'x' },
									{ id: 'y' },
								],
							},
						],
					},
				],
				'itemKey': 'id',
				'childrenKey': 'children',
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});

		const branch = wrapper.findComponent(LxSortableBranch);
		const onDragStart = branch.props('onDragStart') as (path: number[], event: DragEvent) => void;
		const onDrop = branch.props('onDrop') as (path: number[], mode: 'before' | 'after' | 'inside', event?: DragEvent) => void;

		onDragStart([0, 0, 0], {} as DragEvent);
		onDrop([0, 0, 1], 'after');
		await wrapper.vm.$nextTick();

		const latest = wrapper.emitted('sort')?.at(-1)?.[0] as Array<{ id: string, children?: any[] }>;
		expect(latest[0]?.children?.[0]?.children?.map((item: { id: string }) => item.id)).toEqual(['y', 'x']);
	});

	it('covers defensive helper guards directly', () => {
		const wrapper = mount(LxSortable, {
			props: {
				modelValue: [{ id: 'a', children: [] }],
			},
		});

		const vm = wrapper.vm as unknown as {
			replaceChildrenAtPath?: (items: unknown[], parentPath: unknown[], nextChildren: unknown[]) => unknown[],
			removeAtPath?: (items: unknown[], path: unknown[]) => { nextItems: unknown[], removed: unknown | null },
			insertInsidePath?: (items: unknown[], path: unknown[], item: unknown) => unknown[],
			getItemAtPath?: (items: unknown[], path: unknown[]) => unknown | null,
			insertRelativeToPath?: (items: unknown[], path: unknown[], mode: 'before' | 'after', item: unknown) => unknown[],
			adjustPathAfterRemoval?: (path: unknown[], removedPath: unknown[]) => unknown[],
			resolveKey?: (item: unknown, path: number[]) => string,
			isDropTarget?: (path: unknown[], mode: 'before' | 'after' | 'inside') => boolean,
			onDragStart?: (path: number[], event: DragEvent) => void,
			onDragOver?: (path: number[], mode: 'before' | 'after' | 'inside', event: DragEvent) => void,
		};

		expect(typeof vm.replaceChildrenAtPath).toBe('function');
		expect(typeof vm.removeAtPath).toBe('function');
		expect(typeof vm.insertInsidePath).toBe('function');
		expect(typeof vm.getItemAtPath).toBe('function');
		expect(typeof vm.insertRelativeToPath).toBe('function');
		expect(typeof vm.adjustPathAfterRemoval).toBe('function');
		expect(typeof vm.resolveKey).toBe('function');
		expect(typeof vm.isDropTarget).toBe('function');
		expect(typeof vm.onDragStart).toBe('function');
		expect(typeof vm.onDragOver).toBe('function');

		expect(vm.replaceChildrenAtPath!([{ id: 'a' }], ['x'], [])).toEqual([{ id: 'a' }]);
		expect(vm.replaceChildrenAtPath!([{ id: 'a' }], [99], [])).toEqual([{ id: 'a' }]);
		expect(vm.getItemAtPath!([{ id: 'a' }], ['x'])).toBeNull();
		expect(vm.resolveKey!({ label: 'No id' }, [3, 1])).toBe('3-1');
		expect(vm.removeAtPath!([{ id: 'a' }], [])).toEqual({
			nextItems: [{ id: 'a' }],
			removed: null,
		});
		const sparseItems = Array.from({ length: 1 });
		expect(vm.removeAtPath!(sparseItems, [0])).toEqual({
			nextItems: [],
			removed: null,
		});
		expect(vm.insertRelativeToPath!([{ id: 'a' }], [], 'before', { id: 'b' })).toEqual([
			{ id: 'b' },
			{ id: 'a' },
		]);
		expect(vm.insertInsidePath!([{ id: 'a', children: [] }], [0], { id: 'b' })).toEqual([
			{ id: 'a', children: [{ id: 'b' }] },
		]);
		expect(vm.insertInsidePath!([{ id: 'a', children: [] }], [0, Number.NaN as unknown as number], { id: 'b' })).toEqual([
			{ id: 'a', children: [] },
		]);

		let reads = 0;
		const inconsistentPath = new Proxy([0], {
			get(target, property, receiver) {
				if (property === '0') {
					reads += 1;
					return reads === 1 ? 0 : 'x';
				}
				return Reflect.get(target, property, receiver);
			},
		});
		expect(vm.insertInsidePath!([{ id: 'a', children: [] }], inconsistentPath as unknown[], { id: 'b' })).toEqual([
			{ id: 'a', children: [] },
		]);
		expect(vm.adjustPathAfterRemoval!([0], [0])).toEqual([0]);
		vm.onDragStart!([0], {} as DragEvent);
		vm.onDragOver!([2], 'after', {} as DragEvent);
		expect(vm.isDropTarget!([2], 'before')).toBe(false);
	});
});
