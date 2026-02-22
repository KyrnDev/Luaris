export interface ILxVirtualListProps<T = unknown> {
	items?: T[],
	height?: number,
	itemHeight?: number,
	overscan?: number,
	keyField?: string,
}
