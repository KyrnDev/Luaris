import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSpinner from '../LxSpinner.vue';

describe('LxSpinner', () => {
	it('applies size, variant, and status label', () => {
		const wrapper = mount(LxSpinner, {
			props: {
				size: 'xl',
				variant: 'warning',
				label: 'Loading data',
			},
		});

		expect(wrapper.classes()).toContain('lx-spinner--xl');
		expect(wrapper.classes()).toContain('lx-spinner--warning');
		expect(wrapper.attributes('aria-label')).toBe('Loading data');
	});
});
