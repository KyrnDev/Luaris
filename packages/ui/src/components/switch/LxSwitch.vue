<template>
	<div class="lx-switch">
		<input
			:id="uniqueId"
			class="lx-switch__input"
			type="checkbox"
			v-bind="$attrs"
		/>

		<label class="lx-switch__track" :for="uniqueId">
			<span class="lx-switch__thumb" aria-hidden="true" />
		</label>
	</div>
</template>

<script setup lang="ts">
	import type { TLxSwitchProps } from './types';

	defineOptions({ inheritAttrs: false });
	withDefaults(defineProps<TLxSwitchProps>(), {
		variant: 'primary',
		disabled: false,
	});

	const uniqueId = `lx-switch-${Math.random().toString(36).substring(2, 9)}`;
</script>

<style lang="scss" scoped>
	.lx-switch {
		&__input {
			opacity: 0;
			pointer-events: none;
			position: absolute;
		}

		&__track {
			position: relative;
			display: inline-flex;
			align-items: center;
			width: 4rem;
			height: 2rem;
			border-radius: 9999px;
			background-color: var(--lx-colour-disabled-primary);
			position: relative;
			cursor: pointer;
			transition: background-color 0.2s ease;
			border: 1px solid #9e9e9e;
		}

		&__thumb {
			width: calc(2rem - 6px);
			height: calc(2rem - 6px);
			border-radius: 50%;
			background-color: var(--lx-colour-primary);
			position: absolute;
			left: 2px;
			top: 2px;
			transition: transform 0.2s ease;
		}

		&__input:checked + &__track {
			background-color: color-mix(from srgb var(--lx-colour-primary) 80%, var(--lx-colour-disabled-primary) 20%);
		}

		&__input:checked + &__track .lx-switch__thumb {
			transform: translateX(2rem);
		}
	}
</style>
