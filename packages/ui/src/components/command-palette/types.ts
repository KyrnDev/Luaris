import type { TLxModalAnimation, TLxModalPosition } from '../modal';

export interface ILxCommandPaletteItem {
	label: string,
	value: string,
	keywords?: string[],
	shortcut?: string,
	disabled?: boolean,
}

export interface ILxCommandPaletteProps {
	items?: ILxCommandPaletteItem[],
	title?: string,
	placeholder?: string,
	maxResults?: number,
	position?: TLxModalPosition,
	animation?: TLxModalAnimation,
	hotkey?: boolean,
}
