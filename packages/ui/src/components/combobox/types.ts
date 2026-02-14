export interface ILxComboboxOption {
	label: string,
	value: string,
	disabled?: boolean,
}

export type TLxComboboxModelValue = string | string[];

export interface ILxComboboxProps {
	options?: ILxComboboxOption[] | string[],
	placeholder?: string,
	disabled?: boolean,
	id?: string,
	multiple?: boolean,
	tags?: boolean,
	searchOnNewLine?: boolean,
	openByDefault?: boolean,
	alwaysVisible?: boolean,
	filterable?: boolean,
}
