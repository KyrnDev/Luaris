import type { TBorderWidths, TColours, TSizes, TSurfaceColours } from '../../types/theme';

export type TLxCardProps = {
	padding?: TSizes,
	borderSize?: TBorderWidths,
	borderRadius?: TSizes,
	borderColour?: TColours | TSurfaceColours,
	contentBackgroundColour?: TColours | TSurfaceColours,
	headerBackgroundColour?: TColours | TSurfaceColours,
	footerBackgroundColour?: TColours | TSurfaceColours,
};
