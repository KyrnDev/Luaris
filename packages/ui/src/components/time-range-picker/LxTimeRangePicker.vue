<template>
	<fieldset class="lx-time-range-picker" :disabled="props.disabled">
		<div class="lx-time-range-picker__row">
			<label class="lx-time-range-picker__field">
				<input
					v-model="startTime"
					type="time"
					:min="props.min"
					:max="endTime || props.max"
					:step="props.step"
					aria-label="Start time"
				>
			</label>
			<span class="lx-time-range-picker__separator" aria-hidden="true">to</span>
			<label class="lx-time-range-picker__field">
				<input
					v-model="endTime"
					type="time"
					:min="startTime || props.min"
					:max="props.max"
					:step="props.step"
					aria-label="End time"
				>
			</label>
		</div>
	</fieldset>
</template>

<script setup lang='ts'>
	import { computed, watch } from 'vue';
	import type { ILxTimeRangePickerProps, ILxTimeRangeValue } from './types';

	const props = withDefaults(defineProps<ILxTimeRangePickerProps>(), {
		min: '',
		max: '',
		step: 60,
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: ILxTimeRangeValue): void,
	}>();

	const value = defineModel<ILxTimeRangeValue>({
		default: () => [],
	});

	const startTime = computed({
		get: () => value.value[0] || '',
		set: start => {
			const nextValue = [...value.value];
			if (start) {
				nextValue[0] = start;
			} else {
				nextValue.splice(0, 1);
			}
			value.value = nextValue;
		},
	});

	const endTime = computed({
		get: () => value.value[1] || '',
		set: end => {
			const nextValue = [...value.value];
			if (end) {
				nextValue[1] = end;
			} else {
				nextValue.splice(1, 1);
			}
			value.value = nextValue;
		},
	});

	watch(value, next => {
		emit('change', next);
	}, { deep: true });
</script>

<style scoped lang='scss'>
	.lx-time-range-picker {
		border: none;
		margin: 0;
		padding: 0;
	}

	.lx-time-range-picker__row {
		align-items: center;
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
	}

	.lx-time-range-picker__field {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-time-range-picker__separator {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		white-space: nowrap;
	}

	.lx-time-range-picker input {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		font: inherit;
		padding: var(--lx-size-space-sm);
		width: 100%;
	}

	@media (max-width: 640px) {
		.lx-time-range-picker__row {
			grid-template-columns: 1fr;
		}

		.lx-time-range-picker__separator {
			justify-self: center;
		}
	}
</style>
