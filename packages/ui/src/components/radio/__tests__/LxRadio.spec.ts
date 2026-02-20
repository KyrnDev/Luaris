import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxRadio from '../LxRadio.vue';

describe('LxRadio', () => {
	it('binds model value for checked radio', async () => {
		const wrapper = mount(LxRadio, {
			props: {
				modelValue: 'a',
				value: 'b',
				label: 'Option B',
			},
		});

		await wrapper.find('input').setValue(true);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('b');
		expect(wrapper.find('label').attributes('for')).toBe(wrapper.find('input').attributes('id'));
	});

	it('uses generated id and falls back name to input id', () => {
		const wrapper = mount(LxRadio, {
			props: {
				value: 'a',
				label: 'Option A',
			},
		});

		const input = wrapper.find('input');
		const generatedId = input.attributes('id');
		expect(generatedId).toMatch(/^lx-radio-/);
		expect(input.attributes('name')).toBe(generatedId);
	});

	it('uses prop id/name when provided', () => {
		const wrapper = mount(LxRadio, {
			props: {
				value: 'x',
				label: 'Option X',
				id: 'radio-id',
				name: 'radio-name',
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('id')).toBe('radio-id');
		expect(input.attributes('name')).toBe('radio-name');
		expect(wrapper.find('label').attributes('for')).toBe('radio-id');
	});

	it('uses prop id/name fallback and applies disabled state', () => {
		const wrapper = mount(LxRadio, {
			props: {
				value: 'y',
				label: 'Option Y',
				id: 'radio-prop-id',
				name: 'radio-prop-name',
				disabled: true,
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('id')).toBe('radio-prop-id');
		expect(input.attributes('name')).toBe('radio-prop-name');
		expect(input.attributes('disabled')).toBeDefined();
		expect(wrapper.classes()).toContain('is-disabled');
	});
});
