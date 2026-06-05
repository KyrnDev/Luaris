import type { ILxComponentBase } from '../../dsl/component';
import type { TLxAlertProps } from './types';

export type ILxAlertComponent = ILxComponentBase & {
	component: 'alert',
	props: TLxAlertProps,
	slots: {
		title: ILxComponentBase[],
		content: ILxComponentBase[],
		default: ILxComponentBase[],
	},
};
