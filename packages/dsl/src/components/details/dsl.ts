import type { ILxComponentBase } from '../../dsl/component';
import type { TLxDetailsProps } from './types';
import type { DetailsHTMLAttributes } from 'vue';

export type ILxDetailsComponent = ILxComponentBase & {
	component: 'LxDetails',
	props: TLxDetailsProps,
	attributes: DetailsHTMLAttributes,
	slots: {
		summary: ILxComponentBase[],
		content: ILxComponentBase[],
		default: ILxComponentBase[],
	},
};
