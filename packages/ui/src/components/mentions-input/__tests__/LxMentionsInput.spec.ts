import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxMentionsInput from '../LxMentionsInput.vue';

describe('LxMentionsInput', () => {
	it('shows suggestions and inserts mention with enter', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				'modelValue': '',
				'sources': [
					{ trigger: '@', items: [{ label: 'danny', value: 'danny' }] },
				],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const textarea = wrapper.find('textarea');
		await textarea.setValue('@da');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-mentions-input__item')).toHaveLength(1);
		await textarea.trigger('keydown', { key: 'Enter' });
		expect(wrapper.props('modelValue')).toBe('@danny ');
		expect(wrapper.emitted('mention')?.[0]?.[0]).toMatchObject({ trigger: '@' });
	});

	it('supports arrow navigation and escape close', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				sources: [{ trigger: '#', items: [{ label: 'one', value: 'one' }, { label: 'two', value: 'two' }] }],
			},
		});

		const textarea = wrapper.find('textarea');
		await textarea.setValue('#');
		await textarea.trigger('input');
		await textarea.trigger('keydown', { key: 'Enter' });
		await textarea.setValue('#');
		await textarea.trigger('input');
		await textarea.trigger('keydown', { key: 'ArrowDown' });
		await textarea.trigger('keydown', { key: 'ArrowUp' });
		await textarea.trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('.lx-mentions-input__menu').exists()).toBe(false);
	});

	it('handles minChars, tab selection, no-match and unknown trigger', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				'modelValue': '',
				'minChars': 3,
				'sources': [{ trigger: '@', items: [{ label: 'anna', value: 'anna' }] }],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const textarea = wrapper.find('textarea');
		await textarea.setValue('@a');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-mentions-input__item').length).toBeGreaterThan(0);
		await textarea.trigger('keydown', { key: 'Tab' });
		expect(wrapper.props('modelValue')).toContain('@anna ');

		await textarea.setValue('@zzzz');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-mentions-input__menu').exists()).toBe(false);

		await textarea.setValue('^x');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-mentions-input__menu').exists()).toBe(false);
	});

	it('returns early on keydown when no suggestions and supports click select', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				'modelValue': '',
				'sources': [{ trigger: '@', items: [{ label: 'alice', value: 'alice' }] }],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});

		const textarea = wrapper.find('textarea');
		await textarea.trigger('keydown', { key: 'ArrowDown' });
		await textarea.setValue('@');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		await wrapper.find('.lx-mentions-input__item').trigger('click');
		expect(wrapper.props('modelValue')).toContain('@alice ');
	});

	it('handles known trigger with missing source by not opening suggestions', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				'modelValue': '',
				'sources': [{ trigger: '#', items: [{ label: 'topic', value: 'topic' }] }],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		const textarea = wrapper.find('textarea');
		await textarea.setValue('@someone');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-mentions-input__menu').exists()).toBe(false);
	});

	it('keeps active index when still in range after suggestions update', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				'modelValue': '',
				'sources': [{ trigger: '@', items: [{ label: 'anna', value: 'anna' }, { label: 'anne', value: 'anne' }] }],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		const textarea = wrapper.find('textarea');
		await textarea.setValue('@an');
		await textarea.trigger('input');
		await textarea.trigger('keydown', { key: 'ArrowDown' });
		await wrapper.vm.$nextTick();
		await textarea.setValue('@ann');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-mentions-input__item').length).toBeGreaterThan(0);
	});

	it('ignores unrelated keys when suggestions are open', async () => {
		const wrapper = mount(LxMentionsInput, {
			props: {
				'modelValue': '',
				'sources': [{ trigger: '@', items: [{ label: 'alex', value: 'alex' }] }],
				'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
			},
		});
		const textarea = wrapper.find('textarea');
		await textarea.setValue('@a');
		await textarea.trigger('input');
		await wrapper.vm.$nextTick();
		await textarea.trigger('keydown', { key: 'x' });
		expect(wrapper.find('.lx-mentions-input__menu').exists()).toBe(true);
	});
});
