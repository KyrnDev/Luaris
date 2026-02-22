export interface ILxVirtualTableColumn {
	key: string,
	label: string,
	width?: string,
	align?: 'left' | 'center' | 'right',
}

export interface ILxVirtualTableProps<TRow = Record<string, unknown>> {
	columns?: ILxVirtualTableColumn[],
	rows?: TRow[],
	height?: number,
	rowHeight?: number,
	overscan?: number,
	rowKey?: string,
}
