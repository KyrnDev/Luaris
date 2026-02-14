<template>
	<div
		class="lx-avatar"
		:class="[
			`lx-avatar--${props.size}`,
			`lx-avatar--${props.variant}`,
			{ 'lx-avatar--interactive': props.clickable },
		]"
		:role="props.clickable ? 'button' : undefined"
		:tabindex="props.clickable ? 0 : undefined"
		:aria-label="props.clickable ? altText : undefined"
		@click="onActivate"
		@keydown="onKeydown"
	>
		<img v-if="props.src && !hasImageError" class="lx-avatar__image" :src="props.src" :alt="altText" @error="hasImageError = true">
		<span v-else class="lx-avatar__fallback">{{ fallbackText }}</span>
	</div>
</template>

<script setup lang="ts">
	import type { ILxAvatarProps } from './types';
	import { computed, ref } from 'vue';

	const props = withDefaults(defineProps<ILxAvatarProps>(), {
		src: '',
		alt: '',
		name: '',
		size: 'md',
		variant: 'secondary',
		clickable: false,
	});

	const emit = defineEmits<{
		(event: 'activate'): void,
	}>();

	const hasImageError = ref(false);

	const fallbackText = computed(() => {
		if (!props.name) {
			return '?';
		}

		return props.name
			.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map(part => part[0]?.toUpperCase())
			.join('');
	});

	const altText = computed(() => props.alt || props.name || 'Avatar');

	const onActivate = (): void => {
		if (props.clickable) {
			emit('activate');
		}
	};

	const onKeydown = (event: KeyboardEvent): void => {
		if (!props.clickable) {
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			emit('activate');
		}
	};
</script>

<style scoped lang="scss">
	.lx-avatar {
		--lx-avatar-background: var(--lx-colour-secondary);
		--lx-avatar-foreground: var(--lx-colour-on-secondary);
		align-items: center;
		background: var(--lx-avatar-background);
		border: var(--lx-size-border-width-hairline) solid color-mix(in srgb, var(--lx-avatar-background) 72%, black 28%);
		border-radius: var(--lx-size-radius-pill);
		color: var(--lx-avatar-foreground);
		display: inline-flex;
		flex-shrink: 0;
		font-weight: var(--lx-font-weight-bold);
		justify-content: center;
		overflow: hidden;
		user-select: none;
	}

	.lx-avatar--interactive {
		cursor: pointer;
	}

	.lx-avatar--interactive:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-avatar__image {
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.lx-avatar__fallback {
		align-items: center;
		display: inline-flex;
		justify-content: center;
		letter-spacing: 0;
		line-height: 1;
		width: 100%;
	}

	.lx-avatar--xs { font-size: var(--lx-font-size-xs); height: 1.5rem; width: 1.5rem; }
	.lx-avatar--sm { font-size: var(--lx-font-size-xs); height: 2rem; width: 2rem; }
	.lx-avatar--md { font-size: var(--lx-font-size-sm); height: 2.5rem; width: 2.5rem; }
	.lx-avatar--lg { font-size: var(--lx-font-size-md); height: 3rem; width: 3rem; }
	.lx-avatar--xl { font-size: var(--lx-font-size-lg); height: 3.5rem; width: 3.5rem; }

	.lx-avatar--primary { --lx-avatar-background: var(--lx-colour-primary); --lx-avatar-foreground: var(--lx-colour-on-primary); }
	.lx-avatar--secondary { --lx-avatar-background: var(--lx-colour-secondary); --lx-avatar-foreground: var(--lx-colour-on-secondary); }
	.lx-avatar--accent { --lx-avatar-background: var(--lx-colour-accent); --lx-avatar-foreground: var(--lx-colour-on-accent); }
	.lx-avatar--info { --lx-avatar-background: var(--lx-colour-info); --lx-avatar-foreground: var(--lx-colour-on-info); }
	.lx-avatar--success { --lx-avatar-background: var(--lx-colour-success); --lx-avatar-foreground: var(--lx-colour-on-success); }
	.lx-avatar--warning { --lx-avatar-background: var(--lx-colour-warning); --lx-avatar-foreground: var(--lx-colour-on-warning); }
	.lx-avatar--danger { --lx-avatar-background: var(--lx-colour-danger); --lx-avatar-foreground: var(--lx-colour-on-danger); }
</style>
