export interface ILxContextMenuItem {
	label: string,
	value: string,
	disabled?: boolean,
	icon?: string,
	danger?: boolean,
}

export interface ILxContextMenuProps {
	items?: ILxContextMenuItem[],
	disabled?: boolean,
}
