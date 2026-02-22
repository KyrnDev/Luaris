<template>
	<div class="lx-virtual-list" :style="{ height: `${props.height}px` }" @scroll="onScroll">
		<div class="lx-virtual-list__spacer" :style="{ height: `${totalHeight}px` }">
			<div
				v-for="entry in visibleItems"
				:key="entry.key"
				class="lx-virtual-list__item"
				:style="{ transform: `translateY(${entry.top}px)`, height: `${props.itemHeight}px` }"
			>
				<slot name="item" :item="entry.item" :index="entry.index">
					{{ entry.item }}
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts' generic='T'>
	import { computed, ref } from 'vue';
	import type { ILxVirtualListProps } from './types';

	interface IVisibleItem<TItem> {
		item: TItem,
		index: number,
		key: string,
		top: number,
	}

	const props = withDefaults(defineProps<ILxVirtualListProps<T>>(), {
		items: () => [] as T[],
		height: 320,
		itemHeight: 40,
		overscan: 6,
		keyField: 'id',
	});

	const scrollTop = ref(0);
	const totalHeight = computed(() => props.items.length * props.itemHeight);
	const startIndex = computed(() => Math.max(Math.floor(scrollTop.value / props.itemHeight) - props.overscan, 0));
	const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight) + (props.overscan * 2));
	const endIndex = computed(() => Math.min(startIndex.value + visibleCount.value, props.items.length));

	const visibleItems = computed<IVisibleItem<T>[]>(() => {
		const slice = props.items.slice(startIndex.value, endIndex.value);
		return slice.map((item, offset) => {
			const index = startIndex.value + offset;
			const row = item as Record<string, unknown>;
			const keyValue = row?.[props.keyField];
			return {
				item,
				index,
				key: typeof keyValue === 'string' || typeof keyValue === 'number' ? String(keyValue) : `${index}`,
				top: index * props.itemHeight,
			};
		});
	});

	const onScroll = (event: Event): void => {
		const target = event.target as HTMLDivElement;
		scrollTop.value = target.scrollTop;
	};
</script>

<style scoped lang='scss'>
	.lx-virtual-list {
		overflow: auto;
		position: relative;
	}

	.lx-virtual-list__spacer {
		position: relative;
	}

	.lx-virtual-list__item {
		left: 0;
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
		position: absolute;
		right: 0;
	}
</style>
