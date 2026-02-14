import type { CSSProperties } from 'vue';
import type { TLayoutsLength, TLayoutsNode } from '../../types/units';

export type TLxFlexDirection = CSSProperties['flexDirection'];
export type TLxFlexWrap = CSSProperties['flexWrap'];
export type TLxFlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type TLxFlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface ILxFlexProps {
	as?: TLayoutsNode,
	gap?: TLayoutsLength,
	rowGap?: TLayoutsLength,
	columnGap?: TLayoutsLength,
	wrap?: boolean,
	inline?: boolean,
	column?: boolean,
	reverse?: boolean,
	direction?: TLxFlexDirection,
	align?: TLxFlexAlign,
	justify?: TLxFlexJustify,
	fullWidth?: boolean,
}
