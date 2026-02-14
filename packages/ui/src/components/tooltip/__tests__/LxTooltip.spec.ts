import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTooltip from '../LxTooltip.vue';

describe('LxTooltip', () => {
	it('renders default help icon trigger and tooltip text', () => {
		const wrapper = mount(LxTooltip, {
			props: {
				text: 'Helpful information',
			},
		});

		expect(wrapper.find('.lx-tooltip__content').text()).toBe('Helpful information');
		expect(wrapper.find('.fa-circle-question').exists()).toBe(true);
	});

	it('uses slot content as trigger', () => {
		const wrapper = mount(LxTooltip, {
			props: {
				text: 'Slot tooltip',
			},
			slots: {
				default: '<span class="custom-trigger">Hover me</span>',
			},
		});

		expect(wrapper.find('.custom-trigger').exists()).toBe(true);
		expect(wrapper.find('.fa-circle-question').exists()).toBe(false);
	});

	it('supports placement and disabled states', () => {
		const wrapper = mount(LxTooltip, {
			props: {
				text: 'Placement',
				placement: 'right',
				disabled: true,
			},
		});

		expect(wrapper.classes()).toContain('lx-tooltip--right');
		expect(wrapper.attributes('data-disabled')).toBe('true');
	});
});
