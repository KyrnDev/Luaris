<template>
	<button
		v-bind="attrs"
		:class="buttonClasses"
		:type="props.type"
		:disabled="isDisabled"
		:aria-busy="props.loading || undefined"
		:aria-label="props.ariaLabel"
	>
		<span v-if="props.loading" class="lx-button__spinner" aria-hidden="true" />

		<span v-if="props.icon && props.iconOrder === 'left'" class="lx-button__icon" aria-hidden="true">
			<LxIcon :name="props.icon" />
		</span>

		<span v-if="$slots.leading" class="lx-button__leading">
			<slot name="leading" />
		</span>

		<span v-if="hasLabel" class="lx-button__label">
			<slot>
				{{ props.label }}
			</slot>
		</span>

		<span v-if="$slots.trailing" class="lx-button__trailing">
			<slot name="trailing" />
		</span>

		<span v-if="props.icon && props.iconOrder === 'right'" class="lx-button__icon" aria-hidden="true">
			<LxIcon :name="props.icon" />
		</span>
	</button>
</template>

<script setup lang="ts">
	import type { ILxButtonProps } from './types';
	import { LxIcon } from '../icon';
	import { computed, useAttrs, useSlots } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxButtonProps>(), {
		variant: 'primary',
		size: 'md',
		type: 'button',
		disabled: false,
		loading: false,
		fullWidth: false,
		label: '',
		icon: '',
		iconOrder: 'left',
	});

	const attrs = useAttrs();
	const slots = useSlots();

	const isDisabled = computed(() => props.disabled || props.loading);
	const hasLabel = computed(() => Boolean(props.label) || Boolean(slots.default));

	const buttonClasses = computed(() => ({
		'lx-button': true,
		[`lx-button--${props.variant}`]: true,
		[`lx-button--${props.size}`]: true,
		'lx-button--loading': props.loading,
		'lx-button--full-width': props.fullWidth,
	}));
</script>

<style scoped lang="scss">
	.lx-button {
		--lx-button-background: var(--lx-colour-primary);
		--lx-button-border: var(--lx-colour-primary);
		--lx-button-text: var(--lx-colour-on-primary);
		align-items: center;
		background-color: var(--lx-button-background);
		border: var(--lx-size-border-width-hairline) solid var(--lx-button-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-button-text);
		cursor: pointer;
		display: inline-flex;
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
		gap: var(--lx-size-space-sm);
		height: var(--lx-size-control-height-md);
		justify-content: center;
		line-height: var(--lx-font-line-height-tight);
		padding: 0 var(--lx-size-space-lg);
		text-decoration: none;
		transition:
			filter var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			transform var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			border-color var(--lx-motion-duration-normal) var(--lx-motion-easing-standard),
			background-color var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
		user-select: none;
	}

	.lx-button:hover:not(:disabled) {
		filter: brightness(1.08);
		transform: translateY(-1px);
	}

	.lx-button:active:not(:disabled) {
		filter: brightness(0.96);
		transform: translateY(0);
	}

	.lx-button:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-button:disabled {
		cursor: not-allowed;
		opacity: 0.56;
		transform: none;
	}

	.lx-button--2xs {
		height: var(--lx-size-control-height-2xs);
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-button--xs {
		height: var(--lx-size-control-height-xs);
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-button--sm {
		height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-md);
	}

	.lx-button--lg {
		height: var(--lx-size-control-height-lg);
		padding: 0 var(--lx-size-space-xl);
	}

	.lx-button--xl {
		height: var(--lx-size-control-height-xl);
		padding: 0 var(--lx-size-space-xl);
	}

	.lx-button--2xl {
		height: var(--lx-size-control-height-2xl);
		padding: 0 var(--lx-size-space-2xl);
	}

	.lx-button--full-width {
		display: flex;
		width: 100%;
	}

	.lx-button--loading {
		pointer-events: none;
	}

	.lx-button--secondary {
		--lx-button-background: var(--lx-colour-secondary);
		--lx-button-border: var(--lx-colour-secondary);
		--lx-button-text: var(--lx-colour-on-secondary);
	}

	.lx-button--ghost {
		--lx-button-background: transparent;
		--lx-button-border: var(--lx-colour-secondary);
		--lx-button-text: var(--lx-colour-surface-text);
	}

	.lx-button--ghost:hover:not(:disabled) {
		background-color: var(--lx-colour-surface-sunken);
		filter: none;
	}

	.lx-button--ghost:active:not(:disabled) {
		background-color: var(--lx-colour-surface-border);
		filter: none;
	}

	.lx-button--accent {
		--lx-button-background: var(--lx-colour-accent);
		--lx-button-border: var(--lx-colour-accent);
		--lx-button-text: var(--lx-colour-on-accent);
	}

	.lx-button--info {
		--lx-button-background: var(--lx-colour-info);
		--lx-button-border: var(--lx-colour-info);
		--lx-button-text: var(--lx-colour-on-info);
	}

	.lx-button--success {
		--lx-button-background: var(--lx-colour-success);
		--lx-button-border: var(--lx-colour-success);
		--lx-button-text: var(--lx-colour-on-success);
	}

	.lx-button--warning {
		--lx-button-background: var(--lx-colour-warning);
		--lx-button-border: var(--lx-colour-warning);
		--lx-button-text: var(--lx-colour-on-warning);
	}

	.lx-button--danger {
		--lx-button-background: var(--lx-colour-danger);
		--lx-button-border: var(--lx-colour-danger);
		--lx-button-text: var(--lx-colour-on-danger);
	}

	.lx-button__label {
		display: inline-flex;
		white-space: nowrap;
	}

	.lx-button__leading,
	.lx-button__trailing,
	.lx-button__icon {
		display: inline-flex;
		font-size: 1.1em;
	}

	.lx-button__spinner {
		animation: lx-spin 650ms linear infinite;
		border: 2px solid rgb(255 255 255 / 0.4);
		border-radius: var(--lx-size-radius-pill);
		border-top-color: currentColor;
		height: 1em;
		width: 1em;
	}

	@keyframes lx-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
