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

	const props = defineProps<TLxBadgeProps>();
	const getVariant = computed(() => `var(--lx-colour-${props.variant ?? 'primary'})`);
	const getSize = computed(() => `var(--lx-font-size-${props.size ?? 'md'})`);
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
		font-size: v-bind(getSize);
	}
</style>
