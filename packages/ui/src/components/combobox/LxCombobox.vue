<template>
	<div
		v-click-outside="onClickOutside"
		class="lx-combobox"
		:class="{ 'is-open': isMenuVisible, 'is-static-menu': props.alwaysVisible }"
	>
		<div class="lx-combobox__control" @click="open">
			<div v-if="showTags && selectedValues.length > 0" class="lx-combobox__tags">
				<button
					v-for="value in selectedValues"
					:key="value"
					class="lx-combobox__chip"
					type="button"
					:disabled="props.disabled"
					@click.stop="removeValue(value)"
				>
					{{ getOptionLabel(value) }} ×
				</button>
			</div>

			<div class="lx-combobox__selected" :class="{ 'is-inline': useInlineSearch }">
				<div class="lx-combobox__search" :class="{ 'is-inline': useInlineSearch }">
					<input
						:id="inputId"
						v-model="inputValue"
						:name="inputName"
						role="combobox"
						:aria-expanded="isMenuVisible"
						:aria-controls="isMenuVisible ? listboxId : undefined"
						:aria-activedescendant="activeDescendant"
						aria-haspopup="listbox"
						aria-autocomplete="list"
						:placeholder="props.placeholder"
						:disabled="props.disabled"
						@focus="open"
						@keydown="onKeydown"
					>
				</div>
			</div>

			<ul v-if="showSelectionList" class="lx-combobox__selected-list" aria-label="Selected values">
				<li v-for="value in selectedValues" :key="`selected-${value}`">
					<label class="lx-combobox__selected-item">
						<input
							type="checkbox"
							checked
							:disabled="props.disabled"
							@change="removeValue(value)"
						>
						<span>{{ getOptionLabel(value) }}</span>
					</label>
				</li>
			</ul>
		</div>

		<ul
			v-if="isMenuVisible"
			:id="listboxId"
			class="lx-combobox__menu"
			role="listbox"
			:aria-multiselectable="props.multiple"
		>
			<li
				v-for="(option, index) in visibleOptions"
				:id="getOptionId(index)"
				:key="option.value"
				role="option"
				:aria-selected="selectedValues.includes(option.value)"
				:class="{
					'is-highlighted': index === highlightedIndex,
					'is-selected': selectedValues.includes(option.value),
					'is-disabled': option.disabled,
				}"
			>
				<label
					v-if="props.multiple && !props.tags"
					class="lx-combobox__option-control lx-combobox__option-control--checkbox"
				>
					<input
						type="checkbox"
						:checked="selectedValues.includes(option.value)"
						:disabled="option.disabled || props.disabled"
						@change="toggleOption(option.value)"
					>
					<span>{{ option.label }}</span>
				</label>
				<button
					v-else
					class="lx-combobox__option-control"
					type="button"
					:disabled="option.disabled || props.disabled"
					@click="toggleOption(option.value)"
				>
					{{ option.label }}
				</button>
			</li>
			<li v-if="visibleOptions.length === 0" class="lx-combobox__empty">
				No results
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import type { ILxComboboxOption, ILxComboboxProps, TLxComboboxModelValue } from './types';
	import { computed, ref, useAttrs, watch } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';

	defineOptions({
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ILxComboboxProps>(), {
		options: () => [],
		placeholder: 'Search or select',
		disabled: false,
		id: '',
		multiple: true,
		tags: true,
		searchOnNewLine: true,
		openByDefault: false,
		alwaysVisible: false,
		filterable: true,
	});

	const emit = defineEmits<{
		(event: 'change', value: TLxComboboxModelValue): void,
	}>();

	const model = defineModel<TLxComboboxModelValue>({
		default: '',
	});

	const vClickOutside = vClickOutsideDirective;
	const attrs = useAttrs();

	const query = ref('');
	const isOpen = ref(props.openByDefault);
	const highlightedIndex = ref(-1);
	const generatedId = `lx-combobox-${Math.random().toString(36).slice(2, 9)}`;

	const inputId = computed(() => {
		const attrId = attrs.id;
		if (typeof attrId === 'string' && attrId.length > 0) {
			return attrId;
		}

		return props.id || generatedId;
	});
	const inputName = computed(() => {
		const attrName = attrs.name;
		return typeof attrName === 'string' && attrName.length > 0 ? attrName : inputId.value;
	});
	const listboxId = computed(() => `${inputId.value}-listbox`);

	const normalisedOptions = computed<ILxComboboxOption[]>(() =>
		props.options.map(option => typeof option === 'string' ? { label: option, value: option } : option),
	);

	const selectedValues = computed<string[]>(() => {
		if (props.multiple) {
			if (Array.isArray(model.value)) {
				return model.value;
			}

			return model.value ? [model.value] : [];
		}

		if (Array.isArray(model.value)) {
			const singleValue = model.value[0];
			return singleValue ? [singleValue] : [];
		}

		return model.value ? [model.value] : [];
	});

	const singleSelectedLabel = computed(() => {
		const value = selectedValues.value[0];
		return value ? getOptionLabel(value) : '';
	});

	const inputValue = computed({
		get: (): string => {
			if (!props.multiple && query.value.length === 0) {
				return singleSelectedLabel.value;
			}

			return query.value;
		},
		set: (value: string): void => {
			query.value = value;
		},
	});
	const showTags = computed(() => props.multiple && props.tags);
	const showSelectionList = computed(() =>
		props.multiple && !props.tags && selectedValues.value.length > 0,
	);
	const useInlineSearch = computed(() => showTags.value && !props.searchOnNewLine);

	const visibleOptions = computed(() => {
		if (!props.filterable || query.value.trim().length === 0) {
			return normalisedOptions.value;
		}

		const text = query.value.trim().toLowerCase();
		return normalisedOptions.value.filter(option => option.label.toLowerCase().includes(text));
	});

	const activeDescendant = computed(() =>
		highlightedIndex.value >= 0 ? getOptionId(highlightedIndex.value) : undefined,
	);

	const isMenuVisible = computed(() => props.alwaysVisible || isOpen.value);

	const getOptionId = (index: number): string => `${listboxId.value}-option-${index}`;

	const updateValues = (values: string[]): void => {
		const nextValue: TLxComboboxModelValue = props.multiple ? values : (values[0] ?? '');
		model.value = nextValue;
		emit('change', nextValue);
	};

	const toggleOption = (value: string): void => {
		if (props.multiple) {
			const nextValues = selectedValues.value.includes(value)
				? selectedValues.value.filter(item => item !== value)
				: [...selectedValues.value, value];
			updateValues(nextValues);
		} else {
			updateValues([value]);
			isOpen.value = false;
		}

		query.value = '';
	};

	const removeValue = (value: string): void => {
		updateValues(selectedValues.value.filter(item => item !== value));
	};

	const getOptionLabel = (value: string): string =>
		normalisedOptions.value.find(option => option.value === value)?.label || value;

	const open = (): void => {
		if (!props.disabled) {
			isOpen.value = true;
		}
	};

	const close = (): void => {
		if (!props.alwaysVisible) {
			isOpen.value = false;
			highlightedIndex.value = -1;
		}
	};

	const moveHighlight = (direction: 1 | -1): void => {
		const enabled = visibleOptions.value
			.map((option, index) => ({ option, index }))
			.filter(item => !item.option.disabled);

		if (enabled.length === 0) {
			highlightedIndex.value = -1;
			return;
		}

		const current = enabled.findIndex(item => item.index === highlightedIndex.value);
		const next = current === -1
			? (direction === 1 ? 0 : enabled.length - 1)
			: (current + direction + enabled.length) % enabled.length;
		highlightedIndex.value = enabled[next]?.index ?? -1;
	};

	const selectHighlighted = (): void => {
		const candidate = visibleOptions.value[highlightedIndex.value] || visibleOptions.value.find(option => !option.disabled);
		if (candidate && !candidate.disabled) {
			toggleOption(candidate.value);
		}
	};

	const onKeydown = (event: KeyboardEvent): void => {
		switch (event.key) {
		case 'Backspace':
			if (query.value.length === 0 && selectedValues.value.length > 0) {
				const last = selectedValues.value[selectedValues.value.length - 1];
				if (last) removeValue(last);
			}
			break;
		case 'ArrowDown':
			event.preventDefault();
			open();
			moveHighlight(1);
			break;
		case 'ArrowUp':
			event.preventDefault();
			open();
			moveHighlight(-1);
			break;
		case 'Enter':
			event.preventDefault();
			selectHighlighted();
			break;
		case 'Escape':
			close();
			break;
		default:
			break;
		}
	};

	const onClickOutside = (): void => {
		close();
	};

	watch(
		() => props.openByDefault,
		value => {
			isOpen.value = value;
		},
	);

	watch(visibleOptions, () => {
		highlightedIndex.value = -1;
	});
</script>

<style scoped lang="scss">
	.lx-combobox {
		display: grid;
		gap: var(--lx-size-space-xs);
		position: relative;
	}

	.lx-combobox__control {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		cursor: text;
		display: grid;
		gap: var(--lx-size-space-xs);
		min-height: var(--lx-size-control-height-md);
		padding: var(--lx-size-space-xs);
	}

	.lx-combobox__control:focus-within {
		border-color: var(--lx-colour-focus-ring);
	}

	.lx-combobox__selected {
		display: grid;
		gap: var(--lx-size-space-xs);
		min-width: 0;
	}

	.lx-combobox__selected.is-inline {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
	}

	.lx-combobox__tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-xs);
	}

	.lx-combobox__chip {
		align-items: center;
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, transparent);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-primary);
		border-radius: var(--lx-size-radius-pill);
		color: var(--lx-colour-primary);
		display: inline-flex;
		font-size: var(--lx-font-size-sm);
		gap: var(--lx-size-space-2xs);
		line-height: var(--lx-font-line-height-tight);
		max-width: 100%;
		padding: 0.22rem 0.6rem;
		white-space: nowrap;
	}

	.lx-combobox__search {
		min-width: 0;
		width: 100%;
	}

	.lx-combobox__search.is-inline {
		flex: 1 1 10rem;
	}

	.lx-combobox__search input {
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-text);
		display: block;
		font: inherit;
		min-width: 0;
		outline: none;
		padding: var(--lx-size-space-xs);
		width: 100%;
	}

	.lx-combobox__selected-list {
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.lx-combobox__selected-item {
		align-items: center;
		color: var(--lx-colour-surface-text-muted);
		display: inline-flex;
		font-size: var(--lx-font-size-sm);
		gap: var(--lx-size-space-xs);
	}

	.lx-combobox__selected-item input,
	.lx-combobox__option-control--checkbox input {
		appearance: auto;
		flex: 0 0 auto;
		margin: 0;
		width: auto;
	}

	.lx-combobox__menu {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		box-shadow: 0 10px 24px rgb(0 0 0 / 0.12);
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: var(--lx-size-space-xs) 0 0;
		max-height: 14rem;
		overflow: auto;
		padding: var(--lx-size-space-xs);
		position: absolute;
		top: 100%;
		width: 100%;
		z-index: 30;
	}

	.lx-combobox.is-static-menu .lx-combobox__menu {
		box-shadow: none;
		position: static;
		z-index: auto;
	}

	.lx-combobox__option-control {
		appearance: none;
		background: transparent;
		border: none;
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: inline-flex;
		padding: var(--lx-size-space-sm);
		text-align: left;
		width: 100%;
	}

	.lx-combobox__option-control--checkbox {
		align-items: center;
		box-sizing: border-box;
		display: flex;
		gap: var(--lx-size-space-xs);
		line-height: var(--lx-font-line-height-normal);
	}

	.lx-combobox__option-control--checkbox span {
		flex: 1;
		min-width: 0;
	}

	.lx-combobox__menu li.is-selected .lx-combobox__option-control {
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, transparent);
	}

	.lx-combobox__menu li.is-highlighted .lx-combobox__option-control {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-combobox__option-control:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-combobox__menu li.is-disabled {
		opacity: 0.55;
	}

	.lx-combobox__empty {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		padding: var(--lx-size-space-sm);
	}
</style>
