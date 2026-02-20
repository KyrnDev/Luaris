import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTextarea from '../LxTextarea.vue';

describe('LxTextarea', () => {
	it('renders counter and emits model updates', async () => {
		const wrapper = mount(LxTextarea, {
			props: {
				modelValue: '',
				maxLength: 10,
				showCounter: true,
			},
		});

		await wrapper.find('textarea').setValue('Hello');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('Hello');
		expect(wrapper.find('.lx-textarea__counter').text()).toContain('5 / 10');
	});

	it('hides counter when showCounter is disabled', () => {
		const wrapper = mount(LxTextarea, {
			props: {
				modelValue: 'Hello',
				maxLength: 10,
			},
		});

		expect(wrapper.find('.lx-textarea__counter').exists()).toBe(false);
	});

	it('uses generated id/name and default aria-label when attrs are not provided', () => {
		const wrapper = mount(LxTextarea, {
			props: {
				modelValue: 'Hello',
				maxRows: 8,
				resizable: false,
			},
		});

		const textarea = wrapper.find('textarea');
		const generatedId = textarea.attributes('id');
		expect(generatedId).toMatch(/^lx-textarea-/);
		expect(textarea.attributes('name')).toBe(generatedId);
		expect(textarea.attributes('aria-label')).toBe('Textarea');
		expect(textarea.attributes('maxlength')).toBeUndefined();
		expect(textarea.attributes('style')).toContain('max-height: 12em;');
		expect(textarea.attributes('style')).toContain('resize: none;');
	});

	it('prefers id/name/aria-label attrs and applies disabled/readonly/rows/maxlength', () => {
		const wrapper = mount(LxTextarea, {
			attrs: {
				'id': 'notes',
				'name': 'notesName',
				'aria-label': 'Notes',
			},
			props: {
				modelValue: 'A',
				disabled: true,
				readonly: true,
				minRows: 5,
				maxLength: 20,
			},
		});

		const textarea = wrapper.find('textarea');
		expect(textarea.attributes('id')).toBe('notes');
		expect(textarea.attributes('name')).toBe('notesName');
		expect(textarea.attributes('aria-label')).toBe('Notes');
		expect(textarea.attributes('disabled')).toBeDefined();
		expect(textarea.attributes('readonly')).toBeDefined();
		expect(textarea.attributes('rows')).toBe('5');
		expect(textarea.attributes('maxlength')).toBe('20');
		expect(textarea.attributes('style')).toContain('resize: vertical;');
	});
});
