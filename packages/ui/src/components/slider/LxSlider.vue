<template>
	<div class="lx-slider">
		<div class="lx-slider__row">
			<input
				v-bind="attrs"
				:id="inputId"
				v-model="inputValue"
				:name="inputName"
				type="range"
				:min="props.min"
				:max="props.max"
				:step="props.step"
				:disabled="props.disabled"
				:aria-label="sliderAriaLabel"
			>
			<span v-if="props.showValue" class="lx-slider__value">{{ value }}</span>
		</div>
	</div>
</template>

<script setup lang='ts'>
	import type { ILxSliderProps } from './types';
	import { computed, useAttrs, useId, watch } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxSliderProps>(), {
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
		showValue: true,
	});

	const emit = defineEmits<{
		(event: 'change', value: number): void,
	}>();

	const value = defineModel<number>({
		default: 0,
	});
	const attrs = useAttrs();
	const generatedId = `lx-slider-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const sliderAriaLabel = computed(() => {
		const attrAriaLabel = attrs['aria-label'];
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Slider';
	});

	const inputValue = computed({
		get: () => value.value,
		set: (next: string | number) => {
			value.value = Number(next);
		},
	});

	watch(value, next => {
		emit('change', next);
	});
</script>

<style scoped lang='scss'>
	.lx-slider {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-slider__row {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-slider input[type='range'] {
		accent-color: var(--lx-colour-primary);
		width: 100%;
	}

	.lx-slider__value {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}
</style>
