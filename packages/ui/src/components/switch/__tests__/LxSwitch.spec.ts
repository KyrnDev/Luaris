import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSwitch from '../LxSwitch.vue';

describe('LxSwitch', () => {
	it('emits updated checked state', async () => {
		const wrapper = mount(LxSwitch, {
			props: {
				modelValue: false,
			},
		});

		await wrapper.find('input').setValue(true);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true);
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true);
	});

	it('renders disabled state class', () => {
		const wrapper = mount(LxSwitch, {
			props: {
				modelValue: true,
				disabled: true,
			},
		});

		expect(wrapper.classes()).toContain('is-disabled');
		expect(wrapper.find('input').attributes('disabled')).toBeDefined();
	});

	it('uses false by default when model is omitted', () => {
		const wrapper = mount(LxSwitch);
		expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false);
	});

	it('toggles when clicking the visible switch track', async () => {
		const wrapper = mount(LxSwitch, {
			props: {
				modelValue: false,
			},
		});

		await wrapper.find('.lx-switch__track').trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(true);
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true);
	});

	it('uses generated id/name and default aria-label when attrs are not provided', () => {
		const wrapper = mount(LxSwitch);
		const input = wrapper.find('input');
		const generatedId = input.attributes('id');

		expect(generatedId).toMatch(/^lx-switch-/);
		expect(input.attributes('name')).toBe(generatedId);
		expect(input.attributes('aria-label')).toBe('Switch');
	});

	it('prefers provided id/name/aria-label attrs', () => {
		const wrapper = mount(LxSwitch, {
			attrs: {
				id: 'email-alerts',
				name: 'emailAlerts',
				'aria-label': 'Email alerts',
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('id')).toBe('email-alerts');
		expect(input.attributes('name')).toBe('emailAlerts');
		expect(input.attributes('aria-label')).toBe('Email alerts');
	});

	it('does not toggle when clicking track while disabled', async () => {
		const wrapper = mount(LxSwitch, {
			props: {
				modelValue: true,
				disabled: true,
			},
		});

		await wrapper.find('.lx-switch__track').trigger('click');
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(wrapper.emitted('change')).toBeUndefined();
	});
});
