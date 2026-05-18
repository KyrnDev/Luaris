<template>
	<LxDetails
		v-model:open="open"
		class="lx-accordion-item"
		:name="accordionContext?.groupName.value"
		:title="props.title"
		:icon="props.icon"
		:content="props.content"
		:variant="resolvedVariant"
		:size="resolvedSize"
		:content-padding="resolvedContentPadding"
		:content-line-height="resolvedContentLineHeight"
		:content-background-colour="resolvedContentBackgroundColour"
		:border-radius="resolvedBorderRadius"
		:border-width="resolvedBorderWidth"
		:disabled="props.disabled"
	>
		<template v-if="$slots.summary" #summary>
			<slot name="summary" />
		</template>

		<template v-if="$slots.content" #content>
			<slot name="content" />
		</template>

		<template v-else-if="$slots.default" #content>
			<slot />
		</template>
	</LxDetails>
</template>

<script setup lang="ts">
	import type { TLxAccordionItemProps, TLxAccordionVariant } from './types';
	import { computed, inject } from 'vue';
	import { LxDetails } from '../details';
	import { LX_ACCORDION_CONTEXT_KEY } from './types';

	const props = withDefaults(defineProps<TLxAccordionItemProps>(), {
		title: '',
		icon: '',
		content: '',
		variant: undefined,
		size: undefined,
		contentPadding: undefined,
		contentLineHeight: undefined,
		contentBackgroundColour: undefined,
		borderRadius: undefined,
		borderWidth: undefined,
		disabled: false,
		value: undefined,
	});

	const open = defineModel<boolean>('open', { default: false });
	const accordionContext = inject(LX_ACCORDION_CONTEXT_KEY, null);

	const resolvedVariant = computed<TLxAccordionVariant>(() => props.variant ?? accordionContext?.defaultVariant.value ?? 'raised');
	const resolvedSize = computed(() => props.size ?? accordionContext?.defaultSize.value ?? 'md');
	const resolvedContentPadding = computed(() => props.contentPadding ?? accordionContext?.defaultContentPadding.value ?? resolvedSize.value);
	const resolvedContentLineHeight = computed(() => props.contentLineHeight ?? accordionContext?.defaultContentLineHeight.value ?? 'normal');
	const resolvedContentBackgroundColour = computed(() => props.contentBackgroundColour ?? accordionContext?.defaultContentBackgroundColour.value);
	const resolvedBorderRadius = computed(() => props.borderRadius ?? accordionContext?.defaultBorderRadius.value ?? 'md');
	const resolvedBorderWidth = computed(() => props.borderWidth ?? accordionContext?.defaultBorderWidth.value ?? 'thin');
</script>
