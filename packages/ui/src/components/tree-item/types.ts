import type { ILxTreeNode } from '../tree/types';

export interface ILxTreeItemProps {
	node: ILxTreeNode,
	level?: number,
	expanded?: boolean,
	selected?: boolean,
	hasChildren?: boolean,
	expandOnClick?: boolean,
}
