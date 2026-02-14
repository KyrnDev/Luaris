import type { TVariant } from '../../types/variants';

export type TLxTagVariant = TVariant;
export type TLxTagSize = 'sm' | 'md' | 'lg';

export interface ILxTagProps {
	label?: string,
	variant?: TLxTagVariant,
	size?: TLxTagSize,
	removable?: boolean,
}
