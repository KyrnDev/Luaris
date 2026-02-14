export type TLxTheme = 'light' | 'dark' | 'high-contrast';

export interface ILxThemeOption {
	value: TLxTheme,
	label: string,
}

export interface ILxThemeSelectorProps {
	themes?: ILxThemeOption[],
}
