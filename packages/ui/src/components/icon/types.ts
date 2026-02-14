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
export type TLxIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ILxIconProps {
	name: string,
	iconStyle?: TLxIconStyle,
	size?: TLxIconSize,
	spin?: boolean,
	pulse?: boolean,
	fixedWidth?: boolean,
	label?: string,
	decorative?: boolean,
}
