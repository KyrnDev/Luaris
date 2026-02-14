<template>
	<div class="lx-colour-picker">
		<div class="lx-colour-picker__top">
			<input
				v-bind="attrs"
				:id="inputId"
				v-model="hexValue"
				:name="inputName"
				type="color"
				:disabled="props.disabled"
				:aria-label="colourAriaLabel"
			>
			<div class="lx-colour-picker__preview" :style="{ background: previewBackground }">
				<span class="lx-colour-picker__sample-text" :style="{ color: previewTextColour }">Aa</span>
			</div>
		</div>

		<label v-if="props.showAlpha" class="lx-colour-picker__alpha">
			<span>Alpha</span>
			<input
				v-model.number="alphaValue"
				type="range"
				min="0"
				max="1"
				step="0.01"
				:disabled="props.disabled"
				aria-label="Alpha"
			>
			<span>{{ Math.round(alphaValue * 100) }}%</span>
		</label>

		<div class="lx-colour-picker__formats">
			<button
				v-for="format in availableFormats"
				:key="format"
				type="button"
				class="lx-colour-picker__format"
				:class="{ 'is-active': activeFormat === format }"
				:disabled="props.disabled"
				@click="activeFormat = format"
			>
				{{ format.toUpperCase() }}
			</button>
		</div>

		<button
			type="button"
			class="lx-colour-picker__output"
			:disabled="props.disabled"
			@click="copyColourText"
		>
			<span>{{ colourText }}</span>
			<LxTooltip :text="copyHint" placement="top" :disabled="props.disabled">
				<span class="lx-colour-picker__hint" aria-hidden="true">?</span>
			</LxTooltip>
		</button>
	</div>
</template>

<script setup lang='ts'>
	import { computed, ref, useAttrs, useId, watch } from 'vue';
	import { LxTooltip } from '../tooltip';
	import type { ILxColourPickerProps, ILxColourValue, TLxColourFormat } from './types';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxColourPickerProps>(), {
		disabled: false,
		showAlpha: true,
		formats: () => ['hex', 'rgb', 'rgba', 'hsl', 'hsla'],
		defaultFormat: 'rgba',
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
	const availableFormats = computed<TLxColourFormat[]>(() => {
		return props.formats.filter((format, index, list) => list.indexOf(format) === index);
	});
	const activeFormat = ref<TLxColourFormat>(props.defaultFormat);
	const copied = ref(false);

	const hexToRgb = (hex: string): [number, number, number] => {
		const sanitised = hex.replace('#', '');
		const parsed = Number.parseInt(sanitised, 16);
		return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
	};

	const rgbToHsl = (red: number, green: number, blue: number): [number, number, number] => {
		const r = red / 255;
		const g = green / 255;
		const b = blue / 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const delta = max - min;
		let hue = 0;

		if (delta !== 0) {
			switch (max) {
			case r:
				hue = ((g - b) / delta) % 6;
				break;
			case g:
				hue = ((b - r) / delta) + 2;
				break;
			default:
				hue = ((r - g) / delta) + 4;
				break;
			}
		}

		const lightness = (max + min) / 2;
		const saturation = delta === 0 ? 0 : delta / (1 - Math.abs((2 * lightness) - 1));

		return [Math.round(hue * 60 < 0 ? (hue * 60) + 360 : hue * 60), Math.round(saturation * 100), Math.round(lightness * 100)];
	};

	const colourText = computed(() => {
		const [r, g, b] = hexToRgb(value.value.hex);
		const alpha = Number(value.value.alpha.toFixed(2));
		const [h, s, l] = rgbToHsl(r, g, b);

		switch (activeFormat.value) {
		case 'hex':
			return value.value.hex.toUpperCase();
		case 'rgb':
			return `rgb(${r}, ${g}, ${b})`;
		case 'hsl':
			return `hsl(${h} ${s}% ${l}%)`;
		case 'hsla':
			return `hsl(${h} ${s}% ${l}% / ${alpha})`;
		default:
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		}
	});
	const previewBackground = computed(() => colourText.value.startsWith('hsl') ? colourText.value : `rgba(${hexToRgb(value.value.hex).join(', ')}, ${value.value.alpha.toFixed(2)})`);
	const previewTextColour = computed(() => {
		const [r, g, b] = hexToRgb(value.value.hex);
		const luminance = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
		return luminance > 0.58 ? '#111111' : '#ffffff';
	});
	const copyHint = computed(() => copied.value ? 'Copied' : 'Click to copy');

	const copyWithFallback = async (text: string): Promise<void> => {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return;
		}

		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.setAttribute('readonly', '');
		textarea.style.position = 'absolute';
		textarea.style.left = '-9999px';
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
	};

	const copyColourText = async (): Promise<void> => {
		try {
			await copyWithFallback(colourText.value);
			copied.value = true;
			window.setTimeout(() => {
				copied.value = false;
			}, 1200);
		} catch {
			copied.value = false;
		}
	};

	watch(value, next => {
		const alpha = Math.min(Math.max(next.alpha, 0), 1);
		if (alpha !== next.alpha) {
			value.value = { ...next, alpha };
			return;
		}

		emit('change', next);
	}, { deep: true });

	watch(availableFormats, formats => {
		if (!formats.includes(activeFormat.value)) {
			activeFormat.value = formats[0] || 'rgba';
		}
	}, { immediate: true });
</script>

<style scoped lang='scss'>
	.lx-colour-picker {
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-colour-picker__top {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-colour-picker input[type='color'] {
		background: transparent;
		border: none;
		border-radius: var(--lx-size-radius-sm);
		cursor: pointer;
		height: 2.25rem;
		padding: 0;
		width: 4.25rem;
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

	.lx-colour-picker__preview {
		align-items: center;
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		display: inline-flex;
		height: 2.25rem;
		justify-content: center;
		min-width: 6.5rem;
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-colour-picker__sample-text {
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-colour-picker__alpha {
		align-items: center;
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: auto 1fr auto;
	}

	.lx-colour-picker input[type='range'] {
		accent-color: var(--lx-colour-primary);
	}

	.lx-colour-picker__formats {
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-xs);
	}

	.lx-colour-picker__format {
		appearance: none;
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font-size: var(--lx-font-size-xs);
		padding: 0.16rem 0.45rem;
	}

	.lx-colour-picker__format.is-active {
		background: var(--lx-colour-primary);
		border-color: var(--lx-colour-primary);
		color: var(--lx-colour-on-primary);
	}

	.lx-colour-picker__output {
		align-items: center;
		appearance: none;
		background: transparent;
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: copy;
		display: inline-flex;
		font-family: var(--lx-font-family-mono);
		font-size: var(--lx-font-size-sm);
		gap: var(--lx-size-space-xs);
		justify-content: space-between;
		padding: 0.4rem 0.65rem;
		text-align: left;
		width: 100%;
	}

	.lx-colour-picker__output:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.lx-colour-picker__output:hover:not(:disabled) {
		border-color: var(--lx-colour-primary);
	}

	.lx-colour-picker__hint {
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: 999px;
		display: inline-flex;
		font-size: var(--lx-font-size-xs);
		height: 1rem;
		justify-content: center;
		line-height: 1;
		width: 1rem;
	}
</style>
