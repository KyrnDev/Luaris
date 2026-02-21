<template>
	<div
		v-click-outside="close"
		class="lx-context-menu"
		:class="{ 'is-open': open }"
		@contextmenu.prevent="onContextMenu"
	>
		<slot>
			<div class="lx-context-menu__target">
				Right click here
			</div>
		</slot>

		<ul
			v-if="open"
			class="lx-context-menu__menu"
			:style="{ left: `${position.x}px`, top: `${position.y}px` }"
			role="menu"
		>
			<li v-for="item in props.items" :key="item.value" role="none">
				<button
					class="lx-context-menu__item"
					:class="{ 'is-danger': item.danger }"
					type="button"
					role="menuitem"
					:disabled="item.disabled || props.disabled"
					@click="selectItem(item)"
				>
					<span v-if="item.icon" class="lx-context-menu__icon" aria-hidden="true">
						<LxIcon :name="item.icon" />
					</span>
					<template v-else />
					{{ item.label }}
				</button>
			</li>
		</ul>
		<template v-else />
	</div>
</template>

<script setup lang='ts'>
	import { onBeforeUnmount, reactive, ref } from 'vue';
	import { vClickOutside } from '../../directives/clickOutside';
	import { LxIcon } from '../icon';
	import type { ILxContextMenuItem, ILxContextMenuProps } from './types';

	const props = withDefaults(defineProps<ILxContextMenuProps>(), {
		items: () => [],
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'select', item: ILxContextMenuItem): void,
		(event: 'open'): void,
		(event: 'close'): void,
	}>();

	const open = ref(false);
	const position = reactive({
		x: 0,
		y: 0,
	});

	const close = (): void => {
		if (!open.value) {
			return;
		}

		open.value = false;
		emit('close');
	};

	const onContextMenu = (event: MouseEvent): void => {
		if (props.disabled) {
			return;
		}

		position.x = event.clientX;
		position.y = event.clientY;
		open.value = true;
		emit('open');
	};

	const onEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			close();
		}
	};

	const selectItem = (item: ILxContextMenuItem): void => {
		emit('select', item);
		close();
	};

	window.addEventListener('keydown', onEscape);
	onBeforeUnmount(() => {
		window.removeEventListener('keydown', onEscape);
	});
</script>

<style scoped lang='scss'>
	.lx-context-menu {
		position: relative;
	}

	.lx-context-menu__target {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) dashed var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text-muted);
		padding: var(--lx-size-space-sm);
	}

	.lx-context-menu__menu {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		box-shadow: 0 10px 24px rgb(0 0 0 / 0.18);
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: 0;
		min-width: 10rem;
		padding: var(--lx-size-space-xs);
		position: fixed;
		z-index: 80;
	}

	.lx-context-menu__item {
		align-items: center;
		background: transparent;
		border: none;
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: inline-flex;
		font: inherit;
		gap: var(--lx-size-space-xs);
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
		text-align: left;
		width: 100%;
	}

	.lx-context-menu__item:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-context-menu__item.is-danger {
		color: var(--lx-colour-danger);
	}

	.lx-context-menu__item:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
