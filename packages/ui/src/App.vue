<template>
	<LxPage class="lx-app-page">
		<template #header>
			<header class="lx-app-header">
				<div>
					<h1 class="lx-font-family-secondary">
						Luaris UI Dashboard Preview
					</h1>
					<p>A simple page shell showing how themes, layout, and component variants fit together.</p>
				</div>
				<LxThemeSelector />
			</header>
		</template>

		<template #content>
			<section class="lx-app-content-main">
				<LxKitchensink />
			</section>
		</template>

		<template #footer>
			<footer class="lx-app-footer">
				<p>Built with the Luaris framework.</p>
			</footer>
		</template>
	</LxPage>
</template>

<script setup lang="ts">
	import { LxKitchensink } from './components/kitchensink';
	import { LxPage } from './components/page';
	import { LxThemeSelector } from './components/theme-selector';
</script>

<style lang="scss">
	.lx-app-page {
		background: var(--lx-colour-surface-base);
	}

	.lx-app-header {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-lg);
		justify-content: space-between;
		padding: var(--lx-size-space-lg) var(--lx-size-space-xl);
	}

	.lx-app-header h1 {
		font-size: var(--lx-font-size-xl);
		margin-bottom: var(--lx-size-space-sm);
	}

	.lx-app-header p,
	.lx-app-content-header p,
	.lx-app-footer p {
		color: var(--lx-colour-surface-text-muted);
	}

	.lx-app-subheader {
		display: flex;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-md) var(--lx-size-space-xl);
	}

	.lx-app-content-header {
		padding: var(--lx-size-space-lg) var(--lx-size-space-xl);
	}

	.lx-app-content-header h2 {
		font-size: var(--lx-font-size-lg);
		margin-bottom: var(--lx-size-space-sm);
	}

	.lx-app-content-main {
		display: grid;
		gap: var(--lx-size-space-xl);
		overflow: auto;
		padding: var(--lx-size-space-xl);
	}

	.lx-app-hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-md);
	}

	.lx-app-content-footer {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-md);
		justify-content: space-between;
		padding: var(--lx-size-space-md) var(--lx-size-space-xl);
	}

	.lx-app-footer {
		padding: var(--lx-size-space-sm) var(--lx-size-space-xl);
	}
</style>
