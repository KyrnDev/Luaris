<template>
	<LxPage aside-width="120px" v-bind="$attrs">
		<template v-if="zones.includes('banner')" #banner>
			<p class="lx-border--accent">
				Banner
			</p>
		</template>

		<template v-if="zones.includes('header')" #header>
			<p class="lx-border--accent">
				Header
			</p>
		</template>

		<template v-if="zones.includes('sub-header')" #sub-header>
			<p class="lx-border--accent">
				Sub Header
			</p>
		</template>

		<template v-if="zones.includes('navigation-header')" #navigation-header>
			<p class="lx-border--accent">
				Navigation Header
			</p>
		</template>

		<template v-if="zones.includes('navigation')" #navigation>
			<p class="lx-border--accent">
				Navigation
			</p>
		</template>

		<template v-if="zones.includes('navigation-footer')" #navigation-footer>
			<p class="lx-border--accent">
				Navigation Footer
			</p>
		</template>

		<template v-if="zones.includes('main-header')" #main-header>
			<p class="lx-border--accent">
				Main Header
			</p>
		</template>

		<template v-if="zones.includes('default')" #default>
			<p class="lx-border--accent">
				Main Content
			</p>
		</template>

		<template v-if="zones.includes('main-content')" #main-content>
			<p class="lx-border--accent">
				Main Content
			</p>
		</template>

		<template v-if="zones.includes('main-footer')" #main-footer>
			<p class="lx-border--accent">
				Main Footer
			</p>
		</template>

		<template v-if="zones.includes('aside')" #aside>
			<p class="lx-border--accent">
				Aside
			</p>
		</template>

		<template v-if="zones.includes('footer')" #footer>
			<p class="lx-border--accent">
				Footer
			</p>
		</template>
	</LxPage>
</template>

<script setup lang="ts">
	import LxPage from './LxPage.vue';

	defineOptions({ inheritAttrs: false });

	defineProps<{
		zones: string[],
	}>();
</script>

<style scoped lang="scss">
	p {
		border: 1px dashed;
		line-height: 1;
		margin: 0;
		height: 100%;
		padding: 0.5rem;
	}
</style>
