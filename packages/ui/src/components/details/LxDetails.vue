<template>
	<details
		:open="open"
		class="lx-details"
		:class="{
			'is-open': open,
			'is-disabled': props.disabled,
			'has-content': hasContent,
			'has-summary': hasSummary,
		}"
		@toggle="handleToggle"
	>
		<summary
			class="lx-details__summary"
			:aria-disabled="props.disabled || undefined"
			@click="handleSummaryClick"
		>
			<LxIcon v-if="props.icon" :name="props.icon" :size="props.size" class="lx-details__icon" />
			<span v-if="props.title" class="lx-details__title">{{ props.title }}</span>
			<slot v-if="$slots.summary" name="summary" />

			<span class="lx-details__chevrons" aria-hidden="true">
				<LxIcon name="chevron-down" :size="props.size" class="lx-details__chevron is-down" />
				<LxIcon name="chevron-up" :size="props.size" class="lx-details__chevron is-up" />
			</span>
		</summary>

		<div v-if="hasContent" class="lx-details__content">
			<slot v-if="$slots.content" name="content" />
			<slot v-else-if="$slots.default" />
			<p v-else-if="props.content">
				{{ props.content }}
			</p>
			<template v-else />
		</div>
	</details>
</template>

<script setup lang="ts">
	import type { TSurfaceColours } from '../../types/theme';
	import type { TLxDetailsProps } from './types';
	import { computed, useSlots } from 'vue';
	import { SURFACE_COLOURS } from '../../helpers/constants';
	import { LxIcon } from '../icon';

	const props = withDefaults(defineProps<TLxDetailsProps>(), {
		variant: 'raised',
		size: 'md',
		content: '',
		contentPadding: undefined,
		contentLineHeight: 'normal',
		contentBackgroundColour: undefined,
		borderRadius: 'md',
		borderWidth: 'thin',
		disabled: false,
	});

	const open = defineModel<boolean>('open', { default: false });
	const slots = useSlots();

	const isSurfaceVariant = computed(() => SURFACE_COLOURS.includes(props.variant as TSurfaceColours));
	const hasContent = computed(() => Boolean(props.content || slots.content || slots.default));
	const hasSummary = computed(() => Boolean(props.icon || props.title || slots.summary));

	const getSize = computed(() => `var(--lx-font-size-${props.size})`);
	const getControlHeight = computed(() => `var(--lx-size-control-height-${props.size})`);
	const getControlPaddingInline = computed(() => `var(--lx-size-control-padding-inline-${props.size})`);
	const getControlPaddingBlock = computed(() => `var(--lx-size-control-padding-block-${props.size})`);
	const getControlGap = computed(() => `var(--lx-size-control-gap-${props.size})`);
	const getContentPadding = computed(() => `var(--lx-size-space-${props.contentPadding ?? props.size})`);
	const getContentLineHeight = computed(() => `var(--lx-font-line-height-${props.contentLineHeight})`);
	const getBorderRadius = computed(() => `var(--lx-size-radius-${props.borderRadius})`);
	const isTransparentVariant = computed(() => props.variant === 'transparent');
	const resolvedContentBackgroundColour = computed(() => props.contentBackgroundColour ?? (isTransparentVariant.value ? 'transparent' : 'raised'));
	const getBorderWidth = computed(() => (isTransparentVariant.value ? '0' : `var(--lx-size-border-width-${props.borderWidth})`));
	const getBorderColour = computed(() => 'var(--lx-colour-surface-border)');
	const getSummaryBackground = computed(() => {
		return `var(--lx-colour-${isSurfaceVariant.value ? 'surface-' : ''}${props.variant})`;
	});
	const getSummaryTextColour = computed(() => {
		if (!isSurfaceVariant.value) return `var(--lx-colour-on-${props.variant})`;
		if (props.variant === 'overlay') return 'var(--lx-colour-white)';
		return 'var(--lx-colour-text)';
	});
	const getContentBackground = computed(() => {
		return resolvedContentBackgroundColour.value === 'transparent'
			? 'var(--lx-colour-transparent)'
			: `var(--lx-colour-surface-${resolvedContentBackgroundColour.value})`;
	});

	const handleSummaryClick = (event: MouseEvent) => {
		if (!props.disabled && hasSummary.value) return;
		event.preventDefault();
	};

	const handleToggle = (event: Event) => {
		const element = event.currentTarget as HTMLDetailsElement | null;
		if (!element) return;

		if (props.disabled || !hasSummary.value) {
			element.open = false;
			open.value = false;
			return;
		}

		open.value = element.open;
	};
</script>

<style lang="scss" scoped>
	.lx-details {
		width: 100%;
		border: v-bind(getBorderWidth) solid v-bind(getBorderColour);
		border-radius: v-bind(getBorderRadius);
		background-color: v-bind(getContentBackground);
		overflow: hidden;

		&.is-disabled {
			opacity: 0.7;
		}

		&__summary {
			display: flex;
			align-items: center;
			gap: v-bind(getControlGap);
			cursor: pointer;
			padding: v-bind(getControlPaddingBlock) v-bind(getControlPaddingInline);
			font-size: v-bind(getSize);
			font-weight: var(--lx-font-weight-medium);
			color: v-bind(getSummaryTextColour);
			background-color: v-bind(getSummaryBackground);
			min-height: v-bind(getControlHeight);
			box-sizing: border-box;
			margin: 0;
			list-style: none;
			transition:
				background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
				color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);

			&::-webkit-details-marker {
				display: none;
			}

			&:focus-visible {
				outline: none;
				box-shadow: inset 0 0 0 var(--lx-size-border-width-thick) var(--lx-colour-accent);
			}
		}

		&.is-disabled &__summary,
		&:not(.has-summary) &__summary {
			cursor: default;
		}

		&.is-open.has-content &__summary {
			border-bottom: v-bind(getBorderWidth) solid v-bind(getBorderColour);
		}

		&__title {
			line-height: 1.2;
		}

		&__chevrons {
			display: inline-flex;
			align-items: center;
			margin-left: auto;
		}

		&__chevron.is-up {
			display: none;
		}

		&.is-open &__chevron.is-up {
			display: inline-block;
		}

		&.is-open &__chevron.is-down {
			display: none;
		}

		&__content {
			padding: v-bind(getContentPadding);
			background-color: v-bind(getContentBackground);
			color: var(--lx-colour-text);
			line-height: v-bind(getContentLineHeight);

			:deep(*) {
				line-height: inherit;
			}
		}
	}
</style>
