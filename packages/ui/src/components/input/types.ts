import type { InputTypeHTMLAttribute } from 'vue';

export type TLxInputVariant = 'default' | 'primary' | 'secondary';
export type TLxInputSize = 'sm' | 'md' | 'lg';

export interface ILxInputProps {
	hint?: string,
	error?: string,
	placeholder?: string,
	type?: InputTypeHTMLAttribute,
	variant?: TLxInputVariant,
	size?: TLxInputSize,
	disabled?: boolean,
	readonly?: boolean,
}
