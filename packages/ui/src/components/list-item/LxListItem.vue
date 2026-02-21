<template>
	<li
		class="lx-list-item"
		:class="{ 'is-clickable': props.clickable, 'is-selected': props.selected, 'is-disabled': props.disabled }"
		@click="onClick"
	>
		<slot />
	</li>
</template>

<script setup lang='ts'>
	import type { ILxListItemProps } from './types';

	const props = withDefaults(defineProps<ILxListItemProps>(), {
		value: '',
		disabled: false,
		clickable: false,
		selected: false,
	});

	const emit = defineEmits<{
		(event: 'select', value: string): void,
	}>();

	const onClick = (): void => {
		if (!props.disabled && props.clickable) {
			emit('select', props.value);
		}
	};
</script>

<style scoped lang='scss'>
	.lx-list-item {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
	}

	.lx-list-item.is-clickable {
		cursor: pointer;
	}

	.lx-list-item.is-clickable:hover {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-list-item.is-selected {
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, transparent);
	}

	.lx-list-item.is-disabled {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
