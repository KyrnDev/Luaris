import { afterEach, vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
	})),
});

afterEach(() => {
	document.documentElement.dataset.theme = '';
	document.body.innerHTML = '';
});
