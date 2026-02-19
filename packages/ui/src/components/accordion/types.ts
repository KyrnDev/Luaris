export interface ILxAccordionItem {
	id: string,
	title: string,
	description?: string,
	disabled?: boolean,
}

export interface ILxAccordionProps {
	items: ILxAccordionItem[],
	multiple?: boolean,
	linked?: boolean,
	defaultOpen?: string | string[],
}
