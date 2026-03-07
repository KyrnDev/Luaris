import { defineComponent, h, type VNode, type VNodeChild } from 'vue';
import type {
	ILxRteDocument,
	ILxRteRendererProps,
	ILxRteTextNode,
	TLxRteMark,
	TLxRteBlockNode,
	TLxRteInlineNode,
} from '../types';

const MARK_TAG_MAP: Record<TLxRteMark, string> = {
	bold: 'strong',
	italic: 'em',
	underline: 'u',
	strike: 's',
	code: 'code',
};

const renderTextNode = (node: ILxRteTextNode): VNodeChild => {
	let content: VNodeChild = node.value;

	for (const mark of node.marks ?? []) {
		content = h(MARK_TAG_MAP[mark], {}, [content]);
	}

	return content;
};

const renderInlineNode = (node: TLxRteInlineNode): VNodeChild => {
	if (node.type === 'text') {
		return renderTextNode(node);
	}

	return h('a', {
		class: 'lx-rte__link',
		href: node.href,
		title: node.title,
		target: node.target,
		rel: node.rel,
	}, node.children.map(renderTextNode));
};

const renderStandardBlockNode = (tagName: string, block: Extract<TLxRteBlockNode, { children: TLxRteInlineNode[] }>): VNode =>
	h(tagName, {
		class: `lx-rte__block lx-rte__block--${block.type}`,
	}, block.children.map(renderInlineNode));

const renderBlockNode = (block: TLxRteBlockNode): VNode => {
	if (block.type === 'paragraph') {
		return renderStandardBlockNode('p', block);
	}

	if (block.type === 'heading-1') {
		return renderStandardBlockNode('h1', block);
	}

	if (block.type === 'heading-2') {
		return renderStandardBlockNode('h2', block);
	}

	if (block.type === 'heading-3') {
		return renderStandardBlockNode('h3', block);
	}

	if (block.type === 'quote') {
		return renderStandardBlockNode('blockquote', block);
	}

	if (block.type === 'code-block') {
		return h('pre', {
			class: 'lx-rte__block lx-rte__block--code-block',
		}, [
			h('code', {}, block.children.map(renderInlineNode)),
		]);
	}

	if (block.type === 'unordered-list') {
		return h('ul', {
			class: 'lx-rte__block lx-rte__block--unordered-list',
		}, block.items.map(item =>
			h('li', {
				class: 'lx-rte__list-item',
			}, item.children.map(renderInlineNode)),
		));
	}

	return h('ol', {
		class: 'lx-rte__block lx-rte__block--ordered-list',
	}, block.items.map(item =>
		h('li', {
			class: 'lx-rte__list-item',
		}, item.children.map(renderInlineNode)),
	));
};

const renderDocument = (documentModel: ILxRteDocument): VNode[] =>
	documentModel.children.map(renderBlockNode);

export const LxRteRenderer = defineComponent<ILxRteRendererProps>({
	name: 'LxRteRenderer',
	props: {
		document: {
			type: Object,
			required: true,
		},
		editable: {
			type: Boolean,
			default: false,
		},
	},
	setup: props => () =>
		renderDocument(props.document),
});
