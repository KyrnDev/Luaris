<template>
	<p>@luaris/integration - App.vue</p>
	<LxButton>Click me</LxButton>
	<LxInput placeholder="Type something..." />
	<LxBreadcrumb />
	<LxBreadcrumbs />
</template>

<script setup lang="ts">
	import { LxButton, LxBreadcrumb, LxBreadcrumbs } from '@luaris/ui';
	import { LxInput } from '@luaris/ui/components/input';
</script>
