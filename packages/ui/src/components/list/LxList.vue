<template>
	<ul class="lx-list" :class="{ 'is-dense': props.dense, 'is-divided': props.divided }">
		<slot />
	</ul>
</template>

<script setup lang='ts'>
	import type { ILxListProps } from './types';

	const props = withDefaults(defineProps<ILxListProps>(), {
		dense: false,
		divided: false,
	});
</script>

<style scoped lang='scss'>
	.lx-list {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		list-style: none;
		margin: 0;
		overflow: hidden;
		padding: 0;
	}

	.lx-list :slotted(.lx-list-item) {
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
	}

	.lx-list.is-dense :slotted(.lx-list-item) {
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
	}

	.lx-list.is-divided :slotted(.lx-list-item:not(:last-child)) {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}
</style>
