<template>
	<span class="lx-spinner" :class="[`lx-spinner--${props.size}`, `lx-spinner--${props.variant}`]" role="status" :aria-label="props.label" />
</template>

<script setup lang="ts">
	import type { ILxSpinnerProps } from './types';

	const props = withDefaults(defineProps<ILxSpinnerProps>(), {
		size: 'md',
		variant: 'primary',
		label: 'Loading',
	});
</script>

<style scoped lang="scss">
	.lx-spinner {
		--lx-spinner-colour: var(--lx-colour-primary);
		animation: lx-spin 700ms linear infinite;
		border: 2px solid color-mix(in srgb, var(--lx-spinner-colour) 30%, transparent);
		border-radius: var(--lx-size-radius-pill);
		border-top-color: var(--lx-spinner-colour);
		display: inline-block;
	}

	.lx-spinner--2xs { height: 0.75rem; width: 0.75rem; }
	.lx-spinner--xs { height: 0.875rem; width: 0.875rem; }
	.lx-spinner--sm { height: 1rem; width: 1rem; }
	.lx-spinner--md { height: 1.25rem; width: 1.25rem; }
	.lx-spinner--lg { height: 1.75rem; width: 1.75rem; }
	.lx-spinner--xl { height: 2rem; width: 2rem; }
	.lx-spinner--2xl { height: 2.5rem; width: 2.5rem; }

	.lx-spinner--primary { --lx-spinner-colour: var(--lx-colour-primary); }
	.lx-spinner--secondary { --lx-spinner-colour: var(--lx-colour-secondary); }
	.lx-spinner--accent { --lx-spinner-colour: var(--lx-colour-accent); }
	.lx-spinner--info { --lx-spinner-colour: var(--lx-colour-info); }
	.lx-spinner--success { --lx-spinner-colour: var(--lx-colour-success); }
	.lx-spinner--warning { --lx-spinner-colour: var(--lx-colour-warning); }
	.lx-spinner--danger { --lx-spinner-colour: var(--lx-colour-danger); }

	@keyframes lx-spin {
		to { transform: rotate(360deg); }
	}
</style>
