export type TLxEmptyStateVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface ILxEmptyStateProps {
	title?: string,
	description?: string,
	icon?: string,
	variant?: TLxEmptyStateVariant,
}
