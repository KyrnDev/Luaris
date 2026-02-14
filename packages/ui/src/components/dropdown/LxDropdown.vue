<template>
	<details v-click-outside="onClickOutside" class="lx-dropdown" :open="open" @toggle="onToggle">
		<summary class="lx-dropdown__trigger" role="button" aria-haspopup="menu" :aria-expanded="open">
			{{ props.label }}
		</summary>
		<ul class="lx-dropdown__menu" role="menu" :aria-label="props.label" @keydown.esc="open = false">
			<li v-for="option in props.options" :key="String(option.value)">
				<LxButton
					class="lx-dropdown__item"
					type="button"
					variant="plain"
					size="sm"
					role="menuitem"
					:disabled="option.disabled"
					@click="onSelect(option.value)"
				>
					{{ option.label }}
				</LxButton>
			</li>
		</ul>
	</details>
</template>

<script setup lang="ts">
	import type { ILxDropdownProps, TLxDropdownValue } from './types';
	import { ref } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { LxButton } from '../button';

	const props = withDefaults(defineProps<ILxDropdownProps>(), {
		label: 'Options',
		options: () => [],
	});

	const emit = defineEmits<{
		(event: 'select', value: TLxDropdownValue): void,
	}>();

	const open = ref(false);
	const vClickOutside = vClickOutsideDirective;

	const onToggle = (event: Event): void => {
		const target = event.currentTarget as HTMLDetailsElement | null;
		open.value = target?.open ?? false;
	};

	const onSelect = (value: TLxDropdownValue): void => {
		emit('select', value);
		open.value = false;
	};

	const onClickOutside = (): void => {
		open.value = false;
	};
</script>

<style scoped lang="scss">
	.lx-dropdown {
		position: relative;
	}

	.lx-dropdown__trigger {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		list-style: none;
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
	}

	.lx-dropdown__trigger::-webkit-details-marker {
		display: none;
	}

	.lx-dropdown__menu {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: var(--lx-size-space-xs) 0 0;
		min-width: 12rem;
		padding: var(--lx-size-space-xs);
		position: absolute;
		z-index: 40;
	}

	.lx-dropdown__item {
		background: transparent;
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		justify-content: flex-start;
		padding: var(--lx-size-space-sm);
		text-align: left;
		width: 100%;
	}

	.lx-dropdown__item:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}
</style>
