import type { TFontSizes } from '../../types/units';

export type TLxIconStyle = (
	'solid'
	| 'regular'
	| 'brands'
	| 'light'
	| 'duotone'
	| 'thin'
	| 'sharp-solid'
	| 'sharp-regular'
	| 'sharp-light'
	| 'sharp-thin'
	| 'sharp-duotone'
);

export type TLxIconProps = {
	name: string,
	iconStyle?: TLxIconStyle,
	size?: TFontSizes,
	spin?: boolean,
	pulse?: boolean,
	fixedWidth?: boolean,
	label?: string,
	decorative?: boolean,
};
