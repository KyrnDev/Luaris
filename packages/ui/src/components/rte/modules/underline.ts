import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'underline',
	label: 'Underline',
	iconName: 'underline',
	group: 'marks',
	kind: 'action',
	isActive: context => context.toolbarState.underline,
	run: context => {
		context.runCommand('underline');
	},
});
