import type { ILxComponentBase } from '../../dsl/component';
import type { TLxButtonProps } from './types';
import type { ButtonHTMLAttributes } from 'vue';

export type ILxButtonComponent = ILxComponentBase & {
	component: 'button',
	props: TLxButtonProps,
	attributes: ButtonHTMLAttributes,
	slots: {
		icon: ILxComponentBase[],
		default: ILxComponentBase[],
	},
};
