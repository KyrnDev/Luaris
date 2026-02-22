<template>
	<button
		type="button"
		class="lx-menu-item"
		:class="{ 'is-active': props.active }"
		:disabled="props.disabled"
		@click="emit('select', props.value || props.label || '')"
	>
		<slot>
			{{ props.label }}
		</slot>
	</button>
</template>

<script setup lang='ts'>
	import type { ILxMenuItemProps } from './types';

	const props = withDefaults(defineProps<ILxMenuItemProps>(), {
		label: '',
		value: '',
		disabled: false,
		active: false,
	});

	const emit = defineEmits<{
		(event: 'select', value: string): void,
	}>();
</script>

<style scoped lang='scss'>
	.lx-menu-item {
		background: transparent;
		border: var(--lx-size-border-width-hairline) solid transparent;
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
	}

	.lx-menu-item:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-menu-item.is-active {
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, transparent);
		border-color: var(--lx-colour-primary);
	}

	.lx-menu-item:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
