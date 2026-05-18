<template>
	<div class="lx-accordion" :class="{ 'lx-accordion--connected': props.connected }">
		<slot />
	</div>
</template>

<script setup lang="ts">
	import type { TLxAccordionProps } from './types';
	import { computed, provide } from 'vue';
	import { randomId } from '../../helpers/utilities';
	import { LX_ACCORDION_CONTEXT_KEY } from './types';

	const props = withDefaults(defineProps<TLxAccordionProps>(), {
		multiple: false,
		connected: true,
		variant: 'raised',
		size: 'md',
		gap: 'md',
		contentPadding: undefined,
		contentLineHeight: 'normal',
		contentBackgroundColour: undefined,
		borderRadius: 'md',
		borderWidth: 'thin',
	});

	const multiple = computed(() => props.multiple);
	const accordionGroupId = `lx-accordion-${randomId()}`;

	provide(LX_ACCORDION_CONTEXT_KEY, {
		multiple,
		groupName: computed(() => (props.multiple ? undefined : accordionGroupId)),
		defaultVariant: computed(() => props.variant),
		defaultSize: computed(() => props.size),
		defaultContentPadding: computed(() => props.contentPadding),
		defaultContentLineHeight: computed(() => props.contentLineHeight),
		defaultContentBackgroundColour: computed(() => props.contentBackgroundColour),
		defaultBorderRadius: computed(() => props.borderRadius),
		defaultBorderWidth: computed(() => props.borderWidth),
	});

	const getGap = computed(() => (props.connected ? '0' : `var(--lx-size-space-${props.gap})`));
</script>

<style lang="scss" scoped>
	.lx-accordion {
		display: flex;
		flex-direction: column;
		gap: v-bind(getGap);
		width: 100%;

		&--connected {
			:deep(.lx-accordion-item:not(:first-child)) {
				border-top: 0;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			}

			:deep(.lx-accordion-item:not(:last-child)) {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}
</style>
