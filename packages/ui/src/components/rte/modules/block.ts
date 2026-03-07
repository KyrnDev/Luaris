import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'block',
	label: 'Block',
	iconName: 'paragraph',
	group: 'blocks',
	kind: 'menu',
	getMenuOptions: () => [
		{
			id: 'paragraph',
			label: 'Paragraph',
			command: 'formatBlock',
			value: '<p>',
			iconName: 'paragraph',
		},
		{
			id: 'heading-1',
			label: 'Heading 1',
			command: 'formatBlock',
			value: '<h1>',
			iconName: 'heading',
		},
		{
			id: 'heading-2',
			label: 'Heading 2',
			command: 'formatBlock',
			value: '<h2>',
			iconName: 'heading',
		},
		{
			id: 'heading-3',
			label: 'Heading 3',
			command: 'formatBlock',
			value: '<h3>',
			iconName: 'heading',
		},
		{
			id: 'quote',
			label: 'Quote',
			command: 'formatBlock',
			value: '<blockquote>',
			iconName: 'quote-left',
		},
		{
			id: 'code-block',
			label: 'Code block',
			command: 'formatBlock',
			value: '<pre>',
			iconName: 'code',
		},
	],
});
