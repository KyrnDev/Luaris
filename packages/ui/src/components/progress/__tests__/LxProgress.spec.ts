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

	it('renders vertical, indeterminate, and numeric ring sizes', () => {
		const vertical = mount(LxProgress, {
			props: {
				orientation: 'vertical',
				value: 40,
				max: 80,
			},
		});
		expect(vertical.find('.lx-progress__fill').attributes('style')).toContain('height: 50%');

		const indeterminate = mount(LxProgress, {
			props: {
				indeterminate: true,
			},
		});
		const style = indeterminate.find('.lx-progress__fill').attributes('style');
		expect(style).toContain('width: 45%');
		expect(style).toContain('height: 45%');
		expect(indeterminate.attributes('aria-valuenow')).toBeUndefined();

		const ringNumeric = mount(LxProgress, {
			props: {
				orientation: 'ring',
				size: 120,
				value: 60,
				showLabel: true,
			},
		});
		expect(ringNumeric.find('.lx-progress__ring').attributes('style')).toContain('--lx-progress-size: 120px');
		expect(ringNumeric.text()).toContain('60%');
	});
});
