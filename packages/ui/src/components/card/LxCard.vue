<template>
	<article class="lx-card" :class="{ 'lx-card--interactive': interactive }">
		<header v-if="$slots.header || title" class="lx-card__header">
			<slot name="header">
				{{ title }}
			</slot>
		</header>
		<div class="lx-card__body">
			<slot />
		</div>
		<footer v-if="$slots.footer" class="lx-card__footer">
			<slot name="footer" />
		</footer>
	</article>
</template>

<script setup lang="ts">
	import type { ILxCardProps } from './types';

	const props = withDefaults(defineProps<ILxCardProps>(), {
		title: '',
		interactive: false,
	});

	const { interactive, title } = props;
</script>

<style scoped lang="scss">
	.lx-card {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-lg);
		display: grid;
		overflow: hidden;
	}

	.lx-card--interactive {
		transition:
			transform var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			border-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-card--interactive:hover {
		border-color: color-mix(in srgb, var(--lx-colour-primary) 55%, var(--lx-colour-surface-border));
		transform: translateY(-2px);
	}

	.lx-card__header,
	.lx-card__footer {
		padding: var(--lx-size-space-lg);
	}

	.lx-card__header {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		font-size: var(--lx-font-size-md);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-card__body {
		padding: var(--lx-size-space-lg);
	}

	.lx-card__footer {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}
</style>
