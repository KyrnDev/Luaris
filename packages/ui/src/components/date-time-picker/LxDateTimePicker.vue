<template>
	<fieldset class="lx-date-time-picker" :disabled="props.disabled">
		<div class="lx-date-time-picker__row">
			<LxDatePicker
				v-model="dateValue"
				:min="props.dateMin"
				:max="props.dateMax"
				:disabled="props.disabled"
				aria-label="Date"
			/>
			<span class="lx-date-time-picker__separator" aria-hidden="true">at</span>
			<LxTimePicker
				v-model="timeValue"
				:min="props.timeMin"
				:max="props.timeMax"
				:step="props.timeStep"
				:disabled="props.disabled"
				aria-label="Time"
			/>
		</div>
	</fieldset>
</template>

<script setup lang='ts'>
	import { computed, watch } from 'vue';
	import { LxDatePicker } from '../date-picker';
	import { LxTimePicker } from '../time-picker';
	import type { ILxDateTimePickerProps, ILxDateTimePickerValue } from './types';

	const props = withDefaults(defineProps<ILxDateTimePickerProps>(), {
		dateMin: '',
		dateMax: '',
		timeMin: '',
		timeMax: '',
		timeStep: 60,
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: ILxDateTimePickerValue): void,
	}>();

	const value = defineModel<ILxDateTimePickerValue>({
		default: null,
	});

	const dateValue = computed<Date | null>({
		get: () => {
			if (!(value.value instanceof Date) || Number.isNaN(value.value.getTime())) {
				return null;
			}

			return new Date(
				value.value.getFullYear(),
				value.value.getMonth(),
				value.value.getDate(),
			);
		},
		set: date => {
			const activeTime = timeValue.value || formatTimeForInput(value.value) || '00:00';
			value.value = mergeDateAndTime(date, activeTime);
		},
	});

	const timeValue = computed({
		get: () => formatTimeForInput(value.value),
		set: time => {
			value.value = mergeDateAndTime(dateValue.value, time);
		},
	});

	function formatTimeForInput(dateValue: Date | null): string {
		if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime())) {
			return '';
		}

		const hours = String(dateValue.getHours()).padStart(2, '0');
		const minutes = String(dateValue.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	function mergeDateAndTime(dateValue: Date | null, timeText: string): Date | null {
		if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime()) || !timeText) {
			return null;
		}

		const [hoursText, minutesText] = timeText.split(':');
		const hours = Number(hoursText);
		const minutes = Number(minutesText);
		if (Number.isNaN(hours) || Number.isNaN(minutes)) {
			return null;
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
	.lx-date-time-picker {
		border: none;
		margin: 0;
		padding: 0;
	}

	.lx-date-time-picker__row {
		align-items: center;
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
	}

	.lx-date-time-picker__separator {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.lx-date-time-picker__row {
			grid-template-columns: 1fr;
		}

		.lx-date-time-picker__separator {
			justify-self: center;
		}
	}
</style>
