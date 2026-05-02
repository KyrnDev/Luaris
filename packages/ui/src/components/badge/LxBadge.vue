<template>
	<span
		class="lx-badge"
		:class="[
			`lx-badge--${variant}`,
			`lx-badge--${size}`,
		]"
	>
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
	const getVariant = computed(() => `var(--lx-colour-${props.variant})`);
	const getTextColour = computed(() => `var(--lx-colour-on-${props.variant})`);
</script>

<style lang="scss" scoped>
	.lx-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--lx-size-radius-pill);
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		line-height: 1.2;
		padding: var(--lx-size-space-xs) var(--lx-size-space-md);
		background-color: v-bind(getVariant);
		color: v-bind(getTextColour);
		font-size: v-bind(getSize);
	}
</style>
