<script setup lang="ts">
	import LxFlex from '../../ui/src/components/flex/LxFlex.vue';

	const colours = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'danger', 'white', 'black'];
	const shades = ['lighter', 'light', '', 'dark', 'darker'];
	const surfaces = ['base', 'raised', 'sunken', 'overlay', 'border', 'inverse'];

	const getColourVariable = (colour: string, shade: string, prefix?: string) => {
		return `var(--lx-colour-${prefix ?? ''}${colour}${shade ? `--${shade}` : ''})`;
	};

	const copyToClipboard = (colour: string, shade: string, prefix?: string) => {
		const variableName = `--lx-colour-${prefix ?? ''}${colour}${shade ? `--${shade}` : ''}`;
		navigator.clipboard.writeText(`var(${variableName})`).then(() => {
			console.log(`Copied ${variableName} to clipboard`);
		}).catch(err => {
			console.error('Failed to copy: ', err);
		});
	};
</script>

<style scoped lang="scss">
	.palette {
		width: 100%;
	}

	.palette-row {
		width: 100%;
	}

	.palette-column {
		flex: 1;
	}

	.overflow {
		min-width: 30%;
	}

	.palette-column div {
		width: 100%;
		height: 4rem;
		border-radius: 0.25rem;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	}

	.palette-column p, .palette-column strong {
		font-size: 1rem;
		text-align: center;
		width: 100%;
		margin: 0;
		min-height: 2rem;
		font-family: monospace;
	}

	.palette-column div p {
		font-size: 1rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

# Colours

The Luaris Framework's design system includes a comprehensive colour palette that provides a wide range of options for creating visually appealing and accessible user interfaces. The colour palette is organized into several categories, including primary, secondary, neutral, and accent colours.

[[toc]]

> [!NOTE]
> You can click on any colour swatch to copy the corresponding CSS variable to your clipboard for easy use in your projects.

## Palette

The primary colour palette consists of a set of core colours that are used to establish the overall look and feel of the application. These colours are designed to work well together and can be used for various UI elements, such as buttons, links, and backgrounds. Each colour in the palette is available in multiple shades, allowing for flexibility in design while maintaining a cohesive visual identity.

<LxFlex direction="column" align="start" gap="1rem" class="palette lx-margin-top--2xl">
	<LxFlex v-for="colour in colours" :key="colour" gap="1rem" style="width: 100%;" class="palette-row">
		<LxFlex v-for="shade in shades" direction="column" align="start" gap="0.5rem" class="palette-column" @click="copyToClipboard(colour, shade)" :title="getColourVariable(colour, shade)">
			<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, shade) }" />
			<component :is="shade === '' ? 'strong' : 'p'">{{ shade !== '' ? `--${shade.toLowerCase()} ` : `${colour.toLowerCase()}` }}</component>
		</LxFlex>
	</LxFlex>
</LxFlex>

## Surfaces

The surface colour palette includes a range of colours that are used for different surface levels in the application, such as backgrounds, cards, and modals. These colours are designed to provide sufficient contrast and visual hierarchy while maintaining a consistent aesthetic.

<LxFlex wrap direction="row" align="start" gap="1rem" class="palette-row lx-margin-top--2xl">
	<LxFlex v-for="surface in surfaces" :key="surface" direction="column" align="start" gap="0.5rem" class="palette-column overflow" @click="copyToClipboard(surface, '', 'surface-')" :title="getColourVariable(surface, '', 'surface-')">
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(surface, '', 'surface-') }" />
		<p>{{ `${surface.toLowerCase()}` }}</p>
	</LxFlex>
</LxFlex>

## State Colours

State colours relate to the various states of a UI element, such as hover, active, focus, and disabled. These colours are designed to provide clear visual feedback to the users through just colour.

> [!WARNING]
> State colours are only generated for the core colour palette, i.e.: {{ colours.join(', ') }}, and do not include shades or surface colours, this is to ensure that the state colours maintain a consistent relationship with the core colours and provide clear visual feedback across the application. Shades and surface colours are meant to be used for specific design purposes to show differences in depth and hierarchy.

### State: On

The on colour palette consists of colours that are used for content placed upon colours from the core palette, this does **not** include shades or surface colours, this is primarily used for the core colours list, i.e.: {{ colours.join(', ') }}.

<LxFlex wrap direction="row" align="start" gap="1rem" class="palette-row lx-margin-top--2xl">
	<LxFlex v-for="colour in colours" :key="colour" direction="column" align="start" gap="0.5rem" class="palette-column overflow" @click="copyToClipboard(colour, '', 'on-')" :title="getColourVariable(colour, '', 'on-')">
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `on-${colour.toLowerCase()}` }}</p>
		</div>
	</LxFlex>
</LxFlex>

### State: Hover

The hover colour palette includes colours that are used to indicate when a user is hovering over an interactive element and are designed specifically for hover states.

<LxFlex wrap direction="row" align="start" gap="1rem" class="palette-row lx-margin-top--2xl">
	<LxFlex v-for="colour in colours" :key="colour" direction="column" align="start" gap="0.5rem" class="palette-column overflow" @click="copyToClipboard(colour, '', 'hover-')" :title="getColourVariable(colour, '', 'hover-')">
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `${colour.toLowerCase()}` }}</p>
		</div>
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '', 'hover-') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `hover-${colour.toLowerCase()}` }}</p>
		</div>
	</LxFlex>
</LxFlex>

### State: Active

The active colour palette includes colours that are used to indicate when a user is actively interacting with an element, such as clicking or tapping, and are designed specifically for active states.

<LxFlex wrap direction="row" align="start" gap="1rem" class="palette-row lx-margin-top--2xl">
	<LxFlex v-for="colour in colours" :key="colour" direction="column" align="start" gap="0.5rem" class="palette-column overflow" @click="copyToClipboard(colour, '', 'active-')" :title="getColourVariable(colour, '', 'active-')">
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `${colour.toLowerCase()}` }}</p>
		</div>
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '', 'active-') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `active-${colour.toLowerCase()}` }}</p>
		</div>
	</LxFlex>
</LxFlex>

### State: Disabled

The disabled colour palette includes colours that are used to indicate when an element is disabled and not interactive, and are designed specifically for disabled states.

<LxFlex wrap direction="row" align="start" gap="1rem" class="palette-row lx-margin-top--2xl">
	<LxFlex v-for="colour in colours" :key="colour" direction="column" align="start" gap="0.5rem" class="palette-column overflow" @click="copyToClipboard(colour, '', 'disabled-')" :title="getColourVariable(colour, '', 'disabled-')">
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `${colour.toLowerCase()}` }}</p>
		</div>
		<div class="colour-box" :style="{ backgroundColor: getColourVariable(colour, '', 'disabled-') }">
			<p :style="{ color: getColourVariable(colour, '', 'on-') }">{{ `disabled-${colour.toLowerCase()}` }}</p>
		</div>
	</LxFlex>
</LxFlex>
