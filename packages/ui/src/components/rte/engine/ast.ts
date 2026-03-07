import type {
	TLxRteBlockNode,
	ILxRteCodeBlockNode,
	ILxRteDocument,
	TLxRteInlineNode,
	ILxRteListItemNode,
	ILxRteTextNode,
	TLxRteMark,
} from '../types';

const MARK_TAGS: Record<string, TLxRteMark | undefined> = {
	strong: 'bold',
	b: 'bold',
	em: 'italic',
	i: 'italic',
	u: 'underline',
	s: 'strike',
	strike: 'strike',
	del: 'strike',
	code: 'code',
};

const toNormalisedTextNode = (value: string, marks: TLxRteMark[]): ILxRteTextNode | null => {
	const trimmedValue = value.replace(/\u00A0/g, ' ');
	if (!trimmedValue.length && !value.length) {
		return null;
	}

	return {
		type: 'text',
		value: trimmedValue,
		marks: marks.length ? [...marks] : undefined,
	};
};

const escapeHtml = (value: string): string => value
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;');

const inlineNodeToHtml = (node: TLxRteInlineNode): string => {
	if (node.type === 'text') {
		let html = escapeHtml(node.value);
		for (const mark of node.marks ?? []) {
			if (mark === 'bold') {
				html = `<strong>${html}</strong>`;
				continue;
			}
			if (mark === 'italic') {
				html = `<em>${html}</em>`;
				continue;
			}
			if (mark === 'underline') {
				html = `<u>${html}</u>`;
				continue;
			}
			if (mark === 'strike') {
				html = `<s>${html}</s>`;
				continue;
			}
			if (mark === 'code') {
				html = `<code>${html}</code>`;
			}
		}
		return html;
	}

	const href = escapeHtml(node.href);
	const title = node.title ? ` title="${escapeHtml(node.title)}"` : '';
	const target = node.target ? ` target="${escapeHtml(node.target)}"` : '';
	const rel = node.rel ? ` rel="${escapeHtml(node.rel)}"` : '';
	return `<a href="${href}"${title}${target}${rel}>${node.children.map(inlineNodeToHtml).join('')}</a>`;
};

const blockNodeToHtml = (block: TLxRteBlockNode): string => {
	if (block.type === 'paragraph') {
		return `<p>${block.children.map(inlineNodeToHtml).join('')}</p>`;
	}
	if (block.type === 'heading-1') {
		return `<h1>${block.children.map(inlineNodeToHtml).join('')}</h1>`;
	}
	if (block.type === 'heading-2') {
		return `<h2>${block.children.map(inlineNodeToHtml).join('')}</h2>`;
	}
	if (block.type === 'heading-3') {
		return `<h3>${block.children.map(inlineNodeToHtml).join('')}</h3>`;
	}
	if (block.type === 'quote') {
		return `<blockquote>${block.children.map(inlineNodeToHtml).join('')}</blockquote>`;
	}
	if (block.type === 'code-block') {
		return `<pre><code>${block.children.map(inlineNodeToHtml).join('')}</code></pre>`;
	}
	if (block.type === 'unordered-list') {
		return `<ul>${block.items.map(item => `<li>${item.children.map(inlineNodeToHtml).join('')}</li>`).join('')}</ul>`;
	}

	return `<ol>${block.items.map(item => `<li>${item.children.map(inlineNodeToHtml).join('')}</li>`).join('')}</ol>`;
};

const mergeTextNodes = (nodes: ILxRteTextNode[]): ILxRteTextNode[] => {
	const merged: ILxRteTextNode[] = [];

	for (const node of nodes) {
		const previous = merged[merged.length - 1];
		const previousMarks = previous?.marks ?? [];
		const nodeMarks = node.marks ?? [];
		const hasSameMarks = previousMarks.length === nodeMarks.length
			&& previousMarks.every((mark: TLxRteMark, index: number) => mark === nodeMarks[index]);

		if (previous && hasSameMarks) {
			previous.value += node.value;
			continue;
		}

		merged.push({
			type: 'text',
			value: node.value,
			marks: node.marks ? [...node.marks] : undefined,
		});
	}

	return merged;
};

const parseInlineNodesFromNode = (
	node: ChildNode,
	activeMarks: TLxRteMark[] = [],
): TLxRteInlineNode[] => {
	if (node.nodeType === Node.TEXT_NODE) {
		const textNode = toNormalisedTextNode(node.textContent ?? '', activeMarks);
		return textNode ? [textNode] : [];
	}

	if (!(node instanceof HTMLElement)) {
		return [];
	}

	const tagName = node.tagName.toLowerCase();

	if (tagName === 'a') {
		const href = node.getAttribute('href') ?? '';
		const title = node.getAttribute('title') ?? undefined;
		const target = node.getAttribute('target');
		const rel = node.getAttribute('rel') ?? undefined;
		const textChildren: ILxRteTextNode[] = [];
		for (const childNode of Array.from(node.childNodes)) {
			const parsedChildren = parseInlineNodesFromNode(childNode, activeMarks);
			for (const parsedNode of parsedChildren) {
				if (parsedNode.type === 'text') {
					textChildren.push(parsedNode);
				}
			}
		}

		const children = mergeTextNodes(textChildren);

		if (!children.length) {
			return [];
		}

		return [{
			type: 'link',
			href,
			title,
			target: target === '_blank' ? '_blank' : '_self',
			rel,
			children,
		}];
	}

	const mark = MARK_TAGS[tagName];
	const marks = mark ? [...activeMarks, mark] : activeMarks;

	const parsedNodes: TLxRteInlineNode[] = [];
	for (const childNode of Array.from(node.childNodes)) {
		parsedNodes.push(...parseInlineNodesFromNode(childNode, marks));
	}

	return parsedNodes;
};

const parseInlineNodesFromElement = (element: HTMLElement): TLxRteInlineNode[] => {
	const parsedNodes: TLxRteInlineNode[] = [];
	for (const node of Array.from(element.childNodes)) {
		parsedNodes.push(...parseInlineNodesFromNode(node));
	}

	const outputNodes: TLxRteInlineNode[] = [];
	let pendingTextNodes: ILxRteTextNode[] = [];

	const flushPendingTextNodes = (): void => {
		if (!pendingTextNodes.length) {
			return;
		}

		outputNodes.push(...mergeTextNodes(pendingTextNodes));
		pendingTextNodes = [];
	};

	for (const node of parsedNodes) {
		if (node.type === 'text') {
			pendingTextNodes.push(node);
			continue;
		}

		flushPendingTextNodes();
		outputNodes.push(node);
	}

	flushPendingTextNodes();

	return outputNodes;
};

const parseListItems = (listElement: HTMLElement): ILxRteListItemNode[] => {
	const listItems: ILxRteListItemNode[] = [];
	for (const childNode of listElement.children) {
		if (!(childNode instanceof HTMLLIElement)) {
			continue;
		}

		listItems.push({
			children: parseInlineNodesFromElement(childNode),
		});
	}

	return listItems;
};

const parseBlockFromElement = (element: HTMLElement): TLxRteBlockNode | null => {
	const tagName = element.tagName.toLowerCase();

	if (tagName === 'p') {
		return {
			type: 'paragraph',
			children: parseInlineNodesFromElement(element),
		};
	}

	if (tagName === 'h1') {
		return {
			type: 'heading-1',
			children: parseInlineNodesFromElement(element),
		};
	}

	if (tagName === 'h2') {
		return {
			type: 'heading-2',
			children: parseInlineNodesFromElement(element),
		};
	}

	if (tagName === 'h3') {
		return {
			type: 'heading-3',
			children: parseInlineNodesFromElement(element),
		};
	}

	if (tagName === 'blockquote') {
		return {
			type: 'quote',
			children: parseInlineNodesFromElement(element),
		};
	}

	if (tagName === 'pre') {
		const content = element.textContent ?? '';
		const codeBlock: ILxRteCodeBlockNode = {
			type: 'code-block',
			children: [{
				type: 'text',
				value: content,
			}],
		};
		return codeBlock;
	}

	if (tagName === 'ul') {
		return {
			type: 'unordered-list',
			items: parseListItems(element),
		};
	}

	if (tagName === 'ol') {
		return {
			type: 'ordered-list',
			items: parseListItems(element),
		};
	}

	return {
		type: 'paragraph',
		children: parseInlineNodesFromElement(element),
	};
};

const hasBlockChildren = (element: HTMLElement): boolean => {
	const blockTags = new Set(['p', 'h1', 'h2', 'h3', 'blockquote', 'pre', 'ul', 'ol']);
	for (const childNode of Array.from(element.children)) {
		if (!(childNode instanceof HTMLElement)) {
			continue;
		}

		if (blockTags.has(childNode.tagName.toLowerCase())) {
			return true;
		}
	}

	return false;
};

const isInlineNodeEmpty = (node: TLxRteInlineNode): boolean => {
	if (node.type === 'text') {
		return !node.value.trim().length;
	}

	return !node.children.some(childNode => childNode.value.trim().length > 0);
};

const isBlockNodeEmpty = (block: TLxRteBlockNode): boolean => {
	if ('items' in block) {
		return !block.items.some(item => item.children.some(childNode => !isInlineNodeEmpty(childNode)));
	}

	return !block.children.some(childNode => !isInlineNodeEmpty(childNode));
};

export const createEmptyRteDocument = (): ILxRteDocument => ({
	type: 'doc',
	children: [{
		type: 'paragraph',
		children: [{
			type: 'text',
			value: '',
		}],
	}],
});

export const isRteDocumentEmpty = (documentModel: ILxRteDocument): boolean =>
	documentModel.children.every(block => isBlockNodeEmpty(block));

export const cloneRteDocument = (documentModel: ILxRteDocument): ILxRteDocument =>
	JSON.parse(JSON.stringify(documentModel)) as ILxRteDocument;

export const domToRteDocument = (rootElement: HTMLElement): ILxRteDocument => {
	const blocks: TLxRteBlockNode[] = [];

	for (const childNode of rootElement.childNodes) {
		if (childNode.nodeType === Node.TEXT_NODE) {
			const content = childNode.textContent?.trim() ?? '';
			if (!content.length) {
				continue;
			}

			blocks.push({
				type: 'paragraph',
				children: [{
					type: 'text',
					value: content,
				}],
			});
			continue;
		}

		if (!(childNode instanceof HTMLElement)) {
			continue;
		}

		if (childNode.tagName.toLowerCase() === 'div' && hasBlockChildren(childNode)) {
			for (const nestedChild of Array.from(childNode.children)) {
				if (!(nestedChild instanceof HTMLElement)) {
					continue;
				}

				const nestedBlock = parseBlockFromElement(nestedChild);
				if (nestedBlock) {
					blocks.push(nestedBlock);
				}
			}

			continue;
		}

		const block = parseBlockFromElement(childNode);
		if (block) {
			blocks.push(block);
		}
	}

	if (!blocks.length) {
		return createEmptyRteDocument();
	}

	return {
		type: 'doc',
		children: blocks,
	};
};

export const rteDocumentToHtml = (documentModel: ILxRteDocument): string => {
	if (!documentModel.children.length) {
		return '<p></p>';
	}

	return documentModel.children.map(blockNodeToHtml).join('');
};
