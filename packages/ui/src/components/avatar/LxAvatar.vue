<template>
	<div
		class="lx-avatar"
		:class="{
			'has-image': hasImage,
			'has-initials': hasInitials,
			'has-icon': showFallbackIcon,
		}"
		:role="hasImage ? undefined : 'img'"
		:aria-label="hasImage ? undefined : accessibleLabel"
	>
		<img
			v-if="hasImage"
			class="lx-avatar__image"
			:src="props.src"
			:alt="accessibleLabel"
		>

		<span v-else-if="hasInitials" class="lx-avatar__initials">
			{{ normalizedInitials }}
		</span>

		<LxIcon v-else class="lx-avatar__icon" name="user" :size="props.size" />
	</div>
</template>

<script setup lang="ts">
	import type { TLxAvatarProps } from './types';
	import { computed } from 'vue';
	import { LxIcon } from '../icon';

	const props = withDefaults(defineProps<TLxAvatarProps>(), {
		src: '',
		initials: '',
		variant: 'primary',
		size: 'md',
		alt: '',
	});

	const hasImage = computed(() => Boolean(props.src));
	const normalizedInitials = computed(() => props.initials.trim().slice(0, 2).toUpperCase());
	const hasInitials = computed(() => Boolean(normalizedInitials.value) && !hasImage.value);
	const showFallbackIcon = computed(() => !hasImage.value && !hasInitials.value);
	const accessibleLabel = computed(() => {
		if (props.alt) return props.alt;
		if (hasInitials.value) return `Avatar for ${normalizedInitials.value}`;
		return 'User avatar';
	});

	const getSize = computed(() => `var(--lx-size-control-height-${props.size})`);
	const getFontSize = computed(() => `var(--lx-font-size-${props.size})`);
	const getTextColour = computed(() => `var(--lx-colour-on-${props.variant})`);
	const getBackgroundColour = computed(() => `var(--lx-colour-${props.variant})`);
</script>

<style scoped lang="scss">
	.lx-avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: v-bind(getSize);
		height: v-bind(getSize);
		border-radius: var(--lx-size-radius-full);
		overflow: hidden;
		background-color: v-bind(getBackgroundColour);
		color: v-bind(getTextColour);
		font-size: v-bind(getFontSize);
		font-weight: var(--lx-font-weight-medium);
		line-height: 1;
		flex-shrink: 0;
		box-sizing: border-box;

		&__image {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__initials {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			text-transform: uppercase;
			line-height: 1;
		}

		&__icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: inherit;
		}
	}
</style>
