import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxTimelineItem from '../LxTimelineItem.vue';

describe('LxTimelineItem', () => {
	it('renders slot content', () => {
		const wrapper = mount(LxTimelineItem, {
			slots: {
				default: '<div>Timeline body</div>',
			},
		});
		expect(wrapper.text()).toContain('Timeline body');
	});
});
