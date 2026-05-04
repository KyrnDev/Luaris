<template>
	<LxPage>
		<template #header>
			<h1>Luaris Components</h1>
		</template>

		<template #default>
			<section class="components">
				<article class="component">
					<header>
						<h2>Buttons</h2>
					</header>

					<LxIcon name="coffee" size="md" />
					<LxButton label="Save" variant="success" size="md">
						<template #icon>
							<LxIcon name="save" size="xl" />
						</template>
					</LxButton>

					<LxFlex class="lx-padding-top--3xl lx-padding-x--3xl">
						<LxThemeSwitcher />
					</LxFlex>

					<LxFlex class="lx-padding-y--3xl" gap="md">
						<LxButton label="Left" variant="primary" size="md" group="start" />
						<LxButton label="Middle" variant="primary" size="md" group="middle" />
						<LxButton label="Right" variant="primary" size="md" group="end" />
					</LxFlex>
				</article>
			</section>
		</template>

		<template #footer>
			<p>Footer</p>
		</template>
	</LxPage>
</template>

<script setup lang="ts">
	import LxPage from './components/page/LxPage.vue';
	import LxIcon from './components/icon/LxIcon.vue';
	import LxButton from './components/button/LxButton.vue';
	import LxFlex from './components/flex/LxFlex.vue';
	import LxThemeSwitcher from './components/theme-switcher/LxThemeSwitcher.vue';
</script>
