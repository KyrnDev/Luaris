export type TLxFormFieldDisplay = 'default' | 'inline';

export interface ILxFormFieldProps {
	label?: string,
	forId?: string,
	helpText?: string,
	error?: string,
	required?: boolean,
	display?: TLxFormFieldDisplay,
	reverse?: boolean,
}
