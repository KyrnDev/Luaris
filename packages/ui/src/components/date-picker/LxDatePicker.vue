<template>
	<div class="lx-date-picker">
		<input
			v-bind="attrs"
			:id="inputId"
			v-model="inputValue"
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
		(event: 'change', value: Date | null): void,
	}>();

	const value = defineModel<Date | null>({
		default: null,
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
	const inputValue = computed({
		get: () => formatDateForInput(value.value),
		set: nextValue => {
			value.value = parseDateFromInput(nextValue);
		},
	});

	function formatDateForInput(dateValue: Date | null): string {
		if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime())) {
			return '';
		}

		const year = dateValue.getFullYear();
		const month = String(dateValue.getMonth() + 1).padStart(2, '0');
		const day = String(dateValue.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function parseDateFromInput(dateText: string): Date | null {
		if (!dateText) {
			return null;
		}

		const [yearText, monthText, dayText] = dateText.split('-');
		const year = Number(yearText);
		const month = Number(monthText);
		const day = Number(dayText);
		if (!year || !month || !day) {
			return null;
		}

		const parsedDate = new Date(year, month - 1, day);
		return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
	}

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
