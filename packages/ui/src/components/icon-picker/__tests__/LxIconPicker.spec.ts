import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import LxIconPicker from '../LxIconPicker.vue';
import type { ILxIconRegistryEntry } from '../types';
import { LxButton } from '../../button';
import { LxModal } from '../../modal';

const buildRegistry = (count: number): ILxIconRegistryEntry[] => {
	return Array.from({ length: count }, (unused, index) => {
		void unused;
		return {
			name: `icon-${index + 1}`,
			keywords: [`keyword-${index + 1}`],
			styles: ['solid', 'regular'],
			families: ['classic'],
			licences: ['free', 'pro'],
			styleSources: {
				solid: ['free', 'pro'],
				regular: ['pro'],
			},
		};
	});
};

describe('LxIconPicker', () => {
	it('renders enough icons to fill at least 3 rows in inline mode', () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: buildRegistry(30),
			},
		});

		expect(wrapper.findAll('.lx-icon-picker__tile')).toHaveLength(15);
		expect(wrapper.text()).toContain('30 results');
	});

	it('filters icons by search and emits selected icon/style', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: buildRegistry(4),
			},
		});

		await wrapper.find('.lx-icon-picker__search').setValue('icon-3');
		expect(wrapper.findAll('.lx-icon-picker__tile')).toHaveLength(1);

		await wrapper.find('.lx-icon-picker__tile').trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
			name: 'icon-3',
			style: 'solid',
		});
		expect(wrapper.find('.lx-icon-picker__tile').attributes('title')).toContain('Icon 3');
	});

	it('shows styles for selected icon and updates selected style', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						name: 'camera',
						keywords: ['photo'],
						styles: ['solid', 'regular'],
						families: ['classic'],
						licences: ['free', 'pro'],
						styleSources: {
							solid: ['free'],
							regular: ['pro'],
						},
					},
				],
				modelValue: {
					name: 'camera',
					style: 'solid',
				},
			},
		});

		expect(wrapper.find('.lx-icon-picker__style-section').exists()).toBe(true);
		const chips = wrapper.findAll('.lx-icon-picker__style-chip');
		expect(chips).toHaveLength(2);
		await chips[1]?.trigger('click');

		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
			name: 'camera',
			style: 'regular',
		});
	});

	it('supports popup mode and opens picker panel from trigger button', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				registry: buildRegistry(8),
				modelValue: {
					name: 'icon-2',
					style: 'solid',
				},
			},
		});

		expect(wrapper.find('.lx-icon-picker__panel').exists()).toBe(false);
		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();
		expect(document.body.querySelector('.lx-modal')).not.toBeNull();
		expect(document.body.querySelector('.lx-icon-picker__panel--modal')).not.toBeNull();
	});

	it('keeps popup open when closeOnSelect is false', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				closeOnSelect: false,
				registry: buildRegistry(2),
			},
		});

		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();
		const firstTile = document.body.querySelector('.lx-icon-picker__tile') as HTMLButtonElement;
		firstTile.click();
		await wrapper.vm.$nextTick();

		expect(document.body.querySelector('.lx-modal')).not.toBeNull();
	});

	it('filters out icons with no eligible styles and clears invalid selected model', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						name: 'blocked',
						keywords: ['blocked'],
						styles: ['solid'],
						families: ['classic'],
						licences: ['free'],
						styleSources: {
							solid: ['free'],
						},
					},
				],
				modelValue: {
					name: 'blocked',
					style: 'regular',
				},
			},
		});

		await wrapper.findAll('.lx-icon-picker__filter-group input')[0]?.setValue(false);
		expect(wrapper.emitted('update:modelValue')?.some(payload => payload?.[0] === null)).toBe(true);
	});

	it('supports normalised registry entries and keeps page index bounded', async () => {
		const manyIcons = Array.from({ length: 24 }, (unused, index) => {
			void unused;
			return {
				icon: `icon-${index + 1}`,
				terms: ['bulk'],
				styles: ['solid'],
			};
		});

		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					...manyIcons,
					{
						icon: 'camera',
						label: 'Camera',
						terms: ['photo', 'lens'],
						styles: ['solid'],
					},
					{
						icon: 'github',
						terms: ['code'],
						styles: ['brands'],
					},
					{
						icon: '',
						terms: [],
						styles: ['solid'],
					},
				],
				columns: 1,
				pageSize: 1,
				showSettings: false,
			},
		});

		expect(wrapper.text()).toContain('26 results');
		expect(wrapper.findAll('.lx-icon-picker__tile').length).toBeGreaterThan(0);

		const nextButton = wrapper.findAll('button').find(button => button.text() === 'Next');
		await nextButton?.trigger('click');
		expect(wrapper.text()).toContain('Page 2 /');

		await wrapper.find('.lx-icon-picker__search').setValue('camera');
		expect(wrapper.text()).toContain('Page 1 / 1');
		expect(wrapper.findAll('.lx-icon-picker__tile').length).toBeGreaterThan(0);
	});

	it('normalises entries with icon alias and filters invalid or unsupported style rows', () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						icon: 'good',
						styles: ['solid'],
					},
					{
						name: 'no-style-source',
						styles: ['solid'],
						styleSources: {},
					},
					{
						name: 'no-styles',
					} as unknown as ILxIconRegistryEntry,
					{
						name: 'unsupported',
						styles: ['sharp'] as unknown as ILxIconRegistryEntry['styles'],
					},
					{
						name: '',
						styles: ['solid'],
					},
				],
				showSettings: false,
			},
		});

		expect(wrapper.text()).toContain('1 results');
		expect(wrapper.findAll('.lx-icon-picker__tile')).toHaveLength(1);
	});

	it('handles missing registry prop and renders zero results', () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: null as unknown as ILxIconRegistryEntry[],
				showSettings: false,
			},
		});

		expect(wrapper.text()).toContain('0 results');
		expect(wrapper.findAll('.lx-icon-picker__tile')).toHaveLength(0);
	});

	it('supports filtering by family and style settings', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						name: 'brand-icon',
						styles: ['brands'],
						families: ['brands'],
						licences: ['free'],
						keywords: ['brand'],
					},
					{
						name: 'classic-icon',
						styles: ['solid'],
						families: ['classic'],
						licences: ['free'],
						keywords: ['classic'],
					},
				],
			},
		});

		expect(wrapper.text()).toContain('2 results');

		const familyFieldset = wrapper.findAll('.lx-icon-picker__filter-group')
			.find(group => group.find('legend').text() === 'Families');
		const brandFamilyCheckbox = familyFieldset?.findAll('input[type="checkbox"]')
			.find(box => (box.element as HTMLInputElement).value === 'brands');
		await brandFamilyCheckbox?.setValue(false);
		expect(wrapper.text()).toContain('1 results');

		const styleFieldset = wrapper.findAll('.lx-icon-picker__filter-group')
			.find(group => group.find('legend').text() === 'Styles');
		const solidStyleCheckbox = styleFieldset?.findAll('input[type="checkbox"]')
			.find(box => (box.element as HTMLInputElement).value === 'solid');
		await solidStyleCheckbox?.setValue(false);
		expect(wrapper.text()).toContain('0 results');
	});

	it('uses computed style gap fallback and resize observer path in popup mode', async () => {
		const originalResizeObserver = globalThis.ResizeObserver;
		const observeSpy = vi.fn();
		const disconnectSpy = vi.fn();

		class TResizeObserver {
			public callback: ResizeObserverCallback;

			public constructor(callback: ResizeObserverCallback) {
				this.callback = callback;
			}

			public observe = observeSpy;
			public disconnect = disconnectSpy;
		}

		Object.defineProperty(globalThis, 'ResizeObserver', {
			value: TResizeObserver,
			configurable: true,
		});

		const getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
			columnGap: '2px',
			gap: '',
		} as CSSStyleDeclaration);

		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				registry: buildRegistry(8),
			},
			attachTo: document.body,
		});

		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();

		expect(observeSpy).toHaveBeenCalled();
		expect(getComputedStyleSpy).toHaveBeenCalled();

		wrapper.unmount();
		expect(disconnectSpy).toHaveBeenCalled();

		getComputedStyleSpy.mockRestore();
		Object.defineProperty(globalThis, 'ResizeObserver', {
			value: originalResizeObserver,
			configurable: true,
		});
	});

	it('keeps style label empty-state safe when selected icon disappears', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						name: 'camera',
						styles: ['solid'],
						families: ['classic'],
						licences: ['free'],
						styleSources: {
							solid: ['free'],
						},
					},
				],
				modelValue: {
					name: 'camera',
					style: 'solid',
				},
			},
		});

		const licenceCheckboxes = wrapper.findAll('input[type="checkbox"]');
		await licenceCheckboxes[0]?.setValue(false);

		expect(wrapper.emitted('update:modelValue')?.some(event => event?.[0] === null)).toBe(true);
		expect(wrapper.find('.lx-icon-picker__style-section').exists()).toBe(false);
	});

	it('closes popup after selection when closeOnSelect is true', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				closeOnSelect: true,
				registry: buildRegistry(6),
			},
			attachTo: document.body,
		});

		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();
		const firstTile = document.body.querySelector('.lx-icon-picker__tile') as HTMLButtonElement;
		firstTile.click();
		await wrapper.vm.$nextTick();

		const modal = document.body.querySelector('.lx-modal') as HTMLElement;
		expect(modal.style.display).toBe('none');
	});

	it('clamps current page when total pages decrease', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				registry: buildRegistry(10),
				columns: 1,
				pageSize: 1,
				showSettings: false,
			},
		});

		const nextButton = wrapper.findAll('button').find(button => button.text() === 'Next');
		await nextButton?.trigger('click');
		expect(wrapper.text()).toContain('Page 2 /');
		const previousButton = wrapper.findAll('button').find(button => button.text() === 'Previous');
		await previousButton?.trigger('click');
		expect(wrapper.text()).toContain('Page 1 /');
		await nextButton?.trigger('click');

		await wrapper.setProps({
			registry: [
				{
					name: 'icon-only',
					keywords: ['single'],
					styles: ['solid'],
					families: ['classic'],
					licences: ['free'],
					styleSources: {
						solid: ['free'],
					},
				},
			],
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain('Page 1 / 1');
	});

	it('renders and interacts with modal panel controls', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				registry: buildRegistry(12),
				columns: 1,
				pageSize: 1,
				modelValue: {
					name: 'icon-1',
					style: 'solid',
				},
			},
			attachTo: document.body,
		});

		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();

		const styleChip = document.body.querySelector('.lx-icon-picker__panel--modal .lx-icon-picker__style-chip') as HTMLButtonElement;
		styleChip?.click();
		await wrapper.vm.$nextTick();

		const modalGroups = Array.from(document.body.querySelectorAll('.lx-icon-picker__panel--modal .lx-icon-picker__filter-group'));
		const licenceGroup = modalGroups.find(group => group.querySelector('legend')?.textContent === 'Licences');
		const familyGroup = modalGroups.find(group => group.querySelector('legend')?.textContent === 'Families');
		const styleGroup = modalGroups.find(group => group.querySelector('legend')?.textContent === 'Styles');
		(licenceGroup?.querySelector('input[type="checkbox"]') as HTMLInputElement | null)?.click();
		(familyGroup?.querySelector('input[type="checkbox"]') as HTMLInputElement | null)?.click();
		(styleGroup?.querySelector('input[type="checkbox"]') as HTMLInputElement | null)?.click();
		await wrapper.vm.$nextTick();

		const modalPagerButtons = wrapper.findAllComponents(LxButton)
			.filter(button => button.element.closest('.lx-icon-picker__panel--modal'));
		const modalNextButton = modalPagerButtons.find(button => button.text().trim() === 'Next');
		await modalNextButton?.trigger('click');
		await wrapper.vm.$nextTick();
		const modalPreviousButton = modalPagerButtons.find(button => button.text().trim() === 'Previous');
		await modalPreviousButton?.trigger('click');
		await wrapper.vm.$nextTick();

		const modalSearch = document.body.querySelector('.lx-icon-picker__panel--modal .lx-icon-picker__search') as HTMLInputElement;
		modalSearch.value = 'icon-1';
		modalSearch.dispatchEvent(new Event('input'));
		await wrapper.vm.$nextTick();

		wrapper.findComponent(LxModal).vm.$emit('update:modelValue', false);
		await wrapper.vm.$nextTick();

		expect(document.body.querySelector('.lx-icon-picker__panel--modal')).not.toBeNull();
		expect(wrapper.emitted('update:modelValue')?.length).toBeGreaterThan(0);
	});

	it('covers guard branches in internal logic paths', async () => {
		const originalResizeObserver = globalThis.ResizeObserver;
		let resizeCallback: (() => void) | null = null;
		const observeSpy = vi.fn();
		const disconnectSpy = vi.fn();

		class TResizeObserver {
			public constructor(callback: () => void) {
				resizeCallback = callback;
			}

			public observe = observeSpy;
			public disconnect = disconnectSpy;
		}

		Object.defineProperty(globalThis, 'ResizeObserver', {
			value: TResizeObserver,
			configurable: true,
		});

		const wrapper = mount(LxIconPicker, {
			props: {
				registry: [
					{
						name: 'camera',
						styles: ['solid'],
						families: ['classic'],
						licences: ['free'],
						styleSources: {
							solid: ['free'],
						},
					},
				],
				showSettings: false,
				columns: 1,
				pageSize: 1,
			},
		});

		const api = (wrapper.vm as {
			$: {
				setupState: {
					gridRef: HTMLElement | null,
					currentPage: number,
					query: string,
					updateGridColumns: () => void,
					startGridObserver: () => Promise<void>,
					togglePopup: () => void,
					selectStyle: (style: string) => void,
					selectIcon: (icon: { name: string, styles: string[], families: string[], licences: string[], styleSources: Record<string, string[]>, keywords: string[], label: string }) => void,
				},
			},
		}).$.setupState;

		api.gridRef = null;
		api.updateGridColumns();
		await api.startGridObserver();

		api.togglePopup();
		api.selectStyle('solid');
		api.selectIcon({
			name: 'broken',
			label: 'Broken',
			keywords: [],
			styles: [],
			families: ['classic'],
			licences: ['free'],
			styleSources: {},
		});

		const grid = wrapper.find('.lx-icon-picker__grid').element as HTMLElement;
		api.gridRef = grid;
		await api.startGridObserver();
		resizeCallback?.();

		expect(observeSpy).toHaveBeenCalled();
		wrapper.unmount();
		expect(disconnectSpy).toHaveBeenCalled();

		Object.defineProperty(globalThis, 'ResizeObserver', {
			value: originalResizeObserver,
			configurable: true,
		});
	});

	it('hides popup settings when showSettings is disabled', async () => {
		const wrapper = mount(LxIconPicker, {
			props: {
				popup: true,
				showSettings: false,
				registry: buildRegistry(4),
			},
			attachTo: document.body,
		});

		await wrapper.find('.lx-icon-picker__trigger').trigger('click');
		await wrapper.vm.$nextTick();

		expect(document.body.querySelector('.lx-icon-picker__panel--modal .lx-icon-picker__settings')).toBeNull();
	});
});
