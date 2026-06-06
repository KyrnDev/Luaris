import type { ILxComponentBase } from '../../dsl/component';
import type { TLxTagProps } from './types';

export type ILxTagComponent = ILxComponentBase & {
	component: 'LxTag',
	props: TLxTagProps,
	slots: {
		leading: ILxComponentBase[],
	},
};
