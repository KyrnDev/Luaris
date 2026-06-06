import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxAccordionProps, TLxAccordionItemProps } from './types';
import type { DetailsHTMLAttributes } from 'vue';

export type ILxAccordionComponent = ILxComponentBase & {
	component: 'LxAccordion',
	props: TLxAccordionProps,
	slots: {
		default: TLxSlotChild[],
	},
};

export type ILxAccordionItemComponent = ILxComponentBase & {
	component: 'LxAccordionItem',
	props: TLxAccordionItemProps,
	attributes: DetailsHTMLAttributes,
	slots: {
		default: TLxSlotChild[],
		summary: TLxSlotChild[],
		content: TLxSlotChild[],
	},
};
