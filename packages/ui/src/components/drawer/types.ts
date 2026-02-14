export type TLxDrawerSide = 'top' | 'right' | 'bottom' | 'left';
export type TLxDrawerAnimation = 'none' | 'fade' | 'slide';

export interface ILxDrawerProps {
	modelValue?: boolean,
	title?: string,
	side?: TLxDrawerSide,
	animation?: TLxDrawerAnimation,
	closeOnBackdrop?: boolean,
	closeOnEscape?: boolean,
}
