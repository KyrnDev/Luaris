export type TLxAlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ILxAlertProps {
	title?: string,
	text?: string,
	variant?: TLxAlertVariant,
	dismissible?: boolean,
}
