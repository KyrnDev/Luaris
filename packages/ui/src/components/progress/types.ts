import type { TVariant } from '../../types/variants';

export type TLxProgressOrientation = 'horizontal' | 'vertical' | 'ring';

export interface ILxProgressProps {
	value?: number,
	max?: number,
	variant?: TVariant,
	orientation?: TLxProgressOrientation,
	showLabel?: boolean,
	indeterminate?: boolean,
	size?: number,
}
