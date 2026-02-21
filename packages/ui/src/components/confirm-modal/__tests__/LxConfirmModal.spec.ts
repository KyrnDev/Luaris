import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { LxModal } from '../../modal';
import LxConfirmModal from '../LxConfirmModal.vue';

describe('LxConfirmModal', () => {
	it('emits confirm and closes', async () => {
		const wrapper = mount(LxConfirmModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				title: 'Delete',
				message: 'Confirm delete?',
				confirmLabel: 'Yes',
			},
		});

		await wrapper.vm.$nextTick();
		const confirmButton = document.body.querySelectorAll('.lx-button')[1] as HTMLButtonElement | undefined;
		confirmButton?.click();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('confirm')).toHaveLength(1);
		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(false);
		wrapper.unmount();
	});

	it('emits cancel and supports default slot branch', async () => {
		const wrapper = mount(LxConfirmModal, {
			attachTo: document.body,
			props: {
				modelValue: true,
				message: '',
			},
			slots: {
				default: '<p>Custom content</p>',
			},
		});

		await wrapper.vm.$nextTick();
		expect(document.body.textContent).toContain('Custom content');
		const cancelButton = document.body.querySelector('.lx-button') as HTMLButtonElement | null;
		cancelButton?.click();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('cancel')).toHaveLength(1);
		wrapper.unmount();
	});

	it('supports closed initial state', () => {
		const wrapper = mount(LxConfirmModal, {
			props: {
				modelValue: false,
			},
		});

		expect(wrapper.text()).toBe('');
	});

	it('forwards modal v-model updates', async () => {
		const wrapper = mount(LxConfirmModal, {
			props: {
				modelValue: true,
			},
		});

		wrapper.findComponent(LxModal).vm.$emit('update:modelValue', false);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(false);
	});
});
