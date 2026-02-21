import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxStat from '../LxStat.vue';

describe('LxStat', () => {
	it('renders value, metadata, and trend class', () => {
		const wrapper = mount(LxStat, {
			props: {
				label: 'Revenue',
				value: '£42,000',
				delta: '+12%',
				trend: 'up',
				helpText: 'Compared with last month',
			},
		});

		expect(wrapper.classes()).toContain('lx-stat--up');
		expect(wrapper.text()).toContain('Revenue');
		expect(wrapper.text()).toContain('£42,000');
		expect(wrapper.text()).toContain('+12%');
		expect(wrapper.text()).toContain('Compared with last month');
	});

	it('supports value slot and empty optional props', () => {
		const wrapper = mount(LxStat, {
			slots: {
				value: '<strong>Custom</strong>',
			},
		});

		expect(wrapper.text()).toContain('Custom');
		expect(wrapper.find('.lx-stat__label').exists()).toBe(false);
		expect(wrapper.find('.lx-stat__delta').exists()).toBe(false);
	});
});
