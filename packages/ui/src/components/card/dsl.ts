import type { ILxComponentBase } from '../../dsl/component';
import type { TLxCardProps } from './types';

export type ILxCardComponent = ILxComponentBase & {
	component: 'LxCard',
	props: TLxCardProps,
	slots: {
		header: ILxComponentBase[],
		footer: ILxComponentBase[],
		default: ILxComponentBase[],
	},
};
