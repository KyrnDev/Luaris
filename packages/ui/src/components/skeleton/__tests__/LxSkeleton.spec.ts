import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxSkeleton from '../LxSkeleton.vue';

describe('LxSkeleton', () => {
	it('renders the requested number of skeleton items', () => {
		const wrapper = mount(LxSkeleton, {
			props: {
				count: 3,
				variant: 'text',
			},
		});

		expect(wrapper.findAll('.lx-skeleton__item')).toHaveLength(3);
	});
});
