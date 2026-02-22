<template>
	<ul class="lx-sortable__branch" :class="{ 'is-nested': props.level > 0 }">
		<li
			v-for="(item, index) in props.items"
			:key="props.resolveKey(item, currentPath(index))"
			class="lx-sortable__entry"
		>
			<div
				class="lx-sortable__ghost"
				:class="{ 'is-drop-target': props.isDropTarget(currentPath(index), 'before') }"
				@dragover.prevent.stop="props.onDragOver(currentPath(index), 'before', $event)"
				@drop.prevent.stop="props.onDrop(currentPath(index), 'before', $event)"
			/>

			<div
				draggable="true"
				class="lx-sortable__item"
				:class="{ 'is-dragging': props.isDragging(currentPath(index)) }"
				@dragstart="props.onDragStart(currentPath(index), $event)"
				@dragend="props.onDragEnd"
			>
				<slot name="item" :item="item" :index="index" :path="currentPath(index)" :level="props.level">
					{{ item }}
				</slot>

				<div
					class="lx-sortable__inside-drop"
					:class="{ 'is-drop-target': props.isDropTarget(currentPath(index), 'inside') }"
					@dragover.prevent.stop="props.onDragOver(currentPath(index), 'inside', $event)"
					@drop.prevent.stop="props.onDrop(currentPath(index), 'inside', $event)"
				>
					Drop inside
				</div>
			</div>

			<LxSortableBranch
				v-if="props.getChildren(item).length > 0"
				:items="props.getChildren(item)"
				:path-prefix="currentPath(index)"
				:level="props.level + 1"
				:get-children="props.getChildren"
				:resolve-key="props.resolveKey"
				:is-drop-target="props.isDropTarget"
				:is-dragging="props.isDragging"
				:on-drag-start="props.onDragStart"
				:on-drag-over="props.onDragOver"
				:on-drop="props.onDrop"
				:on-drag-end="props.onDragEnd"
			/>

			<div
				class="lx-sortable__ghost"
				:class="{ 'is-drop-target': props.isDropTarget(currentPath(index), 'after') }"
				@dragover.prevent.stop="props.onDragOver(currentPath(index), 'after', $event)"
				@drop.prevent.stop="props.onDrop(currentPath(index), 'after', $event)"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import type { ILxSortableBranchProps } from './types';

	const props = defineProps<ILxSortableBranchProps>();

	const currentPath = (index: number): number[] => [...props.pathPrefix, index];
</script>
