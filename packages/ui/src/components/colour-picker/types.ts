export interface ILxColourValue {
	hex: string,
	alpha: number,
}

export type TLxColourFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export interface ILxColourPickerProps {
	disabled?: boolean,
	showAlpha?: boolean,
	formats?: TLxColourFormat[],
	defaultFormat?: TLxColourFormat,
}
