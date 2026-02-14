import type { TVariant } from '../../types/variants';

export type TLxAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TLxAvatarVariant = TVariant;

export interface ILxAvatarProps {
	src?: string,
	alt?: string,
	name?: string,
	size?: TLxAvatarSize,
	variant?: TLxAvatarVariant,
	clickable?: boolean,
}
