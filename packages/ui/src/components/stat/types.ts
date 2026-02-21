export type TLxStatTrend = 'up' | 'down' | 'neutral';

export interface ILxStatProps {
	label?: string,
	value?: string | number,
	delta?: string,
	trend?: TLxStatTrend,
	helpText?: string,
}
