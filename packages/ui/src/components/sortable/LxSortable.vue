<template>
	<div class="lx-sortable">
		<LxSortableBranch
			:items="model"
			:path-prefix="[]"
			:level="0"
			:get-children="getChildren"
			:resolve-key="resolveKey"
			:is-drop-target="isDropTarget"
			:is-dragging="isDragging"
			:on-drag-start="onDragStart"
			:on-drag-over="onDragOver"
			:on-drop="onDrop"
			:on-drag-end="onDragEnd"
		>
			<template #item="slotProps">
				<slot name="item" v-bind="slotProps">
					{{ slotProps.item }}
				</slot>
			</template>
		</LxSortableBranch>

		<div
			v-if="model.length === 0"
			class="lx-sortable__empty-drop"
			:class="{ 'is-drop-target': isDropTarget([], 'inside') }"
			@dragover.prevent.stop="onDragOver([], 'inside', $event)"
			@drop.prevent.stop="onDrop([], 'inside', $event)"
		>
			Drop here
		</div>
	</div>
</template>

<script setup lang='ts' generic='T'>
	import { onMounted, ref } from 'vue';
	import LxSortableBranch from './LxSortableBranch.vue';
	import type { ILxSortableProps, TSortableDropMode } from './types';

	const props = withDefaults(defineProps<ILxSortableProps<T>>(), {
		items: () => [] as T[],
		itemKey: 'id',
		childrenKey: 'children',
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'sort', items: T[]): void,
	}>();

	const model = defineModel<T[]>({
		default: () => [],
	});

	const dragPath = ref<number[] | null>(null);
	const dropPath = ref<number[] | null>(null);
	const dropMode = ref<TSortableDropMode | null>(null);

	onMounted(() => {
		if (model.value.length === 0 && props.items.length > 0) {
			model.value = [...props.items];
		}
	});

	const pathsEqual = (left: number[] | null, right: number[] | null): boolean => {
		if (!left || !right || left.length !== right.length) {
			return false;
		}
		return left.every((value, index) => value === right[index]);
	};

	const isPrefixPath = (parent: number[], child: number[]): boolean => {
		if (parent.length > child.length) {
			return false;
		}
		return parent.every((value, index) => value === child[index]);
	};

	const resolveKey = (item: T, path: number[]): string => {
		const row = item as Record<string, unknown>;
		const value = row?.[props.itemKey];
		return typeof value === 'string' || typeof value === 'number' ? String(value) : path.join('-');
	};

	const getChildren = (item: T): T[] => {
		const row = item as Record<string, unknown>;
		const value = row[props.childrenKey];
		return Array.isArray(value) ? (value as T[]) : [];
	};

	const setChildren = (item: T, children: T[]): T => {
		const row = item as Record<string, unknown>;
		return {
			...row,
			[props.childrenKey]: children,
		} as T;
	};

	const clearDropState = (): void => {
		dropPath.value = null;
		dropMode.value = null;
	};

	const clearDragState = (): void => {
		dragPath.value = null;
	};

	const clearDragAndDropState = (): void => {
		clearDropState();
		clearDragState();
	};

	const isDropTarget = (path: number[], mode: TSortableDropMode): boolean => {
		return pathsEqual(dropPath.value, path) && dropMode.value === mode;
	};

	const isDragging = (path: number[]): boolean => {
		return pathsEqual(dragPath.value, path);
	};

	const getItemAtPath = (items: T[], path: number[]): T | null => {
		let currentItems = items;
		let currentItem: T | null = null;

		for (let index = 0; index < path.length; index += 1) {
			const itemIndex = path[index];
			if (typeof itemIndex !== 'number') {
				return null;
			}
			currentItem = currentItems[itemIndex] ?? null;
			if (!currentItem) {
				return null;
			}
			if (index < path.length - 1) {
				currentItems = getChildren(currentItem);
			}
		}

		return currentItem;
	};

	const replaceChildrenAtPath = (items: T[], parentPath: number[], nextChildren: T[]): T[] => {
		if (parentPath.length === 0) {
			return nextChildren;
		}

		const [head, ...rest] = parentPath;
		/* v8 ignore next */
		if (typeof head !== 'number') {
			return items;
		}
		const parent = items[head];
		/* v8 ignore next */
		if (!parent) {
			return items;
		}

		const nextItems = [...items];
		if (rest.length === 0) {
			nextItems[head] = setChildren(parent, nextChildren);
			return nextItems;
		}

		const parentChildren = getChildren(parent);
		nextItems[head] = setChildren(parent, replaceChildrenAtPath(parentChildren, rest, nextChildren));
		return nextItems;
	};

	const getSiblingsAtParentPath = (items: T[], parentPath: number[]): T[] | null => {
		if (parentPath.length === 0) {
			return items;
		}

		const parent = getItemAtPath(items, parentPath);
		return parent ? getChildren(parent) : null;
	};

	const removeAtPath = (items: T[], path: number[]): { nextItems: T[], removed: T | null } => {
		/* v8 ignore next */
		if (path.length === 0) {
			return {
				nextItems: items,
				removed: null,
			};
		}

		const parentPath = path.slice(0, -1);
		const removeIndex = path[path.length - 1];
		const siblings = getSiblingsAtParentPath(items, parentPath);
		if (!siblings || typeof removeIndex !== 'number' || removeIndex < 0 || removeIndex >= siblings.length) {
			return {
				nextItems: items,
				removed: null,
			};
		}

		const nextSiblings = [...siblings];
		const [removed] = nextSiblings.splice(removeIndex, 1);
		return {
			nextItems: replaceChildrenAtPath(items, parentPath, nextSiblings),
			removed: removed ?? null,
		};
	};

	const insertRelativeToPath = (items: T[], path: number[], mode: Exclude<TSortableDropMode, 'inside'>, item: T): T[] => {
		const parentPath = path.slice(0, -1);
		const targetIndex = path[path.length - 1] ?? 0;
		const siblings = getSiblingsAtParentPath(items, parentPath);
		if (!siblings) {
			return items;
		}

		const nextSiblings = [...siblings];
		const insertIndex = mode === 'after' ? targetIndex + 1 : targetIndex;
		nextSiblings.splice(Math.max(0, Math.min(insertIndex, nextSiblings.length)), 0, item);
		return replaceChildrenAtPath(items, parentPath, nextSiblings);
	};

	const insertInsidePath = (items: T[], path: number[], item: T): T[] => {
		if (path.length === 0) {
			return [...items, item];
		}

		const target = getItemAtPath(items, path);
		if (!target) {
			return items;
		}

		const nextChildren = [...getChildren(target), item];
		const parentPath = path.slice(0, -1);
		const index = path[path.length - 1];
		const siblings = getSiblingsAtParentPath(items, parentPath);
		/* v8 ignore next */
		if (!siblings || typeof index !== 'number') {
			return items;
		}

		const nextSiblings = [...siblings];
		nextSiblings[index] = setChildren(target, nextChildren);
		return replaceChildrenAtPath(items, parentPath, nextSiblings);
	};

	const adjustPathAfterRemoval = (path: number[], removedPath: number[]): number[] => {
		if (path.length === 0 || removedPath.length === 0 || path.length < removedPath.length) {
			return [...path];
		}

		const siblingLevel = removedPath.length - 1;
		const sameParent = removedPath.slice(0, siblingLevel).every((value, index) => path[index] === value);
		if (!sameParent) {
			return [...path];
		}

		const adjusted = [...path];
		const adjustedValue = adjusted[siblingLevel];
		const removedValue = removedPath[siblingLevel];
		if (typeof adjustedValue === 'number' && typeof removedValue === 'number' && adjustedValue > removedValue) {
			adjusted[siblingLevel] = adjustedValue - 1;
		}
		return adjusted;
	};

	const commitSort = (nextItems: T[]): void => {
		model.value = nextItems;
		emit('sort', nextItems);
		clearDragAndDropState();
	};

	const onDragStart = (path: number[], event: DragEvent): void => {
		if (props.disabled) {
			return;
		}
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/plain', 'lx-sortable');
		}
		dragPath.value = [...path];
	};

	const onDragOver = (path: number[], mode: TSortableDropMode, event: DragEvent): void => {
		if (props.disabled || !dragPath.value) {
			return;
		}
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
		dropPath.value = [...path];
		dropMode.value = mode;
	};

	const onDrop = (path: number[], mode: TSortableDropMode, event?: DragEvent): void => {
		void event;
		if (props.disabled || !dragPath.value) {
			return;
		}

		const sourcePath = [...dragPath.value];
		const targetPath = [...path];

		if (sourcePath.length === 0) {
			clearDragAndDropState();
			return;
		}

		if (mode === 'inside' && pathsEqual(sourcePath, targetPath)) {
			clearDragAndDropState();
			return;
		}

		if (targetPath.length > 0 && isPrefixPath(sourcePath, targetPath)) {
			clearDragAndDropState();
			return;
		}

		const { nextItems: withoutSource, removed } = removeAtPath(model.value, sourcePath);
		if (!removed) {
			clearDragAndDropState();
			return;
		}

		const adjustedTargetPath = adjustPathAfterRemoval(targetPath, sourcePath);
		let nextItems = withoutSource;

		if (mode === 'inside') {
			nextItems = insertInsidePath(withoutSource, adjustedTargetPath, removed);
		} else {
			nextItems = insertRelativeToPath(withoutSource, adjustedTargetPath, mode, removed);
		}

		commitSort(nextItems);
	};

	const onDragEnd = (): void => {
		clearDragAndDropState();
	};
</script>

<style scoped lang='scss'>
	.lx-sortable {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	:deep(.lx-sortable__branch) {
		display: grid;
		gap: var(--lx-size-space-xs);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	:deep(.lx-sortable__branch.is-nested) {
		padding-left: var(--lx-size-space-lg);
	}

	:deep(.lx-sortable__entry) {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	:deep(.lx-sortable__item) {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		cursor: move;
		padding: var(--lx-size-space-sm);
	}

	:deep(.lx-sortable__item.is-dragging) {
		opacity: 0.6;
	}

	:deep(.lx-sortable__inside-drop) {
		border: var(--lx-size-border-width-hairline) dashed transparent;
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		margin-top: var(--lx-size-space-xs);
		padding: var(--lx-size-space-2xs) var(--lx-size-space-xs);
	}

	:deep(.lx-sortable__ghost),
	.lx-sortable__empty-drop {
		background: transparent;
		border: var(--lx-size-border-width-hairline) dashed transparent;
		border-radius: var(--lx-size-radius-pill);
	}

	:deep(.lx-sortable__ghost) {
		height: 0.5rem;
	}

	.lx-sortable__empty-drop {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		padding: var(--lx-size-space-md);
		text-align: center;
	}

	:deep(.lx-sortable__ghost.is-drop-target),
	:deep(.lx-sortable__inside-drop.is-drop-target),
	.lx-sortable__empty-drop.is-drop-target {
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, transparent);
		border-color: var(--lx-colour-primary);
	}

	:deep(.lx-sortable__inside-drop.is-drop-target) {
		color: var(--lx-colour-primary);
	}
</style>
