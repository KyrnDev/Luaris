<template>
	<LxModal
		v-model="open"
		:title="props.title"
		:position="props.position"
		:animation="props.animation"
	>
		<div class="lx-confirm-modal">
			<p v-if="props.message" class="lx-confirm-modal__message">
				{{ props.message }}
			</p>
			<template v-else />

			<slot />

			<div class="lx-confirm-modal__actions">
				<LxButton variant="ghost" @click="onCancel">
					{{ props.cancelLabel }}
				</LxButton>
				<LxButton :variant="props.confirmVariant" @click="onConfirm">
					{{ props.confirmLabel }}
				</LxButton>
			</div>
		</div>
	</LxModal>
</template>

<script setup lang='ts'>
	import { LxButton } from '../button';
	import { LxModal } from '../modal';
	import type { ILxConfirmModalProps } from './types';

	const props = withDefaults(defineProps<ILxConfirmModalProps>(), {
		modelValue: false,
		title: 'Confirm action',
		message: '',
		confirmLabel: 'Confirm',
		cancelLabel: 'Cancel',
		confirmVariant: 'danger',
		position: 'center',
		animation: 'fade',
	});

	const emit = defineEmits<{
		(event: 'confirm'): void,
		(event: 'cancel'): void,
	}>();

	const open = defineModel<boolean>({
		default: false,
	});

	const onConfirm = (): void => {
		emit('confirm');
		open.value = false;
	};

	const onCancel = (): void => {
		emit('cancel');
		open.value = false;
	};
</script>

<style scoped lang='scss'>
	.lx-confirm-modal {
		display: grid;
		gap: var(--lx-size-space-md);
	}

	.lx-confirm-modal__message {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
	}

	.lx-confirm-modal__actions {
		display: flex;
		gap: var(--lx-size-space-sm);
		justify-content: flex-end;
	}
</style>
