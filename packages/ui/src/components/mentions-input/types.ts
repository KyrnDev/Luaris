export interface ILxMentionsOption {
	label: string,
	value: string,
}

export interface ILxMentionsSource {
	trigger: string,
	items: ILxMentionsOption[],
}

export interface ILxMentionsInputProps {
	sources?: ILxMentionsSource[],
	placeholder?: string,
	minChars?: number,
	disabled?: boolean,
}
