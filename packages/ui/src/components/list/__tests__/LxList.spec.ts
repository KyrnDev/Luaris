import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxList from '../LxList.vue';

describe('LxList', () => {
	it('renders dense/divided classes with slot content', () => {
		const wrapper = mount(LxList, {
			props: {
				dense: true,
				divided: true,
			},
			slots: {
				default: '<li class="lx-list-item">One</li><li class="lx-list-item">Two</li>',
			},
		});

		expect(wrapper.classes()).toContain('is-dense');
		expect(wrapper.classes()).toContain('is-divided');
		expect(wrapper.text()).toContain('One');
		expect(wrapper.text()).toContain('Two');
	});
});
