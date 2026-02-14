<template>
	<div class="lx-input" :class="[`lx-input--${variant}`, `lx-input--${size}`, { 'has-error': !!error }]">
		<div class="lx-input__field-wrapper">
			<span v-if="$slots.leading" class="lx-input__addon"><slot name="leading" /></span>
			<input
				v-bind="attrs"
				:id="inputId"
				:name="inputName"
				:value="modelValue"
				:type="type"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:aria-invalid="Boolean(error)"
				:aria-describedby="messageId"
				@input="onInput"
			>
			<span v-if="$slots.trailing" class="lx-input__addon"><slot name="trailing" /></span>
		</div>
		<span v-if="error" :id="messageId" class="lx-input__message lx-input__message--error">{{ error }}</span>
		<span v-else-if="hint" :id="messageId" class="lx-input__message">{{ hint }}</span>
	</div>
</template>

<script setup lang="ts">
	import type { ILxInputProps } from './types';
	import { computed, useAttrs, useId } from 'vue';

	const props = withDefaults(defineProps<ILxInputProps>(), {
		modelValue: '',
		hint: '',
		error: '',
		placeholder: '',
		type: 'text',
		variant: 'default',
		size: 'md',
		disabled: false,
		readonly: false,
	});

	const emit = defineEmits<{
		(event: 'update:modelValue', value: string): void,
		(event: 'change', value: string): void,
	}>();

	const attrs = useAttrs();
	const generatedId = `lx-input-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const messageId = computed(() => (props.error || props.hint) ? `${inputId.value}-message` : undefined);

	const onInput = (event: Event): void => {
		const target = event.target as HTMLInputElement;
		emit('update:modelValue', target.value);
		emit('change', target.value);
	};

	const {
		disabled,
		error,
		hint,
		modelValue,
		placeholder,
		readonly,
		size,
		type,
		variant,
	} = props;
</script>

<style scoped lang="scss">
	.lx-input {
		--lx-input-border: var(--lx-colour-surface-border);
		--lx-input-background: var(--lx-colour-surface-raised);
		--lx-input-text: var(--lx-colour-surface-text);
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-input__field-wrapper {
		align-items: center;
		background: var(--lx-input-background);
		border: var(--lx-size-border-width-hairline) solid var(--lx-input-border);
		border-radius: var(--lx-size-radius-md);
		display: flex;
		padding: 0 var(--lx-size-space-sm);
		transition: border-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-input__field-wrapper:focus-within {
		border-color: var(--lx-colour-focus-ring);
	}

	.lx-input input {
		appearance: none;
		background: transparent;
		border: none;
		color: var(--lx-input-text);
		font: inherit;
		outline: none;
		width: 100%;
	}

	.lx-input input::placeholder {
		color: var(--lx-colour-surface-text-muted);
	}

	.lx-input__addon {
		align-items: center;
		color: var(--lx-colour-surface-text-muted);
		display: inline-flex;
	}

	.lx-input__message {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-input__message--error {
		color: var(--lx-colour-danger);
	}

	.lx-input--sm .lx-input__field-wrapper { height: var(--lx-size-control-height-sm); }
	.lx-input--md .lx-input__field-wrapper { height: var(--lx-size-control-height-md); }
	.lx-input--lg .lx-input__field-wrapper { height: var(--lx-size-control-height-lg); }

	.lx-input--primary { --lx-input-border: color-mix(in srgb, var(--lx-colour-primary) 65%, var(--lx-colour-surface-border)); }
	.lx-input--secondary { --lx-input-border: color-mix(in srgb, var(--lx-colour-secondary) 65%, var(--lx-colour-surface-border)); }
	.lx-input.has-error { --lx-input-border: var(--lx-colour-danger); }

	.lx-input input:disabled {
		cursor: not-allowed;
		opacity: 0.65;
	}
</style>
