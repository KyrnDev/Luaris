import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'italic',
	label: 'Italic',
	iconName: 'italic',
	group: 'marks',
	kind: 'action',
	isActive: context => context.toolbarState.italic,
	run: context => {
		context.runCommand('italic');
	},
});
