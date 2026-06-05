import type { ILxComponentBase } from '../../dsl/component';
import type { TLxIconProps } from './types';

export type ILxIconComponent = ILxComponentBase & {
	component: 'icon',
	props: TLxIconProps,
	slots: undefined,
};
