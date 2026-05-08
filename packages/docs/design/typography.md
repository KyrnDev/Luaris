<script setup lang="ts">
	import LxFlex from '../../ui/src/components/flex/LxFlex.vue';

	const fonts = {
		family: [
			{
				name: 'primary',
				variable: '--lx-font-family-primary',
				value: 'Nunito, Inter, Segoe UI, sans-serif',
				sample: 'Primary body copy should feel clear, friendly, and easy to read.',
			},
			{
				name: 'secondary',
				variable: '--lx-font-family-secondary',
				value: 'Fraunces, Georgia, Times New Roman, serif',
				sample: 'Secondary display copy brings warmth, contrast, and emphasis.',
			},
			{
				name: 'mono',
				variable: '--lx-font-family-mono',
				value: 'JetBrains Mono, SFMono-Regular, Consolas, Liberation Mono, monospace',
				sample: 'const typography = "Monospace is used for code and technical content";',
			},
		],
		size: [
			{ name: '2xs', value: '0.625rem', px: '10px' },
			{ name: 'xs', value: '0.75rem', px: '12px' },
			{ name: 'sm', value: '0.875rem', px: '14px' },
			{ name: 'md', value: '1rem', px: '16px' },
			{ name: 'lg', value: '1.25rem', px: '20px' },
			{ name: 'xl', value: '1.5rem', px: '24px' },
			{ name: '2xl', value: '2rem', px: '32px' },
			{ name: '3xl', value: '3rem', px: '48px' },
		],
		lineHeight: [
			{
				name: 'tight',
				value: '1.2',
				sample: 'Tighter line-height is useful for headings and compact display text. It keeps short blocks visually dense, deliberate, and easy to scan when space is limited.',
			},
			{
				name: 'normal',
				value: '1.5',
				sample: 'Normal line-height is the default for most body copy and interface text. It balances readability and density, making it the safest choice for general-purpose layouts.',
			},
			{
				name: 'relaxed',
				value: '1.7',
				sample: 'Relaxed line-height gives longer-form reading content more room to breathe. It works best for larger text blocks where a slower, more comfortable reading rhythm matters.',
			},
		],
		weight: [
			{ name: 'light', value: '300' },
			{ name: 'regular', value: '400' },
			{ name: 'medium', value: '500' },
			{ name: 'semibold', value: '600' },
			{ name: 'bold', value: '700' },
		],
		headings: [
			{ tag: 'h1', label: 'Heading 1', value: 'var(--lx-font-size-2xl)' },
			{ tag: 'h2', label: 'Heading 2', value: 'var(--lx-font-size-xl)' },
			{ tag: 'h3', label: 'Heading 3', value: 'var(--lx-font-size-lg)' },
			{ tag: 'h4', label: 'Heading 4', value: 'var(--lx-font-size-md)' },
			{ tag: 'h5', label: 'Heading 5', value: 'var(--lx-font-size-sm)' },
			{ tag: 'h6', label: 'Heading 6', value: 'var(--lx-font-size-xs)' },
		],
	};
</script>

<style scoped lang="scss">
	.type-sample {
		width: 100%;
		padding: 1rem;
		border-radius: 0.5rem;
		background: var(--lx-colour-surface-raised);
		border: 1px solid var(--lx-colour-surface-border);
	}

	.type-stack {
		width: 100%;
	}

	.mono {
		font-family: var(--lx-font-family-mono);
	}
</style>

# Typography

The Luaris Framework uses a small typography system built around three font families, a shared size scale, named line-height tokens, and a compact weight range. These tokens are emitted as CSS variables and are intended to give the framework a consistent typographic rhythm across both content and components.

[[toc]]

> [!INFO]
> Typography tokens are intentionally separate from control-sizing tokens. For example, `md` type is `16px`, while `md` controls are `32px` tall.

## Font Families

The framework provides three font-family roles:

- `primary` for body copy and interface text
- `secondary` for display or accent typography
- `mono` for code and technical content

<LxFlex direction="column" align="start" gap="1rem" class="type-stack lx-margin-top--2xl">
	<LxFlex v-for="family in fonts.family" :key="family.name" direction="column" align="start" gap="0.5rem" class="type-sample">
		<strong>{{ family.name }} ({{ family.variable }})</strong>
		<code class="mono">{{ family.value }}</code>
		<p :style="{ margin: 0, fontFamily: `var(${family.variable})`, lineHeight: '1.5' }">{{ family.sample }}</p>
	</LxFlex>
</LxFlex>

## Font Sizes

The font-size scale ranges from `2xs` to `3xl`. This scale is used for headings, body copy, labels, and supporting text.

<LxFlex align="start" direction="column" gap="0.75rem" class="lx-margin-top--2xl">
	<LxFlex v-for="font in fonts.size" :key="font.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ font.name }} ({{ font.value }} / {{ font.px }})</p>
		<p
			:style="{
				flex: 2,
				margin: 0,
				fontSize: font.value,
				lineHeight: '1.2',
			}"
		>
			The quick brown fox jumps over the lazy dog.
		</p>
	</LxFlex>
</LxFlex>

## Line Heights

The line-height tokens control vertical rhythm. In general:

- `tight` is best for headings and compact UI labels
- `normal` is the default for body copy
- `relaxed` is useful for longer-form reading content

<LxFlex direction="column" align="start" gap="1rem" class="lx-margin-top--2xl">
	<LxFlex v-for="lineHeight in fonts.lineHeight" :key="lineHeight.name" direction="column" align="start" gap="0.5rem" class="type-sample">
		<strong>{{ lineHeight.name }} ({{ lineHeight.value }})</strong>
		<p
			:style="{
				margin: 0,
				lineHeight: lineHeight.value,
				maxWidth: '34rem',
			}"
		>
			{{ lineHeight.sample }}
		</p>
	</LxFlex>
</LxFlex>

## Font Weights

The weight scale is intentionally small so components stay visually consistent without too many near-duplicate emphasis levels.

<LxFlex align="start" direction="column" gap="0.75rem" class="lx-margin-top--2xl">
	<LxFlex v-for="weight in fonts.weight" :key="weight.name" align="center" class="lx-width--full">
		<p style="flex: 1; margin: 0;">{{ weight.name }} ({{ weight.value }})</p>
		<p :style="{ flex: 2, margin: 0, fontWeight: weight.value, lineHeight: '1.2' }">The quick brown fox jumps over the lazy dog.</p>
	</LxFlex>
</LxFlex>

## Heading Scale

The reset layer applies the font-size scale to headings using the following defaults:

- `h1` uses `2xl`
- `h2` uses `xl`
- `h3` uses `lg`
- `h4` uses `md`
- `h5` uses `sm`
- `h6` uses `xs`

<LxFlex direction="column" align="start" gap="0.75rem" class="lx-margin-top--2xl">
	<LxFlex v-for="heading in fonts.headings" :key="heading.tag" direction="column" align="start" gap="0.25rem" class="type-sample">
		<strong>{{ heading.tag }} ({{ heading.label }})</strong>
		<component
			:is="heading.tag"
			:style="{
				margin: 0,
				fontSize: heading.value,
				lineHeight: '1.2',
			}"
		>
			The quick brown fox
		</component>
	</LxFlex>
</LxFlex>

## Usage Notes

- Default body text uses the `primary` family with `md` size and `normal` line-height.
- Code-like content should use the `mono` family.
- Display text, accent headings, or editorial moments can use the `secondary` family sparingly.
- Control sizing should not be derived from raw font size alone. Use the control sizing tokens for component height and spacing.
