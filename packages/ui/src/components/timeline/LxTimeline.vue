<template>
	<section ref="rootRef" class="lx-timeline" :class="[`lx-timeline--${props.orientation}`]">
		<article v-for="(item, index) in items" :key="item.id" class="lx-timeline__item">
			<div :ref="element => setOverviewRef(element, index)" class="lx-timeline__overview">
				<span class="lx-timeline__marker">
					<component :is="{ render: item.markerSlot }" v-if="item.markerSlot" />
					<LxTag v-else :label="item.marker" size="sm" variant="secondary" />
				</span>
				<div class="lx-timeline__meta">
					<strong class="lx-timeline__title">{{ item.title }}</strong>
					<small v-if="item.subtitle" class="lx-timeline__subtitle">{{ item.subtitle }}</small>
					<small v-if="item.markerNote" class="lx-timeline__marker-note">{{ item.markerNote }}</small>
				</div>
			</div>
			<div class="lx-timeline__rail" aria-hidden="true">
				<span class="lx-timeline__dot" />
			</div>
			<div class="lx-timeline__content">
				<LxCard class="lx-timeline__content-card" padding="var(--lx-size-space-md)">
					<component :is="{ render: item.contentSlot }" v-if="item.contentSlot" />
				</LxCard>
			</div>
		</article>
	</section>
</template>

<script setup lang='ts'>
	import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
	import type { VNode } from 'vue';
	import { LxCard } from '../card';
	import { LxTag } from '../tag';
	import { LxTimelineItem } from '../timeline-item';
	import type { ILxTimelineItemInternal, ILxTimelineProps } from './types';

	const props = withDefaults(defineProps<ILxTimelineProps>(), {
		orientation: 'vertical',
		type: 'custom',
	});

	const slots = useSlots();
	const rootRef = ref<HTMLElement | null>(null);
	const overviewRefs = ref<Array<HTMLElement | null>>([]);
	let resizeObserver: ResizeObserver | null = null;

	const normaliseNodes = (nodes: VNode[]): VNode[] => {
		return nodes.flatMap(node => {
			if (Array.isArray(node.children)) {
				return normaliseNodes(node.children as VNode[]);
			}

			return [node];
		});
	};

	const defaultMarker = (index: number, type: string): string => {
		switch (type) {
		case 'number':
			return String(index + 1);
		case 'year':
			return 'Year';
		case 'date':
			return 'Date';
		default:
			return '•';
		}
	};

	const items = computed<ILxTimelineItemInternal[]>(() => {
		const nodes = slots.default ? normaliseNodes(slots.default()) : [];

		return nodes
			.filter(node => node.type === LxTimelineItem)
			.map((node, index) => {
				const propsMap = (node.props || {}) as Record<string, unknown>;
				const type = String(propsMap.type || props.type) as ILxTimelineItemInternal['type'];
				const slotMap = (node.children || {}) as Record<string, (() => VNode[] | undefined) | undefined>;

				return {
					id: String(propsMap.id || `timeline-${index}`),
					marker: String(propsMap.marker || defaultMarker(index, type)),
					markerNote: String(propsMap.markerNote || ''),
					title: String(propsMap.title || `Item ${index + 1}`),
					subtitle: String(propsMap.subtitle || ''),
					type,
					markerSlot: slotMap.marker,
					contentSlot: slotMap.default,
				};
			});
	});

	const updateOverviewWidth = (): void => {
		const rootElement = rootRef.value;
		if (!rootElement) {
			return;
		}

		const widths = overviewRefs.value
			.filter((element): element is HTMLElement => element instanceof HTMLElement)
			.map(element => element.offsetWidth);
		const maxWidth = widths.length > 0 ? Math.max(...widths) : 0;
		rootElement.style.setProperty('--lx-timeline-overview-width', `${maxWidth}px`);
	};

	const setOverviewRef = (element: Element | null, index: number): void => {
		overviewRefs.value[index] = element instanceof HTMLElement ? element : null;
	};

	onMounted(async () => {
		await nextTick();
		updateOverviewWidth();

		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				updateOverviewWidth();
			});

			for (const element of overviewRefs.value) {
				if (element) {
					resizeObserver.observe(element);
				}
			}
		}
	});

	watch(items, async () => {
		await nextTick();
		overviewRefs.value = overviewRefs.value.slice(0, items.value.length);
		updateOverviewWidth();

		if (resizeObserver) {
			resizeObserver.disconnect();
			for (const element of overviewRefs.value) {
				if (element) {
					resizeObserver.observe(element);
				}
			}
		}
	});

	onBeforeUnmount(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
		}
	});
</script>

<style scoped lang='scss'>
	.lx-timeline {
		display: grid;
		gap: 0;
		--lx-timeline-overview-width: auto;
	}

	.lx-timeline__item {
		display: grid;
		grid-template-columns: var(--lx-timeline-overview-width) 50px minmax(0, 1fr);
	}

	.lx-timeline__overview {
		align-content: start;
		display: grid;
		gap: var(--lx-size-space-md);
		padding-block: var(--lx-size-space-md);
		padding-inline: var(--lx-size-space-lg);
		justify-items: end;
		text-align: right;
	}

	.lx-timeline__rail {
		align-self: stretch;
		display: grid;
		place-items: center;
		position: relative;
	}

	.lx-timeline__rail::before {
		background: var(--lx-colour-surface-border);
		content: '';
		height: 100%;
		left: 50%;
		position: absolute;
		top: 0;
		transform: translateX(-50%);
		width: var(--lx-size-border-width-hairline);
	}

	.lx-timeline__dot {
		background: var(--lx-colour-primary);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-base);
		border-radius: var(--lx-size-radius-pill);
		height: 0.5rem;
		position: relative;
		width: 0.5rem;
		z-index: 1;
	}

	.lx-timeline__marker {
		display: inline-flex;
	}

	.lx-timeline__meta {
		display: grid;
		gap: var(--lx-size-space-2xs);
		justify-items: end;
	}

	.lx-timeline__title {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
	}

	.lx-timeline__subtitle,
	.lx-timeline__marker-note {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-timeline__content {
		display: grid;
		padding-block: var(--lx-size-space-md);
		padding-inline: var(--lx-size-space-lg);
	}

	.lx-timeline__content-card {
		height: 100%;
	}

	.lx-timeline--horizontal {
		grid-auto-columns: minmax(14rem, 1fr);
		grid-auto-flow: column;
		overflow-x: auto;
	}

	.lx-timeline--horizontal .lx-timeline__item {
		gap: var(--lx-size-space-sm);
		grid-template-columns: 1fr;
	}

	.lx-timeline--horizontal .lx-timeline__rail {
		display: none;
	}

	.lx-timeline--horizontal .lx-timeline__dot {
		display: none;
	}

	@media (max-width: 960px) {
		.lx-timeline__item {
			grid-template-columns: 1fr;
		}

		.lx-timeline__rail {
			display: none;
		}

		.lx-timeline__dot {
			display: none;
		}
	}
</style>
