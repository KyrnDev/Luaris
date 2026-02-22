export interface ILxAutoCompleteOption {
	label: string,
	value: string,
	disabled?: boolean,
}

export interface ILxAutoCompleteProps {
	options?: ILxAutoCompleteOption[],
	placeholder?: string,
	minChars?: number,
	disabled?: boolean,
	openOnFocus?: boolean,
}
