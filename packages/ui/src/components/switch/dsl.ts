import type { ILxComponentBase } from '../../dsl/component';
import type { TLxSwitchProps } from './types';

export type ILxSwitchComponent = ILxComponentBase & {
	component: 'switch',
	props: TLxSwitchProps,
	slots: undefined,
};
