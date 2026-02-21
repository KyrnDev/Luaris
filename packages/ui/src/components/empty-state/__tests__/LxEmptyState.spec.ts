import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxEmptyState from '../LxEmptyState.vue';

describe('LxEmptyState', () => {
	it('renders props and slots', () => {
		const wrapper = mount(LxEmptyState, {
			props: {
				title: 'No records',
				description: 'Try changing filters',
				icon: 'circle-info',
				variant: 'info',
			},
			slots: {
				default: '<p>Extra</p>',
				actions: '<button type="button">Create</button>',
			},
		});

		expect(wrapper.classes()).toContain('lx-empty-state--info');
		expect(wrapper.text()).toContain('No records');
		expect(wrapper.text()).toContain('Try changing filters');
		expect(wrapper.text()).toContain('Extra');
		expect(wrapper.text()).toContain('Create');
	});

	it('supports empty props branches', () => {
		const wrapper = mount(LxEmptyState);
		expect(wrapper.find('.lx-empty-state__title').exists()).toBe(false);
		expect(wrapper.find('.lx-empty-state__description').exists()).toBe(false);
	});
});
