<template>
	<section class="lx-stat" :class="`lx-stat--${props.trend}`">
		<p v-if="props.label" class="lx-stat__label">
			{{ props.label }}
		</p>
		<template v-else />

		<p class="lx-stat__value">
			<slot name="value">
				{{ props.value }}
			</slot>
		</p>

		<p v-if="props.delta" class="lx-stat__delta">
			{{ props.delta }}
		</p>
		<template v-else />

		<p v-if="props.helpText" class="lx-stat__help">
			{{ props.helpText }}
		</p>
		<template v-else />
	</section>
</template>

<script setup lang='ts'>
	import type { ILxStatProps } from './types';

	const props = withDefaults(defineProps<ILxStatProps>(), {
		label: '',
		value: '',
		delta: '',
		trend: 'neutral',
		helpText: '',
	});
</script>

<style scoped lang='scss'>
	.lx-stat {
		--lx-stat-accent: var(--lx-colour-surface-text-muted);
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-xs);
		padding: var(--lx-size-space-md);
	}

	.lx-stat__label,
	.lx-stat__help {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-stat__value {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-2xl);
		font-weight: var(--lx-font-weight-bold);
		line-height: 1.1;
	}

	.lx-stat__delta {
		color: var(--lx-stat-accent);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-stat--up { --lx-stat-accent: var(--lx-colour-success); }
	.lx-stat--down { --lx-stat-accent: var(--lx-colour-danger); }
</style>
