import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxRadios from '../LxRadios.vue';

describe('LxRadios', () => {
	it('renders options and emits model change', async () => {
		const wrapper = mount(LxRadios, {
			props: {
				modelValue: 'one',
				options: [
					{ label: 'One', value: 'one' },
					{ label: 'Two', value: 'two' },
				],
			},
		});

		await wrapper.findAll('input')[1]?.setValue(true);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('two');
		const inputs = wrapper.findAll('input');
		expect(inputs[0]?.attributes('name')).toBeTruthy();
		expect(inputs[0]?.attributes('name')).toBe(inputs[1]?.attributes('name'));
		expect(inputs[0]?.attributes('id')).toContain(inputs[0]?.attributes('name') || '');
	});
});
