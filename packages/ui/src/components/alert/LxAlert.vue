<template>
	<div
		class="lx-alert"
		:class="[
			`lx-alert--${props.variant}`,
			`lx-alert--${props.size}`,
			{
				'has-icon': Boolean(resolvedIcon),
				'has-title': hasTitle,
				'has-content': hasContent,
			},
		]"
		:role="resolvedRole"
		:aria-live="resolvedRole === 'alert' ? 'assertive' : 'polite'"
		aria-atomic="true"
	>
		<div v-if="resolvedIcon" class="lx-alert__icon">
			<LxIcon :name="resolvedIcon" :size="props.size" />
		</div>

		<div class="lx-alert__body">
			<div v-if="hasTitle" class="lx-alert__title">
				<slot v-if="$slots.title" name="title" />
				<template v-else>
					{{ props.title }}
				</template>
			</div>

			<div v-if="hasContent" class="lx-alert__content">
				<slot v-if="$slots.content" name="content" />
				<slot v-else-if="$slots.default" />
				<p v-else-if="props.content">
					{{ props.content }}
				</p>
				<template v-else />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TSurfaceColours } from '../../types/theme';
	import type { TLxAlertProps, TLxAlertRole } from './types';
	import { computed, useSlots } from 'vue';
	import { SURFACE_COLOURS } from '../../helpers/constants';
	import { LxIcon } from '../icon';

	const props = withDefaults(defineProps<TLxAlertProps>(), {
		variant: 'info',
		size: 'md',
		title: '',
		icon: '',
		content: '',
		contentPadding: undefined,
		contentLineHeight: 'normal',
		borderRadius: 'md',
		borderWidth: 'thin',
		role: undefined,
	});

	const slots = useSlots();
	type TAlertIconVariants = Exclude<TLxAlertProps['variant'], undefined>;

	const alertIcons: Partial<Record<TAlertIconVariants, string>> = {
		info: 'circle-info',
		success: 'circle-check',
		warning: 'triangle-exclamation',
		danger: 'circle-xmark',
	};

	const isSurfaceVariant = computed(() => SURFACE_COLOURS.includes(props.variant as TSurfaceColours));
	const isTransparentVariant = computed(() => props.variant === 'transparent');
	const hasTitle = computed(() => Boolean(props.title || slots.title));
	const hasContent = computed(() => Boolean(props.content || slots.content || slots.default));
	const resolvedIcon = computed(() => props.icon || alertIcons[props.variant]);
	const resolvedRole = computed<TLxAlertRole>(() => {
		if (props.role) return props.role;
		if (props.variant === 'warning' || props.variant === 'danger') return 'alert';
		return 'status';
	});

	const getSize = computed(() => `var(--lx-font-size-${props.size})`);
	const getControlGap = computed(() => `var(--lx-size-control-gap-${props.size})`);
	const getContentPadding = computed(() => `var(--lx-size-space-${props.contentPadding ?? props.size})`);
	const getContentLineHeight = computed(() => `var(--lx-font-line-height-${props.contentLineHeight})`);
	const getBorderRadius = computed(() => `var(--lx-size-radius-${props.borderRadius})`);
	const getBorderWidth = computed(() => (isTransparentVariant.value ? '0' : `var(--lx-size-border-width-${props.borderWidth})`));
	const getTitleLineHeight = computed(() => {
		return props.size === '3xl'
			? 'var(--lx-font-line-height-normal)'
			: 'var(--lx-font-line-height-tight)';
	});
	const getBorderColour = computed(() => {
		if (isSurfaceVariant.value) return 'var(--lx-colour-surface-border)';
		return `var(--lx-colour-${props.variant})`;
	});
	const getBackgroundColour = computed(() => {
		if (isTransparentVariant.value) return 'var(--lx-colour-transparent)';
		if (isSurfaceVariant.value) return `var(--lx-colour-surface-${props.variant})`;
		return `color-mix(in srgb, var(--lx-colour-${props.variant}) 14%, var(--lx-colour-surface-raised))`;
	});
	const getTextColour = computed(() => {
		if (props.variant === 'overlay') return 'var(--lx-colour-white)';
		return 'var(--lx-colour-text)';
	});
	const getAccentColour = computed(() => {
		if (isSurfaceVariant.value) return 'var(--lx-colour-text)';
		return `var(--lx-colour-${props.variant})`;
	});
</script>

<style lang="scss" scoped>
	.lx-alert {
		display: flex;
		align-items: flex-start;
		gap: v-bind(getControlGap);
		width: 100%;
		padding: v-bind(getContentPadding);
		border: v-bind(getBorderWidth) solid v-bind(getBorderColour);
		border-radius: v-bind(getBorderRadius);
		background-color: v-bind(getBackgroundColour);
		color: v-bind(getTextColour);
		font-size: v-bind(getSize);
		box-sizing: border-box;

		&__icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: v-bind(getAccentColour);
			line-height: 1;
			margin-top: 0.125em;
		}

		&__body {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: v-bind(getControlGap);
			min-width: 0;
		}

		&__title {
			font-weight: var(--lx-font-weight-medium);
			line-height: v-bind(getTitleLineHeight);
		}

		&__content {
			line-height: v-bind(getContentLineHeight);

			:deep(*) {
				line-height: inherit;
			}

			:deep(p) {
				margin: 0;
				padding: 0;
			}
		}
	}
</style>
