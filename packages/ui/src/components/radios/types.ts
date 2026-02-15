import type { TFormValue } from '../../types/form';
import type { TLayoutsLength } from '../../types/units';

export type TLxRadiosLayout = 'stack' | 'inline';

export interface ILxRadiosOption {
	label: string,
	value: TFormValue,
	disabled?: boolean,
}

export interface ILxRadiosProps {
	name?: string,
	options?: ILxRadiosOption[],
	disabled?: boolean,
	layout?: TLxRadiosLayout,
	card?: boolean,
	space?: TLayoutsLength,
}
