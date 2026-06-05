import type { TLayoutsLength } from '../../types/units';
import type { TSizes } from '../../types/theme';

export type TLxPageProps = {
	gap?: TSizes | TLayoutsLength,
	asideWidth?: TLayoutsLength,
	noFill?: boolean,
	padding?: TSizes | TLayoutsLength,
};
