import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxVirtualList from '../LxVirtualList.vue';

describe('LxVirtualList', () => {
	it('renders virtual items and responds to scroll', async () => {
		const wrapper = mount(LxVirtualList, {
			props: {
				items: Array.from({ length: 120 }, (unused, index) => ({ id: index + 1, label: `Row ${index + 1}` })),
				height: 120,
				itemHeight: 20,
			},
		});

		expect(wrapper.findAll('.lx-virtual-list__item').length).toBeGreaterThan(0);
		const container = wrapper.find('.lx-virtual-list');
		(container.element as HTMLElement).scrollTop = 200;
		await container.trigger('scroll');
		expect(wrapper.findAll('.lx-virtual-list__item').length).toBeGreaterThan(0);
	});

	it('uses fallback index key when keyField is missing', () => {
		const wrapper = mount(LxVirtualList, {
			props: {
				items: [{ name: 'A' }, { name: 'B' }],
				height: 80,
				itemHeight: 40,
				overscan: 0,
				keyField: 'id',
			},
			slots: {
				item: '<span class="item-slot">{{ index }}:{{ item.name }}</span>',
			},
		});

		expect(wrapper.findAll('.item-slot').length).toBeGreaterThan(0);
		expect(wrapper.html()).toContain('translateY(0px)');
	});
});
