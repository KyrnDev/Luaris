import type { ILxComponentBase } from '../../dsl/component';
import type { TLxIconProps } from './types';

export type ILxIconComponent = ILxComponentBase & {
	component: 'LxIcon',
	props: TLxIconProps,
	slots: undefined,
};
