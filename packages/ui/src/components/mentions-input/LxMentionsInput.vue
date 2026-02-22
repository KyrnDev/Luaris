<template>
	<div v-click-outside="closeMenu" class="lx-mentions-input">
		<LxTextarea
			v-model="model"
			:placeholder="props.placeholder"
			:disabled="props.disabled"
			:min-rows="4"
			@input="onInput"
			@keydown="onKeydown"
		/>
		<ul v-if="activeSuggestions.length > 0" class="lx-mentions-input__menu" role="listbox" aria-label="Mention suggestions">
			<li v-for="(option, index) in activeSuggestions" :key="`${activeTrigger}-${option.value}`" role="option" :aria-selected="index === activeIndex">
				<button
					type="button"
					class="lx-mentions-input__item"
					:class="{ 'is-active': index === activeIndex }"
					@click="insertMention(option)"
				>
					{{ activeTrigger }}{{ option.label }}
				</button>
			</li>
		</ul>
		<template v-else />
	</div>
</template>

<script setup lang='ts'>
	import { computed, ref, watch } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { LxTextarea } from '../textarea';
	import type { ILxMentionsInputProps, ILxMentionsOption, ILxMentionsSource } from './types';

	const props = withDefaults(defineProps<ILxMentionsInputProps>(), {
		sources: () => [] as ILxMentionsSource[],
		placeholder: 'Type @ to mention...',
		minChars: 0,
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'mention', payload: { trigger: string, option: ILxMentionsOption }): void,
	}>();

	const model = defineModel<string>({
		default: '',
	});

	const query = ref('');
	const activeTrigger = ref('');
	const activeIndex = ref(-1);
	const vClickOutside = vClickOutsideDirective;

	const activeSuggestions = computed(() => {
		if (activeTrigger.value.length === 0) {
			return [];
		}
		const source = props.sources.find(item => item.trigger === activeTrigger.value);
		if (!source) {
			return [];
		}
		const term = query.value.toLowerCase();
		if (term.length === 0) {
			return source.items.slice(0, 8);
		}
		if (term.length < props.minChars) {
			return source.items.slice(0, 8);
		}
		return source.items.filter(option => option.label.toLowerCase().includes(term)).slice(0, 8);
	});

	watch(activeSuggestions, suggestions => {
		if (suggestions.length === 0) {
			activeIndex.value = -1;
			return;
		}
		if (activeIndex.value < 0 || activeIndex.value >= suggestions.length) {
			activeIndex.value = 0;
		}
	});

	const onInput = (): void => {
		const text = model.value;
		const caret = text.length;
		const left = text.slice(0, caret);
		const match = left.match(/([@#][\w-]*)$/);
		if (!match) {
			activeTrigger.value = '';
			query.value = '';
			return;
		}
		const token = (/* c8 ignore next */ match[1]) || '';
		activeTrigger.value = token.slice(0, 1);
		query.value = token.slice(1);
	};

	const closeMenu = (): void => {
		activeTrigger.value = '';
		query.value = '';
		activeIndex.value = -1;
	};

	const insertMention = (option: ILxMentionsOption): void => {
		const text = model.value;
		model.value = text.replace(/([@#][\w-]*)$/, `${activeTrigger.value}${option.label} `);
		emit('mention', { trigger: activeTrigger.value, option });
		closeMenu();
	};

	const onKeydown = (event: KeyboardEvent): void => {
		if (activeSuggestions.value.length === 0) {
			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			activeIndex.value = (activeIndex.value + 1) % activeSuggestions.value.length;
			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			activeIndex.value = (activeIndex.value - 1 + activeSuggestions.value.length) % activeSuggestions.value.length;
			return;
		}

		if (event.key === 'Enter' || event.key === 'Tab') {
			event.preventDefault();
			const option = ((/* c8 ignore next */ activeSuggestions.value[activeIndex.value]) || activeSuggestions.value[0]) as ILxMentionsOption;
			insertMention(option);
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
		}
	};
</script>

<style scoped lang='scss'>
	.lx-mentions-input {
		position: relative;
	}

	.lx-mentions-input__menu {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: var(--lx-size-space-xs) 0 0;
		padding: var(--lx-size-space-xs);
		position: absolute;
		width: 100%;
		z-index: 20;
	}

	.lx-mentions-input__item {
		background: transparent;
		border: none;
		border-radius: var(--lx-size-radius-xs);
		cursor: pointer;
		font: inherit;
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
		text-align: left;
		width: 100%;
	}

	.lx-mentions-input__item:hover {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-mentions-input__item.is-active {
		background: color-mix(in srgb, var(--lx-colour-primary) 18%, transparent);
	}
</style>
