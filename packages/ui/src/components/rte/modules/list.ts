import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'list',
	label: 'List',
	iconName: 'list',
	group: 'blocks',
	kind: 'menu',
	isActive: context => context.toolbarState.unorderedList || context.toolbarState.orderedList,
	getMenuOptions: () => [
		{
			id: 'unordered',
			label: 'Bullet list',
			command: 'insertUnorderedList',
			iconName: 'list-ul',
		},
		{
			id: 'ordered',
			label: 'Numbered list',
			command: 'insertOrderedList',
			iconName: 'list-ol',
		},
	],
});
