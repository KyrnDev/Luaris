<template>
	<LxFlex gap="0px">
		<LxButton icon="fa-regular fa-sun" group="left" :active="theme === 'light'" @click="setTheme('light')" />
		<LxButton icon="fa-solid fa-moon" group="middle" :active="theme === 'dark'" @click="setTheme('dark')" />
		<LxButton icon="fa-regular fa-yin-yang" group="right" :active="theme === 'auto'" @click="setTheme('auto')" />
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
