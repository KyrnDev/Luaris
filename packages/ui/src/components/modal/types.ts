export type TLxModalPosition = 'center' | 'left' | 'right' | 'top' | 'bottom';
export type TLxModalAnimation = 'none' | 'fade' | 'slide';

export interface ILxModalProps {
	modelValue?: boolean,
	title?: string,
	position?: TLxModalPosition,
	animation?: TLxModalAnimation,
	closeOnBackdrop?: boolean,
	closeOnEscape?: boolean,
	showBackdrop?: boolean,
	showClose?: boolean,
	panelClass?: string,
	width?: string,
	maxWidth?: string,
	maxHeight?: string,
}
