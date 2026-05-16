<script setup lang="ts">
	import LxFlex from '../../ui/src/components/flex/LxFlex.vue';

	const sizes = {
		space: [
			{ name: '2xs', value: '0.125rem' },
			{ name: 'xs', value: '0.25rem' },
			{ name: 'sm', value: '0.5rem' },
			{ name: 'md', value: '0.75rem' },
			{ name: 'lg', value: '1rem' },
			{ name: 'xl', value: '1.5rem' },
			{ name: '2xl', value: '2rem' },
			{ name: '3xl', value: '3rem' },
		],
		controlHeight: [
			{ name: '2xs', value: '1.5rem', px: '24px' },
			{ name: 'xs', value: '1.625rem', px: '26px' },
			{ name: 'sm', value: '1.75rem', px: '28px' },
			{ name: 'md', value: '2rem', px: '32px' },
			{ name: 'lg', value: '2.25rem', px: '36px' },
			{ name: 'xl', value: '2.5rem', px: '40px' },
			{ name: '2xl', value: '3rem', px: '48px' },
			{ name: '3xl', value: '3.5rem', px: '56px' },
		],
		controlPaddingX: [
			{ name: '2xs', value: '0.375rem' },
			{ name: 'xs', value: '0.5rem' },
			{ name: 'sm', value: '0.625rem' },
			{ name: 'md', value: '0.75rem' },
			{ name: 'lg', value: '0.875rem' },
			{ name: 'xl', value: '1rem' },
			{ name: '2xl', value: '1.25rem' },
			{ name: '3xl', value: '1.5rem' },
		],
		controlGap: [
			{ name: '2xs', value: '0.25rem' },
			{ name: 'xs', value: '0.25rem' },
			{ name: 'sm', value: '0.375rem' },
			{ name: 'md', value: '0.5rem' },
			{ name: 'lg', value: '0.5rem' },
			{ name: 'xl', value: '0.625rem' },
			{ name: '2xl', value: '0.75rem' },
			{ name: '3xl', value: '0.875rem' },
		],
		controlIcon: [
			{ name: '2xs', value: '0.75rem', px: '12px' },
			{ name: 'xs', value: '0.875rem', px: '14px' },
			{ name: 'sm', value: '0.9375rem', px: '15px' },
			{ name: 'md', value: '1rem', px: '16px' },
			{ name: 'lg', value: '1.125rem', px: '18px' },
			{ name: 'xl', value: '1.25rem', px: '20px' },
			{ name: '2xl', value: '1.5rem', px: '24px' },
			{ name: '3xl', value: '1.75rem', px: '28px' },
		],
		font: [
			{ name: '2xs', value: '0.625rem', px: '10px' },
			{ name: 'xs', value: '0.75rem', px: '12px' },
			{ name: 'sm', value: '0.875rem', px: '14px' },
			{ name: 'md', value: '1rem', px: '16px' },
			{ name: 'lg', value: '1.25rem', px: '20px' },
			{ name: 'xl', value: '1.5rem', px: '24px' },
			{ name: '2xl', value: '2rem', px: '32px' },
			{ name: '3xl', value: '3rem', px: '48px' },
		],
		radius: [
			{ name: 'none', value: '0rem' },
			{ name: 'sm', value: '0.25rem' },
			{ name: 'md', value: '0.5rem' },
			{ name: 'lg', value: '0.75rem' },
			{ name: 'pill', value: '9999px' },
			{ name: 'full', value: '100%' },
		],
		borderWidth: [
			{ name: 'none', value: '0rem' },
			{ name: 'thin', value: '1px' },
			{ name: 'thick', value: '2px' },
		],
	};
</script>

# Sizing

The design system uses a shared sizing scale from `2xs` to `3xl`, plus semantic control tokens for components such as buttons, badges, tags, switches, and inputs.

The sizing system is split into two layers:

- primitive tokens such as `space` and `font size`
- semantic control tokens such as `control height`, `control padding`, `control gap`, and `control icon`

This keeps typography and spacing flexible while still making controls line up cleanly on the same row.

[[toc]]

## Space Sizes

The space sizes are the primitive spacing tokens used for padding, margin, and gap utilities.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="space in sizes.space" :key="space.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ space.name }} ({{ space.value }})</p>
		<div style="height: 1rem; flex: 2; background-color: var(--lx-colour-surface-sunken);">
			<div :style="{ height: '1rem', width: space.value, backgroundColor: 'var(--lx-colour-primary)' }" />
		</div>
	</LxFlex>
</LxFlex>

## Font Sizes

The font sizes are the primitive typography tokens. These are separate from control heights.

For example, `md` typography is `16px`, while `md` controls are `32px` tall.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="font in sizes.font" :key="font.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ font.name }} ({{ font.value }} / {{ font.px }})</p>
		<p
			:style="{
				flex: 2,
				margin: 0,
				fontSize: font.value,
				lineHeight: '1.2',
			}"
		>
			The quick brown fox
		</p>
	</LxFlex>
</LxFlex>

## Control Heights

The control height tokens define the overall outer height for aligned controls. Components such as buttons, badges, tags, and switches should use these values for their visible height.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="control in sizes.controlHeight" :key="control.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ control.name }} ({{ control.value }} / {{ control.px }})</p>
		<div
			:style="{
				height: control.value,
				width: '8rem',
				backgroundColor: 'var(--lx-colour-primary)',
				borderRadius: 'var(--lx-size-radius-md)',
			}"
		/>
	</LxFlex>
</LxFlex>

## Control Padding X

The horizontal control padding tokens define the left and right padding for text-bearing controls.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="padding in sizes.controlPaddingX" :key="padding.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ padding.name }} ({{ padding.value }})</p>
		<div style="height: 2rem; flex: 2; background-color: var(--lx-colour-surface-sunken); display: flex; align-items: center;">
			<div
				:style="{
					height: '2rem',
					width: `calc(${padding.value} * 2)`,
					backgroundColor: 'var(--lx-colour-primary)',
				}"
			/>
		</div>
	</LxFlex>
</LxFlex>

## Control Gaps

The control gap tokens define internal spacing between icons, labels, and other inline control content.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="gap in sizes.controlGap" :key="gap.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ gap.name }} ({{ gap.value }})</p>
		<div :style="{ flex: 2, display: 'inline-flex', alignItems: 'center', gap: gap.value }">
			<div style="height: 1rem; width: 1rem; background-color: var(--lx-colour-primary); border-radius: 9999px;" />
			<div style="height: 1rem; width: 3rem; background-color: var(--lx-colour-secondary);" />
		</div>
	</LxFlex>
</LxFlex>

## Control Icon Sizes

The control icon tokens define icon sizes that follow the same rhythm as the shared control scale.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="icon in sizes.controlIcon" :key="icon.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ icon.name }} ({{ icon.value }} / {{ icon.px }})</p>
		<div :style="{ flex: 2, fontSize: icon.value, lineHeight: 1 }">★</div>
	</LxFlex>
</LxFlex>

## Border Radius Sizes

The border radius sizes are used for rounded corners on components.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="radius in sizes.radius" :key="radius.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ radius.name }} ({{ radius.value }})</p>
		<div :style="{ height: '2rem', width: '2rem', backgroundColor: 'var(--lx-colour-primary)', borderRadius: radius.value }" />
		<div :style="{ height: '2rem', width: '5rem', backgroundColor: 'var(--lx-colour-primary)', borderRadius: radius.value }" />
		<div :style="{ height: '2rem', width: '10rem', backgroundColor: 'var(--lx-colour-primary)', borderRadius: radius.value }" />
	</LxFlex>
</LxFlex>


## Border Width Sizes

The border width sizes are used for borders on components.

<LxFlex align="start" direction="column" gap="0.5rem">
	<LxFlex v-for="width in sizes.borderWidth" :key="width.name" align="center" class="lx-width--full">
		<p :style="{ flex: 1, margin: 0, border: `${width.value} solid var(--lx-colour-primary)`, padding: '0.5rem' }">{{ width.name }} ({{ width.value }})</p>
	</LxFlex>
</LxFlex>
