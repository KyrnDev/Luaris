import type { TVariant } from '../../types/variants';

export type TLxProgressOrientation = 'horizontal' | 'vertical' | 'ring';
export type TLxProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ILxProgressProps {
	value?: number,
	max?: number,
	variant?: TVariant,
	orientation?: TLxProgressOrientation,
	showLabel?: boolean,
	indeterminate?: boolean,
	size?: TLxProgressSize | number,
}
