<template>
	<div class="lx-tab">
		<slot />
	</div>
</template>

<script setup lang='ts'>
	import type { ILxTabProps } from './types';

	withDefaults(defineProps<ILxTabProps>(), {
		label: '',
		disabled: false,
	});
</script>
