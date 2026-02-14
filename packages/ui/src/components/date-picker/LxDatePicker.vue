<template>
	<div class="lx-date-picker">
		<input
			v-bind="attrs"
			:id="inputId"
			v-model="value"
			:name="inputName"
			type="date"
			:min="props.min"
			:max="props.max"
			:disabled="props.disabled"
			:aria-label="inputAriaLabel"
		>
	</div>
</template>

<script setup lang='ts'>
	import type { ILxDatePickerProps } from './types';
	import { computed, useAttrs, useId, watch } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxDatePickerProps>(), {
		min: '',
		max: '',
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: string): void,
	}>();

	const value = defineModel<string>({
		default: '',
	});
	const attrs = useAttrs();
	const generatedId = `lx-date-picker-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const inputAriaLabel = computed(() => {
		const attrAriaLabel = attrs['aria-label'];
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Date';
	});

	watch(value, next => {
		emit('change', next);
	});
</script>

<style scoped lang='scss'>
	.lx-date-picker {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-date-picker input {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		font: inherit;
		padding: var(--lx-size-space-sm);
	}
</style>
