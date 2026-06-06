import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxCarouselProps } from './types';

export type ILxCarouselComponent = ILxComponentBase & {
	component: 'LxCarousel',
	props: TLxCarouselProps,
	slots: {
		title: TLxSlotChild[],
		overlay: TLxSlotChild[],
	},
};
