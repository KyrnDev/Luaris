<template>
	<div class="lx-skeleton" role="status" aria-live="polite">
		<span
			v-for="index in props.count"
			:key="index"
			class="lx-skeleton__item"
			:class="[`lx-skeleton__item--${props.variant}`, { 'is-animated': props.animated }]"
			:style="itemStyle"
		/>
	</div>
</template>

<script setup lang='ts'>
	import type { ILxSkeletonProps } from './types';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<ILxSkeletonProps>(), {
		count: 1,
		variant: 'text',
		animated: true,
		width: '',
		height: '',
	});

	const itemStyle = computed(() => ({
		width: props.width || undefined,
		height: props.height || undefined,
	}));
</script>

<style scoped lang='scss'>
	.lx-skeleton {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-skeleton__item {
		background: linear-gradient(90deg, var(--lx-colour-surface-sunken), color-mix(in srgb, var(--lx-colour-surface-border) 55%, transparent), var(--lx-colour-surface-sunken));
		background-size: 200% 100%;
		display: block;
	}

	.lx-skeleton__item.is-animated {
		animation: lx-skeleton-shimmer 1.2s linear infinite;
	}

	.lx-skeleton__item--text {
		border-radius: var(--lx-size-radius-sm);
		height: 0.8rem;
	}

	.lx-skeleton__item--rect {
		border-radius: var(--lx-size-radius-md);
		height: 4rem;
	}

	.lx-skeleton__item--circle {
		border-radius: var(--lx-size-radius-pill);
		height: 2.5rem;
		width: 2.5rem;
	}

	@keyframes lx-skeleton-shimmer {
		to {
			background-position: -200% 0;
		}
	}
</style>
