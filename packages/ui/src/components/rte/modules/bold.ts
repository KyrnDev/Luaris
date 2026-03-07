import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'bold',
	label: 'Bold',
	iconName: 'bold',
	group: 'marks',
	kind: 'action',
	isActive: context => context.toolbarState.bold,
	run: context => {
		context.runCommand('bold');
	},
});
