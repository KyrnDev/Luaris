<template>
	<div class="lx-colour-picker">
		<div class="lx-colour-picker__row">
			<input
				v-bind="attrs"
				:id="inputId"
				v-model="hexValue"
				:name="inputName"
				type="color"
				:disabled="props.disabled"
				:aria-label="colourAriaLabel"
			>
			<input
				v-if="props.showAlpha"
				v-model.number="alphaValue"
				type="range"
				min="0"
				max="1"
				step="0.01"
				:disabled="props.disabled"
				aria-label="Alpha"
			>
			<output class="lx-colour-picker__output">{{ rgbaPreview }}</output>
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { computed, useAttrs, useId, watch } from 'vue';
	import type { ILxColourPickerProps, ILxColourValue } from './types';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxColourPickerProps>(), {
		disabled: false,
		showAlpha: true,
	});

	const emit = defineEmits<{
		(event: 'change', value: ILxColourValue): void,
	}>();

	const value = defineModel<ILxColourValue>({
		default: {
			hex: '#3b82f6',
			alpha: 1,
		},
	});
	const attrs = useAttrs();
	const generatedId = `lx-colour-picker-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const colourAriaLabel = computed(() => {
		const attrAriaLabel = attrs['aria-label'];
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Colour';
	});

	const hexValue = computed({
		get: () => value.value.hex,
		set: hex => {
			value.value = { ...value.value, hex };
		},
	});

	const alphaValue = computed({
		get: () => value.value.alpha,
		set: alpha => {
			value.value = { ...value.value, alpha };
		},
	});

	const hexToRgb = (hex: string): [number, number, number] => {
		const sanitised = hex.replace('#', '');
		const parsed = Number.parseInt(sanitised, 16);
		return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
	};

	const rgbaPreview = computed(() => {
		const [r, g, b] = hexToRgb(value.value.hex);
		return `rgba(${r}, ${g}, ${b}, ${value.value.alpha.toFixed(2)})`;
	});

	watch(value, next => {
		const alpha = Math.min(Math.max(next.alpha, 0), 1);
		if (alpha !== next.alpha) {
			value.value = { ...next, alpha };
			return;
		}

		emit('change', next);
	}, { deep: true });
</script>

<style scoped lang='scss'>
	.lx-colour-picker {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-colour-picker__row {
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: auto 1fr auto;
		padding: var(--lx-size-space-sm);
	}

	.lx-colour-picker input[type='color'] {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		cursor: pointer;
		height: 2rem;
		padding: 0.15rem;
		width: 3rem;
	}

	.lx-colour-picker input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.lx-colour-picker input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: calc(var(--lx-size-radius-sm) - 0.15rem);
	}

	.lx-colour-picker input[type='color']::-moz-color-swatch {
		border: none;
		border-radius: calc(var(--lx-size-radius-sm) - 0.15rem);
	}

	.lx-colour-picker input[type='range'] {
		accent-color: var(--lx-colour-primary);
	}

	.lx-colour-picker__output {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text-muted);
		font-family: var(--lx-font-family-mono);
		font-size: var(--lx-font-size-xs);
		padding: 0.25rem 0.45rem;
	}
</style>
