export type TLxSkeletonVariant = 'text' | 'rect' | 'circle';

export interface ILxSkeletonProps {
	count?: number,
	variant?: TLxSkeletonVariant,
	animated?: boolean,
	width?: string,
	height?: string,
}
