import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import LxLabel from '../LxLabel.vue';

describe('LxLabel', () => {
	it('renders default display and forwards generated control id and name', () => {
		const wrapper = mount(LxLabel, {
			props: {
				text: 'Email',
			},
			slots: {
				default: ({ controlId, controlName }: { controlId: string, controlName: string }) => h('input', {
					id: controlId,
					name: controlName,
				}),
			},
		});

		const label = wrapper.find('label');
		const input = wrapper.find('input');
		expect(label.exists()).toBe(true);
		expect(input.exists()).toBe(true);
		expect(label.attributes('for')).toBe(input.attributes('id'));
		expect(input.attributes('name')).toBe(input.attributes('id'));
	});

	it('supports inline and reverse layout plus explicit control id/name', () => {
		const wrapper = mount(LxLabel, {
			props: {
				text: 'Status',
				display: 'inline',
				reverse: true,
				controlId: 'status-id',
				controlName: 'status-name',
			},
			slots: {
				default: ({ controlId, controlName }: { controlId: string, controlName: string }) => h('input', {
					id: controlId,
					name: controlName,
				}),
			},
		});

		expect(wrapper.classes()).toContain('lx-label--inline');
		expect(wrapper.classes()).toContain('lx-label--reverse');
		expect(wrapper.find('label').attributes('for')).toBe('status-id');
		expect(wrapper.find('input').attributes('id')).toBe('status-id');
		expect(wrapper.find('input').attributes('name')).toBe('status-name');
	});

	it('does not render label element when text is empty and no label slot is provided', () => {
		const wrapper = mount(LxLabel, {
			props: {
				text: '',
			},
			slots: {
				default: ({ controlId, controlName }: { controlId: string, controlName: string }) => h('input', {
					id: controlId,
					name: controlName,
				}),
			},
		});

		expect(wrapper.find('label').exists()).toBe(false);
		expect(wrapper.find('input').exists()).toBe(true);
	});

	it('renders label when only the label slot is provided', () => {
		const wrapper = mount(LxLabel, {
			props: {
				text: '',
			},
			slots: {
				label: () => h('span', { class: 'custom-label' }, 'Custom Label'),
				default: ({ controlId, controlName }: { controlId: string, controlName: string }) => h('input', {
					id: controlId,
					name: controlName,
				}),
			},
		});

		expect(wrapper.find('label').exists()).toBe(true);
		expect(wrapper.find('.custom-label').text()).toBe('Custom Label');
	});
});
