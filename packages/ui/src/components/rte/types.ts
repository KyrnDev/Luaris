import type { CSSProperties } from 'vue';
import type { TLxIconSize, TLxIconStyle } from '../icon/types';

export type TLxRteMark = 'bold' | 'italic' | 'underline' | 'strike' | 'code';

export type TLxRteBlockType = 'paragraph' | 'heading-1' | 'heading-2' | 'heading-3' | 'quote' | 'code-block' | 'unordered-list' | 'ordered-list';

export interface ILxRteTextNode {
	type: 'text',
	value: string,
	marks?: TLxRteMark[],
}

export interface ILxRteLinkNode {
	type: 'link',
	href: string,
	title?: string,
	target?: '_self' | '_blank',
	rel?: string,
	children: ILxRteTextNode[],
}

export type TLxRteInlineNode = ILxRteTextNode | ILxRteLinkNode;

export interface ILxRteParagraphBlockNode {
	type: 'paragraph',
	children: TLxRteInlineNode[],
}

export interface ILxRteHeading1BlockNode {
	type: 'heading-1',
	children: TLxRteInlineNode[],
}

export interface ILxRteHeading2BlockNode {
	type: 'heading-2',
	children: TLxRteInlineNode[],
}

export interface ILxRteHeading3BlockNode {
	type: 'heading-3',
	children: TLxRteInlineNode[],
}

export interface ILxRteQuoteBlockNode {
	type: 'quote',
	children: TLxRteInlineNode[],
}

export interface ILxRteCodeBlockNode {
	type: 'code-block',
	children: TLxRteInlineNode[],
}

export interface ILxRteListItemNode {
	children: TLxRteInlineNode[],
}

export interface ILxRteUnorderedListBlockNode {
	type: 'unordered-list',
	items: ILxRteListItemNode[],
}

export interface ILxRteOrderedListBlockNode {
	type: 'ordered-list',
	items: ILxRteListItemNode[],
}

export type TLxRteBlockNode = ILxRteParagraphBlockNode | ILxRteHeading1BlockNode | ILxRteHeading2BlockNode | ILxRteHeading3BlockNode | ILxRteQuoteBlockNode | ILxRteCodeBlockNode | ILxRteUnorderedListBlockNode | ILxRteOrderedListBlockNode;

export interface ILxRteDocument {
	type: 'doc',
	children: TLxRteBlockNode[],
}

export interface ILxRteProps {
	placeholder?: string,
	disabled?: boolean,
	readonly?: boolean,
	autofocus?: boolean,
	showToolbar?: boolean,
	toolbarModules?: string[],
	modules?: ILxRteModule[],
	minHeight?: string,
	style?: CSSProperties,
}

export interface ILxRteRendererProps {
	document: ILxRteDocument,
	editable?: boolean,
}

export interface ILxRteToolbarState {
	bold: boolean,
	italic: boolean,
	underline: boolean,
	strike: boolean,
	orderedList: boolean,
	unorderedList: boolean,
	block: TLxRteBlockType,
}

export interface ILxRteModuleMenuOption {
	id: string,
	label: string,
	command: string,
	value?: string,
	iconName?: string,
	iconStyle?: TLxIconStyle,
	iconSize?: TLxIconSize,
}

export interface ILxRteModuleFieldOption {
	label: string,
	value: string,
}

export type TLxRteModuleFieldType = 'text' | 'select';

export interface ILxRteModuleFormField {
	id: string,
	label: string,
	type: TLxRteModuleFieldType,
	placeholder?: string,
	options?: ILxRteModuleFieldOption[],
}

export type TLxRteModuleFormState = Record<string, string>;

export interface ILxRteModuleContext {
	isDisabled: boolean,
	readonly: boolean,
	toolbarState: ILxRteToolbarState,
	runCommand: (command: string, value?: string) => void,
	getSelectionElement: () => HTMLElement | null,
	getSelectedText: () => string,
	saveSelection: () => void,
	restoreSelection: () => void,
	getEditorElement: () => HTMLElement | null,
	syncModelFromEditor: () => void,
	closeActivePanel: () => void,
}

export type TLxRteModuleKind = 'action' | 'menu' | 'form';

export interface ILxRteModule {
	id: string,
	label: string,
	toolbarText?: string,
	iconName?: string,
	iconStyle?: TLxIconStyle,
	iconSize?: TLxIconSize,
	group?: string,
	kind?: TLxRteModuleKind,
	isActive?: (context: ILxRteModuleContext) => boolean,
	run?: (context: ILxRteModuleContext) => void,
	getMenuOptions?: (context: ILxRteModuleContext) => ILxRteModuleMenuOption[],
	getFormFields?: (context: ILxRteModuleContext) => ILxRteModuleFormField[],
	onOpen?: (context: ILxRteModuleContext) => TLxRteModuleFormState,
	onApply?: (context: ILxRteModuleContext, state: TLxRteModuleFormState) => void,
}
