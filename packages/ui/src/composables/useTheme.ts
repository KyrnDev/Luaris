import { ref } from 'vue';
import { useColourScheme } from './useColourScheme';
import type { TLxTheme } from '../types/theme';
import type { IUseThemeResult } from '../types/composables';

const LX_THEMES = ['light', 'dark', 'high-contrast'] as const;

const isLxTheme = (value: string | undefined): value is TLxTheme => (
	value !== undefined && LX_THEMES.includes(value as TLxTheme)
);

export const useTheme = (): IUseThemeResult => {
	const { prefersDark, prefersHighContrast } = useColourScheme();
	const theme = ref<TLxTheme>('light');

	const resolveInitialTheme = (): TLxTheme => {
		if (typeof document !== 'undefined') {
			const themeFromAttribute = document.documentElement.dataset.theme;

			if (isLxTheme(themeFromAttribute)) {
				return themeFromAttribute;
			}
		}

		if (prefersHighContrast.value) {
			return 'high-contrast';
		}

		if (prefersDark.value) {
			return 'dark';
		}

		return 'light';
	};

	const setTheme = (nextTheme: TLxTheme): void => {
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = nextTheme;
		}

		theme.value = nextTheme;
	};

	theme.value = resolveInitialTheme();

	return {
		theme,
		availableThemes: LX_THEMES,
		resolveInitialTheme,
		setTheme,
	};
};
