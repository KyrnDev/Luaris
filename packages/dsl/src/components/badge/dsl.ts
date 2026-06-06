import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxBadgeProps } from './types';

export type TLxBadgeComponent = ILxComponentBase & {
	component: 'LxBadge',
	props: TLxBadgeProps,
	slots: {
		default: TLxSlotChild[],
	},
};
