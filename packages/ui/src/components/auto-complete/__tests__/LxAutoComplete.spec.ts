import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxAutoComplete from '../LxAutoComplete.vue';

describe('LxAutoComplete', () => {
	it('filters and selects an option', async () => {
		const wrapper = mount(LxAutoComplete, {
			attachTo: document.body,
			props: {
				'modelValue': '',
				'options': [
					{ label: 'Austria', value: 'at' },
					{ label: 'Belgium', value: 'be', disabled: true },
				],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const input = wrapper.find('input');
		await input.setValue('aus');
		await input.trigger('focus');
		expect(wrapper.findAll('.lx-auto-complete__item')).toHaveLength(1);
		await wrapper.find('.lx-auto-complete__item').trigger('click');
		expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ label: 'Austria', value: 'at' });

		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-auto-complete__menu').exists()).toBe(false);
		wrapper.unmount();
	});

	it('respects minChars and openOnFocus false', async () => {
		const wrapper = mount(LxAutoComplete, {
			props: {
				'modelValue': '',
				'minChars': 3,
				'openOnFocus': false,
				'options': [{ label: 'Austria', value: 'at' }],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const input = wrapper.find('input');
		await input.setValue('au');
		await input.trigger('focus');
		expect(wrapper.find('.lx-auto-complete__menu').exists()).toBe(false);
		await input.setValue('aus');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-auto-complete__menu').exists()).toBe(true);
	});
});
