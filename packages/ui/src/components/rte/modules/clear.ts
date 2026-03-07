import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'clear',
	label: 'Clear',
	iconName: 'eraser',
	group: 'history',
	kind: 'action',
	run: context => {
		context.runCommand('removeFormat');
	},
});
