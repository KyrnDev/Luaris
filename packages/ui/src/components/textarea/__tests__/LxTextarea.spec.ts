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
});
