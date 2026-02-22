export interface ILxSortableProps<T = unknown> {
	items?: T[],
	itemKey?: string,
	childrenKey?: string,
	disabled?: boolean,
}

export type TSortableDropMode = 'before' | 'after' | 'inside';

export interface ILxSortableBranchProps {
	items: any[],
	pathPrefix: number[],
	level: number,
	getChildren: (item: any) => any[],
	resolveKey: (item: any, path: number[]) => string,
	isDropTarget: (path: number[], mode: TSortableDropMode) => boolean,
	isDragging: (path: number[]) => boolean,
	onDragStart: (path: number[], event: DragEvent) => void,
	onDragOver: (path: number[], mode: TSortableDropMode, event: DragEvent) => void,
	onDrop: (path: number[], mode: TSortableDropMode, event?: DragEvent) => void,
	onDragEnd: () => void,
}
