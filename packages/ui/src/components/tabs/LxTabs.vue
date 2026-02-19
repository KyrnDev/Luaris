<template>
	<section class="lx-tabs" :class="[`lx-tabs--${props.variant}`, `lx-tabs--${props.orientation}`]">
		<div class="lx-tabs__list" role="tablist" :aria-orientation="props.orientation">
			<button
				v-for="tab in tabs"
				:id="`tab-${tab.value}`"
				:key="tab.value"
				type="button"
				role="tab"
				class="lx-tabs__tab"
				:class="{ 'is-active': tab.value === activeTab, 'is-disabled': tab.disabled }"
				:aria-selected="tab.value === activeTab"
				:aria-controls="`panel-${tab.value}`"
				:disabled="tab.disabled"
				@click="setActiveTab(tab.value)"
			>
				<template v-if="tab.tabSlot">
					<component :is="{ render: tab.tabSlot }" />
				</template>
				<template v-else>
					{{ tab.label }}
				</template>
			</button>
		</div>

		<div class="lx-tabs__panels">
			<article
				v-for="tab in visiblePanels"
				v-show="tab.value === activeTab"
				:id="`panel-${tab.value}`"
				:key="tab.value"
				role="tabpanel"
				class="lx-tabs__panel"
				:class="{ 'is-active': tab.value === activeTab }"
				:aria-labelledby="`tab-${tab.value}`"
			>
				<component :is="{ render: tab.panelSlot }" v-if="tab.panelSlot" />
			</article>
		</div>
	</section>
</template>

<script setup lang='ts'>
	import { computed, useSlots, watch } from 'vue';
	import type { VNode } from 'vue';
	import { LxTab } from '../tab';
	import type { ILxTabsItemInternal, ILxTabsProps } from './types';

	const props = withDefaults(defineProps<ILxTabsProps>(), {
		variant: 'line',
		orientation: 'horizontal',
		lazy: true,
	});

	const model = defineModel<string>({
		default: '',
	});
	const slots = useSlots();

	const defaultLabelFor = (value: string): string => {
		return value
			.replace(/[-_]/g, ' ')
			.replace(/\b\w/g, char => char.toUpperCase());
	};

	const normaliseChildren = (children: VNode[]): VNode[] => {
		return children.flatMap(child => {
			if (Array.isArray(child.children)) {
				return normaliseChildren(child.children as VNode[]);
			}

			return [child];
		});
	};

	const tabs = computed<ILxTabsItemInternal[]>(() => {
		const nodes = slots.default ? normaliseChildren(slots.default()) : [];

		return nodes
			.filter(node => node.type === LxTab)
			.map(node => {
				const propsMap = (node.props || {}) as Record<string, unknown>;
				const value = String(propsMap.value || '');
				const label = String(propsMap.label || defaultLabelFor(value));
				const disabled = propsMap.disabled === '' || propsMap.disabled === true;
				const slotMap = (node.children || {}) as Record<string, (() => VNode[] | undefined) | undefined>;

				return {
					value,
					label,
					disabled,
					tabSlot: slotMap.tab,
					panelSlot: slotMap.default,
				};
			})
			.filter(tab => tab.value.length > 0);
	});

	const firstEnabledTab = computed(() => tabs.value.find(tab => !tab.disabled)?.value || '');
	const activeTab = computed(() => {
		const current = model.value;
		const exists = tabs.value.some(tab => tab.value === current && !tab.disabled);
		if (exists) {
			return current;
		}

		return firstEnabledTab.value;
	});

	const visiblePanels = computed(() => {
		if (!props.lazy) {
			return tabs.value;
		}

		return tabs.value.filter(tab => tab.value === activeTab.value);
	});

	const setActiveTab = (value: string): void => {
		const candidate = tabs.value.find(tab => tab.value === value);
		if (!candidate || candidate.disabled) {
			return;
		}

		model.value = value;
	};

	watch(tabs, nextTabs => {
		if (nextTabs.length === 0) {
			return;
		}

		if (!model.value || !nextTabs.some(tab => tab.value === model.value && !tab.disabled)) {
			model.value = firstEnabledTab.value;
		}
	}, { immediate: true });
</script>

<style scoped lang='scss'>
	.lx-tabs {
		display: grid;
		gap: var(--lx-size-space-md);
	}

	.lx-tabs__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-xs);
	}

	.lx-tabs__tab {
		align-items: center;
		background: transparent;
		border: var(--lx-size-border-width-hairline) solid transparent;
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text-muted);
		cursor: pointer;
		display: inline-flex;
		font: inherit;
		font-size: var(--lx-font-size-sm);
		gap: var(--lx-size-space-2xs);
		min-height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-sm);
		transition:
			color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			border-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-tabs__tab:hover:not(:disabled) {
		color: var(--lx-colour-surface-text);
	}

	.lx-tabs__tab.is-active {
		color: var(--lx-colour-primary);
	}

	.lx-tabs--line .lx-tabs__tab.is-active {
		border-color: color-mix(in srgb, var(--lx-colour-primary) 75%, var(--lx-colour-surface-border));
	}

	.lx-tabs--pills .lx-tabs__tab {
		background: var(--lx-colour-surface-raised);
		border-color: var(--lx-colour-surface-border);
	}

	.lx-tabs--pills .lx-tabs__tab.is-active {
		background: color-mix(in srgb, var(--lx-colour-primary) 12%, var(--lx-colour-surface-raised));
		border-color: color-mix(in srgb, var(--lx-colour-primary) 60%, var(--lx-colour-surface-border));
	}

	.lx-tabs__tab:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 1px;
	}

	.lx-tabs__tab:disabled,
	.lx-tabs__tab.is-disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}

	.lx-tabs--vertical {
		grid-template-columns: minmax(9rem, 12rem) 1fr;
	}

	.lx-tabs--vertical .lx-tabs__list {
		align-content: start;
		flex-direction: column;
	}

	.lx-tabs__panels {
		min-width: 0;
	}

	.lx-tabs__panel {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		padding: var(--lx-size-space-md);
	}
</style>
