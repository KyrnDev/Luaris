import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxProgress from '../LxProgress.vue';

describe('LxProgress', () => {
	it('renders horizontal progress and label', () => {
		const wrapper = mount(LxProgress, {
			props: {
				value: 25,
				showLabel: true,
			},
		});

		expect(wrapper.text()).toContain('25%');
		expect(wrapper.classes()).toContain('lx-progress--horizontal');
	});

	it('renders ring mode', () => {
		const wrapper = mount(LxProgress, {
			props: {
				orientation: 'ring',
				value: 80,
			},
		});

		expect(wrapper.find('.lx-progress__ring').exists()).toBe(true);
	});
});
