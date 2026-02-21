<template>
	<section class="lx-empty-state" :class="`lx-empty-state--${props.variant}`">
		<div v-if="props.icon" class="lx-empty-state__icon" aria-hidden="true">
			<LxIcon :name="props.icon" />
		</div>
		<template v-else />

		<h3 v-if="props.title" class="lx-empty-state__title">
			{{ props.title }}
		</h3>
		<template v-else />

		<p v-if="props.description" class="lx-empty-state__description">
			{{ props.description }}
		</p>
		<template v-else />

		<div v-if="$slots.default" class="lx-empty-state__content">
			<slot />
		</div>
		<template v-else />

		<div v-if="$slots.actions" class="lx-empty-state__actions">
			<slot name="actions" />
		</div>
		<template v-else />
	</section>
</template>

<script setup lang='ts'>
	import { LxIcon } from '../icon';
	import type { ILxEmptyStateProps } from './types';

	const props = withDefaults(defineProps<ILxEmptyStateProps>(), {
		title: '',
		description: '',
		icon: '',
		variant: 'neutral',
	});
</script>

<style scoped lang='scss'>
	.lx-empty-state {
		--lx-empty-accent: var(--lx-colour-surface-text-muted);
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) dashed var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		justify-items: center;
		padding: var(--lx-size-space-xl);
		text-align: center;
	}

	.lx-empty-state__icon {
		color: var(--lx-empty-accent);
		font-size: 1.7rem;
	}

	.lx-empty-state__title {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-lg);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-empty-state__description {
		color: var(--lx-colour-surface-text-muted);
		max-width: 38ch;
	}

	.lx-empty-state__content,
	.lx-empty-state__actions {
		width: 100%;
	}

	.lx-empty-state--info { --lx-empty-accent: var(--lx-colour-info); }
	.lx-empty-state--success { --lx-empty-accent: var(--lx-colour-success); }
	.lx-empty-state--warning { --lx-empty-accent: var(--lx-colour-warning); }
	.lx-empty-state--danger { --lx-empty-accent: var(--lx-colour-danger); }
</style>
