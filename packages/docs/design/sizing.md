<script setup lang="ts">
	import LxFlex from '../../ui/src/components/flex/LxFlex.vue';

	const sizes = {
		space: [
			{ name: '2xs', value: '0.25rem' },
			{ name: 'xs', value: '0.5rem' },
			{ name: 'sm', value: '1rem' },
			{ name: 'md', value: '1.5rem' },
			{ name: 'lg', value: '2rem' },
			{ name: 'xl', value: '3rem' },
			{ name: '2xl', value: '4rem' },
			{ name: '3xl', value: '5rem' },
		],
		radius: [
			{ name: 'none', value: '0rem' },
			{ name: 'sm', value: '0.125rem' },
			{ name: 'md', value: '0.25rem' },
			{ name: 'lg', value: '0.5rem' },
			{ name: 'pill', value: '9999px' },
			{ name: 'full', value: '100%' },
		],
		width: [
			{ name: 'none', value: '0rem' },
			{ name: 'thin', value: '1px' },
			{ name: 'thick', value: '2px' },
		],
	};
</script>

# Sizing

The design system includes a set of sizing options and options, these include a range of sizes from 2xs to 3xl, additionally we have border radius and width options.

## Space Sizes

The space sizes are used for padding, margin, and gap properties across all components, these include the following sizes:

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="space in sizes.space" :key="space.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ space.name }} ({{ space.value }})</p>
		<div style="height: 1rem; flex: 2; background-color: var(--lx-colour-surface-sunken);">
			<div :style="{ height: '1rem', width: space.value, backgroundColor: 'var(--lx-colour-primary)' }" />
		</div>
	</LxFlex>
</LxFlex>

## Border Radius Sizes

The border radius sizes are used for rounded corners on components, these include the following sizes:

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="radius in sizes.radius" :key="radius.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ radius.name }} ({{ radius.value }})</p>
		<div :style="{ height: '2rem', width: '2rem', backgroundColor: 'var(--lx-colour-primary)', borderRadius: radius.value }" />
		<div :style="{ height: '2rem', width: '5rem', backgroundColor: 'var(--lx-colour-primary)', borderRadius: radius.value }" />
		<div :style="{ height: '2rem', width: '10rem', backgroundColor: 'var(--lx-colour-primary)', borderRadius: radius.value }" />
	</LxFlex>
</LxFlex>


## Border Width Sizes

The border width sizes are used for borders on components, these include the following sizes:

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="width in sizes.width" :key="width.name" align="center" class="lx-width--full">
		<p :style="{ flex: 1, margin: 0, border: `${width.value} solid var(--lx-colour-primary)`, padding: '0.5rem' }">{{ width.name }} ({{ width.value }})</p>
	</LxFlex>
</LxFlex>
