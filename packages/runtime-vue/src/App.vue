<template>
	<LxRuntime :schema="schema" />
</template>

<script setup lang="ts">
	import schema from './data/accordion.json' with { type: 'json' };
	import LxRuntime from './components/LxRuntime.vue';
</script>
