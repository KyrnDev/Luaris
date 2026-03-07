import { defineRteModule } from '../engine/defineRteModule';

export default defineRteModule({
	id: 'strike',
	label: 'Strike',
	iconName: 'strikethrough',
	group: 'marks',
	kind: 'action',
	isActive: context => context.toolbarState.strike,
	run: context => {
		context.runCommand('strikeThrough');
	},
});
