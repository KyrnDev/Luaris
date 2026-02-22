import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxMarkdownEditor from '../LxMarkdownEditor.vue';

describe('LxMarkdownEditor', () => {
	it('renders split editor with preview and updates model', async () => {
		const wrapper = mount(LxMarkdownEditor, {
			props: {
				'modelValue': '',
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		expect(wrapper.classes()).toContain('is-split');
		expect(wrapper.find('.lx-markdown-preview').exists()).toBe(true);
		await wrapper.find('textarea').setValue('# New title');
		expect(wrapper.props('modelValue')).toContain('# New title');
	});

	it('hides preview when configured', () => {
		const wrapper = mount(LxMarkdownEditor, {
			props: {
				showPreview: false,
				split: true,
			},
		});
		expect(wrapper.classes()).not.toContain('is-split');
		expect(wrapper.find('.lx-markdown-preview').exists()).toBe(false);
	});
});
