import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTag from '../LxTag.vue';

describe('LxTag', () => {
	it('renders label and remove action', async () => {
		const wrapper = mount(LxTag, {
			props: {
				label: 'Status',
				removable: true,
				variant: 'info',
			},
		});

		expect(wrapper.text()).toContain('Status');
		expect(wrapper.classes()).toContain('lx-tag--info');
		await wrapper.find('.lx-tag__remove').trigger('click');
		expect(wrapper.emitted('remove')).toHaveLength(1);
	});

	it('renders leading slot and no remove button when not removable', () => {
		const wrapper = mount(LxTag, {
			props: {
				label: 'Static',
				removable: false,
			},
			slots: {
				leading: '<span>•</span>',
			},
		});

		expect(wrapper.find('.lx-tag__leading').exists()).toBe(true);
		expect(wrapper.find('.lx-tag__remove').exists()).toBe(false);
	});
});
