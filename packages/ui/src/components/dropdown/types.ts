import type { TFormValue } from '../../types/form';

export type TLxDropdownValue = TFormValue;

export interface ILxDropdownOption {
	label: string,
	value: TLxDropdownValue,
	disabled?: boolean,
}

export interface ILxDropdownProps {
	label?: string,
	options?: ILxDropdownOption[],
}
