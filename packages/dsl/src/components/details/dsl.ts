import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxDetailsProps } from './types';
import type { DetailsHTMLAttributes } from 'vue';

export type ILxDetailsComponent = ILxComponentBase & {
	component: 'LxDetails',
	props: TLxDetailsProps,
	attributes: DetailsHTMLAttributes,
	slots: {
		summary: TLxSlotChild[],
		content: TLxSlotChild[],
		default: TLxSlotChild[],
	},
};
