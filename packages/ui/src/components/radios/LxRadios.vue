<template>
	<fieldset class="lx-radios" :class="radiosClasses" :style="radiosStyles" :disabled="props.disabled">
		<template v-if="isCardLayout">
			<div v-for="(option, index) in props.options" :key="String(option.value)" class="lx-radios__item">
				<input
					:id="getOptionId(index)"
					v-model="model"
					type="radio"
					class="lx-radios__input"
					:name="groupName"
					:value="option.value"
					:disabled="option.disabled || props.disabled"
				>
				<label
					class="lx-radios__card"
					:for="getOptionId(index)"
					:class="{ 'is-disabled': option.disabled || props.disabled }"
				>
					<slot
						name="option"
						:option="option"
						:index="index"
						:checked="model === option.value"
					>
						{{ option.label }}
					</slot>
				</label>
			</div>
		</template>
		<template v-else>
			<LxRadio
				v-for="(option, index) in props.options"
				:id="getOptionId(index)"
				:key="String(option.value)"
				v-model="model"
				:name="groupName"
				:value="option.value"
				:label="option.label"
				:disabled="option.disabled || props.disabled"
			/>
		</template>
	</fieldset>
</template>

<script setup lang='ts'>
	import { computed, useId, useSlots } from 'vue';
	import type { TFormValue } from '../../types/form';
	import { LxRadio } from '../radio';
	import type { ILxRadiosProps } from './types';

	const props = withDefaults(defineProps<ILxRadiosProps>(), {
		name: '',
		options: () => [],
		disabled: false,
		layout: 'stack',
		card: false,
		space: 'var(--lx-size-space-md)',
	});
	const slots = useSlots();
	const generatedGroupName = `lx-radios-${useId().replace(/:/g, '')}`;
	const groupName = computed(() => props.name || generatedGroupName);
	const getOptionId = (index: number): string => `${groupName.value}-${index}`;
	const isCardLayout = computed(() => props.card || Boolean(slots.option));
	const radiosClasses = computed(() => ({
		[`lx-radios--${props.layout}`]: true,
		'lx-radios--cards': isCardLayout.value,
	}));
	const radiosStyles = computed(() => ({
		'--lx-radios-space': props.space,
	}));

	const model = defineModel<TFormValue>();
</script>

<style scoped lang='scss'>
	.lx-radios {
		border: none;
		display: grid;
		gap: var(--lx-size-space-md);
		margin: 0;
		padding: 0;
	}

	.lx-radios--inline {
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
	}

	.lx-radios__item {
		min-width: 0;
		position: relative;
	}

	.lx-radios--cards .lx-radios__item {
		flex: 1 1 14rem;
	}

	.lx-radios--cards {
		gap: var(--lx-radios-space);
	}

	.lx-radios__input {
		opacity: 0;
		position: absolute;
	}

	.lx-radios__card {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		cursor: pointer;
		display: block;
		gap: var(--lx-radios-space);
		grid-template-columns: auto 1fr;
		min-height: var(--lx-size-control-height-lg);
		padding: var(--lx-radios-space);
		transition:
			border-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			outline-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-radios__card-dot {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-pill);
		display: inline-block;
		height: 1rem;
		width: 1rem;
	}

	.lx-radios__card-content {
		min-width: 0;
	}

	.lx-radios__input:checked + .lx-radios__card {
		border-color: var(--lx-colour-primary);
		outline: 2px solid var(--lx-colour-primary);
		outline-offset: 2px;
	}

	.lx-radios__input:checked + .lx-radios__card .lx-radios__card-dot {
		background: radial-gradient(circle, var(--lx-colour-primary) 45%, transparent 46%);
		border-color: var(--lx-colour-primary);
	}

	.lx-radios__input:focus-visible + .lx-radios__card {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-radios__card.is-disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
