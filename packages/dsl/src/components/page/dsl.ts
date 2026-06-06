import type { ILxComponentBase, TLxSlotChild } from '../../dsl/component';
import type { TLxPageProps } from './types';

export type ILxPageComponent = ILxComponentBase & {
	component: 'LxPage',
	props: TLxPageProps,
	slots: {
		'banner': TLxSlotChild[],
		'header': TLxSlotChild[],
		'sub-header': TLxSlotChild[],
		'navigation-header': TLxSlotChild[],
		'navigation': TLxSlotChild[],
		'navigation-footer': TLxSlotChild[],
		'main-header': TLxSlotChild[],
		'default': TLxSlotChild[],
		'main-footer': TLxSlotChild[],
		'aside': TLxSlotChild[],
		'footer': TLxSlotChild[],
	},
};
