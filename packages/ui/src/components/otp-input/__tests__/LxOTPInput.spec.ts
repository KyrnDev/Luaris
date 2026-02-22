import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxOTPInput from '../LxOTPInput.vue';

describe('LxOTPInput', () => {
	it('renders delegated pin input and propagates model updates', async () => {
		const wrapper = mount(LxOTPInput, {
			props: {
				'modelValue': '',
				'length': 6,
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		expect(wrapper.findAll('input')).toHaveLength(6);
		await wrapper.findAll('input')[0]?.setValue('1');
		expect(wrapper.props('modelValue')).toBe('1');
	});
});
