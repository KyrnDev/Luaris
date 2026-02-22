import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxAccordion from '../LxAccordion.vue';

describe('LxAccordion', () => {
	it('opens default item and toggles in single mode', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				items: [
					{ id: 'one', title: 'One', description: 'desc' },
					{ id: 'two', title: 'Two' },
				],
				defaultOpen: 'one',
			},
		});

		expect(wrapper.find('#panel-one').exists()).toBe(true);
		await wrapper.findAll('.lx-accordion__trigger')[1]?.trigger('click');
		expect(wrapper.find('#panel-one').exists()).toBe(false);
		expect(wrapper.find('#panel-two').exists()).toBe(true);
	});

	it('supports multiple mode and ignores disabled items', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				multiple: true,
				items: [
					{ id: 'one', title: 'One' },
					{ id: 'two', title: 'Two', disabled: true },
				],
			},
		});

		await wrapper.findAll('.lx-accordion__trigger')[0]?.trigger('click');
		expect(wrapper.find('#panel-one').exists()).toBe(true);
		expect(wrapper.findAll('.lx-accordion__trigger')[1]?.attributes('disabled')).toBeDefined();
	});

	it('supports linked connected mode and title slots', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				linked: true,
				defaultOpen: ['one', 'two'],
				items: [
					{ id: 'one', title: 'One' },
					{ id: 'two', title: 'Two' },
				],
			},
			slots: {
				title: '<span class="custom-title">{{ item.title }}</span>',
				item: '<div class="custom-item">Item {{ item.id }}</div>',
			},
		});

		expect(wrapper.find('.lx-accordion--connected').exists()).toBe(true);
		expect(wrapper.findAll('.custom-title').length).toBe(2);
		expect(wrapper.findAll('.custom-item').length).toBe(1);
		await wrapper.findAll('.lx-accordion__trigger')[0]?.trigger('click');
		expect(wrapper.find('#panel-one').exists()).toBe(false);
	});

	it('covers array/string defaultOpen normalisation and multi close branch', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				multiple: true,
				items: [
					{ id: 'one', title: 'One' },
					{ id: 'two', title: 'Two', disabled: true },
				],
				defaultOpen: [],
				modelValue: ['one', 'two'],
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find('#panel-one').exists()).toBe(true);
		expect(wrapper.find('#panel-two').exists()).toBe(false);
		await wrapper.findAll('.lx-accordion__trigger')[0]?.trigger('click');
		expect(wrapper.find('#panel-one').exists()).toBe(false);
	});

	it('covers empty string defaultOpen fallback branch', () => {
		const wrapper = mount(LxAccordion, {
			props: {
				items: [{ id: 'only', title: 'Only' }],
				defaultOpen: '',
			},
		});
		expect(wrapper.find('#panel-only').exists()).toBe(false);
	});

	it('prefers item-specific slot over generic item slot', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				defaultOpen: 'one',
				items: [{ id: 'one', title: 'One' }],
			},
			slots: {
				'item-one': '<div class="item-one-slot">Specific</div>',
				'item': '<div class="generic-item-slot">Generic</div>',
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.item-one-slot').exists()).toBe(true);
		expect(wrapper.find('.generic-item-slot').exists()).toBe(false);
	});

	it('renders an open panel with no item slots provided', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				defaultOpen: 'one',
				items: [{ id: 'one', title: 'One' }, { id: 'two', title: 'Two' }],
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find('#panel-one').exists()).toBe(true);
		expect(wrapper.find('#panel-two').exists()).toBe(false);
	});

	it('updates panel DOM branch with explicit v-model changes and nextTick', async () => {
		const wrapper = mount(LxAccordion, {
			props: {
				items: [{ id: 'one', title: 'One' }],
				modelValue: [],
			},
		});

		expect(wrapper.find('#panel-one').exists()).toBe(false);

		await wrapper.setProps({ modelValue: ['one'] });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('#panel-one').exists()).toBe(true);

		await wrapper.setProps({ modelValue: [] });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('#panel-one').exists()).toBe(false);
	});
});
