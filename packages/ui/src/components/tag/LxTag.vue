<template>
	<span class="lx-tag" :class="[`lx-tag--${variant}`, `lx-tag--${size}`]">
		<span v-if="$slots.leading" class="lx-tag__leading"><slot name="leading" /></span>
		<slot>{{ label }}</slot>
		<LxButton
			v-if="removable"
			class="lx-tag__remove"
			variant="plain"
			size="xs"
			icon="xmark"
			aria-label="Remove tag"
			@click="emit('remove')"
		/>
	</span>
</template>

<script setup lang="ts">
	import type { ILxTagProps } from './types';
	import { LxButton } from '../button';

	const props = withDefaults(defineProps<ILxTagProps>(), {
		label: '',
		variant: 'secondary',
		size: 'md',
		removable: false,
	});

	const emit = defineEmits<{
		(event: 'remove'): void,
	}>();

	const { label, removable, size, variant } = props;
</script>

<style scoped lang="scss">
	.lx-tag {
		--lx-tag-colour: var(--lx-colour-secondary);
		align-items: center;
		background: color-mix(in srgb, var(--lx-tag-colour) 14%, transparent);
		border: var(--lx-size-border-width-hairline) solid var(--lx-tag-colour);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-tag-colour);
		display: inline-flex;
		font-weight: var(--lx-font-weight-medium);
		gap: var(--lx-size-space-xs);
		line-height: 1.2;
	}

	.lx-tag--sm { font-size: var(--lx-font-size-xs); padding: 0.1rem 0.4rem; }
	.lx-tag--md { font-size: var(--lx-font-size-sm); padding: 0.15rem 0.5rem; }
	.lx-tag--lg { font-size: var(--lx-font-size-md); padding: 0.2rem 0.6rem; }

	.lx-tag__remove {
		background: transparent;
		color: inherit;
		height: auto;
		padding: 0;
		min-width: auto;
	}

	.lx-tag--primary { --lx-tag-colour: var(--lx-colour-primary); }
	.lx-tag--secondary { --lx-tag-colour: var(--lx-colour-secondary); }
	.lx-tag--accent { --lx-tag-colour: var(--lx-colour-accent); }
	.lx-tag--info { --lx-tag-colour: var(--lx-colour-info); }
	.lx-tag--success { --lx-tag-colour: var(--lx-colour-success); }
	.lx-tag--warning { --lx-tag-colour: var(--lx-colour-warning); }
	.lx-tag--danger { --lx-tag-colour: var(--lx-colour-danger); }
</style>
