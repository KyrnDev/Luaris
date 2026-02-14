<template>
	<div class="lx-divider" :class="[`lx-divider--${props.orientation}`]" role="separator" :aria-orientation="props.orientation" />
</template>

<script setup lang="ts">
	import type { ILxDividerProps } from './types';

	const props = withDefaults(defineProps<ILxDividerProps>(), {
		orientation: 'horizontal',
	});
</script>

<style scoped lang="scss">
	.lx-divider {
		background: var(--lx-colour-surface-border);
		flex-shrink: 0;
	}

	.lx-divider--horizontal {
		height: var(--lx-size-border-width-hairline);
		width: 100%;
	}

	.lx-divider--vertical {
		align-self: stretch;
		height: auto;
		min-height: 1.5rem;
		width: var(--lx-size-border-width-hairline);
	}
</style>
