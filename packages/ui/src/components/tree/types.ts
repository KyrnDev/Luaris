export interface ILxTreeNode {
	id: string,
	label: string,
	disabled?: boolean,
	icon?: string,
	children?: ILxTreeNode[],
	expanded?: boolean,
}

export interface ILxTreeProps {
	items?: ILxTreeNode[],
	multiple?: boolean,
	expandOnClick?: boolean,
}
