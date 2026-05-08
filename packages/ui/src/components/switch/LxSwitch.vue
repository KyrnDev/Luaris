<template>
	<div class="lx-switch">
		<input
			:id="uniqueId"
			class="lx-switch__input"
			type="checkbox"
			v-bind="$attrs"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { TLxSwitchProps } from './types';
	import { computed } from 'vue';

	defineOptions({ inheritAttrs: false });
	const props = withDefaults(defineProps<TLxSwitchProps>(), {
		variant: 'primary',
		size: 'md',
		disabled: false,
	});

	const uniqueId = `lx-switch-${Math.random().toString(36).substring(2, 9)}`;
	const getControlHeight = computed(() => `var(--lx-size-control-height-${props.size})`);
	const getColour = computed(() => `var(--lx-colour-${props.variant})`);
	const getHoverColour = computed(() => `var(--lx-colour-hover-${props.variant})`);
	const getDisabledColour = computed(() => `var(--lx-colour-disabled-${props.variant})`);
	const getOnColour = computed(() => `var(--lx-colour-on-${props.variant})`);
</script>

<style lang="scss" scoped>
	.lx-switch {
		&__input {
			--lx-switch-height: v-bind(getControlHeight);
			--lx-switch-width: calc(var(--lx-switch-height) * 1.75);
			--lx-switch-inset: clamp(2px, calc(var(--lx-switch-height) * 0.1), 5px);

			appearance: none;
			box-sizing: border-box;
			position: relative;
			height: var(--lx-switch-height);
			width: var(--lx-switch-width);
			background-color: v-bind(getDisabledColour);
			border-radius: var(--lx-size-radius-pill);
			cursor: pointer;
			transition: background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);

			&:not(:disabled):hover {
				background-color: v-bind(getHoverColour);
			}

			&:after {
				content: '';
				pointer-events: none;
				position: absolute;
				top: var(--lx-switch-inset);
				left: var(--lx-switch-inset);
				width: calc(var(--lx-switch-height) - (var(--lx-switch-inset) * 2));
				height: calc(var(--lx-switch-height) - (var(--lx-switch-inset) * 2));
				background-color: v-bind(getOnColour);
				border-radius: 50%;
				transition: transform var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);
				box-shadow: 0 0px 5px rgb(black, 0.5);
			}

			&:checked {
				background-color: v-bind(getColour);

				&:after {
					transform: translateX(calc(var(--lx-switch-width) - var(--lx-switch-height)));
				}
			}
		}
	}
</style>
