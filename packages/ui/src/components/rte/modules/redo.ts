import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'redo',
	label: 'Redo',
	iconName: 'rotate-right',
	group: 'history',
	kind: 'action',
	run: context => {
		context.runCommand('redo');
	},
});
