<template>
	<section class="lx-calendar">
		<header class="lx-calendar__header">
			<LxButton variant="ghost" size="xs" icon="chevron-left" @click="changeMonth(-1)" />
			<div v-click-outside="closePickers" class="lx-calendar__period-picker">
				<button
					type="button"
					class="lx-calendar__period-button"
					aria-label="Choose month"
					@click="toggleMonthPicker"
				>
					{{ monthName }}
				</button>
				<button
					type="button"
					class="lx-calendar__period-button"
					aria-label="Choose year"
					@click="toggleYearPicker"
				>
					{{ currentYear }}
				</button>
				<div v-if="(/* c8 ignore next */ showMonthPicker) || showYearPicker" class="lx-calendar__picker-popover">
					<select v-if="/* c8 ignore next */ showMonthPicker" :value="currentMonthIndex" @change="onMonthChange">
						<option v-for="(label, index) in monthNames" :key="label" :value="index">
							{{ label }}
						</option>
					</select>
					<select v-if="/* c8 ignore next */ showYearPicker" :value="currentYear" @change="onYearChange">
						<option v-for="year in yearOptions" :key="year" :value="year">
							{{ year }}
						</option>
					</select>
				</div>
			</div>
			<LxButton variant="ghost" size="xs" icon="chevron-right" @click="changeMonth(1)" />
		</header>
		<div class="lx-calendar__grid">
			<div v-for="day in weekDays" :key="day" class="lx-calendar__weekday">
				{{ day }}
			</div>
			<button
				v-for="cell in dayCells"
				:key="cell.key"
				type="button"
				class="lx-calendar__day"
				:class="{ 'is-today': cell.isToday, 'is-selected': cell.isSelected, 'is-outside': cell.isOutside }"
				:disabled="cell.disabled"
				@click="selectDate(cell.date)"
			>
				{{ cell.date.getDate() }}
			</button>
		</div>
	</section>
</template>

<script setup lang='ts'>
	import { computed, ref, watch } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { LxButton } from '../button';
	import type { ILxCalendarProps } from './types';

	interface IDayCell {
		key: string,
		date: Date,
		isToday: boolean,
		isSelected: boolean,
		isOutside: boolean,
		disabled: boolean,
	}

	const props = withDefaults(defineProps<ILxCalendarProps>(), {
		modelValue: null,
		min: null,
		max: null,
		startOfWeek: 1,
	});

	const model = defineModel<Date | null>({
		default: null,
	});
	const vClickOutside = vClickOutsideDirective;

	const today = new Date();
	const currentMonth = ref(model.value ? new Date(model.value) : new Date());
	const showMonthPicker = ref(false);
	const showYearPicker = ref(false);
	watch(model, value => {
		if (value) {
			currentMonth.value = new Date(value);
		}
	});

	const monthNames = computed(() => Array.from({ length: 12 }, (unused, monthIndex) => {
		void unused;
		return new Date(2026, monthIndex, 1).toLocaleDateString('en-GB', { month: 'long' });
	}));
	const currentMonthIndex = computed(() => currentMonth.value.getMonth());
	const currentYear = computed(() => currentMonth.value.getFullYear());
	const monthName = computed(() => monthNames.value[currentMonthIndex.value] as string);
	const yearOptions = computed(() => {
		const year = currentYear.value;
		return Array.from({ length: 31 }, (unused, index) => {
			void unused;
			return year - 15 + index;
		});
	});

	const weekDays = computed(() => {
		const base = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return [...base.slice(props.startOfWeek), ...base.slice(0, props.startOfWeek)];
	});

	const startOfMonthGrid = computed(() => {
		const first = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), 1);
		const offset = (first.getDay() - props.startOfWeek + 7) % 7;
		first.setDate(first.getDate() - offset);
		return first;
	});

	const sameDate = (a: Date | null, b: Date): boolean => Boolean(a) && a!.toDateString() === b.toDateString();

	const dayCells = computed<IDayCell[]>(() => {
		return Array.from({ length: 42 }, (unused, index) => {
			void unused;
			const date = new Date(startOfMonthGrid.value);
			date.setDate(date.getDate() + index);
			const isOutside = date.getMonth() !== currentMonth.value.getMonth();
			const disabled = (props.min && date < props.min) || (props.max && date > props.max) || false;
			return {
				key: `${date.toISOString()}-${index}`,
				date,
				isToday: sameDate(today, date),
				isSelected: sameDate(model.value, date),
				isOutside,
				disabled,
			};
		});
	});

	const changeMonth = (diff: number): void => {
		const next = new Date(currentMonth.value);
		next.setMonth(next.getMonth() + diff);
		currentMonth.value = next;
	};

	const selectDate = (date: Date): void => {
		model.value = new Date(date);
	};

	const closePickers = (): void => {
		showMonthPicker.value = false;
		showYearPicker.value = false;
	};

	const toggleMonthPicker = (): void => {
		showMonthPicker.value = !showMonthPicker.value;
		showYearPicker.value = false;
	};

	const toggleYearPicker = (): void => {
		showYearPicker.value = !showYearPicker.value;
		showMonthPicker.value = false;
	};

	const onMonthChange = (event: Event): void => {
		const target = event.target as HTMLSelectElement;
		const nextMonth = Number(target.value);
		const next = new Date(currentMonth.value);
		next.setMonth(nextMonth);
		currentMonth.value = next;
		showMonthPicker.value = false;
	};

	const onYearChange = (event: Event): void => {
		const target = event.target as HTMLSelectElement;
		const nextYear = Number(target.value);
		const next = new Date(currentMonth.value);
		next.setFullYear(nextYear);
		currentMonth.value = next;
		showYearPicker.value = false;
	};
</script>

<style scoped lang='scss'>
	.lx-calendar {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-md);
	}

	.lx-calendar__header {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.lx-calendar__period-picker {
		display: inline-flex;
		gap: var(--lx-size-space-2xs);
		position: relative;
	}

	.lx-calendar__period-button {
		background: transparent;
		border: var(--lx-size-border-width-hairline) solid transparent;
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		font-weight: var(--lx-font-weight-semibold);
		padding: var(--lx-size-space-2xs) var(--lx-size-space-xs);
	}

	.lx-calendar__period-button:hover {
		background: var(--lx-colour-surface-sunken);
		border-color: var(--lx-colour-surface-border);
	}

	.lx-calendar__picker-popover {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		box-shadow: 0 10px 20px rgb(0 0 0 / 0.16);
		display: grid;
		gap: var(--lx-size-space-xs);
		left: 0;
		padding: var(--lx-size-space-xs);
		position: absolute;
		top: calc(100% + var(--lx-size-space-xs));
		z-index: 5;
	}

	.lx-calendar__picker-popover select {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		font: inherit;
		min-width: 10rem;
		padding: var(--lx-size-space-xs);
	}

	.lx-calendar__grid {
		display: grid;
		gap: var(--lx-size-space-2xs);
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.lx-calendar__weekday {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		text-align: center;
	}

	.lx-calendar__day {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		height: 2rem;
	}

	.lx-calendar__day.is-outside {
		opacity: 0.55;
	}

	.lx-calendar__day.is-selected {
		background: color-mix(in srgb, var(--lx-colour-primary) 22%, transparent);
		border-color: var(--lx-colour-primary);
	}

	.lx-calendar__day.is-today {
		outline: var(--lx-size-border-width-thick) solid color-mix(in srgb, var(--lx-colour-accent) 50%, transparent);
	}
</style>
