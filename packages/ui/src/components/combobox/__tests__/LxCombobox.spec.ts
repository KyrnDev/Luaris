import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxCombobox from '../LxCombobox.vue';

describe('LxCombobox', () => {
	const options = ['United Kingdom', 'Germany', 'Sweden'];

	it('selects value in single mode and emits string model', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: false,
				options,
				openByDefault: true,
			},
		});

		await wrapper.findAll('.lx-combobox__option-control')[0]?.trigger('click');

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('United Kingdom');
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe('United Kingdom');
	});

	it('toggles values in multiple mode and emits array model', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options,
				openByDefault: true,
			},
		});

		await wrapper.findAll('.lx-combobox__option-control')[1]?.trigger('click');

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['Germany']);
		expect(wrapper.emitted('change')?.[0]?.[0]).toEqual(['Germany']);
	});

	it('supports checkbox mode and keyboard selection', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				tags: false,
				options,
				openByDefault: true,
			},
		});

		const checkbox = wrapper.findAll('.lx-combobox__option-control--checkbox input')[0];
		await checkbox?.setValue(true);
		expect(wrapper.emitted('change')?.[0]?.[0]).toEqual(['United Kingdom']);

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('keydown', { key: 'ArrowDown' });
		await input.trigger('keydown', { key: 'Enter' });
		expect(wrapper.emitted('change')?.length).toBeGreaterThan(1);
	});

	it('removes last selected item on backspace when query is empty', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options,
				modelValue: ['Germany'],
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('keydown', { key: 'Backspace' });

		const lastEvent = wrapper.emitted('change')?.slice(-1)[0]?.[0];
		expect(lastEvent).toEqual([]);
	});

	it('shows no results for unmatched filter and closes on escape', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options,
				openByDefault: true,
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.setValue('zzz');
		expect(wrapper.find('.lx-combobox__empty').exists()).toBe(true);

		await input.trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('.lx-combobox__menu').exists()).toBe(false);
	});

	it('respects disabled and alwaysVisible modes', async () => {
		const disabled = mount(LxCombobox, {
			props: {
				options,
				disabled: true,
			},
		});

		await disabled.find('.lx-combobox__control').trigger('click');
		expect(disabled.find('.lx-combobox__menu').exists()).toBe(false);

		const alwaysVisible = mount(LxCombobox, {
			props: {
				options,
				alwaysVisible: true,
				openByDefault: true,
			},
		});

		expect(alwaysVisible.find('.lx-combobox__menu').exists()).toBe(true);
		await alwaysVisible.find('input[role="combobox"]').trigger('keydown', { key: 'Escape' });
		expect(alwaysVisible.find('.lx-combobox__menu').exists()).toBe(true);
	});

	it('normalises model values across types and reacts to prop updates', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				options,
				multiple: true,
				modelValue: 'Germany',
			},
		});

		expect(wrapper.findAll('.lx-combobox__chip')).toHaveLength(1);

		await wrapper.setProps({
			multiple: false,
			modelValue: ['Sweden'],
			openByDefault: true,
		});
		await wrapper.vm.$nextTick();

		const input = wrapper.find('input[role="combobox"]');
		expect((input.element as HTMLInputElement).value).toContain('Sweden');
		expect(wrapper.find('.lx-combobox__menu').exists()).toBe(true);
	});

	it('supports non-filterable mode and handles empty option navigation', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				options: [],
				filterable: false,
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('focus');
		await input.setValue('abc');
		expect(wrapper.find('.lx-combobox__empty').exists()).toBe(true);
		await input.trigger('keydown', { key: 'ArrowDown' });
		await input.trigger('keydown', { key: 'Enter' });
		await input.trigger('keydown', { key: 'ArrowUp' });
		await input.trigger('keydown', { key: 'a' });
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('closes on outside click when not always visible', async () => {
		const wrapper = mount(LxCombobox, {
			attachTo: document.body,
			props: {
				options,
				openByDefault: true,
			},
		});

		expect(wrapper.find('.lx-combobox__menu').exists()).toBe(true);
		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-combobox__menu').exists()).toBe(false);
		wrapper.unmount();
	});

	it('removes values from tag chips and selected checkbox list', async () => {
		const withTags = mount(LxCombobox, {
			props: {
				multiple: true,
				options,
				modelValue: ['Germany'],
			},
		});

		await withTags.find('.lx-combobox__chip').trigger('click');
		expect(withTags.emitted('change')?.[0]?.[0]).toEqual([]);

		const withList = mount(LxCombobox, {
			props: {
				multiple: true,
				tags: false,
				options,
				modelValue: ['Sweden'],
			},
		});

		await withList.find('.lx-combobox__selected-list input').setValue(false);
		expect(withList.emitted('change')?.[0]?.[0]).toEqual([]);
	});

	it('uses provided id prop and name attr identifiers', () => {
		const wrapper = mount(LxCombobox, {
			attrs: {
				name: 'country-name',
			},
			props: {
				options,
				id: 'country-filter',
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		expect(input.attributes('id')).toBe('country-filter');
		expect(input.attributes('name')).toBe('country-name');
		expect(input.attributes('aria-controls')).toBeUndefined();
	});

	it('supports removing already-selected values and disabled fallback selection logic', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options: [
					{ label: 'United Kingdom', value: 'United Kingdom' },
					{ label: 'Germany', value: 'Germany', disabled: true },
				],
				modelValue: ['United Kingdom'],
				openByDefault: true,
			},
		});

		await wrapper.findAll('.lx-combobox__option-control')[0]?.trigger('click');
		expect(wrapper.emitted('change')?.[0]?.[0]).toEqual([]);

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('keydown', { key: 'ArrowDown' });
		await input.trigger('keydown', { key: 'ArrowDown' });
		await input.trigger('keydown', { key: 'Enter' });

		const emitted = wrapper.emitted('change') ?? [];
		expect(emitted[1]?.[0]).toEqual(['United Kingdom']);
	});

	it('wraps highlight navigation when first key is arrow up', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				options: [
					{ label: 'United Kingdom', value: 'United Kingdom', disabled: true },
					{ label: 'Germany', value: 'Germany' },
					{ label: 'Sweden', value: 'Sweden' },
				],
				openByDefault: true,
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('keydown', { key: 'ArrowUp' });
		const activeDescendant = input.attributes('aria-activedescendant');
		expect(activeDescendant?.endsWith('-option-2')).toBe(true);
	});

	it('normalises array model in single mode with empty first value', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: false,
				options,
				modelValue: [''],
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		expect((input.element as HTMLInputElement).value).toBe('');

		await wrapper.setProps({
			modelValue: ['Germany', 'Sweden'],
			openByDefault: true,
		});
		await wrapper.vm.$nextTick();

		expect((input.element as HTMLInputElement).value).toContain('Germany');
		expect(wrapper.find('.lx-combobox__menu').exists()).toBe(true);
	});

	it('falls back to raw selected value when option is missing', () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options: ['Germany'],
				modelValue: ['Unknown country'],
			},
		});

		expect(wrapper.find('.lx-combobox__chip').text()).toContain('Unknown country');
	});

	it('handles backspace with empty-string value without removal call', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options: [''],
				modelValue: [''],
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('keydown', { key: 'Backspace' });
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('does not remove selected value on backspace when query has content', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: true,
				options,
				modelValue: ['Germany'],
				openByDefault: true,
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.setValue('g');
		await input.trigger('keydown', { key: 'Backspace' });
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('selects first enabled option on enter when no option is highlighted', async () => {
		const wrapper = mount(LxCombobox, {
			props: {
				multiple: false,
				options: [
					{ label: 'Disabled', value: 'disabled', disabled: true },
					{ label: 'Germany', value: 'Germany' },
				],
				openByDefault: true,
			},
		});

		const input = wrapper.find('input[role="combobox"]');
		await input.trigger('keydown', { key: 'Enter' });
		expect(wrapper.emitted('change')?.[0]?.[0]).toBe('Germany');
	});
});
