import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxCommandPalette from '../LxCommandPalette.vue';

describe('LxCommandPalette', () => {
	it('filters and emits selected command', async () => {
		const wrapper = mount(LxCommandPalette, {
			attachTo: document.body,
			props: {
				'modelValue': true,
				'items': [
					{ label: 'Create Deployment', value: 'deploy', keywords: ['release'], shortcut: 'Ctrl+D' },
					{ label: 'Open Settings', value: 'settings' },
				],
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
		});

		await wrapper.vm.$nextTick();
		const input = document.body.querySelector('.lx-command-palette input') as HTMLInputElement | null;
		expect(input).not.toBeNull();
		input!.value = 'rel';
		input!.dispatchEvent(new Event('input', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(document.body.querySelectorAll('.lx-command-palette__item')).toHaveLength(1);
		expect(document.body.querySelector('kbd')?.textContent).toBe('Ctrl+D');
		(document.body.querySelector('.lx-command-palette__item') as HTMLElement).click();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('select')?.[0]).toEqual(['deploy']);
		wrapper.unmount();
	});

	it('toggles with keyboard shortcut', async () => {
		const wrapper = mount(LxCommandPalette, {
			props: {
				'modelValue': false,
				'hotkey': true,
				'items': [],
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
		});

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.props('modelValue')).toBe(true);
	});

	it('ignores non-matching hotkeys when enabled', async () => {
		const wrapper = mount(LxCommandPalette, {
			props: {
				'modelValue': false,
				'hotkey': true,
				'items': [],
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
		});

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', ctrlKey: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.props('modelValue')).toBe(false);

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
		await wrapper.vm.$nextTick();
		expect(wrapper.props('modelValue')).toBe(false);
	});

	it('does not toggle when hotkey disabled and shows empty state', async () => {
		const wrapper = mount(LxCommandPalette, {
			attachTo: document.body,
			props: {
				'modelValue': true,
				'hotkey': false,
				'items': [{ label: 'Create', value: 'create' }],
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
		});

		const input = document.body.querySelector('.lx-command-palette input') as HTMLInputElement;
		input.value = 'zzz';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(document.body.textContent).toContain('No commands found.');

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.props('modelValue')).toBe(true);
		wrapper.unmount();
	});

	it('renders closed state without modal panel mounted', () => {
		const wrapper = mount(LxCommandPalette, {
			props: {
				modelValue: false,
				items: [],
			},
		});
		expect(wrapper.find('.lx-command-palette').exists()).toBe(false);
	});

	it('handles modal update:modelValue event from LxModal', async () => {
		const wrapper = mount(LxCommandPalette, {
			props: {
				'modelValue': true,
				'items': [],
				'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
			},
		});
		await wrapper.findComponent({ name: 'LxModal' }).vm.$emit('update:modelValue', false);
		await wrapper.vm.$nextTick();
		expect(wrapper.props('modelValue')).toBe(false);
	});
});
