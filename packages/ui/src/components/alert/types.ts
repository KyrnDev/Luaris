import type { TBorderWidths, TColours, TFontLineHeights, TRadiusSize, TSizes, TSurfaceColours } from '../../types/theme';

export type TLxAlertRole = 'alert' | 'status';

export type TLxAlertProps = {
	variant?: TColours | TSurfaceColours,
	size?: TSizes,
	title?: string,
	icon?: string,
	content?: string,
	contentPadding?: TSizes,
	contentLineHeight?: TFontLineHeights,
	borderRadius?: TRadiusSize,
	borderWidth?: TBorderWidths,
	role?: TLxAlertRole,
};
