export type TLxTableAlign = 'left' | 'center' | 'right';

export interface ILxTableColumn {
	key: string,
	label: string,
	align?: TLxTableAlign,
	width?: string,
}

export interface ILxTableRow {
	[key: string]: unknown,
}

export interface ILxTableProps {
	columns?: ILxTableColumn[],
	rows?: ILxTableRow[],
	caption?: string,
	striped?: boolean,
	hoverable?: boolean,
	dense?: boolean,
	rowKey?: string,
}
