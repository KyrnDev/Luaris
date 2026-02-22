import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTab from '../LxTab.vue';

describe('LxTab', () => {
	it('renders slot content', () => {
		const wrapper = mount(LxTab, {
			props: {
				value: 'example',
			},
			slots: {
				default: '<p>Panel content</p>',
			},
		});
		expect(wrapper.text()).toContain('Panel content');
	});
});
