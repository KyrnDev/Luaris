export type TLxButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

export type TLxButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type TLxButtonType = 'button' | 'submit' | 'reset';

export interface ILxButtonProps {
	variant?: TLxButtonVariant,
	size?: TLxButtonSize,
	type?: TLxButtonType,
	disabled?: boolean,
	loading?: boolean,
	fullWidth?: boolean,
	label?: string,
	ariaLabel?: string,
}
