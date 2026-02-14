import type { TLxIconStyle } from '../icon/types';

export type TLxTooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface ILxTooltipProps {
	text: string,
	placement?: TLxTooltipPlacement,
	icon?: string,
	iconStyle?: TLxIconStyle,
	iconLabel?: string,
	disabled?: boolean,
}
