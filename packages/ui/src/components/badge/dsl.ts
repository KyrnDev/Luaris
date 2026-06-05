import type { ILxComponentBase } from '../../dsl/component';
import type { TLxBadgeProps } from './types';

export type TLxBadgeComponent = ILxComponentBase & {
	component: 'badge',
	props: TLxBadgeProps,
	slots: {
		default: ILxComponentBase[],
	},
};
