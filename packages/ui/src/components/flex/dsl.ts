import type { ILxComponentBase } from '../../dsl/component';
import type { TLxFlexProps } from './types';

export type ILxFlexComponent = ILxComponentBase & {
	component: 'flex',
	props: TLxFlexProps,
	slots: {
		default: ILxComponentBase[],
	},
};
