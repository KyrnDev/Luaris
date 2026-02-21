import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxAlert from '../LxAlert.vue';

describe('LxAlert', () => {
	it('renders and dismisses alert', async () => {
		const wrapper = mount(LxAlert, {
			props: {
				title: 'Warning',
				text: 'Please review',
				variant: 'warning',
				dismissible: true,
			},
		});

		expect(wrapper.classes()).toContain('lx-alert--warning');
		expect(wrapper.text()).toContain('Warning');
		expect(wrapper.text()).toContain('Please review');
		await wrapper.find('.lx-button').trigger('click');
		expect(wrapper.emitted('dismiss')).toHaveLength(1);
		expect(wrapper.find('.lx-alert').exists()).toBe(false);
	});

	it('renders actions slot and optional empty branches', () => {
		const wrapper = mount(LxAlert, {
			slots: {
				actions: '<button type="button">Action</button>',
			},
		});

		expect(wrapper.find('.lx-alert__title').exists()).toBe(false);
		expect(wrapper.find('.lx-alert__text').exists()).toBe(false);
		expect(wrapper.text()).toContain('Action');
	});
});
