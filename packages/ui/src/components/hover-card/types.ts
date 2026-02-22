export type TLxHoverCardPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface ILxHoverCardProps {
	placement?: TLxHoverCardPlacement,
	openDelay?: number,
	closeDelay?: number,
	disabled?: boolean,
}
