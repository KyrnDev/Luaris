<template>
	<div
		class="lx-progress"
		:class="[
			`lx-progress--${props.orientation}`,
			`lx-progress--${props.variant}`,
			`lx-progress--${resolvedSizeClass}`,
		]"
		role="progressbar"
		:aria-valuemin="0"
		:aria-valuemax="props.max"
		:aria-valuenow="props.indeterminate ? undefined : clampedValue"
	>
		<div v-if="props.orientation !== &quot;ring&quot;" class="lx-progress__track">
			<div class="lx-progress__fill" :style="fillStyle" />
		</div>
		<div v-else class="lx-progress__ring" :style="ringStyle">
			<span v-if="props.showLabel">{{ percentage }}%</span>
		</div>
		<span v-if="props.showLabel && props.orientation !== &quot;ring&quot;" class="lx-progress__label">{{ percentage }}%</span>
	</div>
</template>

<script setup lang='ts'>
	import type { ILxProgressProps } from './types';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<ILxProgressProps>(), {
		value: 0,
		max: 100,
		variant: 'primary',
		orientation: 'horizontal',
		showLabel: false,
		indeterminate: false,
		size: 'md',
	});

	const clampedValue = computed(() => Math.min(Math.max(props.value, 0), props.max));
	const percentage = computed(() => Math.round((clampedValue.value / props.max) * 100));
	const resolvedSizeClass = computed(() => typeof props.size === 'number' ? 'md' : props.size);
	const ringSizeMap: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
		sm: 44,
		md: 64,
		lg: 84,
		xl: 108,
	};
	const resolvedRingSize = computed(() => {
		if (typeof props.size === 'number') {
			return props.size;
		}

		return ringSizeMap[props.size];
	});

	const fillStyle = computed(() => {
		if (props.indeterminate) {
			return {
				width: '45%',
				height: '45%',
			};
		}

		if (props.orientation === 'vertical') {
			return {
				height: `${percentage.value}%`,
			};
		}

		return {
			width: `${percentage.value}%`,
		};
	});

	const ringStyle = computed(() => ({
		'--lx-progress-size': `${resolvedRingSize.value}px`,
		'--lx-progress-percent': `${percentage.value}%`,
	}));
</script>

<style scoped lang='scss'>
	.lx-progress {
		--lx-progress-colour: var(--lx-colour-primary);
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-progress__track {
		background: var(--lx-colour-surface-sunken);
		border-radius: var(--lx-size-radius-pill);
		overflow: hidden;
		position: relative;
	}

	.lx-progress__fill {
		background: var(--lx-progress-colour);
		height: 100%;
		transition: width var(--lx-motion-duration-normal) var(--lx-motion-easing-standard), height var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-progress--horizontal .lx-progress__track {
		height: 0.7rem;
	}

	.lx-progress--horizontal.lx-progress--sm .lx-progress__track {
		height: 0.45rem;
	}

	.lx-progress--horizontal.lx-progress--lg .lx-progress__track {
		height: 0.9rem;
	}

	.lx-progress--horizontal.lx-progress--xl .lx-progress__track {
		height: 1.15rem;
	}

	.lx-progress--vertical .lx-progress__track {
		display: flex;
		height: 6rem;
		justify-content: flex-end;
		width: 0.7rem;
	}

	.lx-progress--vertical.lx-progress--sm .lx-progress__track {
		height: 4.25rem;
		width: 0.45rem;
	}

	.lx-progress--vertical.lx-progress--lg .lx-progress__track {
		height: 7.4rem;
		width: 0.95rem;
	}

	.lx-progress--vertical.lx-progress--xl .lx-progress__track {
		height: 9rem;
		width: 1.2rem;
	}

	.lx-progress--vertical .lx-progress__fill {
		width: 100%;
	}

	.lx-progress__ring {
		align-items: center;
		background:
			radial-gradient(circle at center, var(--lx-colour-surface-raised) 56%, transparent 57%),
			conic-gradient(var(--lx-progress-colour) var(--lx-progress-percent), var(--lx-colour-surface-sunken) 0);
		border-radius: var(--lx-size-radius-pill);
		display: inline-flex;
		height: var(--lx-progress-size);
		justify-content: center;
		width: var(--lx-progress-size);
	}

	.lx-progress__label {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-progress--secondary { --lx-progress-colour: var(--lx-colour-secondary); }
	.lx-progress--accent { --lx-progress-colour: var(--lx-colour-accent); }
	.lx-progress--info { --lx-progress-colour: var(--lx-colour-info); }
	.lx-progress--success { --lx-progress-colour: var(--lx-colour-success); }
	.lx-progress--warning { --lx-progress-colour: var(--lx-colour-warning); }
	.lx-progress--danger { --lx-progress-colour: var(--lx-colour-danger); }
</style>
