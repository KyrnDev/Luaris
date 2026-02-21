import type { TLxButtonVariant } from '../button';
import type { TLxModalAnimation, TLxModalPosition } from '../modal';

export interface ILxConfirmModalProps {
	modelValue?: boolean,
	title?: string,
	message?: string,
	confirmLabel?: string,
	cancelLabel?: string,
	confirmVariant?: TLxButtonVariant,
	position?: TLxModalPosition,
	animation?: TLxModalAnimation,
}
