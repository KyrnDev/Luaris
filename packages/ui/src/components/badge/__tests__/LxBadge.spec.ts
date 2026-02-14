import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxBadge from '../LxBadge.vue';

describe('LxBadge', () => {
	it('renders badge text and size class', () => {
		const wrapper = mount(LxBadge, {
			props: {
				text: 'Ready',
				size: 'sm',
				variant: 'success',
			},
		});

		expect(wrapper.text()).toContain('Ready');
		expect(wrapper.classes()).toContain('lx-badge--sm');
		expect(wrapper.classes()).toContain('lx-badge--success');
	});
});
