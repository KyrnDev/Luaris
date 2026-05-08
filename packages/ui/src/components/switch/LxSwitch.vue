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
	const getSize = computed(() => `var(--lx-size-space-${props.size})`);
	const getColour = computed(() => `var(--lx-colour-${props.variant})`);
	const getHoverColour = computed(() => `var(--lx-colour-hover-${props.variant})`);
	const getDisabledColour = computed(() => `var(--lx-colour-disabled-${props.variant})`);
	const getOnColour = computed(() => `var(--lx-colour-on-${props.variant})`);
</script>

<style lang="scss" scoped>
	.lx-switch {
		&__input {
			appearance: none;
			position: relative;
			height: calc(v-bind(getSize) * 3.5);
			width: calc(v-bind(getSize) * 7);
			background-color: v-bind(getDisabledColour);
			border-radius: var(--lx-size-radius-pill);
			cursor: pointer;

			&:not(:disabled):hover {
				background-color: v-bind(getHoverColour);
			}

			&:after {
				content: '';
				pointer-events: none;
				position: absolute;
				top: 3px;
				left: 3px;
				width: calc(v-bind(getSize) * 3.5 - 6px);
				height: calc(v-bind(getSize) * 3.5 - 6px);
				background-color: v-bind(getOnColour);
				border-radius: 50%;
				transition: transform 0.2s ease;
				box-shadow: 0 0px 5px rgb(black, 0.5);
			}

			&:checked {
				background-color: v-bind(getColour);

				&:after {
					transform: translateX(calc(v-bind(getSize) * 3.5));
				}
			}
		}
	}
</style>
