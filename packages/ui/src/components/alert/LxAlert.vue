<template>
	<section v-if="visible" class="lx-alert" :class="`lx-alert--${props.variant}`" role="alert">
		<div class="lx-alert__body">
			<p v-if="props.title" class="lx-alert__title">
				{{ props.title }}
			</p>
			<template v-else />

			<p v-if="props.text" class="lx-alert__text">
				{{ props.text }}
			</p>
			<template v-else />

			<slot />
		</div>

		<div v-if="$slots.actions" class="lx-alert__actions">
			<slot name="actions" />
		</div>
		<template v-else />

		<LxButton
			v-if="props.dismissible"
			variant="plain"
			size="xs"
			icon="xmark"
			aria-label="Dismiss alert"
			@click="dismiss"
		/>
		<template v-else />
	</section>
	<template v-else />
</template>

<script setup lang='ts'>
	import { ref } from 'vue';
	import { LxButton } from '../button';
	import type { ILxAlertProps } from './types';

	const props = withDefaults(defineProps<ILxAlertProps>(), {
		title: '',
		text: '',
		variant: 'info',
		dismissible: false,
	});

	const emit = defineEmits<{
		(event: 'dismiss'): void,
	}>();

	const visible = ref(true);

	const dismiss = (): void => {
		visible.value = false;
		emit('dismiss');
	};
</script>

<style scoped lang='scss'>
	.lx-alert {
		--lx-alert-border: var(--lx-colour-info);
		--lx-alert-bg: color-mix(in srgb, var(--lx-alert-border) 12%, transparent);
		background: var(--lx-alert-bg);
		border: var(--lx-size-border-width-hairline) solid var(--lx-alert-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: 1fr auto auto;
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
	}

	.lx-alert__title {
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
		margin-bottom: var(--lx-size-space-2xs);
	}

	.lx-alert__text {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
	}

	.lx-alert__actions {
		align-items: center;
		display: inline-flex;
	}

	.lx-alert--success { --lx-alert-border: var(--lx-colour-success); }
	.lx-alert--warning { --lx-alert-border: var(--lx-colour-warning); }
	.lx-alert--danger { --lx-alert-border: var(--lx-colour-danger); }

	@media (max-width: 640px) {
		.lx-alert {
			grid-template-columns: 1fr auto;
		}

		.lx-alert__actions {
			grid-column: 1 / -1;
		}
	}
</style>
