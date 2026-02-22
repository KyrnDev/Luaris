import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxMenuItem from '../LxMenuItem.vue';

describe('LxMenuItem', () => {
	it('emits select with label fallback', async () => {
		const wrapper = mount(LxMenuItem, {
			props: {
				label: 'Overview',
			},
		});

		await wrapper.get('button').trigger('click');
		expect(wrapper.emitted('select')?.[0]).toEqual(['Overview']);
	});

	it('emits select with explicit value and handles empty fallback', async () => {
		const wrapper = mount(LxMenuItem, {
			props: {
				label: 'Label',
				value: 'v',
			},
		});
		await wrapper.get('button').trigger('click');
		expect(wrapper.emitted('select')?.[0]).toEqual(['v']);

		const empty = mount(LxMenuItem);
		await empty.get('button').trigger('click');
		expect(empty.emitted('select')?.[0]).toEqual(['']);
	});

	it('renders active and disabled states', () => {
		const wrapper = mount(LxMenuItem, {
			props: {
				label: 'X',
				active: true,
				disabled: true,
			},
		});

		expect(wrapper.classes()).toContain('is-active');
		expect(wrapper.get('button').attributes('disabled')).toBeDefined();
	});
});
