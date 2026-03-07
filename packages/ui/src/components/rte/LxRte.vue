<template>
	<div
		class="lx-rte"
		:class="{
			'lx-rte--disabled': isDisabled,
			'lx-rte--readonly': props.readonly,
		}"
		:style="props.style"
	>
		<div
			v-if="props.showToolbar && !props.readonly"
			ref="toolbarRef"
			v-click-outside="onToolbarClickOutside"
			class="lx-rte__toolbar"
			role="toolbar"
			aria-label="Rich text controls"
		>
			<template v-for="item in toolbarItems" :key="item.key">
				<span v-if="item.kind === 'separator'" class="lx-rte__divider" />
				<LxButton
					v-else
					variant="plain"
					size="sm"
					class="lx-rte__toolbar-button"
					:class="{ 'is-active': isModuleActive(item.module) || activeModuleId === item.module.id }"
					:title="item.module.label"
					:aria-label="item.module.label"
					:aria-pressed="isModuleActive(item.module)"
					:aria-haspopup="item.module.kind === 'menu' || item.module.kind === 'form' ? 'menu' : undefined"
					:aria-expanded="item.module.kind === 'menu' || item.module.kind === 'form'
						? String(activeModuleId === item.module.id)
						: undefined"
					@click="onToolbarModuleClick(item.module, $event)"
				>
					<LxIcon
						v-if="item.module.iconName"
						:name="item.module.iconName"
						:icon-style="item.module.iconStyle || 'solid'"
						:size="item.module.iconSize || 'sm'"
						decorative
						class="lx-rte__button-icon"
					/>
					<span v-if="showToolbarText(item.module)" class="lx-rte__button-text">{{ item.module.toolbarText || item.module.label }}</span>
				</LxButton>
			</template>

			<div
				v-if="activeModule && activeModule.kind !== 'action'"
				ref="modulePanelRef"
				class="lx-rte__module-panel"
				:class="{
					'lx-rte__module-panel--menu': activeModule.kind === 'menu',
					'lx-rte__module-panel--form': activeModule.kind === 'form',
				}"
				:style="modulePanelStyle"
			>
				<template v-if="activeModule.kind === 'menu'">
					<LxButton
						v-for="option in activeMenuOptions"
						:key="option.id"
						variant="plain"
						size="sm"
						class="lx-rte__menu-option"
						:title="option.label"
						:aria-label="option.label"
						@click="onMenuOptionClick(option)"
					>
						<LxIcon
							v-if="option.iconName"
							:name="option.iconName"
							:icon-style="option.iconStyle || 'solid'"
							:size="option.iconSize || 'sm'"
							decorative
							class="lx-rte__button-icon"
						/>
						{{ option.label }}
					</LxButton>
				</template>

				<template v-else-if="activeModule.kind === 'form'">
					<div v-for="field in activeFormFields" :key="field.id" class="lx-rte__module-field">
						<label :for="`lx-rte-field-${field.id}`">
							{{ field.label }}
						</label>
						<select
							v-if="field.type === 'select'"
							:id="`lx-rte-field-${field.id}`"
							v-model="moduleFormState[field.id]"
							class="lx-rte__field-select"
						>
							<option
								v-for="option in field.options || []"
								:key="`${field.id}-${option.value}`"
								:value="option.value"
							>
								{{ option.label }}
							</option>
						</select>
						<LxInput
							v-else
							:id="`lx-rte-field-${field.id}`"
							v-model="moduleFormState[field.id]"
							:placeholder="field.placeholder"
						/>
					</div>
					<p v-if="selectedTextPreview.length" class="lx-rte__module-preview">
						Selected: {{ selectedTextPreview }}
					</p>
					<div class="lx-rte__module-actions">
						<LxButton variant="plain" size="sm" title="Apply changes" aria-label="Apply changes" @click="applyActiveModule">
							<LxIcon name="check" size="sm" decorative class="lx-rte__button-icon" />
							Apply
						</LxButton>
						<LxButton variant="plain" size="sm" title="Cancel changes" aria-label="Cancel changes" @click="closeActivePanel">
							<LxIcon name="xmark" size="sm" decorative class="lx-rte__button-icon" />
							Cancel
						</LxButton>
					</div>
				</template>
			</div>
		</div>

		<div class="lx-rte__surface" :class="{ 'is-empty': isEmpty }">
			<div
				ref="editorRef"
				class="lx-rte__editor"
				:contenteditable="!isDisabled && !props.readonly"
				:aria-disabled="isDisabled || undefined"
				:data-placeholder="props.placeholder"
				:style="{ minHeight: props.minHeight }"
				@focus="onFocus"
				@blur="onBlur"
				@input="onInput"
				@keydown="onKeydown"
			/>
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
	import { LxButton } from '../button';
	import { LxIcon } from '../icon';
	import { LxInput } from '../input';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { createEmptyRteDocument, domToRteDocument, isRteDocumentEmpty, rteDocumentToHtml } from './engine/ast';
	import { lxRteBuiltInModules, lxRteDefaultToolbarModules } from './modules';
	import './content.scss';
	import type {
		ILxRteDocument,
		ILxRteModule,
		ILxRteModuleContext,
		ILxRteModuleFormField,
		ILxRteModuleMenuOption,
		ILxRteProps,
		ILxRteToolbarState,
		TLxRteModuleFormState,
	} from './types';

	interface ILxRteToolbarItemModule {
		kind: 'module',
		key: string,
		module: ILxRteModule,
	}

	interface ILxRteToolbarItemSeparator {
		kind: 'separator',
		key: string,
	}

	type TLxRteToolbarItem = ILxRteToolbarItemModule | ILxRteToolbarItemSeparator;

	const props = withDefaults(defineProps<ILxRteProps>(), {
		placeholder: 'Start writing...',
		disabled: false,
		readonly: false,
		autofocus: false,
		showToolbar: true,
		toolbarModules: () => [...lxRteDefaultToolbarModules],
		modules: () => [],
		minHeight: '14rem',
		style: undefined,
	});

	const model = defineModel<ILxRteDocument>({
		default: createEmptyRteDocument,
	});
	const vClickOutside = vClickOutsideDirective;

	const editorRef = ref<HTMLElement | null>(null);
	const toolbarRef = ref<HTMLElement | null>(null);
	const modulePanelRef = ref<HTMLElement | null>(null);
	const isFocused = ref(false);
	const isSyncingFromInput = ref(false);
	const activeModuleId = ref('');
	const moduleFormState = ref<TLxRteModuleFormState>({});
	const savedSelectionRange = ref<Range | null>(null);
	const selectedTextPreview = ref('');
	const modulePanelLeft = ref(0);

	const toolbarState = ref<ILxRteToolbarState>({
		bold: false,
		italic: false,
		underline: false,
		strike: false,
		orderedList: false,
		unorderedList: false,
		block: 'paragraph',
	});

	const isDisabled = computed(() => props.disabled);
	const isEmpty = computed(() => isRteDocumentEmpty(model.value));

	const moduleRegistry = computed(() => {
		const registry = new Map<string, ILxRteModule>();
		for (const moduleDefinition of lxRteBuiltInModules) {
			registry.set(moduleDefinition.id, moduleDefinition);
		}
		for (const moduleDefinition of props.modules || []) {
			registry.set(moduleDefinition.id, moduleDefinition);
		}
		return registry;
	});

	const toolbarModules = computed(() =>
		props.toolbarModules
			.map(moduleId => moduleRegistry.value.get(moduleId))
			.filter((moduleDefinition): moduleDefinition is ILxRteModule => Boolean(moduleDefinition)));

	const toolbarItems = computed<TLxRteToolbarItem[]>(() => {
		const items: TLxRteToolbarItem[] = [];
		let previousGroup = '';
		for (const moduleDefinition of toolbarModules.value) {
			const currentGroup = moduleDefinition.group ?? moduleDefinition.id;
			if (items.length > 0 && currentGroup !== previousGroup) {
				items.push({
					kind: 'separator',
					key: `sep-${moduleDefinition.id}`,
				});
			}

			items.push({
				kind: 'module',
				key: `mod-${moduleDefinition.id}`,
				module: moduleDefinition,
			});

			previousGroup = currentGroup;
		}
		return items;
	});

	const activeModule = computed(() => moduleRegistry.value.get(activeModuleId.value) ?? null);

	const context: ILxRteModuleContext = {
		get isDisabled() {
			return isDisabled.value;
		},
		get readonly() {
			return props.readonly;
		},
		get toolbarState() {
			return toolbarState.value;
		},
		runCommand: (command: string, value?: string): void => {
			runCommand(command, value);
		},
		getSelectionElement: (): HTMLElement | null => getSelectionElement(),
		getSelectedText: (): string => window.getSelection()?.toString() ?? '',
		saveSelection: (): void => {
			const selection = window.getSelection();
			if (selection?.rangeCount) {
				savedSelectionRange.value = selection.getRangeAt(0).cloneRange();
				selectedTextPreview.value = selection.toString();
				return;
			}

			savedSelectionRange.value = null;
			selectedTextPreview.value = '';
		},
		restoreSelection: (): void => {
			if (!savedSelectionRange.value) {
				return;
			}

			const selection = window.getSelection();
			if (!selection) {
				return;
			}

			selection.removeAllRanges();
			selection.addRange(savedSelectionRange.value);
		},
		getEditorElement: (): HTMLElement | null => editorRef.value,
		syncModelFromEditor: (): void => {
			syncModelFromEditor();
		},
		closeActivePanel: (): void => {
			closeActivePanel();
		},
	};

	const activeMenuOptions = computed<ILxRteModuleMenuOption[]>(() =>
		activeModule.value?.getMenuOptions?.(context) ?? []);

	const activeFormFields = computed<ILxRteModuleFormField[]>(() =>
		activeModule.value?.getFormFields?.(context) ?? []);

	const modulePanelStyle = computed(() => ({
		left: `${modulePanelLeft.value}px`,
	}));

	const showToolbarText = (moduleDefinition: ILxRteModule): boolean =>
		Boolean(moduleDefinition.toolbarText || !moduleDefinition.iconName);

	const alignModulePanelToButton = (buttonElement: HTMLElement | null): void => {
		const toolbarElement = toolbarRef.value;
		if (!toolbarElement || !buttonElement) {
			modulePanelLeft.value = 0;
			return;
		}

		const gutter = 4;
		const desiredLeft = buttonElement.offsetLeft;
		const panelWidth = modulePanelRef.value?.offsetWidth ?? 220;
		const maxLeft = Math.max(0, toolbarElement.clientWidth - panelWidth - gutter);
		modulePanelLeft.value = Math.max(gutter, Math.min(desiredLeft, maxLeft));
	};

	const syncEditorFromModel = (): void => {
		if (!editorRef.value) {
			return;
		}

		editorRef.value.innerHTML = rteDocumentToHtml(model.value);
	};

	const syncModelFromEditor = (): void => {
		if (!editorRef.value) {
			return;
		}

		const parsedDocument = domToRteDocument(editorRef.value);
		isSyncingFromInput.value = true;
		model.value = parsedDocument;
		void nextTick(() => {
			isSyncingFromInput.value = false;
		});
	};

	const focusEditor = (): void => {
		if (!editorRef.value || isDisabled.value || props.readonly) {
			return;
		}

		editorRef.value.focus();
	};

	const runCommand = (command: string, value?: string): void => {
		if (isDisabled.value || props.readonly) {
			return;
		}

		focusEditor();
		document.execCommand(command, false, value);
		syncModelFromEditor();
		updateToolbarState();
	};

	const closeActivePanel = (): void => {
		activeModuleId.value = '';
		moduleFormState.value = {};
		savedSelectionRange.value = null;
		selectedTextPreview.value = '';
	};

	const onMenuOptionClick = (option: ILxRteModuleMenuOption): void => {
		runCommand(option.command, option.value);
		closeActivePanel();
	};

	const applyActiveModule = (): void => {
		if (!activeModule.value?.onApply) {
			closeActivePanel();
			return;
		}

		activeModule.value.onApply(context, moduleFormState.value);
		updateToolbarState();
	};

	const onToolbarModuleClick = (moduleDefinition: ILxRteModule, event?: MouseEvent): void => {
		if (isDisabled.value || props.readonly) {
			return;
		}

		if (moduleDefinition.kind === 'action' || !moduleDefinition.kind) {
			moduleDefinition.run?.(context);
			return;
		}

		if (activeModuleId.value === moduleDefinition.id) {
			closeActivePanel();
			return;
		}

		activeModuleId.value = moduleDefinition.id;
		moduleFormState.value = moduleDefinition.onOpen?.(context) ?? {};
		const triggerElement = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;
		alignModulePanelToButton(triggerElement);
		void nextTick(() => {
			alignModulePanelToButton(triggerElement);
		});
	};

	const isModuleActive = (moduleDefinition: ILxRteModule): boolean =>
		Boolean(moduleDefinition.isActive?.(context));

	const onFocus = (): void => {
		isFocused.value = true;
		updateToolbarState();
	};

	const onBlur = (): void => {
		isFocused.value = false;
		syncModelFromEditor();
	};

	const onInput = (): void => {
		syncModelFromEditor();
		updateToolbarState();
	};

	const getSelectionElement = (): HTMLElement | null => {
		const selection = window.getSelection();
		if (!selection?.rangeCount) {
			return null;
		}

		const anchorNode = selection.anchorNode;
		if (!anchorNode) {
			return null;
		}

		return anchorNode.nodeType === Node.ELEMENT_NODE
			? anchorNode as HTMLElement
			: anchorNode.parentElement;
	};

	const queryCommand = (command: string): boolean => {
		try {
			return document.queryCommandState(command);
		} catch {
			return false;
		}
	};

	const getCurrentBlockType = (): ILxRteToolbarState['block'] => {
		const selectionElement = getSelectionElement();
		if (!selectionElement) {
			return 'paragraph';
		}

		const blockElement = selectionElement.closest('pre, blockquote, h1, h2, h3, p, ul, ol, li');
		if (!blockElement) {
			return 'paragraph';
		}

		const tagName = blockElement.tagName.toLowerCase();
		if (tagName === 'h1') {
			return 'heading-1';
		}
		if (tagName === 'h2') {
			return 'heading-2';
		}
		if (tagName === 'h3') {
			return 'heading-3';
		}
		if (tagName === 'blockquote') {
			return 'quote';
		}
		if (tagName === 'pre') {
			return 'code-block';
		}
		if (tagName === 'ul') {
			return 'unordered-list';
		}
		if (tagName === 'ol') {
			return 'ordered-list';
		}
		if (tagName === 'li') {
			const parentTagName = blockElement.parentElement?.tagName.toLowerCase();
			if (parentTagName === 'ul') {
				return 'unordered-list';
			}
			if (parentTagName === 'ol') {
				return 'ordered-list';
			}
		}

		return 'paragraph';
	};

	const updateToolbarState = (): void => {
		if (!isFocused.value) {
			return;
		}

		toolbarState.value = {
			bold: queryCommand('bold'),
			italic: queryCommand('italic'),
			underline: queryCommand('underline'),
			strike: queryCommand('strikeThrough'),
			orderedList: queryCommand('insertOrderedList'),
			unorderedList: queryCommand('insertUnorderedList'),
			block: getCurrentBlockType(),
		};
	};

	const onSelectionChange = (): void => {
		if (!isFocused.value) {
			return;
		}

		updateToolbarState();
	};

	const onToolbarClickOutside = (): void => {
		if (!activeModuleId.value) {
			return;
		}

		closeActivePanel();
	};

	const isSelectionInListItem = (): HTMLLIElement | null => {
		const selectionElement = getSelectionElement();
		if (!selectionElement) {
			return null;
		}

		return selectionElement.closest('li');
	};

	const isListItemEffectivelyEmpty = (listItemElement: HTMLLIElement): boolean => {
		const clone = listItemElement.cloneNode(true) as HTMLLIElement;
		for (const nestedList of Array.from(clone.querySelectorAll('ul, ol'))) {
			nestedList.remove();
		}

		return (clone.textContent ?? '').trim().length === 0;
	};

	const onKeydown = (event: KeyboardEvent): void => {
		if (isDisabled.value || props.readonly) {
			return;
		}

		const listItemElement = isSelectionInListItem();
		if (!listItemElement) {
			return;
		}

		if (event.key === 'Tab') {
			event.preventDefault();
			runCommand(event.shiftKey ? 'outdent' : 'indent');
			return;
		}

		if (event.key === 'Backspace') {
			const selection = window.getSelection();
			if (!selection?.isCollapsed) {
				return;
			}

			if (!isListItemEffectivelyEmpty(listItemElement)) {
				return;
			}

			event.preventDefault();
			runCommand('outdent');
		}
	};

	watch(
		() => model.value,
		() => {
			if (isFocused.value || isSyncingFromInput.value) {
				return;
			}

			syncEditorFromModel();
		},
		{ deep: true },
	);

	onMounted(() => {
		document.addEventListener('selectionchange', onSelectionChange);
		syncEditorFromModel();
		if (props.autofocus) {
			focusEditor();
		}
	});

	onUnmounted(() => {
		document.removeEventListener('selectionchange', onSelectionChange);
	});
</script>

<style scoped lang='scss'>
	.lx-rte {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		overflow: hidden;
	}

	.lx-rte--disabled {
		opacity: 0.65;
	}

	.lx-rte__toolbar {
		align-items: center;
		background: var(--lx-colour-surface-raised);
		border-bottom: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-2xs);
		position: relative;
		padding: var(--lx-size-space-2xs);
	}

	.lx-rte__toolbar-button.is-active {
		--lx-button-background: color-mix(in srgb, var(--lx-colour-primary) 18%, transparent);
		--lx-button-border: color-mix(in srgb, var(--lx-colour-primary) 60%, var(--lx-colour-surface-border));
		--lx-button-text: var(--lx-colour-surface-text);
	}

	.lx-rte__toolbar-button {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-2xs);
	}

	.lx-rte__toolbar-button:hover,
	.lx-rte__menu-option:hover,
	.lx-rte__module-actions :deep(.lx-button:hover) {
		--lx-button-background: color-mix(in srgb, var(--lx-colour-primary) 14%, var(--lx-colour-surface-raised));
		--lx-button-border: color-mix(in srgb, var(--lx-colour-primary) 35%, var(--lx-colour-surface-border));
		--lx-button-text: var(--lx-colour-surface-text);
	}

	.lx-rte__toolbar-button.lx-button--plain:hover,
	.lx-rte__menu-option.lx-button--plain:hover,
	.lx-rte__module-actions :deep(.lx-button--plain:hover) {
		background-color: color-mix(in srgb, var(--lx-colour-primary) 14%, var(--lx-colour-surface-raised));
		border-color: color-mix(in srgb, var(--lx-colour-primary) 35%, var(--lx-colour-surface-border));
	}

	.lx-rte__toolbar-button.lx-button--plain:active,
	.lx-rte__menu-option.lx-button--plain:active,
	.lx-rte__module-actions :deep(.lx-button--plain:active) {
		background-color: color-mix(in srgb, var(--lx-colour-primary) 24%, var(--lx-colour-surface-raised));
		border-color: color-mix(in srgb, var(--lx-colour-primary) 50%, var(--lx-colour-surface-border));
	}

	.lx-rte__toolbar-button:focus-visible,
	.lx-rte__menu-option:focus-visible,
	.lx-rte__module-actions :deep(.lx-button:focus-visible) {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 1px;
	}

	.lx-rte__module-panel {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		box-shadow: var(--lx-shadow-md);
		display: grid;
		gap: var(--lx-size-space-xs);
		left: var(--lx-size-space-2xs);
		max-width: min(22rem, calc(100% - (var(--lx-size-space-2xs) * 2)));
		min-width: 12rem;
		padding: var(--lx-size-space-sm);
		position: absolute;
		top: calc(100% + var(--lx-size-space-2xs));
		z-index: 20;
	}

	.lx-rte__module-panel--form {
		align-items: end;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}

	.lx-rte__module-panel--menu {
		grid-template-columns: 1fr;
		padding: var(--lx-size-space-2xs) 0;
	}

	.lx-rte__module-panel :deep(.lx-button),
	.lx-rte__menu-option {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-2xs);
		justify-content: flex-start;
	}

	.lx-rte__menu-option {
		gap: var(--lx-size-space-xs);
		width: 100%;
	}

	.lx-rte__menu-option :deep(.lx-button__label) {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-rte__button-icon {
		flex: 0 0 auto;
	}

	.lx-rte__button-text {
		line-height: 1;
	}

	.lx-rte__module-field {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-rte__module-field label {
		font-size: var(--lx-font-size-xs);
	}

	.lx-rte__field-select {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		font: inherit;
		height: var(--lx-size-control-height-md);
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-rte__module-preview {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		grid-column: 1 / -1;
		margin: 0;
	}

	.lx-rte__module-actions {
		display: flex;
		gap: var(--lx-size-space-2xs);
		grid-column: 1 / -1;
		justify-content: flex-end;
	}

	.lx-rte__divider {
		background: var(--lx-colour-surface-border);
		display: inline-flex;
		height: 1.35rem;
		margin: 0 var(--lx-size-space-2xs);
		width: var(--lx-size-border-width-hairline);
	}

	.lx-rte__surface {
		padding: var(--lx-size-space-md);
	}

	.lx-rte__editor {
		background: var(--lx-colour-surface-base);
		color: var(--lx-colour-surface-text);
		outline: none;
		width: 100%;
	}

	.lx-rte__editor:focus-visible {
		box-shadow: 0 0 0 var(--lx-size-border-width-standard) var(--lx-colour-focus-ring);
		border-radius: var(--lx-size-radius-sm);
	}

	.lx-rte__surface.is-empty .lx-rte__editor::before {
		color: var(--lx-colour-surface-text-muted);
		content: attr(data-placeholder);
		display: block;
		pointer-events: none;
	}
</style>
