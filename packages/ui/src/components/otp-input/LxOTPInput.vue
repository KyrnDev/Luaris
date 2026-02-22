<template>
	<LxPinInput
		v-model="model"
		:length="props.length"
		:disabled="props.disabled"
		:mask="props.mask"
		:numeric-only="props.numericOnly"
	/>
</template>

<script setup lang='ts'>
	import { LxPinInput } from '../pin-input';
	import type { ILxOTPInputProps } from './types';

	const props = withDefaults(defineProps<ILxOTPInputProps>(), {
		length: 6,
		disabled: false,
		mask: false,
		numericOnly: true,
		autoComplete: 'one-time-code',
	});

	const model = defineModel<string>({
		default: '',
	});
</script>
