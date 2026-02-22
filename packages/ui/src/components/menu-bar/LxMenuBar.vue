<template>
	<nav class="lx-menu-bar" :class="{ 'is-wrap': props.wrap }" aria-label="Menu bar">
		<LxMenuItem
			v-for="item in props.items"
			:key="item.value"
			:label="item.label"
			:value="item.value"
			:disabled="item.disabled"
			:active="model === item.value"
			@select="onSelect"
		/>
		<slot />
	</nav>
</template>

<script setup lang='ts'>
	import { LxMenuItem } from '../menu-item';
	import type { ILxMenuBarProps } from './types';

	const props = withDefaults(defineProps<ILxMenuBarProps>(), {
		items: () => [],
		wrap: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: string): void,
	}>();

	const model = defineModel<string>({
		default: '',
	});

	const onSelect = (value: string): void => {
		model.value = value;
		emit('change', value);
	};
</script>

<style scoped lang='scss'>
	.lx-menu-bar {
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: flex;
		gap: var(--lx-size-space-xs);
		padding: var(--lx-size-space-xs);
	}

	.lx-menu-bar.is-wrap {
		flex-wrap: wrap;
	}
</style>
