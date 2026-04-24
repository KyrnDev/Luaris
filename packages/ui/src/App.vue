<template>
	<LxPage>
		<template #header>
			<p>Header</p>
			<LxIcon name="coffee" size="md" />
			<LxButton label="Save" variant="success" size="md">
				<template #icon>
					<LxIcon name="save" size="xl" />
				</template>
			</LxButton>
		</template>

		<template #default>
			<p>Main content</p>
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
</script>
