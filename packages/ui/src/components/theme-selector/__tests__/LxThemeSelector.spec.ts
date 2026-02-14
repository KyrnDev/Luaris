import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import LxThemeSelector from '../LxThemeSelector.vue';

describe('LxThemeSelector', () => {
	it('sets and emits selected theme', async () => {
		const wrapper = mount(LxThemeSelector);

		const buttons = wrapper.findAll('.lx-theme-selector__option');
		await buttons[1]?.trigger('click');

		expect(document.documentElement.dataset.theme).toBe('dark');
		const updateEvents = wrapper.emitted('update:theme') || [];
		const changeEvents = wrapper.emitted('change') || [];
		expect(updateEvents[updateEvents.length - 1]?.[0]).toBe('dark');
		expect(changeEvents[changeEvents.length - 1]?.[0]).toBe('dark');
	});

	it('uses existing html data-theme as initial theme', async () => {
		document.documentElement.dataset.theme = 'high-contrast';
		const wrapper = mount(LxThemeSelector);
		await nextTick();

		const active = wrapper.find('.lx-theme-selector__option.is-active');
		expect(active.text()).toContain('High Contrast');
	});

	it('uses dark mode preference when no explicit theme is set', async () => {
		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: query.includes('prefers-color-scheme: dark'),
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
		}));

		const wrapper = mount(LxThemeSelector);
		await nextTick();
		const active = wrapper.find('.lx-theme-selector__option.is-active');

		expect(active.text()).toContain('Dark');
	});

	it('uses high contrast preference when enabled', async () => {
		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: query.includes('prefers-contrast: more'),
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
		}));

		const wrapper = mount(LxThemeSelector);
		await nextTick();
		const active = wrapper.find('.lx-theme-selector__option.is-active');

		expect(active.text()).toContain('High Contrast');
	});
});
