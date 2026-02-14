<template>
	<fieldset class="lx-radios" :disabled="props.disabled">
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
	</fieldset>
</template>

<script setup lang='ts'>
	import { computed, useId } from 'vue';
	import type { TFormValue } from '../../types/form';
	import { LxRadio } from '../radio';
	import type { ILxRadiosProps } from './types';

	const props = withDefaults(defineProps<ILxRadiosProps>(), {
		name: '',
		options: () => [],
		disabled: false,
	});
	const generatedGroupName = `lx-radios-${useId().replace(/:/g, '')}`;
	const groupName = computed(() => props.name || generatedGroupName);
	const getOptionId = (index: number): string => `${groupName.value}-${index}`;

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
