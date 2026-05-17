<template>
	<LxPage>
		<template #header>
			<h1>Luaris Components</h1>
		</template>

		<template #default>
			<LxAccordion>
				<LxAccordionItem title="Section 1" icon="fa-regular fa-star">
					<template #header>
						<p>I am extra content, I can be added as extra, or replace it.</p>
					</template>
					<p>Ad cupidatat mollit labore consequat consequat nostrud. Id consequat ullamco consequat aliqua culpa. Commodo laborum eu proident magna magna fugiat reprehenderit nostrud commodo aliqua incididunt. Irure amet Lorem anim cupidatat laboris enim veniam deserunt est ut exercitation Lorem tempor. Ea voluptate eu duis sunt duis ex id sit anim deserunt. Irure deserunt aliquip laborum consequat dolor adipisicing incididunt nulla elit qui deserunt.</p>
				</LxAccordionItem>
				<LxAccordionItem title="Section 2" icon="fa-regular fa-fire">
					<p>Content for section 2</p>
				</LxAccordionItem>
				<LxAccordionItem title="Section 3" icon="fa-regular fa-water">
					<p>Content for section 3</p>
				</LxAccordionItem>
			</LxAccordion>
		</template>

		<template #footer>
			<p>Footer</p>
		</template>
	</LxPage>
</template>

<script setup lang="ts">
	import LxPage from './components/page/LxPage.vue';
	import LxAccordion from './components/accordion/LxAccordion.vue';
	import LxAccordionItem from './components/accordion/LxAccordionItem.vue';
</script>
