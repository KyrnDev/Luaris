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
	import type { TLxTagProps } from './types';
	import { LxButton } from '../button';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<TLxTagProps>(), {
		label: '',
		variant: 'primary',
		size: 'md',
		removable: false,
	});

	const emit = defineEmits<{
		(event: 'remove'): void,
	}>();

	const getSize = computed(() => `var(--lx-font-size-${props.size ?? 'md'})`);
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
		font-size: v-bind(getSize);
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
		gap: var(--lx-size-space-xs);
		line-height: 1.2;
	}

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
