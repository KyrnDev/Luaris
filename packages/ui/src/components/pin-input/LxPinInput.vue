<template>
	<div class="lx-pin-input">
		<input
			v-for="(_, index) in lengthArray"
			:key="index"
			ref="inputs"
			class="lx-pin-input__cell"
			:type="props.mask ? 'password' : 'text'"
			inputmode="numeric"
			maxlength="1"
			:disabled="props.disabled"
			:value="values[index]"
			@input="onInput(index, $event)"
			@keydown.backspace="onBackspace(index)"
		/>
	</div>
</template>

<script setup lang='ts'>
	import { computed, nextTick, ref, watch } from 'vue';
	import type { ILxPinInputProps } from './types';

	const props = withDefaults(defineProps<ILxPinInputProps>(), {
		length: 4,
		disabled: false,
		mask: false,
		numericOnly: true,
	});

	const model = defineModel<string>({
		default: '',
	});

	const inputs = ref<HTMLInputElement[]>([]);
	const values = ref<string[]>(Array.from({ length: props.length }, (unused, index) => {
		void unused;
		return model.value[index] || '';
	}));

	watch(model, value => {
		values.value = Array.from({ length: props.length }, (unused, index) => {
			void unused;
			return value[index] || '';
		});
	});

	const lengthArray = computed(() => Array.from({ length: props.length }));

	const updateModel = (): void => {
		model.value = values.value.join('');
	};

	const onInput = async (index: number, event: Event): Promise<void> => {
		const target = event.target as HTMLInputElement;
		let nextValue = target.value.slice(-1);
		if (props.numericOnly && nextValue && !/^\d$/.test(nextValue)) {
			nextValue = '';
		}
		values.value[index] = nextValue;
		updateModel();
		if (nextValue && index < props.length - 1) {
			await nextTick();
			inputs.value[index + 1]?.focus();
		}
	};

	const onBackspace = async (index: number): Promise<void> => {
		const currentValue = values.value[index] || '';
		if (currentValue.length === 0 && index > 0) {
			await nextTick();
			inputs.value[index - 1]?.focus();
		}
	};
</script>

<style scoped lang='scss'>
	.lx-pin-input {
		display: inline-flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-pin-input__cell {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		font: inherit;
		height: 2.5rem;
		text-align: center;
		width: 2.5rem;
	}
</style>
