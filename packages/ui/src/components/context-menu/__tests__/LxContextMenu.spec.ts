import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxContextMenu from '../LxContextMenu.vue';

describe('LxContextMenu', () => {
	it('opens on right click and emits select', async () => {
		const wrapper = mount(LxContextMenu, {
			attachTo: document.body,
			props: {
				items: [
					{ label: 'Edit', value: 'edit', icon: 'pen' },
					{ label: 'Delete', value: 'delete', danger: true },
				],
			},
		});

		await wrapper.trigger('contextmenu', {
			clientX: 20,
			clientY: 30,
		});
		expect(wrapper.emitted('open')).toHaveLength(1);
		expect(wrapper.find('.lx-context-menu__icon').exists()).toBe(true);
		await wrapper.find('.lx-context-menu__item').trigger('click');
		expect(wrapper.emitted('select')?.[0]?.[0].value).toBe('edit');
		expect(wrapper.emitted('close')).toHaveLength(1);
		wrapper.unmount();
	});

	it('respects disabled mode and closes on escape', async () => {
		const wrapper = mount(LxContextMenu, {
			attachTo: document.body,
			props: {
				disabled: true,
				items: [{ label: 'Edit', value: 'edit' }],
			},
		});

		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		await wrapper.trigger('contextmenu', {
			clientX: 20,
			clientY: 30,
		});
		expect(wrapper.find('.lx-context-menu__menu').exists()).toBe(false);

		await wrapper.setProps({ disabled: false });
		await wrapper.trigger('contextmenu', {
			clientX: 20,
			clientY: 30,
		});
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-context-menu__menu').exists()).toBe(false);
		wrapper.unmount();
	});
});
