<template>
	<ul class="lx-tree" role="tree">
		<template v-for="node in props.items" :key="node.id">
			<LxTreeItem
				:node="node"
				:expanded="expandedSet.has(node.id)"
				:selected="selectedSet.has(node.id)"
				:has-children="Boolean(node.children?.length)"
				:expand-on-click="props.expandOnClick"
				@select="onSelect"
				@toggle="toggleExpand"
			>
				<template #default="{ node: slotNode }">
					<slot name="item" :node="slotNode">
						{{ slotNode.label }}
					</slot>
				</template>
			</LxTreeItem>

			<LxTreeNodeChildren
				v-if="node.children?.length && expandedSet.has(node.id)"
				:nodes="node.children"
				:level="1"
				:selected-set="selectedSet"
				:expanded-set="expandedSet"
				:expand-on-click="props.expandOnClick"
				@select="onSelect"
				@toggle="toggleExpand"
			>
				<template #item="{ node: slotNode }">
					<slot name="item" :node="slotNode">
						{{ slotNode.label }}
					</slot>
				</template>
			</LxTreeNodeChildren>
			<template v-else />
		</template>
	</ul>
</template>

<script setup lang='ts'>
	import { computed, defineComponent, h, ref } from 'vue';
	import LxTreeItem from '../tree-item/LxTreeItem.vue';
	import type { ILxTreeNode, ILxTreeProps } from './types';

	const props = withDefaults(defineProps<ILxTreeProps>(), {
		items: () => [],
		multiple: false,
		expandOnClick: true,
	});

	const emit = defineEmits<{
		(event: 'select', ids: string[]): void,
		(event: 'toggle', id: string, expanded: boolean): void,
	}>();

	const model = defineModel<string[]>({
		default: () => [],
	});

	const expanded = ref<Set<string>>(new Set());

	const hydrateExpanded = (nodes: ILxTreeNode[]): void => {
		for (const node of nodes) {
			if (node.expanded) {
				expanded.value.add(node.id);
			}
			if (node.children?.length) {
				hydrateExpanded(node.children);
			}
		}
	};

	hydrateExpanded(props.items);

	const selectedSet = computed(() => new Set(model.value));
	const expandedSet = computed(() => expanded.value);

	const onSelect = (node: ILxTreeNode): void => {
		if (node.disabled) {
			return;
		}

		if (props.multiple) {
			const next = new Set(selectedSet.value);
			if (next.has(node.id)) {
				next.delete(node.id);
			} else {
				next.add(node.id);
			}
			model.value = Array.from(next);
		} else {
			model.value = [node.id];
		}

		emit('select', model.value);
	};

	const toggleExpand = (node: ILxTreeNode): void => {
		if (!node.children?.length || node.disabled) {
			return;
		}

		if (expanded.value.has(node.id)) {
			expanded.value.delete(node.id);
			emit('toggle', node.id, false);
		} else {
			expanded.value.add(node.id);
			emit('toggle', node.id, true);
		}
	};

	const LxTreeNodeChildren = defineComponent({
		name: 'LxTreeNodeChildren',
		props: {
			nodes: {
				type: Array as () => ILxTreeNode[],
				required: true,
			},
			level: {
				type: Number,
				required: true,
			},
			selectedSet: {
				type: Object as () => Set<string>,
				required: true,
			},
			expandedSet: {
				type: Object as () => Set<string>,
				required: true,
			},
			expandOnClick: {
				type: Boolean,
				required: true,
			},
		},
		emits: ['select', 'toggle'],
		setup(innerProps, { slots, emit: innerEmit }) {
			const onSelectNode = (value: ILxTreeNode): void => {
				innerEmit('select', value);
			};
			const onToggleNode = (value: ILxTreeNode): void => {
				innerEmit('toggle', value);
			};

			return () => h(
				'ul',
				{ class: 'lx-tree__children' },
				innerProps.nodes.flatMap(node => {
					const children: ReturnType<typeof h>[] = [
						h(LxTreeItem, {
							node,
							level: innerProps.level,
							expanded: innerProps.expandedSet.has(node.id),
							selected: innerProps.selectedSet.has(node.id),
							hasChildren: Boolean(node.children?.length),
							expandOnClick: innerProps.expandOnClick,
							onSelect: onSelectNode,
							onToggle: onToggleNode,
						}, {
							default: ({ node: slotNode }: { node: ILxTreeNode }) =>
								slots.item?.({ node: slotNode }),
						}),
					];

					if (node.children?.length && innerProps.expandedSet.has(node.id)) {
						children.push(h(LxTreeNodeChildren, {
							nodes: node.children,
							level: innerProps.level + 1,
							selectedSet: innerProps.selectedSet,
							expandedSet: innerProps.expandedSet,
							expandOnClick: innerProps.expandOnClick,
							onSelect: onSelectNode,
							onToggle: onToggleNode,
						}, {
							item: ({ node: slotNode }: { node: ILxTreeNode }) =>
								slots.item?.({ node: slotNode }),
						}));
					}

					return children;
				}),
			);
		},
	});
</script>

<style scoped lang='scss'>
	.lx-tree,
	.lx-tree__children {
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.lx-tree {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		padding: var(--lx-size-space-xs);
	}
</style>
