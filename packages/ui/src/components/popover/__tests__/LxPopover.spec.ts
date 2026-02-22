import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxPopover from '../LxPopover.vue';

describe('LxPopover', () => {
	it('opens on click trigger and closes with escape', async () => {
		const wrapper = mount(LxPopover, {
			props: {
				'modelValue': false,
				'trigger': 'click',
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				default: '<div>Popover content</div>',
			},
		});

		await wrapper.find('.lx-popover__trigger').trigger('click');
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(true);
		await wrapper.find('.lx-popover__panel').trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(false);
	});

	it('supports hover trigger and ignores click-outside for hover mode', async () => {
		const wrapper = mount(LxPopover, {
			attachTo: document.body,
			props: {
				'trigger': 'hover',
				'modelValue': false,
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				default: 'content',
			},
		});

		await wrapper.trigger('mouseenter');
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(true);
		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(true);
		await wrapper.trigger('mouseleave');
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(false);
		wrapper.unmount();
	});

	it('ignores hover events for click trigger and click events for hover trigger', async () => {
		const clickWrapper = mount(LxPopover, {
			props: {
				'trigger': 'click',
				'modelValue': false,
				'onUpdate:modelValue': (value: boolean) => clickWrapper.setProps({ modelValue: value }),
			},
			slots: { default: 'x' },
		});
		await clickWrapper.trigger('mouseenter');
		await clickWrapper.trigger('mouseleave');
		expect(clickWrapper.find('.lx-popover__panel').exists()).toBe(false);

		const hoverWrapper = mount(LxPopover, {
			props: {
				'trigger': 'hover',
				'modelValue': false,
				'onUpdate:modelValue': (value: boolean) => hoverWrapper.setProps({ modelValue: value }),
			},
			slots: { default: 'x' },
		});
		await hoverWrapper.find('.lx-popover__trigger').trigger('click');
		expect(hoverWrapper.find('.lx-popover__panel').exists()).toBe(false);
	});

	it('respects disabled and click-outside behaviour', async () => {
		const wrapper = mount(LxPopover, {
			attachTo: document.body,
			props: {
				'trigger': 'click',
				'disabled': true,
				'modelValue': false,
				'padding': 'lg',
				'placement': 'left',
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
		});

		await wrapper.find('.lx-popover__trigger').trigger('click');
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(false);

		await wrapper.setProps({ disabled: false, modelValue: true });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-popover--padding-lg').exists()).toBe(true);
		expect(wrapper.find('.lx-popover--left').exists()).toBe(true);
		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(false);
		wrapper.unmount();
	});

	it('syncs open state from model watcher', async () => {
		const wrapper = mount(LxPopover, {
			props: {
				modelValue: false,
			},
		});
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(false);
		await wrapper.setProps({ modelValue: true });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(true);
	});

	it('renders custom trigger slot branch', async () => {
		const wrapper = mount(LxPopover, {
			props: {
				'modelValue': false,
				'trigger': 'click',
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				trigger: '<span class="custom-trigger-slot">Open</span>',
				default: 'Body',
			},
		});
		expect(wrapper.find('.custom-trigger-slot').exists()).toBe(true);
		await wrapper.find('.lx-popover__trigger').trigger('click');
		expect(wrapper.find('.lx-popover__panel').exists()).toBe(true);
	});
});
