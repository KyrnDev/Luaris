import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxMenuBar from '../LxMenuBar.vue';

describe('LxMenuBar', () => {
	it('selects item and updates model', async () => {
		const wrapper = mount(LxMenuBar, {
			props: {
				'modelValue': '',
				'items': [
					{ label: 'Overview', value: 'overview' },
					{ label: 'Team', value: 'team' },
				],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		await wrapper.findAll('.lx-menu-item')[1]?.trigger('click');
		expect(wrapper.emitted('change')?.[0]).toEqual(['team']);
	});

	it('supports wrap layout class', () => {
		const wrapper = mount(LxMenuBar, {
			props: {
				wrap: true,
				items: [],
			},
		});
		expect(wrapper.classes()).toContain('is-wrap');
	});
});
