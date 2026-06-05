import type { ILxComponentBase } from '../../dsl/component';
import type { TLxCarouselProps } from './types';

export type ILxCarouselComponent = ILxComponentBase & {
	component: 'carousel',
	props: TLxCarouselProps,
	slots: {
		title: ILxComponentBase[],
		overlay: ILxComponentBase[],
	},
};
