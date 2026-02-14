<template>
	<div class="lx-select" :class="[`lx-select--${props.size}`]">
		<div class="lx-select__field-wrapper">
			<select
				v-bind="attrs"
				:id="selectId"
				:name="selectName"
				:value="props.modelValue"
				:disabled="props.disabled"
				:aria-label="selectAriaLabel"
				@change="onChange"
			>
				<option v-for="option in props.options" :key="String(option.value)" :value="option.value" :disabled="option.disabled">
					{{ option.label }}
				</option>
			</select>
			<span class="lx-select__caret">▾</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ILxSelectProps, TLxSelectValue } from './types';
	import { computed, useAttrs } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxSelectProps>(), {
		modelValue: '',
		options: () => [],
		size: 'md',
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'update:modelValue', value: TLxSelectValue): void,
		(event: 'change', value: TLxSelectValue): void,
	}>();

	const attrs = useAttrs();
	const generatedId = `lx-select-${Math.random().toString(36).slice(2, 9)}`;
	const selectId = computed(() => {
		const attrId = attrs.id;
		return typeof attrId === 'string' && attrId.length > 0 ? attrId : generatedId;
	});
	const selectName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : selectId.value;
	});
	const selectAriaLabel = computed(() => {
		const attrAriaLabel = attrs['aria-label'];
		return typeof attrAriaLabel === 'string' && attrAriaLabel.length > 0 ? attrAriaLabel : 'Select option';
	});

	const onChange = (event: Event): void => {
		const target = event.target as HTMLSelectElement;
		emit('update:modelValue', target.value);
		emit('change', target.value);
	};
</script>

<style scoped lang="scss">
	.lx-select {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-select__field-wrapper {
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: flex;
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-select select {
		appearance: none;
		background: var(--lx-colour-surface-raised);
		border: none;
		color: var(--lx-colour-surface-text);
		font: inherit;
		line-height: 1.45;
		outline: none;
		padding: var(--lx-size-space-xs) var(--lx-size-space-lg) var(--lx-size-space-xs) 0;
		width: 100%;
	}

	.lx-select select option {
		background: var(--lx-colour-surface-raised);
		color: var(--lx-colour-surface-text);
		line-height: 1.45;
		padding: var(--lx-size-space-sm) var(--lx-size-space-md);
	}

	.lx-select__caret {
		color: var(--lx-colour-surface-text-muted);
		pointer-events: none;
	}

	.lx-select--sm .lx-select__field-wrapper { height: var(--lx-size-control-height-sm); }
	.lx-select--md .lx-select__field-wrapper { height: var(--lx-size-control-height-md); }
	.lx-select--lg .lx-select__field-wrapper { height: var(--lx-size-control-height-lg); }
</style>
