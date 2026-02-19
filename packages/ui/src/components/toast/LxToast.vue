<template>
	<component
		:is="wrapperTag"
		class="lx-toast"
		:class="[`lx-toast--${props.variant}`]"
		v-bind="wrapperAttributes"
	>
		<slot>
			<div class="lx-toast__content">
				<div class="lx-toast__header">
					<span v-if="props.icon" class="lx-toast__icon">{{ props.icon }}</span>
					<strong v-if="props.title" class="lx-toast__title">{{ props.title }}</strong>
				</div>
				<p class="lx-toast__text">
					{{ props.text }}
				</p>
			</div>
		</slot>

		<button type="button" class="lx-toast__close" aria-label="Dismiss toast" @click="close">
			×
		</button>

		<div class="lx-toast__progress">
			<div class="lx-toast__progress-fill" :style="{ width: `${progressWidth}%` }" />
		</div>
	</component>
</template>

<script setup lang='ts'>
	import { computed, onMounted, onUnmounted, ref } from 'vue';
	import type { ILxToastProps } from './types';

	const props = withDefaults(defineProps<ILxToastProps>(), {
		id: '',
		title: '',
		icon: '',
		variant: 'info',
		timeout: 5000,
		link: undefined,
	});

	const emit = defineEmits<{
		(event: 'close', id?: string): void,
	}>();

	const progressWidth = ref(100);
	let animationFrameId = 0;
	let startedAt = 0;

	const wrapperTag = computed(() => props.link ? 'a' : 'article');
	const wrapperAttributes = computed(() => {
		if (!props.link) {
			return {
				role: 'status',
			};
		}

		return {
			href: props.link.href,
			target: props.link.target || '_self',
			rel: props.link.rel || (props.link.target === '_blank' ? 'noopener noreferrer' : undefined),
		};
	});

	const close = (): void => {
		emit('close', props.id || undefined);
	};

	const updateProgress = (timestamp: number): void => {
		if (startedAt === 0) {
			startedAt = timestamp;
		}

		const elapsed = timestamp - startedAt;
		const remaining = Math.max(0, props.timeout - elapsed);
		progressWidth.value = (remaining / props.timeout) * 100;

		if (remaining <= 0) {
			close();
			return;
		}

		animationFrameId = window.requestAnimationFrame(updateProgress);
	};

	onMounted(() => {
		if (props.timeout <= 0) {
			return;
		}

		animationFrameId = window.requestAnimationFrame(updateProgress);
	});

	onUnmounted(() => {
		if (animationFrameId > 0) {
			window.cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<style scoped lang='scss'>
	.lx-toast {
		--lx-toast-colour: var(--lx-colour-info);
		--lx-toast-on-colour: var(--lx-colour-on-secondary);
		background: color-mix(in srgb, var(--lx-toast-colour) 16%, var(--lx-colour-surface-overlay));
		border: var(--lx-size-border-width-hairline) solid color-mix(in srgb, var(--lx-toast-colour) 65%, var(--lx-colour-surface-border));
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		display: grid;
		gap: var(--lx-size-space-xs);
		padding: var(--lx-size-space-sm);
		position: relative;
		text-decoration: none;
	}

	.lx-toast__content {
		display: grid;
		gap: var(--lx-size-space-2xs);
		padding-right: var(--lx-size-space-lg);
	}

	.lx-toast__header {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-2xs);
	}

	.lx-toast__icon {
		color: var(--lx-toast-colour);
	}

	.lx-toast__title {
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-toast__text {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		margin: 0;
	}

	.lx-toast__close {
		appearance: none;
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-text-muted);
		cursor: pointer;
		font-size: var(--lx-font-size-lg);
		line-height: 1;
		position: absolute;
		right: var(--lx-size-space-xs);
		top: var(--lx-size-space-2xs);
	}

	.lx-toast__progress {
		background: color-mix(in srgb, var(--lx-toast-colour) 20%, transparent);
		border-radius: var(--lx-size-radius-pill);
		height: 0.25rem;
		overflow: hidden;
	}

	.lx-toast__progress-fill {
		background: var(--lx-toast-colour);
		height: 100%;
		transition: width 120ms linear;
	}

	.lx-toast--info {
		--lx-toast-colour: var(--lx-colour-info);
	}

	.lx-toast--success {
		--lx-toast-colour: var(--lx-colour-success);
	}

	.lx-toast--warning {
		--lx-toast-colour: var(--lx-colour-warning);
	}

	.lx-toast--danger {
		--lx-toast-colour: var(--lx-colour-danger);
	}
</style>
