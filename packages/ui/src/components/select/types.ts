import type { TFormValue } from '../../types/form';

export type TLxSelectValue = TFormValue;
export type TLxSelectSize = 'sm' | 'md' | 'lg';

export interface ILxSelectOption {
	label: string,
	value: TLxSelectValue,
	disabled?: boolean,
}

export interface ILxSelectProps {
	modelValue?: TLxSelectValue,
	options?: ILxSelectOption[],
	size?: TLxSelectSize,
	disabled?: boolean,
}
