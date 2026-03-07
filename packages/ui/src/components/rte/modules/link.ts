import type { ILxRteModule, TLxRteModuleFormState } from '../types';
import { defineRteModule } from '../engine/defineRteModule';

const escapeAttribute = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

const getSelectedAnchor = (context: Parameters<NonNullable<ILxRteModule['onOpen']>>[0]): HTMLAnchorElement | null => {
	const selectionElement = context.getSelectionElement();
	if (!selectionElement) {
		return null;
	}

	return selectionElement.closest('a') as HTMLAnchorElement | null;
};

export default defineRteModule({
	id: 'link',
	label: 'Link',
	iconName: 'link',
	group: 'insert',
	kind: 'form',
	getFormFields: () => [
		{
			id: 'href',
			label: 'URL',
			type: 'text',
			placeholder: 'https://example.com',
		},
		{
			id: 'title',
			label: 'Title',
			type: 'text',
			placeholder: 'Optional title',
		},
		{
			id: 'target',
			label: 'Target',
			type: 'select',
			options: [
				{ label: 'Same tab', value: '_self' },
				{ label: 'New tab', value: '_blank' },
			],
		},
		{
			id: 'rel',
			label: 'Rel',
			type: 'text',
			placeholder: 'Optional rel',
		},
	],
	onOpen: (context): TLxRteModuleFormState => {
		context.saveSelection();
		const selectedAnchor = getSelectedAnchor(context);
		return {
			href: selectedAnchor?.getAttribute('href') ?? '',
			title: selectedAnchor?.getAttribute('title') ?? '',
			target: selectedAnchor?.getAttribute('target') === '_blank' ? '_blank' : '_self',
			rel: selectedAnchor?.getAttribute('rel') ?? '',
		};
	},
	onApply: (context, state): void => {
		const hrefRaw = (state.href ?? '').trim();
		if (!hrefRaw.length) {
			context.closeActivePanel();
			return;
		}

		const href = /^(https?:\/\/|mailto:|tel:)/.test(hrefRaw) ? hrefRaw : `https://${hrefRaw}`;
		context.restoreSelection();
		const selectedText = context.getSelectedText();
		if (selectedText.length) {
			context.runCommand('createLink', href);
		} else {
			const safeHref = escapeAttribute(href);
			context.runCommand('insertHTML', `<a href="${safeHref}">${safeHref}</a>`);
		}

		const selectedAnchor = getSelectedAnchor(context)
			?? (() => {
				const editorElement = context.getEditorElement();
				if (!editorElement) {
					return null;
				}

				const anchors = editorElement.querySelectorAll('a');
				return anchors.length ? anchors[anchors.length - 1] : null;
			})();

		if (selectedAnchor) {
			selectedAnchor.setAttribute('href', href);
			const title = (state.title ?? '').trim();
			const target = state.target === '_blank' ? '_blank' : '_self';
			const rel = (state.rel ?? '').trim() || (target === '_blank' ? 'noreferrer noopener' : '');

			if (title.length) {
				selectedAnchor.setAttribute('title', title);
			} else {
				selectedAnchor.removeAttribute('title');
			}

			selectedAnchor.setAttribute('target', target);

			if (rel.length) {
				selectedAnchor.setAttribute('rel', rel);
			} else {
				selectedAnchor.removeAttribute('rel');
			}
		}

		context.syncModelFromEditor();
		context.closeActivePanel();
	},
});
