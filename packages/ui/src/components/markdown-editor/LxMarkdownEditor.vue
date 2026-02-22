<template>
	<div class="lx-markdown-editor" :class="{ 'is-split': props.split && props.showPreview }">
		<LxTextarea
			v-model="model"
			:placeholder="props.placeholder"
			:disabled="props.disabled"
			:min-rows="8"
		/>
		<LxMarkdownPreview v-if="props.showPreview" :source="model" />
		<template v-else />
	</div>
</template>

<script setup lang='ts'>
	import { LxTextarea } from '../textarea';
	import { LxMarkdownPreview } from '../markdown-preview';
	import type { ILxMarkdownEditorProps } from './types';

	const props = withDefaults(defineProps<ILxMarkdownEditorProps>(), {
		placeholder: 'Write markdown...',
		disabled: false,
		showPreview: true,
		split: true,
	});

	const model = defineModel<string>({
		default: '',
	});
</script>

<style scoped lang='scss'>
	.lx-markdown-editor {
		display: grid;
		gap: var(--lx-size-space-md);
	}

	.lx-markdown-editor.is-split {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
</style>
