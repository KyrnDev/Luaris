<template>
	<nav class="lx-breadcrumbs" aria-label="Breadcrumb">
		<ol>
			<template v-for="(item, index) in items" :key="`${item.label}-${index}`">
				<li class="lx-breadcrumbs__item" :class="{ 'is-current': index === items.length - 1 }">
					<a v-if="item.href && index !== items.length - 1" :href="item.href">{{ item.label }}</a>
					<span v-else>{{ item.label }}</span>
				</li>
				<li v-if="index < items.length - 1" class="lx-breadcrumbs__separator" aria-hidden="true">
					/
				</li>
			</template>
			<slot />
		</ol>
	</nav>
</template>

<script setup lang="ts">
	import type { ILxBreadcrumbsProps } from './types';

	const props = withDefaults(defineProps<ILxBreadcrumbsProps>(), {
		items: () => [],
	});

	const { items } = props;
</script>

<style scoped lang="scss">
	.lx-breadcrumbs ol {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-sm);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.lx-breadcrumbs__item {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
	}

	.lx-breadcrumbs__item a {
		color: var(--lx-colour-primary);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.18em;
		transition:
			color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			text-decoration-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-breadcrumbs__item a:hover,
	.lx-breadcrumbs__item a:focus-visible {
		color: color-mix(in srgb, var(--lx-colour-primary) 82%, var(--lx-colour-surface-text));
		text-decoration-color: currentColor;
	}

	.lx-breadcrumbs__item.is-current {
		color: var(--lx-colour-surface-text);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-breadcrumbs__separator {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}
</style>
