import type { VNode } from 'vue';

export type TLxTabsVariant = 'line' | 'pills';
export type TLxTabsOrientation = 'horizontal' | 'vertical';

export interface ILxTabsProps {
	variant?: TLxTabsVariant,
	orientation?: TLxTabsOrientation,
	lazy?: boolean,
}

export interface ILxTabsItemInternal {
	value: string,
	label: string,
	disabled: boolean,
	tabSlot?: (() => VNode[] | undefined) | undefined,
	panelSlot?: (() => VNode[] | undefined) | undefined,
}
