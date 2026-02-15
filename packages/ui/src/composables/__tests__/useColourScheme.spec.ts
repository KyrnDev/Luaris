import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useColourScheme } from '../useColourScheme';

interface IMediaQueryMock {
	matches: boolean,
	media: string,
	onchange: null,
	addEventListener: ReturnType<typeof vi.fn>,
	removeEventListener: ReturnType<typeof vi.fn>,
	dispatchEvent: ReturnType<typeof vi.fn>,
	addListener: ReturnType<typeof vi.fn>,
	removeListener: ReturnType<typeof vi.fn>,
}

const createMediaQueryMock = (query: string, matches: boolean): IMediaQueryMock => ({
	matches,
	media: query,
	onchange: null,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
	addListener: vi.fn(),
	removeListener: vi.fn(),
});

describe('useColourScheme', () => {
	afterEach(() => {
		window.matchMedia = vi.fn().mockImplementation((query: string) => createMediaQueryMock(query, false));
	});

	const mountHarness = () => mount(defineComponent({
		setup() {
			return useColourScheme();
		},
		template: '<div />',
	}));

	it('resolves current colour scheme and contrast preference', async () => {
		window.matchMedia = vi.fn().mockImplementation((query: string) => (
			createMediaQueryMock(query, query.includes('prefers-color-scheme: dark'))
		));

		const wrapper = mountHarness();
		await nextTick();

		expect(wrapper.vm.prefersDark).toBe(true);
		expect(wrapper.vm.prefersHighContrast).toBe(false);
		expect(wrapper.vm.colourScheme).toBe('dark');
		expect(wrapper.vm.contrastPreference).toBe('no-preference');
	});

	it('refresh updates preferences after media changes', async () => {
		const darkQuery = createMediaQueryMock('(prefers-color-scheme: dark)', false);
		const contrastQuery = createMediaQueryMock('(prefers-contrast: more)', false);

		window.matchMedia = vi.fn().mockImplementation((query: string) => (
			query.includes('prefers-color-scheme: dark') ? darkQuery : contrastQuery
		));

		const wrapper = mountHarness();
		await nextTick();

		darkQuery.matches = true;
		contrastQuery.matches = true;
		wrapper.vm.refresh();
		await nextTick();

		expect(wrapper.vm.prefersDark).toBe(true);
		expect(wrapper.vm.prefersHighContrast).toBe(true);
		expect(wrapper.vm.contrastPreference).toBe('more');
	});

	it('removes media listeners on unmount', async () => {
		const darkQuery = createMediaQueryMock('(prefers-color-scheme: dark)', false);
		const contrastQuery = createMediaQueryMock('(prefers-contrast: more)', false);

		window.matchMedia = vi.fn().mockImplementation((query: string) => (
			query.includes('prefers-color-scheme: dark') ? darkQuery : contrastQuery
		));

		const wrapper = mountHarness();
		await nextTick();
		wrapper.unmount();

		expect(darkQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
		expect(contrastQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
	});
});
