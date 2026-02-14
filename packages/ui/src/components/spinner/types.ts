import type { TVariant } from '../../types/variants';

export type TLxSpinnerSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TLxSpinnerVariant = TVariant;

export interface ILxSpinnerProps {
	size?: TLxSpinnerSize,
	variant?: TLxSpinnerVariant,
	label?: string,
}
