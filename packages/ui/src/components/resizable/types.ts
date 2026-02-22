export type TLxResizableMode = 'horizontal' | 'vertical' | 'both';

export interface ILxResizableSize {
	width: number,
	height: number,
}

export interface ILxResizableProps {
	mode?: TLxResizableMode,
	minWidth?: number,
	minHeight?: number,
	maxWidth?: number,
	maxHeight?: number,
}
