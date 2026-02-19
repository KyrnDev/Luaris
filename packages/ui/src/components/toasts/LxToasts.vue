<template>
	<section class="lx-toasts" :class="[`lx-toasts--${props.position}`]" aria-live="polite" aria-atomic="false">
		<LxToast
			v-for="toast in limitedToasts"
			:id="toast.id"
			:key="toast.id"
			:title="toast.title || ''"
			:text="toast.text"
			:icon="toast.icon || ''"
			:variant="toast.variant || 'info'"
			:timeout="toast.timeout || 5000"
			:link="toast.link"
			@close="removeToast"
		>
			<template v-if="$slots.toast">
				<slot name="toast" :toast="toast" />
			</template>
		</LxToast>
	</section>
</template>

<script setup lang='ts'>
	import { computed } from 'vue';
	import { LxToast } from '../toast';
	import type { ILxToastsItem, ILxToastsProps } from './types';

	const props = withDefaults(defineProps<ILxToastsProps>(), {
		position: 'top-right',
		max: 5,
	});

	const model = defineModel<ILxToastsItem[]>({
		default: () => [],
	});

	const limitedToasts = computed(() => model.value.slice(0, props.max));

	const removeToast = (id?: string): void => {
		if (!id) {
			model.value = model.value.slice(1);
			return;
		}

		model.value = model.value.filter(item => item.id !== id);
	};
</script>

<style scoped lang='scss'>
	.lx-toasts {
		display: grid;
		gap: var(--lx-size-space-sm);
		max-width: min(90vw, 24rem);
		pointer-events: none;
		position: fixed;
		z-index: 70;
	}

	.lx-toasts :deep(.lx-toast) {
		pointer-events: auto;
	}

	.lx-toasts--top-right {
		right: var(--lx-size-space-lg);
		top: var(--lx-size-space-lg);
	}

	.lx-toasts--top-left {
		left: var(--lx-size-space-lg);
		top: var(--lx-size-space-lg);
	}

	.lx-toasts--bottom-right {
		bottom: var(--lx-size-space-lg);
		right: var(--lx-size-space-lg);
	}

	.lx-toasts--bottom-left {
		bottom: var(--lx-size-space-lg);
		left: var(--lx-size-space-lg);
	}

	.lx-toasts--top-center {
		left: 50%;
		top: var(--lx-size-space-lg);
		transform: translateX(-50%);
	}

	.lx-toasts--bottom-center {
		bottom: var(--lx-size-space-lg);
		left: 50%;
		transform: translateX(-50%);
	}
</style>
