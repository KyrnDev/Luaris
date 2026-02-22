<template>
	<LxModal
		:model-value="open"
		:title="props.title"
		:position="props.position"
		:animation="props.animation"
		width="min(92vw, 42rem)"
		max-width="42rem"
		@update:model-value="value => { open = value; }"
	>
		<div class="lx-command-palette">
			<LxInput v-model="query" :placeholder="props.placeholder" type="search" />
			<ul class="lx-command-palette__list">
				<li v-for="item in filteredItems" :key="item.value">
					<button
						type="button"
						class="lx-command-palette__item"
						:disabled="item.disabled"
						@click="onSelect(item.value)"
					>
						<span>{{ item.label }}</span>
						<kbd v-if="item.shortcut">{{ item.shortcut }}</kbd>
						<template v-else />
					</button>
				</li>
				<li v-if="filteredItems.length === 0" class="lx-command-palette__empty">
					No commands found.
				</li>
			</ul>
		</div>
	</LxModal>
</template>

<script setup lang='ts'>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
	import { LxInput } from '../input';
	import { LxModal } from '../modal';
	import type { ILxCommandPaletteProps } from './types';

	const props = withDefaults(defineProps<ILxCommandPaletteProps>(), {
		items: () => [],
		title: 'Command Palette',
		placeholder: 'Search commands...',
		maxResults: 12,
		position: 'top',
		animation: 'fade',
		hotkey: true,
	});

	const emit = defineEmits<{
		(event: 'select', value: string): void,
	}>();

	const open = defineModel<boolean>({
		default: false,
	});
	const query = ref('');

	const filteredItems = computed(() => {
		const term = query.value.trim().toLowerCase();
		const results = props.items.filter(item => {
			if (term.length === 0) {
				return true;
			}
			const haystack = [item.label, ...(item.keywords || [])].join(' ').toLowerCase();
			return haystack.includes(term);
		});
		return results.slice(0, props.maxResults);
	});

	const onSelect = (value: string): void => {
		emit('select', value);
		open.value = false;
		query.value = '';
	};

	const onHotkey = (event: KeyboardEvent): void => {
		if (!props.hotkey) {
			return;
		}
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			open.value = !open.value;
		}
	};

	onMounted(() => {
		window.addEventListener('keydown', onHotkey);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('keydown', onHotkey);
	});
</script>

<style scoped lang='scss'>
	.lx-command-palette {
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-command-palette__list {
		display: grid;
		gap: var(--lx-size-space-2xs);
		list-style: none;
		margin: 0;
		max-height: 24rem;
		overflow: auto;
		padding: 0;
	}

	.lx-command-palette__item {
		align-items: center;
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: flex;
		font: inherit;
		justify-content: space-between;
		padding: var(--lx-size-space-sm);
		width: 100%;
	}

	.lx-command-palette__item:hover:not(:disabled) {
		background: var(--lx-colour-surface-sunken);
	}

	.lx-command-palette__item kbd {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-xs);
		font-size: var(--lx-font-size-xs);
		padding: 0 var(--lx-size-space-xs);
	}

	.lx-command-palette__empty {
		color: var(--lx-colour-surface-text-muted);
		padding: var(--lx-size-space-sm);
		text-align: center;
	}
</style>
