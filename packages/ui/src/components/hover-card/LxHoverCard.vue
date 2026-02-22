<template>
	<div
		class="lx-hover-card"
		:class="`is-${props.placement}`"
		@mouseenter="openCard"
		@mouseleave="closeCard"
	>
		<div class="lx-hover-card__trigger">
			<slot />
		</div>
		<div v-if="open && !props.disabled" class="lx-hover-card__content">
			<slot name="content" />
		</div>
		<template v-else />
	</div>
</template>

<script setup lang='ts'>
	import { ref } from 'vue';
	import type { ILxHoverCardProps } from './types';

	const props = withDefaults(defineProps<ILxHoverCardProps>(), {
		placement: 'bottom',
		openDelay: 100,
		closeDelay: 100,
		disabled: false,
	});

	const open = ref(false);
	let openTimer: ReturnType<typeof setTimeout> | null = null;
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	const openCard = (): void => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		openTimer = setTimeout(() => {
			open.value = true;
		}, props.openDelay);
	};

	const closeCard = (): void => {
		if (openTimer) {
			clearTimeout(openTimer);
			openTimer = null;
		}
		closeTimer = setTimeout(() => {
			open.value = false;
		}, props.closeDelay);
	};
</script>

<style scoped lang='scss'>
	.lx-hover-card {
		display: inline-block;
		position: relative;
	}

	.lx-hover-card__content {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		box-shadow: 0 10px 24px rgb(0 0 0 / 0.18);
		min-width: 14rem;
		padding: var(--lx-size-space-sm);
		position: absolute;
		z-index: 50;
	}

	.lx-hover-card.is-bottom .lx-hover-card__content {
		left: 0;
		top: calc(100% + var(--lx-size-space-xs));
	}

	.lx-hover-card.is-top .lx-hover-card__content {
		bottom: calc(100% + var(--lx-size-space-xs));
		left: 0;
	}

	.lx-hover-card.is-right .lx-hover-card__content {
		left: calc(100% + var(--lx-size-space-xs));
		top: 0;
	}

	.lx-hover-card.is-left .lx-hover-card__content {
		right: calc(100% + var(--lx-size-space-xs));
		top: 0;
	}
</style>
