<template>
	<div class="lx-timeline-item">
		<slot />
	</div>
</template>

<script setup lang='ts'>
	import type { ILxTimelineItemProps } from './types';

	withDefaults(defineProps<ILxTimelineItemProps>(), {
		id: '',
		marker: '',
		markerNote: '',
		title: '',
		subtitle: '',
		type: 'custom',
	});
</script>
