import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxToasts from '../LxToasts.vue';

describe('LxToasts', () => {
	it('limits rendered toasts by max and removes on close', async () => {
		const wrapper = mount(LxToasts, {
			props: {
				'modelValue': [
					{ id: '1', text: 'One' },
					{ id: '2', text: 'Two' },
				],
				'max': 1,
				'position': 'bottom-left',
				'onUpdate:modelValue': (value: unknown[]) => wrapper.setProps({ modelValue: value }),
			},
		});

		expect(wrapper.find('.lx-toasts--bottom-left').exists()).toBe(true);
		expect(wrapper.findAll('.lx-toast')).toHaveLength(1);
		await wrapper.findComponent({ name: 'LxToast' }).vm.$emit('close', '1');
		const next = wrapper.props('modelValue') as Array<{ id: string }>;
		expect(next.some(item => item.id === '1')).toBe(false);

		await wrapper.findComponent({ name: 'LxToast' }).vm.$emit('close');
		const afterNoId = wrapper.props('modelValue') as Array<{ id: string }>;
		expect(afterNoId.length).toBeLessThanOrEqual(1);
	});

	it('renders custom toast slot', () => {
		const wrapper = mount(LxToasts, {
			props: {
				modelValue: [{ id: 'x', text: 'X' }],
			},
			slots: {
				toast: '<div class="custom-toast">{{ toast.id }}</div>',
			},
		});
		expect(wrapper.find('.custom-toast').exists()).toBe(true);
	});
});
