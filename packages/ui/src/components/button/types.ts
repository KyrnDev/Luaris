import type { TRadiusSize, TColours, TSizes, TBorderWidths } from '../../types/units';

export type TLxButtonType = 'button' | 'submit' | 'reset';
export type TLxButtonIconOrder = 'left' | 'right';
export type TLxButtonGroup = 'start' | 'middle' | 'end';
export type THoverModes = 'default' | 'invert';

export type TLxButtonProps = {
	variant?: TColours,
	size?: TSizes,
	type?: TLxButtonType,
	disabled?: boolean,
	loading?: boolean,
	fullWidth?: boolean,
	label?: string,
	ariaLabel?: string,
	icon?: string,
	iconOrder?: TLxButtonIconOrder,
	borderRadius?: TRadiusSize,
	borderWidth?: TBorderWidths,
	group?: TLxButtonGroup,
	active?: boolean,
	hoverMode?: THoverModes,
};
