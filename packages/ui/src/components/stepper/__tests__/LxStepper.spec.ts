import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxStepper from '../LxStepper.vue';

describe('LxStepper', () => {
	it('selects step and supports linear restrictions', async () => {
		const wrapper = mount(LxStepper, {
			props: {
				'linear': true,
				'modelValue': 'a',
				'items': [
					{ id: 'a', label: 'One' },
					{ id: 'b', label: 'Two' },
					{ id: 'c', label: 'Three' },
				],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		await wrapper.findAll('.lx-stepper__trigger')[2]?.trigger('click');
		expect(wrapper.props('modelValue')).toBe('a');
		await wrapper.findAll('.lx-stepper__trigger')[1]?.trigger('click');
		expect(wrapper.props('modelValue')).toBe('b');
		await wrapper.findAll('.lx-stepper__trigger')[2]?.trigger('click');
		expect(wrapper.props('modelValue')).toBe('c');
	});

	it('covers non-linear mode, disabled steps, fallback active step and slots', async () => {
		const wrapper = mount(LxStepper, {
			props: {
				'orientation': 'vertical',
				'linear': false,
				'modelValue': 'missing',
				'items': [
					{ id: 'x', label: 'First', description: 'desc' },
					{ id: 'y', label: 'Second', disabled: true },
				],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				step: '<span class="custom-step">{{ item.label }}</span>',
				content: '<div class="custom-content">{{ step }}</div>',
			},
		});

		expect(wrapper.find('.lx-stepper--vertical').exists()).toBe(true);
		expect(wrapper.find('.custom-step').exists()).toBe(true);
		expect(wrapper.find('.custom-content').text()).toContain('x');
		expect(wrapper.findAll('.lx-stepper__item')[0]?.classes()).toContain('is-active');

		const disabledButton = wrapper.findAll('.lx-stepper__trigger')[1];
		expect(disabledButton.attributes('disabled')).toBeDefined();
		await disabledButton.trigger('click');
		expect(wrapper.findAll('.lx-stepper__item')[0]?.classes()).toContain('is-active');

		await wrapper.findAll('.lx-stepper__trigger')[0]?.trigger('click');
		expect(wrapper.findAll('.lx-stepper__item')[0]?.classes()).toContain('is-active');
	});

	it('handles empty and fully-disabled item sets', async () => {
		const wrapper = mount(LxStepper, {
			props: {
				'modelValue': '',
				'items': [],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		expect(wrapper.findAll('.lx-stepper__trigger')).toHaveLength(0);

		await wrapper.setProps({
			items: [{ id: 'z', label: 'Disabled', disabled: true }],
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-stepper__trigger')).toHaveLength(1);
		expect(wrapper.props('modelValue')).toBe('');
	});

	it('covers blocked selection branch in linear mode', async () => {
		const wrapper = mount(LxStepper, {
			props: {
				'linear': true,
				'modelValue': 'a',
				'items': [
					{ id: 'a', label: 'A' },
					{ id: 'b', label: 'B' },
					{ id: 'c', label: 'C' },
				],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		await wrapper.findAll('.lx-stepper__trigger')[2]?.trigger('click');
		expect(wrapper.props('modelValue')).toBe('a');
	});

	it('covers invalid id selection guard directly', async () => {
		const wrapper = mount(LxStepper, {
			props: {
				modelValue: 'a',
				items: [{ id: 'a', label: 'A' }],
			},
		});
		const vm = wrapper.vm as unknown as { selectStep?: (id: string) => void };
		vm.selectStep?.('missing');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-stepper__item').classes()).toContain('is-active');
	});

	it('renders default step descriptions only when provided', () => {
		const wrapper = mount(LxStepper, {
			props: {
				modelValue: 'one',
				items: [
					{ id: 'one', label: 'One', description: 'First step' },
					{ id: 'two', label: 'Two' },
				],
			},
		});

		const descriptions = wrapper.findAll('.lx-stepper__meta small');
		expect(descriptions).toHaveLength(1);
		expect(descriptions[0]?.text()).toBe('First step');
	});
});
