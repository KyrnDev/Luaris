<template>
	<LxFlex gap="0px" role="group" aria-label="Theme switcher">
		<LxButton icon="sun" group="start" aria-label="Use light theme" :active="theme === 'light'" @click="setTheme('light')" />
		<LxButton icon="moon" group="middle" aria-label="Use dark theme" :active="theme === 'dark'" @click="setTheme('dark')" />
		<LxButton icon="circle-half-stroke" group="end" aria-label="Use automatic theme" :active="theme === 'auto'" @click="setTheme('auto')" />
	</LxFlex>
</template>

<script setup lang="ts">
	import LxButton from '../button/LxButton.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import { ref } from 'vue';

	const htmlElement = document.documentElement;
	const themeRaw = htmlElement.getAttribute('data-theme') || 'light';
	const theme = ref(themeRaw);

	const setTheme = (newTheme: string) => {
		theme.value = newTheme;
		htmlElement.setAttribute('data-theme', newTheme);
	};
</script>
