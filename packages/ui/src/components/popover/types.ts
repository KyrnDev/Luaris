export type TLxPopoverPlacement = 'top' | 'right' | 'bottom' | 'left';
export type TLxPopoverTrigger = 'click' | 'hover';
export type TLxPopoverPadding = 'sm' | 'md' | 'lg' | 'xl';

export interface ILxPopoverProps {
	placement?: TLxPopoverPlacement,
	trigger?: TLxPopoverTrigger,
	disabled?: boolean,
	padding?: TLxPopoverPadding,
}
