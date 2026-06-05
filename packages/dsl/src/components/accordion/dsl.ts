import type { ILxComponentBase } from '../../dsl/component';
import type { TLxAccordionProps, TLxAccordionItemProps } from './types';
import type { DetailsHTMLAttributes } from 'vue';

export type ILxAccordionComponent = ILxComponentBase & {
	component: 'accordion',
	props: TLxAccordionProps,
	slots: {
		default: ILxComponentBase[],
	},
};

export type ILxAccordionItemComponent = ILxComponentBase & {
	component: 'accordion-item',
	props: TLxAccordionItemProps,
	attributes: DetailsHTMLAttributes,
	slots: {
		default: ILxComponentBase[],
		summary: ILxComponentBase[],
		content: ILxComponentBase[],
	},
};
