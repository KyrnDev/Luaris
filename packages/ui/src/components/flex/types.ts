import type { TLayoutsLength, TLayoutsNode } from '../../types/units';
import type { CSSProperties } from 'vue';

export type TLxFlexDirection = CSSProperties['flexDirection'];
export type TLxFlexWrap = CSSProperties['flexWrap'];
export type TLxFlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type TLxFlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export type TLxFlexProps = {
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
};
