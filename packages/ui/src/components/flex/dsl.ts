import type { ILxComponentBase } from '../../dsl/component';
import type { TLxFlexProps } from './types';

export type ILxFlexComponent = ILxComponentBase & {
	component: 'LxFlex',
	props: TLxFlexProps,
	slots: {
		default: ILxComponentBase[],
	},
};
