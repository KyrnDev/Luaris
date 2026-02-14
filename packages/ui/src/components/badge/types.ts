import type { TVariant } from '../../types/variants';

export type TLxBadgeVariant = TVariant;
export type TLxBadgeSize = 'sm' | 'md';

export interface ILxBadgeProps {
	text?: string,
	variant?: TLxBadgeVariant,
	size?: TLxBadgeSize,
}
