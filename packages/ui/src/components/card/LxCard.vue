<template>
	<article class="lx-card" :class="{ 'lx-card--interactive': interactive, 'lx-card--selected': selected }" :style="cardStyle">
		<header v-if="$slots.header || title" class="lx-card__header">
			<slot name="header">
				{{ title }}
			</slot>
		</header>
		<template v-else />
		<div class="lx-card__body">
			<slot />
		</div>
		<footer v-if="$slots.footer" class="lx-card__footer">
			<slot name="footer" />
		</footer>
		<template v-else />
	</article>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { CSSProperties } from 'vue';
	import type { ILxCardProps } from './types';

	const props = withDefaults(defineProps<ILxCardProps>(), {
		title: '',
		interactive: false,
		padding: 'var(--lx-size-space-lg)',
		selected: false,
	});

	const cardStyle = computed<CSSProperties>(() => ({
		'--lx-card-padding': props.padding,
	}));

	const { interactive, selected, title } = props;
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
		cursor: pointer;
		transition:
			transform var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			border-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-card--interactive:hover {
		border-color: color-mix(in srgb, var(--lx-colour-primary) 55%, var(--lx-colour-surface-border));
		transform: translateY(-2px);
	}

	.lx-card--selected {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-primary);
		outline-offset: 2px;
	}

	.lx-card__header,
	.lx-card__footer {
		padding: var(--lx-card-padding);
	}

	.lx-card__header {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		font-size: var(--lx-font-size-md);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-card__body {
		padding: var(--lx-card-padding);
	}

	.lx-card__footer {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}
</style>
