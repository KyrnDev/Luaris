<template>
	<section class="lx-comparison" :aria-label="props.label">
		<div class="lx-comparison__panel lx-comparison__panel--left">
			<div class="lx-comparison__clipped" :style="leftClipStyle">
				<slot name="left" />
			</div>
		</div>
		<div class="lx-comparison__panel lx-comparison__panel--right">
			<slot name="right" />
		</div>
		<input
			v-model="inputSplit"
			class="lx-comparison__handle"
			type="range"
			:min="props.min"
			:max="props.max"
			:step="props.step"
			aria-label="Comparison split"
		>
	</section>
</template>

<script setup lang='ts'>
	import type { ILxComparisonProps } from './types';
	import { computed, onMounted } from 'vue';

	const props = withDefaults(defineProps<ILxComparisonProps>(), {
		initialSplit: 50,
		min: 0,
		max: 100,
		step: 1,
		label: 'Comparison slider',
	});

	const split = defineModel<number>({
		default: 50,
	});

	const inputSplit = computed({
		get: () => split.value,
		set: (next: string | number) => {
			split.value = Number(next);
		},
	});

	onMounted(() => {
		split.value = props.initialSplit;
	});

	const leftClipStyle = computed(() => ({
		clipPath: `inset(0 ${100 - split.value}% 0 0)`,
	}));
</script>

<style scoped lang='scss'>
	.lx-comparison {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		overflow: hidden;
		position: relative;
	}

	.lx-comparison__panel {
		min-height: 14rem;
	}

	.lx-comparison__panel--right {
		position: relative;
		z-index: 1;
	}

	.lx-comparison__panel--left {
		inset: 0;
		position: absolute;
		z-index: 2;
	}

	.lx-comparison__clipped {
		height: 100%;
		width: 100%;
	}

	.lx-comparison__handle {
		appearance: none;
		background: transparent;
		cursor: ew-resize;
		inset: 0;
		margin: 0;
		position: absolute;
		width: 100%;
		z-index: 3;
	}

	.lx-comparison__handle::-webkit-slider-thumb {
		appearance: none;
		background: var(--lx-colour-primary);
		border: var(--lx-size-border-width-standard) solid var(--lx-colour-surface-inverse);
		border-radius: var(--lx-size-radius-pill);
		cursor: ew-resize;
		height: 1.4rem;
		width: 1.4rem;
	}

	.lx-comparison__handle::-moz-range-thumb {
		background: var(--lx-colour-primary);
		border: var(--lx-size-border-width-standard) solid var(--lx-colour-surface-inverse);
		border-radius: var(--lx-size-radius-pill);
		cursor: ew-resize;
		height: 1.4rem;
		width: 1.4rem;
	}
</style>
