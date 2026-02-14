<template>
	<div class="lx-flex">
		<slot />
	</div>
</template>

<script setup lang="ts">
	import type { TLayoutsLength } from '../../types/units';

	withDefaults(defineProps<{
		gap?: TLayoutsLength,
	}>(), {
		gap: '1rem',
	});
</script>

<style lang="scss" scoped>
	.lx-flex {
		display: flex;
		gap: v-bind(gap);
	}
</style>
