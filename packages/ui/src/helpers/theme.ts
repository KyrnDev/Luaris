import type { TLayoutsLength } from '../types/units';
import type { TSizes } from '../types/theme';
import { SIZES } from './constants';

export function getSizeValue(size: TSizes | TLayoutsLength) {
	if (SIZES.includes(size as TSizes)) {
		return `var(--lx-size-space-${size})`;
	} else {
		return size;
	}
}
