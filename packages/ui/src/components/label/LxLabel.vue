<template>
	<div class="lx-label" :class="[`lx-label--${props.display}`, { 'lx-label--reverse': props.reverse }]">
		<label v-if="hasLabel" class="lx-label__text" :for="resolvedControlId">
			<slot v-if="hasLabelSlot" name="label" />
			<template v-else>
				{{ props.text }}
			</template>
		</label>
		<template v-else />
		<div class="lx-label__control">
			<slot :control-id="resolvedControlId" :control-name="resolvedControlName" />
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { computed, useId, useSlots } from 'vue';
	import type { ILxLabelProps } from './types';

	const props = withDefaults(defineProps<ILxLabelProps>(), {
		text: '',
		display: 'default',
		reverse: false,
		controlId: '',
		controlName: '',
	});

	const slots = useSlots();
	const generatedId = `lx-field-${useId().replace(/:/g, '')}`;
	const hasLabelSlot = computed(() => {
		return Boolean(slots.label);
	});

	const resolvedControlId = computed(() => {
		return props.controlId.trim().length > 0 ? props.controlId : generatedId;
	});

	const resolvedControlName = computed(() => {
		return props.controlName.trim().length > 0 ? props.controlName : resolvedControlId.value;
	});

	const hasLabel = computed(() => {
		return props.text.trim().length > 0 || hasLabelSlot.value;
	});
</script>

<style scoped lang='scss'>
	.lx-label {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-label__text {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-medium);
	}

	.lx-label__control {
		min-width: 0;
	}

	.lx-label--inline {
		align-items: center;
		grid-template-columns: auto minmax(0, 1fr);
		gap: var(--lx-size-space-sm);
	}

	.lx-label--default.lx-label--reverse .lx-label__text,
	.lx-label--inline.lx-label--reverse .lx-label__text {
		order: 2;
	}

	.lx-label--default.lx-label--reverse .lx-label__control,
	.lx-label--inline.lx-label--reverse .lx-label__control {
		order: 1;
	}
</style>
