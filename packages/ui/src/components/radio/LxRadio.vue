<template>
	<div class="lx-radio" :class="{ 'is-disabled': props.disabled }">
		<input
			:id="inputId"
			v-model="model"
			type="radio"
			:name="inputName"
			:value="props.value"
			:disabled="props.disabled"
		>
		<label class="lx-radio__label" :for="inputId">
			<span class="lx-radio__dot" aria-hidden="true" />
			<span>{{ props.label }}</span>
		</label>
	</div>
</template>

<script setup lang='ts'>
	import { computed, useId } from 'vue';
	import type { TFormValue } from '../../types/form';
	import type { ILxRadioProps } from './types';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxRadioProps>(), {
		label: '',
		disabled: false,
		name: '',
		id: '',
	});
	const generatedId = `lx-radio-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		return props.id || generatedId;
	});
	const inputName = computed(() => {
		return props.name || inputId.value;
	});

	const model = defineModel<TFormValue>();
</script>

<style scoped lang='scss'>
	.lx-radio {
		align-items: center;
		cursor: pointer;
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-radio__label {
		align-items: center;
		cursor: inherit;
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-radio input {
		opacity: 0;
		position: absolute;
	}

	.lx-radio__dot {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-pill);
		display: inline-block;
		height: 1rem;
		width: 1rem;
	}

	.lx-radio input:checked + .lx-radio__label .lx-radio__dot {
		background: radial-gradient(circle, var(--lx-colour-primary) 45%, transparent 46%);
		border-color: var(--lx-colour-primary);
	}

	.lx-radio.is-disabled {
		opacity: 0.6;
	}
</style>
