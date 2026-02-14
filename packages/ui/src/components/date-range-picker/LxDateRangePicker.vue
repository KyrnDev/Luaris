<template>
	<fieldset class="lx-date-range-picker" :disabled="props.disabled">
		<div class="lx-date-range-picker__grid">
			<label>
				<span>Start</span>
				<input v-model="startDate" type="date" :min="props.min" :max="value.end || props.max">
			</label>
			<label>
				<span>End</span>
				<input v-model="endDate" type="date" :min="value.start || props.min" :max="props.max">
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
		default: {
			start: '',
			end: '',
		},
	});

	const startDate = computed({
		get: () => value.value.start,
		set: start => {
			value.value = { ...value.value, start };
		},
	});

	const endDate = computed({
		get: () => value.value.end,
		set: end => {
			value.value = { ...value.value, end };
		},
	});

	watch(value, next => {
		emit('change', next);
	}, { deep: true });
</script>

<style scoped lang='scss'>
	.lx-date-range-picker {
		border: none;
		display: grid;
		gap: var(--lx-size-space-sm);
		margin: 0;
		padding: 0;
	}

	.lx-date-range-picker__grid {
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
	}

	.lx-date-range-picker label {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-date-range-picker input {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		font: inherit;
		padding: var(--lx-size-space-sm);
	}
</style>
