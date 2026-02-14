<template>
	<div class="lx-page">
		<div v-if="hasHeader" class="lx-page__header">
			<slot name="header" />
		</div>

		<div v-if="hasSubheader" class="lx-page__subheader">
			<slot name="subheader" />
		</div>

		<div v-if="hasNavigation" class="lx-page__navigation">
			<slot name="navigation" />
		</div>

		<div class="lx-page__content">
			<div v-if="hasContentHeader" class="lx-page__content-header">
				<slot name="content-header" />
			</div>

			<div v-if="hasContent" class="lx-page__content-main">
				<slot name="content" />
				<slot />
			</div>

			<div v-if="hasContentFooter" class="lx-page__content-footer">
				<slot name="content-footer" />
			</div>
		</div>

		<div v-if="hasAside" class="lx-page__aside">
			<slot name="aside" />
		</div>

		<div v-if="hasFooter" class="lx-page__footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import usePage from './usePage';

	const {
		hasAside,
		hasFooter,
		hasHeader,
		hasContent,
		getRootRows,
		hasSubheader,
		hasNavigation,
		getRootColumns,
		getContentRows,
		hasContentHeader,
		hasContentFooter,
		getRootTemplateAreas,
		getContentTemplateAreas,
	} = usePage();
</script>

<style lang="scss" scoped>
	.lx-page {
		min-height: 100dvh;
		width: 100%;
		background-color: var(--lx-colour-surface-base);
		display: grid;
		grid-template-areas: v-bind(getRootTemplateAreas);
		grid-template-rows: v-bind(getRootRows);
		grid-template-columns: v-bind(getRootColumns);
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-sm);

		&__header,
		&__subheader,
		&__navigation,
		&__content-header,
		&__content-main,
		&__content-footer,
		&__aside,
		&__footer {
			background: var(--lx-colour-surface-raised);
			border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
			border-radius: var(--lx-size-radius-md);
			overflow: hidden;
		}

		&__header {
			grid-area: header;
		}

		&__subheader {
			grid-area: subheader;
		}

		&__navigation {
			grid-area: navigation;
		}

		&__content {
			grid-area: content;
			display: grid;
			grid-template-areas: v-bind(getContentTemplateAreas);
			grid-template-rows: v-bind(getContentRows);
			grid-template-columns: 100%;
			gap: var(--lx-size-space-sm);
			min-width: 0;
			min-height: 0;

			&-header {
				grid-area: content-header;
			}

			&-main {
				grid-area: content;
				height: 100%;
				min-height: 0;
				min-width: 0;
			}

			&-footer {
				grid-area: content-footer;
			}
		}

		&__aside {
			grid-area: aside;
		}

		&__footer {
			grid-area: footer;
		}
	}
</style>
