<template>
	<LxModal
		v-model="open"
		:position="props.side"
		:animation="props.animation"
		:show-backdrop="props.closeOnBackdrop"
		:close-on-backdrop="props.closeOnBackdrop"
		:close-on-escape="props.closeOnEscape"
		:show-close="false"
		:panel-class="panelClass"
		:width="panelWidth"
		:max-width="panelMaxWidth"
		:max-height="panelMaxHeight"
		@close="emit('close')"
	>
		<header v-if="$slots.header || props.title" :id="headerId" class="lx-drawer__header">
			<slot name="header">
				{{ props.title }}
			</slot>
			<LxButton
				class="lx-drawer__close-button"
				variant="plain"
				size="xs"
				icon="xmark"
				aria-label="Close drawer"
				@click="close"
			/>
		</header>
		<div class="lx-drawer__body">
			<slot />
		</div>
	</LxModal>
</template>

<script setup lang='ts'>
	import { computed } from 'vue';
	import { LxButton } from '../button';
	import { LxModal } from '../modal';
	import type { ILxDrawerProps } from './types';

	const props = withDefaults(defineProps<ILxDrawerProps>(), {
		modelValue: false,
		title: '',
		side: 'right',
		animation: 'none',
		closeOnBackdrop: true,
		closeOnEscape: true,
	});

	const emit = defineEmits<{
		(event: 'update:modelValue', value: boolean): void,
		(event: 'close'): void,
	}>();

	const headerId = `lx-drawer-${Math.random().toString(36).slice(2, 9)}-header`;

	const open = computed({
		get: () => props.modelValue,
		set: (value: boolean) => {
			emit('update:modelValue', value);
		},
	});

	const panelClass = computed(() => `lx-drawer__panel lx-drawer__panel--${props.side}`);
	const panelWidth = computed(() => {
		if (props.side === 'top' || props.side === 'bottom') {
			return 'min(100vw - (var(--lx-size-space-md) * 2), 76rem)';
		}

		return 'min(92vw, 26rem)';
	});
	const panelMaxWidth = computed(() => {
		if (props.side === 'top' || props.side === 'bottom') {
			return 'min(100vw - (var(--lx-size-space-md) * 2), 76rem)';
		}

		return '26rem';
	});
	const panelMaxHeight = computed(() => {
		if (props.side === 'top' || props.side === 'bottom') {
			return 'min(58vh, 24rem)';
		}

		return 'calc(100dvh - (var(--lx-size-space-md) * 2))';
	});

	const close = (): void => {
		open.value = false;
		emit('close');
	};
</script>

<style scoped lang='scss'>
	:deep(.lx-drawer__panel) {
		display: grid;
		grid-template-rows: auto 1fr;
	}

	:deep(.lx-drawer__panel--left) {
		border-right: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}

	:deep(.lx-drawer__panel--right) {
		border-left: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}

	:deep(.lx-drawer__panel--top) {
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}

	:deep(.lx-drawer__panel--bottom) {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
	}

	.lx-drawer__header {
		align-items: center;
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		display: flex;
		font-weight: var(--lx-font-weight-semibold);
		justify-content: space-between;
		padding: var(--lx-size-space-md) var(--lx-size-space-lg);
	}

	.lx-drawer__close-button {
		flex-shrink: 0;
	}

	.lx-drawer__body {
		overflow: auto;
		padding: var(--lx-size-space-lg);
	}
</style>
