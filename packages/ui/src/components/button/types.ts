export type TLxButtonVariant = 'primary' | 'secondary' | 'ghost' | 'plain' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
export type TLxButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TLxButtonType = 'button' | 'submit' | 'reset';
export type TLxButtonIconOrder = 'left' | 'right';
export type TLxButtonGroup = 'left' | 'middle' | 'right';

export type TLxButtonProps = {
	variant?: TLxButtonVariant,
	size?: TLxButtonSize,
	type?: TLxButtonType,
	disabled?: boolean,
	loading?: boolean,
	fullWidth?: boolean,
	label?: string,
	ariaLabel?: string,
	icon?: string,
	iconOrder?: TLxButtonIconOrder,
	group?: TLxButtonGroup,
	active?: boolean,
};
