export type TLxLabelDisplay = 'default' | 'inline';

export interface ILxLabelProps {
	text?: string,
	display?: TLxLabelDisplay,
	reverse?: boolean,
	controlId?: string,
	controlName?: string,
}
