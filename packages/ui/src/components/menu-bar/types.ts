export interface ILxMenuBarItem {
	label: string,
	value: string,
	disabled?: boolean,
}

export interface ILxMenuBarProps {
	items?: ILxMenuBarItem[],
	wrap?: boolean,
}
