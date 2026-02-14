<template>
	<div class="lx-textarea">
		<textarea
			v-bind="attrs"
			:id="inputId"
			v-model="value"
			:name="inputName"
			:placeholder="props.placeholder"
			:disabled="props.disabled"
			:readonly="props.readonly"
			:rows="props.minRows"
			:maxlength="props.maxLength || undefined"
			:style="textareaStyle"
			:aria-label="textareaAriaLabel"
		/>
		<span v-if="props.showCounter && props.maxLength" class="lx-textarea__counter">{{ value.length }} / {{ props.maxLength }}</span>
	</div>
</template>

<script setup lang='ts'>
	import { computed, useAttrs, useId, watch } from 'vue';
	import type { CSSProperties } from 'vue';
	import type { ILxTextareaProps } from './types';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxTextareaProps>(), {
		placeholder: '',
		disabled: false,
		readonly: false,
		minRows: 3,
		maxRows: 12,
		maxLength: 0,
		resizable: true,
		showCounter: false,
	});

	const emit = defineEmits<{
		(event: 'change', value: string): void,
	}>();

	const value = defineModel<string>({
		default: '',
	});
	const attrs = useAttrs();
	const generatedId = `lx-textarea-${useId().replace(/:/g, '')}`;
	const inputId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const textareaAriaLabel = computed(() => {
		const attrAriaLabel = attrs['aria-label'];
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Textarea';
	});

	const textareaStyle = computed<CSSProperties>(() => ({
		maxHeight: `${props.maxRows * 1.5}em`,
		resize: props.resizable ? 'vertical' : 'none',
	}));

	watch(value, next => {
		emit('change', next);
	});
</script>

<style scoped lang='scss'>
	.lx-textarea {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-textarea textarea {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		color: var(--lx-colour-surface-text);
		font: inherit;
		line-height: 1.45;
		outline: none;
		padding: var(--lx-size-space-sm);
	}

	.lx-textarea textarea:focus {
		border-color: var(--lx-colour-focus-ring);
	}

	.lx-textarea__counter {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		justify-self: end;
	}
</style>
