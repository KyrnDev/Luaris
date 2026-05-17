import type {
	TBorderWidths,
	TColours,
	TRadiusSize,
	TSizes,
	TSurfaceColours,
} from '../../types/theme';

export type TLxDetailsProps = {
	title?: string,
	icon?: string,
	content?: string,
	variant?: TColours | TSurfaceColours,
	size?: TSizes,
	contentPadding?: TSizes,
	contentBackgroundColour?: TSurfaceColours | 'transparent',
	borderRadius?: TRadiusSize,
	borderWidth?: TBorderWidths,
	disabled?: boolean,
};
