<template>
	<span class="lx-badge">
		{{ label }}
		<slot v-if="$slots.default" />
	</span>
</template>

<script setup lang="ts">
	import type { TLxBadgeProps } from './types';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<TLxBadgeProps>(), {
		variant: 'primary',
		size: 'md',
	});

	const getSize = computed(() => `var(--lx-font-size-${props.size})`);
	const getControlHeight = computed(() => `var(--lx-size-control-height-${props.size})`);
	const getControlPaddingInline = computed(() => `var(--lx-size-control-padding-inline-${props.size})`);
	const getControlPaddingBlock = computed(() => `var(--lx-size-control-padding-block-${props.size})`);
	const getVariant = computed(() => `var(--lx-colour-${props.variant})`);
	const getTextColour = computed(() => `var(--lx-colour-on-${props.variant})`);
</script>

<style lang="scss" scoped>
	.lx-badge {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--lx-size-radius-pill);
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		line-height: 1;
		min-height: v-bind(getControlHeight);
		padding: v-bind(getControlPaddingBlock) v-bind(getControlPaddingInline);
		background-color: v-bind(getVariant);
		color: v-bind(getTextColour);
		font-size: v-bind(getSize);
	}
</style>
