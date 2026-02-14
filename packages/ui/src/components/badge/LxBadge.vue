<template>
	<span class="lx-badge" :class="[`lx-badge--${variant}`, `lx-badge--${size}`]">
		<slot>{{ text }}</slot>
	</span>
</template>

<script setup lang="ts">
	import type { ILxBadgeProps } from './types';

	const props = withDefaults(defineProps<ILxBadgeProps>(), {
		text: '',
		variant: 'primary',
		size: 'md',
	});

	const { size, text, variant } = props;
</script>

<style scoped lang="scss">
	.lx-badge {
		--lx-badge-background: var(--lx-colour-primary);
		--lx-badge-text: var(--lx-colour-on-primary);
		align-items: center;
		background: var(--lx-badge-background);
		border-radius: var(--lx-size-radius-pill);
		color: var(--lx-badge-text);
		display: inline-flex;
		font-weight: var(--lx-font-weight-semibold);
		line-height: 1;
		text-transform: uppercase;
	}

	.lx-badge--sm {
		font-size: 0.65rem;
		padding: 0.2rem 0.45rem;
	}

	.lx-badge--md {
		font-size: 0.72rem;
		padding: 0.3rem 0.55rem;
	}

	.lx-badge--primary { --lx-badge-background: var(--lx-colour-primary); --lx-badge-text: var(--lx-colour-on-primary); }
	.lx-badge--secondary { --lx-badge-background: var(--lx-colour-secondary); --lx-badge-text: var(--lx-colour-on-secondary); }
	.lx-badge--accent { --lx-badge-background: var(--lx-colour-accent); --lx-badge-text: var(--lx-colour-on-accent); }
	.lx-badge--info { --lx-badge-background: var(--lx-colour-info); --lx-badge-text: var(--lx-colour-on-info); }
	.lx-badge--success { --lx-badge-background: var(--lx-colour-success); --lx-badge-text: var(--lx-colour-on-success); }
	.lx-badge--warning { --lx-badge-background: var(--lx-colour-warning); --lx-badge-text: var(--lx-colour-on-warning); }
	.lx-badge--danger { --lx-badge-background: var(--lx-colour-danger); --lx-badge-text: var(--lx-colour-on-danger); }
</style>
