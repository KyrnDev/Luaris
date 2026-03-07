import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LxRte from '../LxRte.vue';
import type { ILxRteDocument, ILxRteModule } from '../types';

const createDocument = (text: string): ILxRteDocument => ({
	type: 'doc',
	children: [
		{
			type: 'paragraph',
			children: [{ type: 'text', value: text }],
		},
	],
});

const setSelectionOnNode = (node: Node, collapsed = true): void => {
	const range = document.createRange();
	range.setStart(node, 0);
	if (collapsed) {
		range.setEnd(node, 0);
	} else if (node.nodeType === Node.TEXT_NODE) {
		range.setEnd(node, node.textContent?.length ?? 0);
	} else {
		range.setEnd(node, node.childNodes.length);
	}
	const selection = window.getSelection();
	selection?.removeAllRanges();
	selection?.addRange(range);
};

describe('LxRte', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		Object.defineProperty(document, 'execCommand', {
			value: vi.fn(),
			writable: true,
		});
		Object.defineProperty(document, 'queryCommandState', {
			value: vi.fn(() => false),
			writable: true,
		});
	});

	it('renders defaults, supports model syncing, and handles focus/input/blur', async () => {
		const wrapper = mount(LxRte, {
			attachTo: document.body,
			props: {
				'modelValue': createDocument('Alpha'),
				'onUpdate:modelValue': (value: ILxRteDocument) => wrapper.setProps({ modelValue: value }),
			},
		});

		const editor = wrapper.find('.lx-rte__editor');
		expect(wrapper.find('.lx-rte__toolbar').exists()).toBe(true);
		expect(editor.attributes('data-placeholder')).toBe('Start writing...');
		expect(editor.attributes('contenteditable')).toBe('true');
		expect(editor.text()).toContain('Alpha');

		await wrapper.setProps({ modelValue: createDocument('Bravo') });
		expect(editor.text()).toContain('Bravo');

		await editor.trigger('focus');
		const editorElement = editor.element as HTMLElement;
		editorElement.innerHTML = '<p>Changed</p>';
		await editor.trigger('input');
		await wrapper.vm.$nextTick();
		expect(JSON.stringify(wrapper.props('modelValue'))).toContain('Changed');
		await editor.trigger('blur');
		wrapper.unmount();
	});

	it('supports disabled/readonly/showToolbar and autofocus branches', async () => {
		const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus');
		const wrapper = mount(LxRte, {
			props: {
				disabled: true,
				readonly: true,
				showToolbar: false,
				autofocus: true,
			},
		});

		expect(wrapper.find('.lx-rte__toolbar').exists()).toBe(false);
		expect(wrapper.find('.lx-rte').classes()).toContain('lx-rte--disabled');
		expect(wrapper.find('.lx-rte').classes()).toContain('lx-rte--readonly');
		expect(wrapper.find('.lx-rte__editor').attributes('contenteditable')).toBe('false');
		expect(wrapper.find('.lx-rte__editor').attributes('aria-disabled')).toBe('true');
		expect(focusSpy).not.toHaveBeenCalled();
	});

	it('handles action modules (kind + no kind) and filter unknown toolbar ids', async () => {
		const actionRun = vi.fn();
		const implicitRun = vi.fn();
		const modules: ILxRteModule[] = [
			{
				id: 'custom-action',
				label: 'Custom Action',
				kind: 'action',
				group: 'x',
				run: actionRun,
			},
			{
				id: 'custom-implicit',
				label: 'Custom Implicit',
				group: 'y',
				run: implicitRun,
			},
		];

		const wrapper = mount(LxRte, {
			props: {
				modules,
				toolbarModules: ['custom-action', 'missing-id', 'custom-implicit'],
			},
		});

		const buttons = wrapper.findAll('.lx-rte__toolbar-button');
		expect(buttons).toHaveLength(2);
		expect(wrapper.findAll('.lx-rte__divider').length).toBeGreaterThanOrEqual(1);
		await buttons[0].trigger('click');
		await buttons[1].trigger('click');
		expect(actionRun).toHaveBeenCalledTimes(1);
		expect(implicitRun).toHaveBeenCalledTimes(1);
	});

	it('opens menu module, runs menu command, and closes on outside click', async () => {
		const wrapper = mount(LxRte, {
			attachTo: document.body,
			props: {
				toolbarModules: ['list'],
			},
		});

		const button = wrapper.find('.lx-rte__toolbar-button');
		await button.trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);
		const option = wrapper.find('.lx-rte__menu-option');
		await option.trigger('click');
		expect((document.execCommand as unknown as ReturnType<typeof vi.fn>)).toHaveBeenCalled();
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(false);

		await button.trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);
		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(false);
		wrapper.unmount();
	});

	it('handles form module lifecycle with onOpen/onApply and cancel', async () => {
		const onApply = vi.fn();
		const formModule: ILxRteModule = {
			id: 'custom-form',
			label: 'Custom Form',
			kind: 'form',
			group: 'forms',
			getFormFields: () => [
				{ id: 'name', label: 'Name', type: 'text', placeholder: 'Name' },
				{
					id: 'mode',
					label: 'Mode',
					type: 'select',
					options: [
						{ label: 'A', value: 'a' },
						{ label: 'B', value: 'b' },
					],
				},
			],
			onOpen: context => {
				context.saveSelection();
				return { name: 'hello', mode: 'b' };
			},
			onApply,
		};

		const wrapper = mount(LxRte, {
			attachTo: document.body,
			props: {
				'modelValue': createDocument('Select me'),
				'modules': [formModule],
				'toolbarModules': ['custom-form'],
				'onUpdate:modelValue': (value: ILxRteDocument) => wrapper.setProps({ modelValue: value }),
			},
		});

		const editorNode = wrapper.find('.lx-rte__editor').element.firstChild;
		if (editorNode) {
			setSelectionOnNode(editorNode, false);
		}

		await wrapper.find('.lx-rte__toolbar-button').trigger('click');
		expect(wrapper.find('.lx-rte__module-panel--form').exists()).toBe(true);
		expect(wrapper.find('.lx-rte__module-preview').text()).toContain('Selected:');
		const inputs = wrapper.findAll('input');
		await inputs[0].setValue('world');
		await wrapper.find('select').setValue('a');
		await wrapper.find('[aria-label="Apply changes"]').trigger('click');
		expect(onApply).toHaveBeenCalledTimes(1);
		await wrapper.find('[aria-label="Cancel changes"]').trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(false);
		wrapper.unmount();
	});

	it('closes form panel when module has no onApply', async () => {
		const wrapper = mount(LxRte, {
			props: {
				modules: [
					{
						id: 'form-no-apply',
						label: 'Form No Apply',
						kind: 'form',
						getFormFields: () => [
							{ id: 'x', label: 'X', type: 'text' },
							{ id: 'mode', label: 'Mode', type: 'select' },
						],
					},
				],
				toolbarModules: ['form-no-apply'],
			},
		});

		await wrapper.find('.lx-rte__toolbar-button').trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);
		await wrapper.find('[aria-label="Apply changes"]').trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(false);
	});

	it('handles keydown logic for list indentation/outdent branches', async () => {
		const execSpy = document.execCommand as unknown as ReturnType<typeof vi.fn>;
		const wrapper = mount(LxRte, { attachTo: document.body });
		const editorEl = wrapper.find('.lx-rte__editor').element as HTMLElement;
		editorEl.innerHTML = '<ul><li>Item</li></ul>';
		const listItem = editorEl.querySelector('li');
		expect(listItem).toBeTruthy();
		if (!listItem?.firstChild) {
			throw new Error('Missing list item text node');
		}

		setSelectionOnNode(listItem.firstChild, true);
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Tab', shiftKey: false });
		setSelectionOnNode(listItem.firstChild, true);
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Tab', shiftKey: true });
		setSelectionOnNode(listItem.firstChild, true);
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Enter' });
		expect(execSpy).toHaveBeenCalledWith('indent', false, undefined);
		expect(execSpy).toHaveBeenCalledWith('outdent', false, undefined);

		listItem.textContent = '';
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Backspace' });
		expect(execSpy).toHaveBeenCalledWith('outdent', false, undefined);

		listItem.textContent = 'Not empty';
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Backspace' });
		const outdentCalls = execSpy.mock.calls.filter(call => call[0] === 'outdent');
		expect(outdentCalls.length).toBeGreaterThanOrEqual(2);
	});

	it('covers selectionchange/query failure and block detection branches', async () => {
		const querySpy = vi.spyOn(document, 'queryCommandState').mockImplementation(command => {
			if (command === 'underline') {
				throw new Error('query fail');
			}
			return command === 'bold';
		});

		const wrapper = mount(LxRte, { attachTo: document.body });
		const editor = wrapper.find('.lx-rte__editor');
		const editorEl = editor.element as HTMLElement;
		await editor.trigger('focus');

		editorEl.innerHTML = '<h1>A</h1><h2>B</h2><h3>C</h3><blockquote>D</blockquote><pre>E</pre><ul><li>F</li></ul><ol><li>G</li></ol><p>H</p>';
		const nodes = Array.from(editorEl.querySelectorAll('h1,h2,h3,blockquote,pre,ul,ol,ul li,ol li,p'));
		for (const node of nodes) {
			if (!node.firstChild && node.nodeName !== 'UL' && node.nodeName !== 'OL') {
				continue;
			}
			setSelectionOnNode(node.nodeName === 'UL' || node.nodeName === 'OL' ? node : node.firstChild as Node, true);
			document.dispatchEvent(new Event('selectionchange'));
		}

		expect(querySpy).toHaveBeenCalled();
		await editor.trigger('blur');
		document.dispatchEvent(new Event('selectionchange'));
	});

	it('covers no-selection and toolbar click outside no-op branches', async () => {
		const wrapper = mount(LxRte, {
			props: {
				toolbarModules: ['block'],
			},
		});
		const vm = wrapper.vm as unknown as {
			onToolbarModuleClick: (module: ILxRteModule, event?: MouseEvent) => void,
		};

		const blockButton = wrapper.find('.lx-rte__toolbar-button');
		await blockButton.trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);
		await blockButton.trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(false);

		const missingEventModule: ILxRteModule = {
			id: 'menu-no-event',
			label: 'Menu No Event',
			kind: 'menu',
			getMenuOptions: () => [{ id: 'x', label: 'X', command: 'bold' }],
		};
		await wrapper.setProps({
			modules: [missingEventModule],
			toolbarModules: ['menu-no-event'],
		});
		vm.onToolbarModuleClick(missingEventModule);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);
		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(false);
	});

	it('covers internal context and early-return branches without changing component code', async () => {
		const wrapper = mount(LxRte, {
			attachTo: document.body,
			props: {
				modules: null as unknown as ILxRteModule[],
			},
		});

		const state = (wrapper.vm as unknown as { $: { setupState: Record<string, unknown> } }).$?.setupState as Record<string, unknown>;
		const context = state.context as {
			isDisabled: boolean,
			readonly: boolean,
			toolbarState: unknown,
			getSelectionElement: () => HTMLElement | null,
			getSelectedText: () => string,
			saveSelection: () => void,
			restoreSelection: () => void,
			getEditorElement: () => HTMLElement | null,
			syncModelFromEditor: () => void,
			closeActivePanel: () => void,
			runCommand: (command: string, value?: string) => void,
		};
		const onToolbarModuleClick = state.onToolbarModuleClick as (module: ILxRteModule) => void;
		const syncEditorFromModel = state.syncEditorFromModel as () => void;

		expect(context.isDisabled).toBe(false);
		expect(context.readonly).toBe(false);
		expect(context.toolbarState).toBeTruthy();

		const getSelectionSpy = vi.spyOn(window, 'getSelection');
		getSelectionSpy.mockReturnValue(null);
		expect(context.getSelectedText()).toBe('');
		context.saveSelection();
		context.restoreSelection();

		const selectionWithoutRange = {
			rangeCount: 0,
			toString: () => '',
			removeAllRanges: vi.fn(),
			addRange: vi.fn(),
		} as unknown as Selection;
		getSelectionSpy.mockReturnValue(selectionWithoutRange);
		context.saveSelection();

		const selectionWithoutAnchor = {
			rangeCount: 1,
			anchorNode: null,
			toString: () => 'x',
			getRangeAt: () => document.createRange(),
			removeAllRanges: vi.fn(),
			addRange: vi.fn(),
		} as unknown as Selection;
		getSelectionSpy.mockReturnValue(selectionWithoutAnchor);
		expect(context.getSelectionElement()).toBeNull();

		const range = document.createRange();
		const textNode = document.createTextNode('abc');
		const holder = document.createElement('div');
		holder.appendChild(textNode);
		const selectionWithRange = {
			rangeCount: 1,
			anchorNode: textNode,
			toString: () => 'abc',
			getRangeAt: () => range,
			removeAllRanges: vi.fn(),
			addRange: vi.fn(),
		} as unknown as Selection;
		getSelectionSpy.mockReturnValue(selectionWithRange);
		context.saveSelection();
		context.restoreSelection();
		expect(context.getSelectionElement()).not.toBeNull();
		getSelectionSpy.mockReturnValue(null);
		context.restoreSelection();
		expect(context.getEditorElement()).toBeTruthy();
		context.syncModelFromEditor();
		context.closeActivePanel();

		await wrapper.setProps({ disabled: true });
		context.runCommand('bold');
		const execSpy = document.execCommand as unknown as ReturnType<typeof vi.fn>;
		expect(execSpy).not.toHaveBeenCalledWith('bold', false, undefined);
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Tab' });
		onToolbarModuleClick({
			id: 'guard-disabled',
			label: 'Guard Disabled',
			kind: 'menu',
			getMenuOptions: () => [{ id: 'x', label: 'X', command: 'bold' }],
		});
		await wrapper.setProps({ disabled: false });
		await wrapper.setProps({
			modules: [
				{ id: 'menu-fallback', label: 'Menu Fallback', kind: 'menu' },
				{ id: 'form-fallback', label: 'Form Fallback', kind: 'form', onOpen: () => ({}) },
			],
			toolbarModules: ['menu-fallback', 'form-fallback'],
		});
		await wrapper.findAll('.lx-rte__toolbar-button')[0].trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);
		await wrapper.findAll('.lx-rte__toolbar-button')[1].trigger('click');
		expect(wrapper.find('.lx-rte__module-panel').exists()).toBe(true);

		await wrapper.setProps({ modelValue: createDocument('watch-updated-editor') });

		const editorEl = wrapper.find('.lx-rte__editor').element as HTMLElement;
		editorEl.innerHTML = '<p>Outside list</p><ul><li><ul><li></li></ul></li></ul>';
		const plainTextNode = editorEl.querySelector('p')?.firstChild;
		if (plainTextNode) {
			setSelectionOnNode(plainTextNode, true);
		}
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Tab' });
		getSelectionSpy.mockReturnValue(null);
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Tab' });
		getSelectionSpy.mockRestore();

		const textLi = document.createElement('li');
		textLi.appendChild(document.createTextNode('branch'));
		editorEl.querySelector('ul')?.appendChild(textLi);
		if (textLi.firstChild) {
			setSelectionOnNode(textLi.firstChild, false);
		}
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Backspace' });
		const nestedOnlyLi = editorEl.querySelector('ul > li');
		const nestedList = nestedOnlyLi?.querySelector('ul');
		if (nestedList) {
			setSelectionOnNode(nestedList, true);
		}
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Backspace' });

		const emptyLi = editorEl.querySelector('ul li');
		if (emptyLi?.firstChild) {
			setSelectionOnNode(emptyLi.firstChild, true);
		}
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Backspace' });

		const floatingLi = document.createElement('li');
		floatingLi.appendChild(document.createTextNode('floating'));
		editorEl.appendChild(floatingLi);
		if (floatingLi.firstChild) {
			setSelectionOnNode(floatingLi.firstChild, true);
		}
		document.dispatchEvent(new Event('selectionchange'));

		const hackedLi = document.createElement('li');
		hackedLi.appendChild(document.createTextNode('x'));
		editorEl.appendChild(hackedLi);
		const cloneNodeSpy = vi.spyOn(hackedLi, 'cloneNode').mockImplementation(() => {
			const fake = document.createElement('li');
			Object.defineProperty(fake, 'textContent', {
				get: () => null,
			});
			return fake;
		});
		if (hackedLi.firstChild) {
			setSelectionOnNode(hackedLi.firstChild, true);
		}
		await wrapper.find('.lx-rte__editor').trigger('keydown', { key: 'Backspace' });
		cloneNodeSpy.mockRestore();

		getSelectionSpy.mockRestore();
		wrapper.unmount();
		syncEditorFromModel();
		context.syncModelFromEditor();
	});
});
