import type { ILxToastLink, TLxToastVariant } from '../toast';

export type TLxToastsPosition = (
	'top-right'
	| 'top-left'
	| 'bottom-right'
	| 'bottom-left'
	| 'top-center'
	| 'bottom-center'
);

export interface ILxToastsItem {
	id: string,
	title?: string,
	text: string,
	icon?: string,
	variant?: TLxToastVariant,
	timeout?: number,
	link?: ILxToastLink,
}

export interface ILxToastsProps {
	position?: TLxToastsPosition,
	max?: number,
}
