import type { TSizes } from '../../types/units';
import type { TVariant } from '../../types/variants';

export type TLxTagProps = {
	variant?: TVariant,
	size?: TSizes,
	label?: string,
	removable?: boolean,
};
