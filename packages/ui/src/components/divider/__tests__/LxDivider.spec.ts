import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxDivider from '../LxDivider.vue';

describe('LxDivider', () => {
	it('renders vertical orientation semantics and class', () => {
		const wrapper = mount(LxDivider, {
			props: {
				orientation: 'vertical',
			},
		});

		expect(wrapper.attributes('aria-orientation')).toBe('vertical');
		expect(wrapper.classes()).toContain('lx-divider--vertical');
	});
});
