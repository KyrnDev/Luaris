<template>
	<Teleport to="body">
		<div v-if="props.modelValue" class="lx-drawer" :class="[`lx-drawer--${props.side}`]">
			<button
				v-if="props.closeOnBackdrop"
				class="lx-drawer__backdrop"
				type="button"
				aria-label="Close drawer"
				@click="close"
			/>
			<aside
				class="lx-drawer__panel"
				role="dialog"
				aria-modal="true"
				:aria-labelledby="$slots.header || props.title ? headerId : undefined"
				tabindex="-1"
			>
				<header v-if="$slots.header || props.title" :id="headerId" class="lx-drawer__header">
					<slot name="header">
						{{ props.title }}
					</slot>
					<button class="lx-drawer__close" type="button" aria-label="Close drawer" @click="close">
						×
					</button>
				</header>
				<div class="lx-drawer__body">
					<slot />
				</div>
			</aside>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	import type { ILxDrawerProps } from './types';
	import { onMounted, onUnmounted } from 'vue';

	const props = withDefaults(defineProps<ILxDrawerProps>(), {
		modelValue: false,
		title: '',
		side: 'right',
		closeOnBackdrop: true,
		closeOnEscape: true,
	});

	const emit = defineEmits<{
		(event: 'update:modelValue', value: boolean): void,
		(event: 'close'): void,
	}>();

	const headerId = `lx-drawer-${Math.random().toString(36).slice(2, 9)}-header`;

	const close = (): void => {
		emit('update:modelValue', false);
		emit('close');
	};

	const onEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape' && props.modelValue && props.closeOnEscape) {
			close();
		}
	};

	onMounted(() => {
		window.addEventListener('keydown', onEscape);
	});

	onUnmounted(() => {
		window.removeEventListener('keydown', onEscape);
	});
</script>

<style scoped lang="scss">
	.lx-drawer {
		inset: 0;
		position: fixed;
		z-index: 80;
	}

	.lx-drawer__backdrop {
		background: var(--lx-colour-surface-overlay);
		border: none;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	.lx-drawer__panel {
		background: var(--lx-colour-surface-raised);
		border-left: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		max-width: 26rem;
		position: absolute;
		top: 0;
		width: min(92vw, 26rem);
	}

	.lx-drawer--left .lx-drawer__panel {
		border-left: none;
		border-right: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		left: 0;
	}

	.lx-drawer--right .lx-drawer__panel {
		right: 0;
	}

	.lx-drawer__header {
		align-items: center;
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		display: flex;
		font-weight: var(--lx-font-weight-semibold);
		justify-content: space-between;
		padding: var(--lx-size-space-md) var(--lx-size-space-lg);
	}

	.lx-drawer__close {
		appearance: none;
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: 1.4rem;
		line-height: 1;
	}

	.lx-drawer__body {
		overflow: auto;
		padding: var(--lx-size-space-lg);
	}
</style>
