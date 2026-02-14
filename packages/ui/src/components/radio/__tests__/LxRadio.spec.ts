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
});
