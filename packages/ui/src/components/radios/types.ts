import type { TFormValue } from '../../types/form';

export interface ILxRadiosOption {
	label: string,
	value: TFormValue,
	disabled?: boolean,
}

export interface ILxRadiosProps {
	name?: string,
	options?: ILxRadiosOption[],
	disabled?: boolean,
}
