import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxAlertProps } from './types';

export type ILxAlertComponent = ILxComponentBase & {
	component: 'LxAlert',
	props: TLxAlertProps,
	slots: {
		title: TLxSlotChild[],
		content: TLxSlotChild[],
		default: TLxSlotChild[],
	},
};
