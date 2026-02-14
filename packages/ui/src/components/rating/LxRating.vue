<template>
	<div class="lx-rating" :class="`lx-rating--${props.size}`" role="radiogroup" :aria-label="props.label">
		<button
			v-for="index in props.max"
			:key="index"
			type="button"
			class="lx-rating__item"
			:class="{ 'is-active': index <= displayValue }"
			role="radio"
			:aria-checked="index === model"
			:disabled="props.readonly"
			@click="setValue(index)"
			@mouseenter="hoverValue = index"
			@mouseleave="hoverValue = 0"
		>
			<slot name="icon" :active="index <= displayValue" :index="index">
				★
			</slot>
		</button>
	</div>
</template>

<script setup lang='ts'>
	import type { ILxRatingProps } from './types';
	import { computed, ref } from 'vue';

	const props = withDefaults(defineProps<ILxRatingProps>(), {
		max: 5,
		readonly: false,
		allowHalf: false,
		label: 'Rating',
		size: 'md',
	});

	const emit = defineEmits<{
		(event: 'change', value: number): void,
	}>();

	const model = defineModel<number>({
		default: 0,
	});

	const hoverValue = ref(0);
	const displayValue = computed(() => hoverValue.value || model.value);

	const setValue = (value: number): void => {
		if (props.readonly) {
			return;
		}

		model.value = value;
		emit('change', value);
	};
</script>

<style scoped lang='scss'>
	.lx-rating {
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-rating__item {
		appearance: none;
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-border);
		cursor: pointer;
		font-size: var(--lx-rating-size);
		line-height: 1;
		padding: 0;
	}

	.lx-rating__item.is-active {
		color: var(--lx-colour-warning);
	}

	.lx-rating__item:disabled {
		cursor: default;
		opacity: 0.7;
	}

	.lx-rating--xs {
		--lx-rating-size: 0.85rem;
	}

	.lx-rating--sm {
		--lx-rating-size: 1.1rem;
	}

	.lx-rating--md {
		--lx-rating-size: 1.4rem;
	}

	.lx-rating--lg {
		--lx-rating-size: 1.8rem;
	}

	.lx-rating--xl {
		--lx-rating-size: 2.2rem;
	}
</style>
