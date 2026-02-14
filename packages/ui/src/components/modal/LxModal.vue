<template>
	<Teleport to="body">
		<div
			v-if="props.modelValue"
			class="lx-modal"
			:class="[`lx-modal--${props.position}`, `lx-modal--${props.animation}`]"
		>
			<button
				v-if="props.showBackdrop"
				class="lx-modal__backdrop"
				type="button"
				aria-label="Close modal"
			/>

			<div class="lx-modal__viewport">
				<section
					v-click-outside="onClickOutside"
					class="lx-modal__panel"
					:class="props.panelClass"
					:style="panelStyles"
					role="dialog"
					aria-modal="true"
					:aria-labelledby="hasHeader ? headerId : undefined"
					tabindex="-1"
				>
					<header v-if="hasHeader" :id="headerId" class="lx-modal__header">
						<slot name="header">
							{{ props.title }}
						</slot>
						<LxButton
							v-if="props.showClose"
							variant="plain"
							size="xs"
							icon="xmark"
							aria-label="Close modal"
							@click="close"
						/>
					</header>
					<div class="lx-modal__body">
						<slot />
					</div>
					<footer v-if="$slots.footer" class="lx-modal__footer">
						<slot name="footer" />
					</footer>
				</section>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang='ts'>
	import { computed, onMounted, onUnmounted } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { LxButton } from '../button';
	import type { ILxModalProps } from './types';

	const props = withDefaults(defineProps<ILxModalProps>(), {
		modelValue: false,
		title: '',
		position: 'center',
		animation: 'none',
		closeOnBackdrop: true,
		closeOnEscape: true,
		showBackdrop: true,
		showClose: false,
		panelClass: '',
		width: '',
		maxWidth: '80vw',
		maxHeight: '80vh',
	});

	const emit = defineEmits<{
		(event: 'update:modelValue', value: boolean): void,
		(event: 'close'): void,
	}>();
	const vClickOutside = vClickOutsideDirective;

	const hasHeader = computed(() => Boolean(props.title) || Boolean(props.showClose));
	const headerId = `lx-modal-${Math.random().toString(36).slice(2, 9)}-header`;

	const panelStyles = computed(() => {
		return {
			width: props.width || undefined,
			maxWidth: props.maxWidth || undefined,
			maxHeight: props.maxHeight,
		};
	});

	const close = (): void => {
		emit('update:modelValue', false);
		emit('close');
	};

	const onClickOutside = (): void => {
		if (props.closeOnBackdrop) {
			close();
		}
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

<style scoped lang='scss'>
	.lx-modal {
		inset: 0;
		position: fixed;
		z-index: 100;
	}

	.lx-modal__backdrop {
		background: var(--lx-colour-surface-overlay);
		border: none;
		height: 100%;
		inset: 0;
		position: absolute;
		width: 100%;
	}

	.lx-modal__viewport {
		display: flex;
		height: 100%;
		padding: var(--lx-size-space-md);
		position: relative;
		width: 100%;
	}

	.lx-modal--center .lx-modal__viewport {
		align-items: center;
		justify-content: center;
	}

	.lx-modal--left .lx-modal__viewport {
		align-items: center;
		justify-content: flex-start;
	}

	.lx-modal--right .lx-modal__viewport {
		align-items: center;
		justify-content: flex-end;
	}

	.lx-modal--top .lx-modal__viewport {
		align-items: flex-start;
		justify-content: center;
	}

	.lx-modal--bottom .lx-modal__viewport {
		align-items: flex-end;
		justify-content: center;
	}

	.lx-modal__panel {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		grid-template-rows: auto 1fr auto;
		overflow: hidden;
		overflow-anchor: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		scrollbar-gutter: stable both-edges;
		width: min(100%, 40rem);
	}

	.lx-modal__header {
		align-items: center;
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		display: flex;
		font-weight: var(--lx-font-weight-semibold);
		justify-content: space-between;
		padding: var(--lx-size-space-md) var(--lx-size-space-lg);
	}

	.lx-modal__body {
		overflow-x: hidden;
		overflow-y: auto;
		padding: var(--lx-size-space-lg);
	}

	.lx-modal__footer {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		padding: var(--lx-size-space-md) var(--lx-size-space-lg);
	}

	.lx-modal--fade .lx-modal__backdrop,
	.lx-modal--slide .lx-modal__backdrop {
		animation: lx-modal-fade-in var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-modal--fade .lx-modal__panel {
		animation: lx-modal-fade-in var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-modal--slide.lx-modal--left .lx-modal__panel {
		animation: lx-modal-slide-in-left var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-modal--slide.lx-modal--right .lx-modal__panel {
		animation: lx-modal-slide-in-right var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-modal--slide.lx-modal--top .lx-modal__panel {
		animation: lx-modal-slide-in-top var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-modal--slide.lx-modal--bottom .lx-modal__panel {
		animation: lx-modal-slide-in-bottom var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-modal--slide.lx-modal--center .lx-modal__panel {
		animation: lx-modal-fade-in var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	@keyframes lx-modal-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes lx-modal-slide-in-left {
		from {
			opacity: 0;
			transform: translateX(-100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes lx-modal-slide-in-right {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes lx-modal-slide-in-top {
		from {
			opacity: 0;
			transform: translateY(-100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes lx-modal-slide-in-bottom {
		from {
			opacity: 0;
			transform: translateY(100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
