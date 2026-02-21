<template>
	<div
		class="lx-form-field"
		:class="[
			`is-${props.display}`,
			{ 'is-reverse': props.reverse, 'has-error': Boolean(props.error) },
		]"
	>
		<label v-if="props.label" class="lx-form-field__label" :for="resolvedId">
			<span>{{ props.label }}</span>
			<sup v-if="props.required" aria-hidden="true">*</sup>
		</label>
		<template v-else />

		<div class="lx-form-field__control">
			<slot :field-id="resolvedId" />
			<p v-if="props.helpText && !props.error" class="lx-form-field__help">
				{{ props.helpText }}
			</p>
			<template v-else />
			<p v-if="props.error" class="lx-form-field__error" role="alert">
				{{ props.error }}
			</p>
			<template v-else />
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { computed, useId } from 'vue';
	import type { ILxFormFieldProps } from './types';

	const props = withDefaults(defineProps<ILxFormFieldProps>(), {
		label: '',
		forId: '',
		helpText: '',
		error: '',
		required: false,
		display: 'default',
		reverse: false,
	});

	const generatedId = `lx-field-${useId().replace(/:/g, '')}`;
	const resolvedId = computed(() => props.forId || generatedId);
</script>

<style scoped lang='scss'>
	.lx-form-field {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-form-field.is-inline {
		align-items: start;
		gap: var(--lx-size-space-md);
		grid-template-columns: minmax(8rem, auto) 1fr;
	}

	.lx-form-field.is-inline.is-reverse {
		grid-template-columns: 1fr minmax(8rem, auto);
	}

	.lx-form-field.is-inline.is-reverse .lx-form-field__label {
		order: 2;
	}

	.lx-form-field.is-inline.is-reverse .lx-form-field__control {
		order: 1;
	}

	.lx-form-field__label {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-form-field__label sup {
		color: var(--lx-colour-danger);
		margin-left: 0.2rem;
	}

	.lx-form-field__control {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-form-field__help {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-form-field__error {
		color: var(--lx-colour-danger);
		font-size: var(--lx-font-size-xs);
	}
</style>
