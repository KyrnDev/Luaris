import type { TColours, TMotionDurations, TMotionEasings, TSizes } from '../../types/theme';

export type TLxCarouselItemBase = {
	src: string,
	alt: string,
	title?: string,
};

export type TLxCarouselProps<TItem extends TLxCarouselItemBase = TLxCarouselItemBase> = {
	items: TItem[],
	itemsPerView?: number,
	gap?: TSizes,
	repeat?: boolean,
	virtualize?: boolean,
	showButtons?: boolean,
	showDots?: boolean,
	buttonVariant?: TColours,
	buttonSize?: TSizes,
	dotSize?: TSizes,
	motionDuration?: TMotionDurations,
	motionEasing?: TMotionEasings,
	ariaLabel?: string,
};
