import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxBreadcrumbs from '../LxBreadcrumbs.vue';

describe('LxBreadcrumbs', () => {
	it('renders breadcrumb items with link for non-current entries', () => {
		const wrapper = mount(LxBreadcrumbs, {
			props: {
				items: [
					{ label: 'Home', href: '/home' },
					{ label: 'Library' },
				],
			},
		});

		expect(wrapper.find('a').attributes('href')).toBe('/home');
		expect(wrapper.find('.is-current').text()).toContain('Library');
	});
});
