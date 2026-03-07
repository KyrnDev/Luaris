import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'undo',
	label: 'Undo',
	iconName: 'rotate-left',
	group: 'history',
	kind: 'action',
	run: context => {
		context.runCommand('undo');
	},
});
