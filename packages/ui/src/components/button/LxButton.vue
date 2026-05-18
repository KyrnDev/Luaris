<template>
	<button
		class="lx-button"
		:class="[
			`lx-button-hover--${hoverMode}`,
			{
				'lx-button--loading': loading,
			},
		]"
		:type="props.type"
		:disabled="isDisabled"
		:aria-busy="props.loading || undefined"
		:aria-label="accessibleLabel"
		:aria-pressed="pressedState"
	>
		<LxIcon
			v-if="props.loading"
			name="spinner"
			size="sm"
			class="lx-button__icon lx-button__icon--loading"
			aria-hidden="true"
			spin
		/>

		<span v-if="(props.icon || $slots.icon) && props.iconOrder === 'left'" class="lx-button__icon" aria-hidden="true">
			<template v-if="$slots.icon">
				<slot name="icon" />
			</template>
			<LxIcon v-else :name="props.icon" :size="props.size" />
		</span>

		<span v-if="(props.label && props.label.length > 0) || $slots.default" class="lx-button__label">
			<slot>
				{{ props.label }}
			</slot>
		</span>

		<span v-if="(props.icon || $slots.icon) && props.iconOrder === 'right'" class="lx-button__icon" aria-hidden="true">
			<template v-if="$slots.icon">
				<slot name="icon" />
			</template>
			<LxIcon v-else :name="props.icon" :size="props.size" />
		</span>
	</button>
</template>

<script setup lang="ts">
	import type { TLxButtonProps } from './types';
	import { LxIcon } from '../icon';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<TLxButtonProps>(), {
		variant: 'primary',
		size: 'md',
		type: 'button',
		disabled: false,
		loading: false,
		fullWidth: false,
		borderRadius: 'md',
		label: '',
		icon: '',
		iconOrder: 'left',
		hoverMode: 'default',
		borderWidth: 'none',
	});

	const isDisabled = computed(() => props.disabled || props.loading);
	const accessibleLabel = computed(() => props.ariaLabel || props.label || undefined);
	const pressedState = computed(() => props.active ?? undefined);
	const getSize = computed(() => `var(--lx-font-size-${props.size})`);
	const getControlHeight = computed(() => `var(--lx-size-control-height-${props.size})`);
	const getControlPaddingX = computed(() => `var(--lx-size-control-padding-x-${props.size})`);
	const getControlGap = computed(() => `var(--lx-size-control-gap-${props.size})`);
	const getTextColour = computed(() => `var(--lx-colour-on-${props.variant})`);
	const getWidth = computed(() => (props.fullWidth ? '100%' : 'auto'));
	const getBackgroundColour = computed(() => `var(--lx-colour-${props.variant})`);
	const getHoverBackgroundColour = computed(() => `var(--lx-colour-hover-${props.variant})`);
	const getDisabledBackgroundColour = computed(() => `var(--lx-colour-disabled-${props.variant})`);
	const getBorderThickness = computed(() => (props.hoverMode === 'invert' ? `var(--lx-size-border-width-thick)` : '0'));

	const getBorderRadius = computed(() => {
		if (!props.group) return `var(--lx-size-radius-${props.borderRadius})`;
		if (props.group === 'start') return `var(--lx-size-radius-${props.borderRadius}) 0 0 var(--lx-size-radius-${props.borderRadius})`;
		if (props.group === 'end') return `0 var(--lx-size-radius-${props.borderRadius}) var(--lx-size-radius-${props.borderRadius}) 0`;
		return '0';
	});
</script>

<style scoped lang="scss">
	.lx-button {
		box-sizing: border-box;
		font-size: v-bind(getSize);
		line-height: 1.2;
		color: v-bind(getTextColour);
		background-color: v-bind(getBackgroundColour);
		min-height: v-bind(getControlHeight);
		padding: 0 v-bind(getControlPaddingX);
		width: v-bind(getWidth);
		border: v-bind(getBorderThickness) solid v-bind(getBackgroundColour);
		border-radius: v-bind(getBorderRadius);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: v-bind(getControlGap);
		cursor: pointer;
		min-width: 24px;
		transition:
			background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			box-shadow var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);

		&:disabled {
			background-color: v-bind(getDisabledBackgroundColour);

			&:not(.lx-button--loading) {
				cursor: not-allowed;
			}
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 var(--lx-size-border-width-thick) var(--lx-colour-accent);
		}

		&-hover--default:not(:disabled):hover {
			background-color: v-bind(getHoverBackgroundColour);
		}

		&-hover--invert {
			border: v-bind(getBorderThickness) solid v-bind(getBackgroundColour);
		}

		&-hover--invert:not(:disabled):hover {
			background-color: var(--lx-colour-transparent);
		}

		&--loading {
			cursor: wait;
		}
	}
</style>
