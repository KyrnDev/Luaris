<template>
	<section class="lx-card">
		<header v-if="$slots.header" class="lx-card__header">
			<slot name="header" />
		</header>

		<div class="lx-card__content">
			<slot />
		</div>

		<footer v-if="$slots.footer" class="lx-card__footer">
			<slot name="footer" />
		</footer>
	</section>
</template>

<script setup lang="ts">
	import type { TSurfaceColours } from '../../types/theme';
	import type { TLxCardProps } from './types';
	import { computed } from 'vue';
	import { SURFACE_COLOURS } from '../../helpers/constants';

	const props = withDefaults(defineProps<TLxCardProps>(), {
		padding: 'md',
		borderRadius: 'md',
		borderSize: 'thin',
		borderColour: 'border',
		contentBackgroundColour: 'raised',
		headerBackgroundColour: 'raised',
		footerBackgroundColour: 'raised',
	});

	const getPadding = computed(() => `var(--lx-size-space-${props.padding})`);
	const getBorderWidth = computed(() => `var(--lx-size-border-width-${props.borderSize})`);
	const getBorderRadius = computed(() => `var(--lx-size-radius-${props.borderRadius})`);
	const getBorderColour = computed(() => `var(--lx-colour-${SURFACE_COLOURS.includes(props.borderColour as TSurfaceColours) ? 'surface-' : ''}${props.borderColour})`);
	const getContentBackgroundColour = computed(() => `var(--lx-colour-${SURFACE_COLOURS.includes(props.contentBackgroundColour as TSurfaceColours) ? 'surface-' : ''}${props.contentBackgroundColour})`);
	const getHeaderBackgroundColour = computed(() => `var(--lx-colour-${SURFACE_COLOURS.includes(props.headerBackgroundColour as TSurfaceColours) ? 'surface-' : ''}${props.headerBackgroundColour})`);
	const getFooterBackgroundColour = computed(() => `var(--lx-colour-${SURFACE_COLOURS.includes(props.footerBackgroundColour as TSurfaceColours) ? 'surface-' : ''}${props.footerBackgroundColour})`);
</script>

<style lang="scss" scoped>
	.lx-card {
		background-color: v-bind(getContentBackgroundColour);
		border: v-bind(getBorderWidth) solid v-bind(getBorderColour);
		border-radius: v-bind(getBorderRadius);

		&__header,
		&__content,
		&__footer {
			padding: v-bind(getPadding);
		}

		&__header {
			background-color: v-bind(getHeaderBackgroundColour);
			border-bottom: v-bind(getBorderWidth) solid v-bind(getBorderColour);
		}

		&__footer {
			background-color: v-bind(getFooterBackgroundColour);
			border-top: v-bind(getBorderWidth) solid v-bind(getBorderColour);
		}
	}
</style>
