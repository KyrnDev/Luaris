import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
	afterEach(() => {
		document.documentElement.dataset.theme = '';
		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
		}));
	});

	const mountHarness = () => mount(defineComponent({
		setup() {
			return useTheme();
		},
		template: '<div />',
	}));

	it('uses theme from html data attribute', async () => {
		document.documentElement.dataset.theme = 'dark';
		const wrapper = mountHarness();
		await nextTick();

		expect(wrapper.vm.theme).toBe('dark');
		expect(wrapper.vm.resolveInitialTheme()).toBe('dark');
	});

	it('falls back to system preferences when attribute is not set', async () => {
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

		const wrapper = mountHarness();
		await nextTick();

		expect(wrapper.vm.theme).toBe('high-contrast');
		expect(wrapper.vm.availableThemes).toEqual(['light', 'dark', 'high-contrast']);
	});

	it('sets theme and writes to html data attribute', async () => {
		const wrapper = mountHarness();
		await nextTick();

		wrapper.vm.setTheme('dark');
		await nextTick();

		expect(wrapper.vm.theme).toBe('dark');
		expect(document.documentElement.dataset.theme).toBe('dark');
	});

	it('falls back to dark when attribute is invalid and dark preference is enabled', async () => {
		document.documentElement.dataset.theme = 'invalid-theme';
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

		const wrapper = mountHarness();
		await nextTick();

		expect(wrapper.vm.theme).toBe('dark');
		expect(wrapper.vm.resolveInitialTheme()).toBe('dark');
	});

	it('works safely when document is unavailable', () => {
		const originalDocumentDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
		Object.defineProperty(globalThis, 'document', {
			value: undefined,
			configurable: true,
		});

		try {
			const composable = useTheme();
			composable.setTheme('light');

			expect(composable.theme.value).toBe('light');
			expect(composable.resolveInitialTheme()).toBe('light');
		} finally {
			if (originalDocumentDescriptor) {
				Object.defineProperty(globalThis, 'document', originalDocumentDescriptor);
			}
		}
	});
});
