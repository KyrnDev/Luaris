<template>
	<span class="lx-tag" :class="[`lx-tag--${variant}`, `lx-tag--${size}`]">
		<span v-if="$slots.leading" class="lx-tag__leading"><slot name="leading" /></span>
		<slot>{{ label }}</slot>

		<LxButton
			v-if="removable"
			class="lx-tag__remove"
			variant="transparent"
			size="xs"
			icon="xmark"
			:aria-label="removeButtonLabel"
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
	const getColour = computed(() => `var(--lx-colour-${props.variant ?? 'primary'})`);
	const getTextColour = computed(() => `var(--lx-colour-on-${props.variant ?? 'primary'})`);
	const removeButtonLabel = computed(() => props.label ? `Remove ${props.label}` : 'Remove tag');
</script>

<style scoped lang="scss">
	.lx-tag {
		align-items: center;
		border: var(--lx-size-border-width-thin) solid v-bind(getColour);
		border-radius: var(--lx-size-radius-md);
		background: color-mix(in srgb, v-bind(getColour) 30%, transparent);
		color: v-bind(getTextColour);
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
		padding: 0;
	}
</style>
