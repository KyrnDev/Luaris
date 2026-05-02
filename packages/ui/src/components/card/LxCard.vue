<template>
	<div class="lx-card">
		<div class="lx-card__header">
			<slot name="header" />
		</div>

		<div class="lx-card__content">
			<slot />
		</div>

		<div class="lx-card__footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { TLxCardProps } from './types';

	const props = withDefaults(defineProps<TLxCardProps>(), {
		padding: 'md',
		borderRadius: 'md',
	});

	const getPadding = computed(() => `var(--lx-size-space-${props.padding})`);
	const getBorderRadius = computed(() => `var(--lx-size-radius-${props.borderRadius})`);
</script>

<style lang="scss" scoped>
	.lx-card {
		background-color: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: v-bind(getBorderRadius);

		&__header,
		&__content,
		&__footer {
			padding: v-bind(getPadding);
		}

		&__header {
			border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		}

		&__footer {
			border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		}
	}
</style>
