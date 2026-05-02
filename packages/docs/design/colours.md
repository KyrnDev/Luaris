<script setup lang="ts">
	import LxFlex from '../../ui/src/components/flex/LxFlex.vue';

	const modifiers = ['on', 'hover', 'disabled'];
	const colours = ['Primary', 'Secondary', 'Accent', 'Info', 'Success', 'Warning', 'Danger', 'White', 'Black', 'Transparent'].map(name => ({ name }));
	const surfaces = ['Base', 'Raised', 'Sunken', 'Overlay', 'Border', 'Inverse'].map(name => ({ name }));
</script>

<style scoped>
	.colour-box {
		text-align: center;
		height: 50px;
		min-width: 150px;
	}

	.colour-box button, .colour-box div {
		line-height: 1.1;
		width: 100%;
		height: 100%;
		display: flex;
		margin: 0;
		border-radius: 5px;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color);
	}

	.colour-box button:hover {
		background-color: var(--hover-color);
	}

	.colour-box button:disabled {
		background-color: var(--disabled-color);
		cursor: not-allowed;
	}
</style>

# Colours

The Luaris Framework's design system includes a comprehensive colour palette that provides a wide range of options for creating visually appealing and accessible user interfaces. The colour palette is organized into several categories, including primary, secondary, neutral, and accent colours.

[[toc]]

## Palette

The primary colour palette consists of a range of core colours that are used to create a cohesive and consistent look across all components and applications built with the Luaris Framework. These colours are designed to work well together and can be used for a variety of purposes, including backgrounds, text, and accents.

> [!INFO]
> The below shows you the palette of colours available, alongside their "on" (text) colour, hover state, and disabled state.

<LxFlex wrap gap="1rem">
	<div
		v-for="colour in colours"
		:key="colour.name"
		class="colour-box"
		:style="{
			'--background-color': `var(--lx-colour-${colour.name.toLowerCase()})`,
			'--hover-color': `var(--lx-colour-hover-${colour.name.toLowerCase()})`,
		}"
	>
		<button
			:style="{
				color: `var(--lx-colour-on-${colour.name.toLowerCase()})`,
			}"
		>
			{{ colour.name }}
		</button>
	</div>
</LxFlex>

### Disabled State

<LxFlex wrap gap="1rem" class="lx-margin-top--lg">
	<div
		v-for="colour in colours"
		:key="colour.name"
		class="colour-box"
		:style="{
			'--background-color': `var(--lx-colour-${colour.name.toLowerCase()})`,
			'--hover-color': `var(--lx-colour-hover-${colour.name.toLowerCase()})`,
			'--disabled-color': `var(--lx-colour-disabled-${colour.name.toLowerCase()})`,
		}"
	>
		<button
			disabled
			:style="{
				color: `var(--lx-colour-on-${colour.name.toLowerCase()})`,
			}"
		>
			{{ colour.name }}
		</button>
	</div>
</LxFlex>

## Surface Colours

The Luaris Framework also includes a range of surface colours that can be used for backgrounds, cards, and other UI elements. These colours are designed to provide a neutral backdrop for content and can be used in combination with the primary colour palette to create visually appealing designs.

<LxFlex wrap gap="1rem" class="lx-margin-top--lg">
	<div
		v-for="surface in surfaces"
		:key="surface.name"
		class="colour-box"
		:style="{
			'--background-color': `var(--lx-colour-surface-${surface.name.toLowerCase()})`,
		}"
	>
		<div
			:style="{
				color: surface.name === 'Inverse'
					? 'var(--lx-colour-black)'
					: '',
			}"
		>
			{{ surface.name }}
		</div>
	</div>
</LxFlex>
