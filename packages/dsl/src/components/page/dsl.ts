import type { ILxComponentBase } from '../../dsl/component';
import type { TLxPageProps } from './types';

export type ILxPageComponent = ILxComponentBase & {
	component: 'LxPage',
	props: TLxPageProps,
	slots: {
		'banner': ILxComponentBase[],
		'header': ILxComponentBase[],
		'sub-header': ILxComponentBase[],
		'navigation-header': ILxComponentBase[],
		'navigation': ILxComponentBase[],
		'navigation-footer': ILxComponentBase[],
		'main-header': ILxComponentBase[],
		'default': ILxComponentBase[],
		'main-footer': ILxComponentBase[],
		'aside': ILxComponentBase[],
		'footer': ILxComponentBase[],
	},
};
