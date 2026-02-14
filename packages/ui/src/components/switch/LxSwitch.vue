<template>
	<div class="lx-switch" :class="{ 'is-disabled': disabled }">
		<input
			v-bind="attrs"
			:id="inputId"
			:name="inputName"
			type="checkbox"
			role="switch"
			:checked="modelValue"
			:disabled="disabled"
			:aria-label="switchAriaLabel"
			@change="onChange"
		>
		<span class="lx-switch__track" aria-hidden="true"><span class="lx-switch__thumb" /></span>
	</div>
</template>

<script setup lang="ts">
	import type { ILxSwitchProps } from './types';
	import { computed, useAttrs, useId } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxSwitchProps>(), {
		modelValue: false,
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'update:modelValue', value: boolean): void,
		(event: 'change', value: boolean): void,
	}>();
	const attrs = useAttrs();
	const generatedId = `lx-switch-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const switchAriaLabel = computed(() => {
		const attrAriaLabel = attrs['aria-label'];
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Switch';
	});

	const onChange = (event: Event): void => {
		const target = event.target as HTMLInputElement;
		emit('update:modelValue', target.checked);
		emit('change', target.checked);
	};

	const { disabled, modelValue } = props;
</script>

<style scoped lang="scss">
	.lx-switch {
		align-items: center;
		cursor: pointer;
		display: inline-flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-switch input {
		opacity: 0;
		pointer-events: none;
		position: absolute;
	}

	.lx-switch__track {
		align-items: center;
		background: var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-pill);
		display: inline-flex;
		height: 1.5rem;
		padding: 0.15rem;
		transition: background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
		width: 2.6rem;
	}

	.lx-switch__thumb {
		background: var(--lx-colour-surface-inverse);
		border-radius: var(--lx-size-radius-pill);
		height: 1.2rem;
		transform: translateX(0);
		transition: transform var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
		width: 1.2rem;
	}

	.lx-switch input:checked + .lx-switch__track {
		background: var(--lx-colour-primary);
	}

	.lx-switch input:checked + .lx-switch__track .lx-switch__thumb {
		transform: translateX(1.1rem);
	}

	.lx-switch input:focus-visible + .lx-switch__track {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-switch.is-disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
