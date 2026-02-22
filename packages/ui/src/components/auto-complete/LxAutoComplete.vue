<template>
	<div v-click-outside="close" class="lx-auto-complete">
		<LxInput
			v-model="model"
			:placeholder="props.placeholder"
			:disabled="props.disabled"
			@focus="onFocus"
		/>
		<ul v-if="open && filteredOptions.length > 0" class="lx-auto-complete__menu">
			<li v-for="option in filteredOptions" :key="option.value">
				<button
					type="button"
					class="lx-auto-complete__item"
					:disabled="option.disabled"
					@click="selectOption(option)"
				>
					{{ option.label }}
				</button>
			</li>
		</ul>
		<template v-else />
	</div>
</template>

<script setup lang='ts'>
	import { computed, ref, watch } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { LxInput } from '../input';
	import type { ILxAutoCompleteOption, ILxAutoCompleteProps } from './types';

	const props = withDefaults(defineProps<ILxAutoCompleteProps>(), {
		options: () => [],
		placeholder: 'Type to search...',
		minChars: 0,
		disabled: false,
		openOnFocus: true,
	});

	const emit = defineEmits<{
		(event: 'select', option: ILxAutoCompleteOption): void,
	}>();

	const model = defineModel<string>({
		default: '',
	});

	const open = ref(false);
	const vClickOutside = vClickOutsideDirective;

	const filteredOptions = computed(() => {
		const term = model.value.trim().toLowerCase();
		if (term.length < props.minChars) {
			return [];
		}
		return props.options.filter(option => option.label.toLowerCase().includes(term));
	});

	watch(model, () => {
		open.value = filteredOptions.value.length > 0;
	});

	const onFocus = (): void => {
		if (props.openOnFocus && filteredOptions.value.length > 0) {
			open.value = true;
		}
	};

	const close = (): void => {
		open.value = false;
	};

	const selectOption = (option: ILxAutoCompleteOption): void => {
		model.value = option.label;
		emit('select', option);
		close();
	};
</script>

<style scoped lang='scss'>
	.lx-auto-complete {
		position: relative;
	}

	.lx-auto-complete__menu {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: var(--lx-size-space-xs) 0 0;
		max-height: 14rem;
		overflow: auto;
		padding: var(--lx-size-space-xs);
		position: absolute;
		width: 100%;
		z-index: 30;
	}

	.lx-auto-complete__item {
		background: transparent;
		border: none;
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		padding: var(--lx-size-space-sm);
		text-align: left;
		width: 100%;
	}

	.lx-auto-complete__item:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}
</style>
