<template>
	<div class="lx-markdown-preview" v-html="renderedHtml" />
</template>

<script setup lang='ts'>
	import { computed } from 'vue';
	import type { ILxMarkdownPreviewProps } from './types';

	const props = withDefaults(defineProps<ILxMarkdownPreviewProps>(), {
		source: '',
	});

	const escapeHtml = (value: string): string => value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	const renderInline = (value: string): string => {
		let html = escapeHtml(value);
		html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
		html = html.replace(/`(.+?)`/g, '<code>$1</code>');
		html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
		return html;
	};

	const isTableSeparator = (line: string): boolean => {
		const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
		if (cells.length < 2) {
			return false;
		}
		return cells.every(cell => /^:?-+:?$/.test(cell));
	};

	const isTableRow = (line: string): boolean => {
		const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
		return cells.length >= 2 && cells.every(cell => cell.length > 0);
	};

	const parseTableCellValues = (line: string): string[] => {
		return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
	};

	const renderTable = (lines: string[]): string => {
		const headerCells = parseTableCellValues((/* c8 ignore next */ lines[0]) || '');
		const bodyRows = lines.slice(2).filter(line => isTableRow(line)).map(line => parseTableCellValues(line));
		const thead = `<thead><tr>${headerCells.map(cell => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`;
		const tbody = `<tbody>${bodyRows.map(row => `<tr>${row.map(cell => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`;
		return `<table>${thead}${tbody}</table>`;
	};

	const renderMarkdown = (markdown: string): string => {
		const rawBlocks = markdown.split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
		const htmlBlocks = rawBlocks.map(block => {
			const lines = block.split('\n').map(line => line.trimEnd());
			if (lines.length >= 2 && isTableRow((/* c8 ignore next */ lines[0]) || '') && isTableSeparator((/* c8 ignore next */ lines[1]) || '')) {
				return renderTable(lines);
			}

			if (lines.every(line => /^-\s+/.test(line))) {
				const listItems = lines.map(line => `<li>${renderInline(line.replace(/^-\s+/, ''))}</li>`).join('');
				return `<ul>${listItems}</ul>`;
			}

			if (lines.length === 1) {
				const line = (/* c8 ignore next */ lines[0]) || '';
				if (/^###\s+/.test(line)) {
					return `<h3>${renderInline(line.replace(/^###\s+/, ''))}</h3>`;
				}
				if (/^##\s+/.test(line)) {
					return `<h2>${renderInline(line.replace(/^##\s+/, ''))}</h2>`;
				}
				if (/^#\s+/.test(line)) {
					return `<h1>${renderInline(line.replace(/^#\s+/, ''))}</h1>`;
				}
			}

			return `<p>${lines.map(line => renderInline(line)).join('<br>')}</p>`;
		});

		return htmlBlocks.join('');
	};

	const renderedHtml = computed(() => renderMarkdown(props.source));
</script>

<style scoped lang='scss'>
	.lx-markdown-preview {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-md);
	}

	.lx-markdown-preview :deep(h1),
	.lx-markdown-preview :deep(h2),
	.lx-markdown-preview :deep(h3) {
		line-height: 1.2;
	}

	.lx-markdown-preview :deep(code) {
		background: var(--lx-colour-surface-sunken);
		border-radius: var(--lx-size-radius-xs);
		padding: 0 var(--lx-size-space-2xs);
	}

	.lx-markdown-preview :deep(table) {
		border-collapse: collapse;
		width: 100%;
	}

	.lx-markdown-preview :deep(th),
	.lx-markdown-preview :deep(td) {
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
		text-align: left;
	}

	.lx-markdown-preview :deep(th) {
		background: var(--lx-colour-surface-base);
		font-weight: var(--lx-font-weight-semibold);
	}
</style>
