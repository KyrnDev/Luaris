export type TLxToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ILxToastLink {
	href: string,
	target?: '_blank' | '_self' | '_parent' | '_top',
	rel?: string,
}

export interface ILxToastProps {
	id?: string,
	title?: string,
	text: string,
	icon?: string,
	variant?: TLxToastVariant,
	timeout?: number,
	link?: ILxToastLink,
}
