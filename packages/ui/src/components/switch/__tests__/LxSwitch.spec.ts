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
});
