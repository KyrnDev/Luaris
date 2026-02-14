<template>
	<li class="lx-breadcrumb">
		<slot />
	</li>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
	.lx-breadcrumb {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-sm);
	}
</style>
