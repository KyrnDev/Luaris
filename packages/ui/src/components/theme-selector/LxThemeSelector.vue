<template>
	<section class="lx-theme-selector" aria-label="Theme selector">
		<p class="lx-theme-selector__label">
			Theme
		</p>

		<div class="lx-theme-selector__options" role="radiogroup" aria-label="Themes">
			<LxButton
				v-for="theme in themes"
				:key="theme.value"
				class="lx-theme-selector__option"
				type="button"
				:variant="theme.value === selectedTheme ? 'primary' : 'plain'"
				size="sm"
				role="radio"
				:aria-checked="theme.value === selectedTheme"
				:class="{
					'is-active': theme.value === selectedTheme,
				}"
				@click="setTheme(theme.value)"
			>
				{{ theme.label }}
			</LxButton>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { ILxThemeSelectorProps, TLxTheme } from './types';
	import { onMounted } from 'vue';
	import { useTheme } from '../../composables/useTheme';
	import { LxButton } from '../button';

	const props = withDefaults(defineProps<ILxThemeSelectorProps>(), {
		themes: () => [
			{
				value: 'light',
				label: 'Light',
			},
			{
				value: 'dark',
				label: 'Dark',
			},
			{
				value: 'high-contrast',
				label: 'High Contrast',
			},
		],
	});

	const emit = defineEmits<{
		(event: 'update:theme', theme: TLxTheme): void,
		(event: 'change', theme: TLxTheme): void,
	}>();

	const {
		theme: selectedTheme,
		resolveInitialTheme,
		setTheme: setThemeState,
	} = useTheme();

	const setTheme = (nextTheme: TLxTheme): void => {
		setThemeState(nextTheme);
		emit('update:theme', nextTheme);
		emit('change', nextTheme);
	};

	onMounted(() => {
		setTheme(resolveInitialTheme());
	});

	const { themes } = props;
</script>

<style scoped lang="scss">
	.lx-theme-selector {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-md);
	}

	.lx-theme-selector__label {
		align-items: center;
		color: var(--lx-colour-surface-text-muted);
		display: inline-flex;
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-medium);
		letter-spacing: 0.02em;
		line-height: var(--lx-font-line-height-tight);
		padding-block: var(--lx-size-space-2xs);
	}

	.lx-theme-selector__options {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-pill);
		display: inline-flex;
		gap: var(--lx-size-space-2xs);
		padding: var(--lx-size-space-2xs);
	}

	.lx-theme-selector__option {
		background: transparent;
		border: none;
		border-radius: var(--lx-size-radius-pill);
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
		height: var(--lx-size-control-height-sm);
		line-height: 1;
		padding: 0 var(--lx-size-space-md);
		transition:
			color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
			background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
	}

	.lx-theme-selector__option:hover {
		background: var(--lx-colour-surface-sunken);
		color: var(--lx-colour-surface-text);
	}

	.lx-theme-selector__option:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 1px;
	}

	.lx-theme-selector__option.is-active {
		background: var(--lx-colour-primary);
		color: var(--lx-colour-surface-inverse);
	}
</style>
