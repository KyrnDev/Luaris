import type { HTMLAttributes } from 'vue';

export type ILxComponentBase = {
	key: string,
	component: string,
	props: Partial<HTMLElement>,
	attributes: HTMLAttributes,
	slots: Record<string, ILxComponentBase[]>,
};
