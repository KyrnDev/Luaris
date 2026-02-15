import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import LxRadios from '../LxRadios.vue';

describe('LxRadios', () => {
	it('renders options and emits model change', async () => {
		const wrapper = mount(LxRadios, {
			props: {
				modelValue: 'one',
				options: [
					{ label: 'One', value: 'one' },
					{ label: 'Two', value: 'two' },
				],
			},
		});

		await wrapper.findAll('input')[1]?.setValue(true);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('two');
		const inputs = wrapper.findAll('input');
		expect(inputs[0]?.attributes('name')).toBeTruthy();
		expect(inputs[0]?.attributes('name')).toBe(inputs[1]?.attributes('name'));
		expect(inputs[0]?.attributes('id')).toContain(inputs[0]?.attributes('name') || '');
	});

	it('applies inline layout class', () => {
		const wrapper = mount(LxRadios, {
			props: {
				layout: 'inline',
				options: [
					{ label: 'One', value: 'one' },
					{ label: 'Two', value: 'two' },
				],
			},
		});

		expect(wrapper.classes()).toContain('lx-radios--inline');
	});

	it('renders slot content in card mode and applies checked class state', async () => {
		const wrapper = mount(LxRadios, {
			props: {
				modelValue: 'two',
				options: [
					{ label: 'One', value: 'one' },
					{ label: 'Two', value: 'two' },
				],
			},
			slots: {
				option: (slotProps: { option: { label: string } }) =>
					h('strong', { class: 'slot-content' }, String(slotProps.option.label)),
			},
		});

		expect(wrapper.classes()).toContain('lx-radios--cards');
		expect(wrapper.findAll('.lx-radios__card')).toHaveLength(2);
		expect(wrapper.findAll('.slot-content')).toHaveLength(2);

		await wrapper.findAll('.lx-radios__input')[0]?.setValue(true);
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('one');
	});

	it('supports custom spacing prop in card mode', () => {
		const wrapper = mount(LxRadios, {
			props: {
				card: true,
				space: 'var(--lx-size-space-lg)',
				options: [
					{ label: 'One', value: 'one' },
					{ label: 'Two', value: 'two' },
				],
			},
		});

		expect(wrapper.attributes('style')).toContain('--lx-radios-space: var(--lx-size-space-lg)');
		expect(wrapper.findAll('.lx-radios__card')).toHaveLength(2);
	});
});
