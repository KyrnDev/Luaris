import type { ILxComponentBase } from '../../dsl/component';
import type { TLxSwitchProps } from './types';

export type ILxSwitchComponent = ILxComponentBase & {
	component: 'LxSwitch',
	props: TLxSwitchProps,
	slots: undefined,
};
