import type { ILxComponentBase } from '../../dsl/component';
import type { TLxAvatarProps } from './types';

export type ILxAvatarComponent = ILxComponentBase & {
	component: 'avatar',
	props: TLxAvatarProps,
	slots: undefined,
};
