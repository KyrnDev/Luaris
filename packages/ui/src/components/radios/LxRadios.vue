<template>
	<fieldset class="lx-radios" :disabled="props.disabled">
		<LxRadio
			v-for="option in props.options"
			:key="String(option.value)"
			v-model="model"
			:name="props.name"
			:value="option.value"
			:label="option.label"
			:disabled="option.disabled || props.disabled"
		/>
	</fieldset>
</template>

<script setup lang='ts'>
	import type { TFormValue } from '../../types/form';
	import { LxRadio } from '../radio';
	import type { ILxRadiosProps } from './types';

	const props = withDefaults(defineProps<ILxRadiosProps>(), {
		name: '',
		options: () => [],
		disabled: false,
	});

	const model = defineModel<TFormValue>();
</script>

<style scoped lang='scss'>
	.lx-radios {
		border: none;
		display: grid;
		gap: var(--lx-size-space-xs);
		margin: 0;
		padding: 0;
	}
</style>
