<template>
	<fieldset class="lx-date-time-range-picker" :disabled="props.disabled">
		<div class="lx-date-time-range-picker__group">
			<span class="lx-date-time-range-picker__label">Date range</span>
			<LxDateRangePicker
				v-model="dateRangeValue"
				:min="props.dateMin"
				:max="props.dateMax"
				:disabled="props.disabled"
			/>
		</div>
		<div class="lx-date-time-range-picker__group">
			<span class="lx-date-time-range-picker__label">Time range</span>
			<LxTimeRangePicker
				v-model="timeRangeValue"
				:min="props.timeMin"
				:max="props.timeMax"
				:step="props.timeStep"
				:disabled="props.disabled"
			/>
		</div>
	</fieldset>
</template>

<script setup lang='ts'>
	import { computed, watch } from 'vue';
	import { LxDateRangePicker } from '../date-range-picker';
	import { LxTimeRangePicker } from '../time-range-picker';
	import type { ILxDateTimeRangePickerProps, ILxDateTimeRangePickerValue } from './types';

	const props = withDefaults(defineProps<ILxDateTimeRangePickerProps>(), {
		dateMin: '',
		dateMax: '',
		timeMin: '',
		timeMax: '',
		timeStep: 60,
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: ILxDateTimeRangePickerValue): void,
	}>();

	const value = defineModel<ILxDateTimeRangePickerValue>({
		default: () => [],
	});

	const dateRangeValue = computed({
		get: () => {
			const startDate = value.value[0];
			const endDate = value.value[1];
			const nextValue: Date[] = [];
			if (startDate instanceof Date) {
				nextValue[0] = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
			}
			if (endDate instanceof Date) {
				nextValue[1] = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
			}
			return nextValue;
		},
		set: next => {
			const startDateTime = mergeDateAndTime(next[0], timeRangeValue.value[0] || '00:00');
			const endDateTime = mergeDateAndTime(next[1], timeRangeValue.value[1] || '00:00');
			const nextValue: Date[] = [];
			if (startDateTime) {
				nextValue[0] = startDateTime;
			}
			if (endDateTime) {
				nextValue[1] = endDateTime;
			}
			value.value = nextValue;
		},
	});

	const timeRangeValue = computed({
		get: () => {
			const startTime = formatTimeForInput(value.value[0]);
			const endTime = formatTimeForInput(value.value[1]);
			const nextValue: string[] = [];
			if (startTime) {
				nextValue[0] = startTime;
			}
			if (endTime) {
				nextValue[1] = endTime;
			}
			return nextValue;
		},
		set: next => {
			const startDateTime = mergeDateAndTime(dateRangeValue.value[0], next[0]);
			const endDateTime = mergeDateAndTime(dateRangeValue.value[1], next[1]);
			const nextValue: Date[] = [];
			if (startDateTime) {
				nextValue[0] = startDateTime;
			}
			if (endDateTime) {
				nextValue[1] = endDateTime;
			}
			value.value = nextValue;
		},
	});

	function formatTimeForInput(dateValue?: Date): string {
		if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime())) {
			return '';
		}

		const hours = String(dateValue.getHours()).padStart(2, '0');
		const minutes = String(dateValue.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	function mergeDateAndTime(dateValue?: Date, timeText?: string): Date | undefined {
		if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime()) || !timeText) {
			return undefined;
		}

		const [hoursText, minutesText] = timeText.split(':');
		const hours = Number(hoursText);
		const minutes = Number(minutesText);
		if (Number.isNaN(hours) || Number.isNaN(minutes)) {
			return undefined;
		}

		return new Date(
			dateValue.getFullYear(),
			dateValue.getMonth(),
			dateValue.getDate(),
			hours,
			minutes,
			0,
			0,
		);
	}

	watch(value, next => {
		emit('change', next);
	}, { deep: true });
</script>

<style scoped lang='scss'>
	.lx-date-time-range-picker {
		border: none;
		display: grid;
		gap: var(--lx-size-space-sm);
		margin: 0;
		padding: 0;
	}

	.lx-date-time-range-picker__group {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-date-time-range-picker__label {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}
</style>
