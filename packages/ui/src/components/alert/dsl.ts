import type { ILxComponentBase } from '../../dsl/component';
import type { TLxAlertProps } from './types';

export type ILxAlertComponent = ILxComponentBase & {
	component: 'LxAlert',
	props: TLxAlertProps,
	slots: {
		title: ILxComponentBase[],
		content: ILxComponentBase[],
		default: ILxComponentBase[],
	},
};
