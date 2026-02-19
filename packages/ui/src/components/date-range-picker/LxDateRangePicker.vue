<template>
	<fieldset class="lx-date-range-picker" :disabled="props.disabled">
		<div class="lx-date-range-picker__row">
			<label class="lx-date-range-picker__field">
				<input
					v-model="startDate"
					type="date"
					:min="props.min"
					:max="endDate || props.max"
					aria-label="Start date"
				>
			</label>
			<span class="lx-date-range-picker__separator" aria-hidden="true">to</span>
			<label class="lx-date-range-picker__field">
				<input
					v-model="endDate"
					type="date"
					:min="startDate || props.min"
					:max="props.max"
					aria-label="End date"
				>
			</label>
		</div>
	</fieldset>
</template>

<script setup lang='ts'>
	import type { ILxDateRangePickerProps, ILxDateRangeValue } from './types';
	import { computed, watch } from 'vue';

	const props = withDefaults(defineProps<ILxDateRangePickerProps>(), {
		min: '',
		max: '',
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: ILxDateRangeValue): void,
	}>();

	const value = defineModel<ILxDateRangeValue>({
		default: () => [],
	});

	const startDate = computed({
		get: () => formatDateForInput(value.value[0]),
		set: start => {
			const nextValue = [...value.value];
			const parsedStart = parseDateFromInput(start);
			if (parsedStart) {
				nextValue[0] = parsedStart;
			} else {
				nextValue.splice(0, 1);
			}
			value.value = nextValue;
		},
	});

	const endDate = computed({
		get: () => formatDateForInput(value.value[1]),
		set: end => {
			const nextValue = [...value.value];
			const parsedEnd = parseDateFromInput(end);
			if (parsedEnd) {
				nextValue[1] = parsedEnd;
			} else {
				nextValue.splice(1, 1);
			}
			value.value = nextValue;
		},
	});

	function formatDateForInput(dateValue?: Date): string {
		if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime())) {
			return '';
		}

		const year = dateValue.getFullYear();
		const month = String(dateValue.getMonth() + 1).padStart(2, '0');
		const day = String(dateValue.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function parseDateFromInput(dateText: string): Date | undefined {
		if (!dateText) {
			return undefined;
		}

		const [yearText, monthText, dayText] = dateText.split('-');
		const year = Number(yearText);
		const month = Number(monthText);
		const day = Number(dayText);
		if (!year || !month || !day) {
			return undefined;
		}

		const parsedDate = new Date(year, month - 1, day);
		return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
	}

	watch(value, next => {
		emit('change', next);
	}, { deep: true });
</script>

<style scoped lang='scss'>
	.lx-date-range-picker {
		border: none;
		margin: 0;
		padding: 0;
	}

	.lx-date-range-picker__row {
		align-items: center;
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
	}

	.lx-date-range-picker__field {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-date-range-picker__label {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-date-range-picker__separator {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		white-space: nowrap;
	}

	.lx-date-range-picker input {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		font: inherit;
		padding: var(--lx-size-space-sm);
		width: 100%;
	}

	@media (max-width: 640px) {
		.lx-date-range-picker__row {
			grid-template-columns: 1fr;
		}

		.lx-date-range-picker__separator {
			justify-self: center;
		}
	}
</style>
