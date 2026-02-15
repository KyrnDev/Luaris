import type { ComputedRef, Ref } from 'vue';
import type { TLxColourScheme, TLxContrastPreference, TLxTheme } from './theme';

export interface IUseColourSchemeResult {
	colourScheme: ComputedRef<TLxColourScheme>,
	contrastPreference: ComputedRef<TLxContrastPreference>,
	prefersDark: Ref<boolean>,
	prefersHighContrast: Ref<boolean>,
	refresh: () => void,
}

export interface IUseThemeResult {
	theme: Ref<TLxTheme>,
	availableThemes: readonly TLxTheme[],
	resolveInitialTheme: () => TLxTheme,
	setTheme: (theme: TLxTheme) => void,
}
