export type TLxDrawerSide = 'left' | 'right';

export interface ILxDrawerProps {
	modelValue?: boolean,
	title?: string,
	side?: TLxDrawerSide,
	closeOnBackdrop?: boolean,
	closeOnEscape?: boolean,
}
