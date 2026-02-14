<template>
	<div class="lx-number-input">
		<div class="lx-number-input__field">
			<button
				v-if="props.showControls"
				type="button"
				:disabled="props.disabled"
				aria-label="Decrease value"
				@click="nudge(-1)"
			>
				-
			</button>
			<input
				v-bind="attrs"
				:id="inputId"
				v-model.number="value"
				:name="inputName"
				type="number"
				:min="props.min"
				:max="props.max"
				:step="props.step"
				:disabled="props.disabled"
				:placeholder="props.placeholder"
				:aria-label="inputAriaLabel"
			>
			<button
				v-if="props.showControls"
				type="button"
				:disabled="props.disabled"
				aria-label="Increase value"
				@click="nudge(1)"
			>
				+
			</button>
		</div>
	</div>
</template>

<script setup lang='ts'>
	import type { ILxNumberInputProps } from './types';
	import { computed, useAttrs, useId, watch } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxNumberInputProps>(), {
		min: Number.MIN_SAFE_INTEGER,
		max: Number.MAX_SAFE_INTEGER,
		step: 1,
		disabled: false,
		showControls: true,
		placeholder: '',
	});

	const emit = defineEmits<{
		(event: 'change', value: number): void,
	}>();

	const value = defineModel<number>({
		default: 0,
	});
	const attrs = useAttrs();
	const generatedId = `lx-number-input-${useId().replace(/:/g, '')}`;
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
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Number input';
	});

	const clamp = (next: number): number => Math.min(Math.max(next, props.min), props.max);

	const nudge = (direction: 1 | -1): void => {
		value.value = clamp(value.value + (props.step * direction));
		emit('change', value.value);
	};

	watch(value, next => {
		value.value = clamp(next);
		emit('change', value.value);
	});
</script>

<style scoped lang='scss'>
	.lx-number-input {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-number-input__field {
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: flex;
		overflow: hidden;
	}

	.lx-number-input input {
		appearance: textfield;
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-text);
		flex: 1;
		font: inherit;
		outline: none;
		padding: var(--lx-size-space-sm);
	}

	.lx-number-input button {
		appearance: none;
		background: var(--lx-colour-surface-base);
		border: none;
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font-size: var(--lx-font-size-md);
		height: 100%;
		padding: 0 var(--lx-size-space-sm);
	}
</style>
