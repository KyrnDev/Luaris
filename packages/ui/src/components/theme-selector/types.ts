import type { TLxTheme } from '../../types/theme';

export type { TLxTheme } from '../../types/theme';

export interface ILxThemeOption {
	value: TLxTheme,
	label: string,
}

export interface ILxThemeSelectorProps {
	themes?: ILxThemeOption[],
}
