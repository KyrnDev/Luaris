<template>
	<div class="lx-card">
		<div class="lx-card__header">
			<slot name="header" />
		</div>

		<div class="lx-card__content">
			<slot />
		</div>

		<div class="lx-card__footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TLxCardProps } from './types';

	defineProps<TLxCardProps>();
</script>
