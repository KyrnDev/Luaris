import { computed, onBeforeUnmount, ref } from 'vue';
import type { TLxColourScheme, TLxContrastPreference } from '../types/theme';
import type { IUseColourSchemeResult } from '../types/composables';

const DARK_QUERY = '(prefers-color-scheme: dark)';
const HIGH_CONTRAST_QUERY = '(prefers-contrast: more)';

export const useColourScheme = (): IUseColourSchemeResult => {
	const prefersDark = ref(false);
	const prefersHighContrast = ref(false);

	const isClient = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
	const darkMediaQuery = isClient ? window.matchMedia(DARK_QUERY) : null;
	const highContrastMediaQuery = isClient ? window.matchMedia(HIGH_CONTRAST_QUERY) : null;

	const refresh = (): void => {
		prefersDark.value = Boolean(darkMediaQuery?.matches);
		prefersHighContrast.value = Boolean(highContrastMediaQuery?.matches);
	};

	const handleMediaChange = (): void => {
		refresh();
	};

	refresh();

	if (darkMediaQuery && highContrastMediaQuery) {
		darkMediaQuery.addEventListener('change', handleMediaChange);
		highContrastMediaQuery.addEventListener('change', handleMediaChange);
	}

	onBeforeUnmount(() => {
		darkMediaQuery?.removeEventListener('change', handleMediaChange);
		highContrastMediaQuery?.removeEventListener('change', handleMediaChange);
	});

	const colourScheme = computed<TLxColourScheme>(() => (prefersDark.value ? 'dark' : 'light'));

	const contrastPreference = computed<TLxContrastPreference>(() => (
		prefersHighContrast.value ? 'more' : 'no-preference'
	));

	return {
		colourScheme,
		contrastPreference,
		prefersDark,
		prefersHighContrast,
		refresh,
	};
};
