import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSelect from '../LxSelect.vue';

describe('LxSelect', () => {
	it('emits selected option on change', async () => {
		const wrapper = mount(LxSelect, {
			props: {
				modelValue: 'draft',
				options: [
					{ label: 'Draft', value: 'draft' },
					{ label: 'Published', value: 'published' },
				],
			},
		});

		await wrapper.find('select').setValue('published');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('published');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe('published');
	});

	it('uses id attribute from attrs and supports disabled state', () => {
		const wrapper = mount(LxSelect, {
			attrs: {
				id: 'status-select',
			},
			props: {
				modelValue: 'draft',
				disabled: true,
				options: [{ label: 'Draft', value: 'draft' }],
			},
		});

		expect(wrapper.find('select').attributes('id')).toBe('status-select');
		expect(wrapper.find('select').attributes('disabled')).toBeDefined();
	});

	it('uses an explicit aria-label when supplied as attribute', () => {
		const wrapper = mount(LxSelect, {
			attrs: {
				'aria-label': 'Status',
			},
			props: {
				modelValue: 'draft',
				options: [{ label: 'Draft', value: 'draft' }],
			},
		});

		expect(wrapper.find('select').attributes('aria-label')).toBe('Status');
	});

	it('uses generated id/name and default aria-label fallback', () => {
		const wrapper = mount(LxSelect, {
			props: {
				options: [
					{ label: 'One', value: '1', disabled: true },
					{ label: 'Two', value: '2' },
				],
				size: 'sm',
			},
		});

		const select = wrapper.find('select');
		const generatedId = select.attributes('id');
		expect(generatedId).toMatch(/^lx-select-/);
		expect(select.attributes('name')).toBe(generatedId);
		expect(select.attributes('aria-label')).toBe('Select option');
		expect(wrapper.classes()).toContain('lx-select--sm');
		expect(select.findAll('option')[0]?.attributes('disabled')).toBeDefined();
	});

	it('prefers explicit name attr and supports lg size class', () => {
		const wrapper = mount(LxSelect, {
			attrs: {
				name: 'statusName',
			},
			props: {
				modelValue: 'draft',
				size: 'lg',
				options: [
					{ label: 'Draft', value: 'draft' },
					{ label: 'Published', value: 'published' },
				],
			},
		});

		expect(wrapper.find('select').attributes('name')).toBe('statusName');
		expect(wrapper.classes()).toContain('lx-select--lg');
	});
});
