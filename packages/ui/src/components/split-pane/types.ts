export type TLxSplitPaneOrientation = 'horizontal' | 'vertical';

export interface ILxSplitPaneProps {
	modelValue?: number,
	orientation?: TLxSplitPaneOrientation,
	min?: number,
	max?: number,
}
