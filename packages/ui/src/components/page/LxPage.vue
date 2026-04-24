<template>
	<div class="lx-page">
		<div v-if="$slots.banner" role="banner" class="lx-page__banner">
			<slot name="banner" />
		</div>

		<header v-if="$slots.header" class="lx-page__header">
			<slot name="header" />
		</header>

		<header v-if="$slots['sub-header']" class="lx-page__sub-header">
			<slot name="sub-header" />
		</header>

		<div class="lx-page__content">
			<nav v-if="$slots['navigation-header'] || $slots.navigation || $slots['navigation-footer']" class="lx-page__content__navigation" role="navigation" aria-label="Page navigation">
				<header v-if="$slots['navigation-header']" class="lx-page__content__navigation-header">
					<slot name="navigation-header" />
				</header>

				<div v-if="$slots.navigation" class="lx-page__content__navigation-content">
					<slot name="navigation" />
				</div>

				<footer v-if="$slots['navigation-footer']" class="lx-page__content__navigation-footer">
					<slot name="navigation-footer" />
				</footer>
			</nav>

			<main v-if="$slots['main-header'] || $slots.default || $slots['main-footer']" class="lx-page__content__main" role="main">
				<header v-if="$slots['main-header']" class="lx-page__content__main-header">
					<slot name="main-header" />
				</header>

				<div v-if="$slots.default" class="lx-page__content__main-content">
					<slot />
				</div>

				<footer v-if="$slots['main-footer']" class="lx-page__content__main-footer">
					<slot name="main-footer" />
				</footer>
			</main>

			<aside v-if="$slots.aside" class="lx-page__content__aside">
				<slot name="aside" />
			</aside>

			<footer v-if="$slots.footer" class="lx-page__content__footer">
				<slot name="footer" />
			</footer>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TLxPageProps } from './types';
	import { computed } from 'vue';

	const props = defineProps<TLxPageProps>();
	const heightValue = computed(() => props.noFill ? 'auto' : '100vh');
	const getGap = computed(() => props.gap);
	const getAsideWidth = computed(() => props.asideWidth || '250px');
</script>

<style lang="scss" scoped>
	.lx-page {
		display: grid;
		height: v-bind(heightValue);
		width: 100%;
		gap: v-bind(getGap);
		grid-template-areas: "banner" "header" "sub-header" "content";
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto 1fr;

		&__banner {
			grid-area: banner;
		}

		&__header {
			grid-area: header;
		}

		&__sub-header {
			grid-area: sub-header;
		}

		&__content {
			grid-area: content;
			display: grid;
			gap: v-bind(getGap);
			grid-template-areas: "navigation main aside" "footer footer footer";
			grid-template-columns: auto 1fr auto;
			grid-template-rows: 1fr auto;

			&__navigation {
				grid-area: navigation;
				display: grid;
				gap: v-bind(getGap);
				grid-template-columns: 1fr;
				grid-template-rows: auto 1fr auto;
				grid-template-areas: "navigation-header" "navigation" "navigation-footer";
				min-width: v-bind(getAsideWidth);
				max-width: v-bind(getAsideWidth);

				&-header {
					grid-area: navigation-header;
				}

				&-content {
					grid-area: navigation;
				}

				&-footer {
					grid-area: navigation-footer;
				}
			}

			&__main {
				grid-area: main;
				display: grid;
				gap: v-bind(getGap);
				grid-template-columns: 1fr;
				grid-template-rows: auto 1fr auto;
				grid-template-areas: "main-header" "main-content" "main-footer";

				&-header {
					grid-area: main-header;
				}

				&-content {
					grid-area: main-content;
				}

				&-footer {
					grid-area: main-footer;
				}
			}

			&__aside {
				grid-area: aside;
				min-width: v-bind(getAsideWidth);
				max-width: v-bind(getAsideWidth);
			}

			&__footer {
				grid-area: footer;
			}
		}
	}
</style>
