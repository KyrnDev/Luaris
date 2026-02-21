<template>
	<li class="lx-tree-item" :class="{ 'is-selected': props.selected, 'is-disabled': props.node.disabled }">
		<div class="lx-tree-item__row" :style="{ paddingInlineStart: `${(props.level || 0) * 1}rem` }">
			<button
				v-if="props.hasChildren"
				type="button"
				class="lx-tree-item__toggle"
				:disabled="props.node.disabled"
				@click="$emit('toggle', props.node)"
			>
				{{ props.expanded ? '▾' : '▸' }}
			</button>
			<span v-else class="lx-tree-item__spacer" aria-hidden="true" />

			<button
				type="button"
				class="lx-tree-item__label"
				:disabled="props.node.disabled"
				@click="$emit('select', props.node)"
				@dblclick="props.expandOnClick && props.hasChildren && $emit('toggle', props.node)"
			>
				<span v-if="props.node.icon" class="lx-tree-item__icon" aria-hidden="true">
					<LxIcon :name="props.node.icon" />
				</span>
				<template v-else />
				<slot :node="props.node">
					{{ props.node.label }}
				</slot>
			</button>
		</div>
	</li>
</template>

<script setup lang='ts'>
	import { LxIcon } from '../icon';
	import type { ILxTreeNode } from '../tree/types';
	import type { ILxTreeItemProps } from './types';

	const props = withDefaults(defineProps<ILxTreeItemProps>(), {
		level: 0,
		expanded: false,
		selected: false,
		hasChildren: false,
		expandOnClick: true,
	});

	defineEmits<{
		(event: 'toggle', node: ILxTreeNode): void,
		(event: 'select', node: ILxTreeNode): void,
	}>();
</script>

<style scoped lang='scss'>
	.lx-tree-item__row {
		align-items: center;
		display: grid;
		gap: var(--lx-size-space-xs);
		grid-template-columns: auto 1fr;
	}

	.lx-tree-item__toggle,
	.lx-tree-item__label {
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
	}

	.lx-tree-item__toggle {
		width: 1.5rem;
	}

	.lx-tree-item__label {
		align-items: center;
		border-radius: var(--lx-size-radius-sm);
		display: inline-flex;
		gap: var(--lx-size-space-xs);
		padding: var(--lx-size-space-2xs) var(--lx-size-space-xs);
		text-align: left;
		width: 100%;
	}

	.lx-tree-item__label:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-tree-item__spacer {
		width: 1.5rem;
	}

	.lx-tree-item.is-selected .lx-tree-item__label {
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, transparent);
	}

	.lx-tree-item.is-disabled {
		opacity: 0.6;
	}
</style>
