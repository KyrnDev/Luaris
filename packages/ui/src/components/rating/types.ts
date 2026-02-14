export type TLxRatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ILxRatingProps {
	max?: number,
	readonly?: boolean,
	allowHalf?: boolean,
	label?: string,
	size?: TLxRatingSize,
}
