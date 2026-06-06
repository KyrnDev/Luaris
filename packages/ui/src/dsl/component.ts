import type { HTMLAttributes } from 'vue';

export type TLxSlotChild = ILxComponentBase | string;
export type TLxSlots = Record<string, TLxSlotChild[]>;

export type ILxComponentBase = {
	key: string,
	component: string,
	props: Partial<HTMLElement>,
	attributes: HTMLAttributes,
	slots: TLxSlots,
};
