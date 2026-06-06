import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxCardProps } from './types';

export type ILxCardComponent = ILxComponentBase & {
	component: 'LxCard',
	props: TLxCardProps,
	slots: {
		header: TLxSlotChild[],
		footer: TLxSlotChild[],
		default: TLxSlotChild[],
	},
};
