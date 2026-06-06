import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxButtonProps } from './types';
import type { ButtonHTMLAttributes } from 'vue';

export type ILxButtonComponent = ILxComponentBase & {
	component: 'LxButton',
	props: TLxButtonProps,
	attributes: ButtonHTMLAttributes,
	slots: {
		icon: TLxSlotChild[],
		default: TLxSlotChild[],
	},
};
