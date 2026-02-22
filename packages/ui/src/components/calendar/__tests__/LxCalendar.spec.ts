import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxCalendar from '../LxCalendar.vue';

describe('LxCalendar', () => {
	it('navigates months and selects a date', async () => {
		const wrapper = mount(LxCalendar, {
			props: {
				'modelValue': new Date('2026-02-10'),
				'onUpdate:modelValue': (value: Date) => wrapper.setProps({ modelValue: value }),
			},
		});

		await wrapper.findAll('.lx-button')[0]?.trigger('click');
		await wrapper.findAll('.lx-button')[1]?.trigger('click');
		expect(wrapper.text()).toContain('2026');
		await wrapper.findAll('.lx-calendar__day').at(10)?.trigger('click');
		expect(wrapper.props('modelValue')).toBeInstanceOf(Date);
	});

	it('opens month/year pickers', async () => {
		const wrapper = mount(LxCalendar);
		await wrapper.find('button[aria-label="Choose month"]').trigger('click');
		expect(wrapper.find('.lx-calendar__picker-popover select').exists()).toBe(true);
		await wrapper.find('button[aria-label="Choose year"]').trigger('click');
		expect(wrapper.findAll('.lx-calendar__picker-popover select').length).toBeGreaterThan(0);
	});

	it('applies min/max and handles month/year changes', async () => {
		const wrapper = mount(LxCalendar, {
			props: {
				'modelValue': new Date('2026-02-15'),
				'min': new Date('2026-02-10'),
				'max': new Date('2026-02-20'),
				'startOfWeek': 0,
				'onUpdate:modelValue': (value: Date) => wrapper.setProps({ modelValue: value }),
			},
		});

		expect(wrapper.findAll('.lx-calendar__day[disabled]').length).toBeGreaterThan(0);
		await wrapper.find('button[aria-label="Choose month"]').trigger('click');
		const monthSelect = wrapper.find('.lx-calendar__picker-popover select');
		await monthSelect.setValue('3');
		await wrapper.vm.$nextTick();

		await wrapper.find('button[aria-label="Choose year"]').trigger('click');
		const yearSelect = wrapper.find('.lx-calendar__picker-popover select');
		await yearSelect.setValue('2028');
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain('2028');
	});

	it('closes both pickers via outside click and watches model updates', async () => {
		const wrapper = mount(LxCalendar, {
			attachTo: document.body,
			props: {
				'modelValue': null,
				'onUpdate:modelValue': (value: Date | null) => wrapper.setProps({ modelValue: value }),
			},
		});

		await wrapper.find('button[aria-label="Choose month"]').trigger('click');
		await wrapper.find('button[aria-label="Choose year"]').trigger('click');
		expect(wrapper.find('.lx-calendar__picker-popover').exists()).toBe(true);
		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-calendar__picker-popover').exists()).toBe(false);

		await wrapper.setProps({ modelValue: new Date('2027-01-01') });
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain('2027');
		wrapper.unmount();
	});

	it('covers watcher false branch and simultaneous picker rendering branch', async () => {
		const wrapper = mount(LxCalendar, {
			props: {
				modelValue: new Date('2026-06-10'),
			},
		});

		const initialText = wrapper.text();
		await wrapper.setProps({ modelValue: null });
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain('2026');
		expect(wrapper.text().length).toBeGreaterThan(0);
		expect(initialText.length).toBeGreaterThan(0);

		const vm = wrapper.vm as unknown as { showMonthPicker: boolean, showYearPicker: boolean };
		vm.showMonthPicker = true;
		vm.showYearPicker = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-calendar__picker-popover select')).toHaveLength(2);
	});
});
