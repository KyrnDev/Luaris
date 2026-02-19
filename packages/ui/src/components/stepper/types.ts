export type TLxStepperOrientation = 'horizontal' | 'vertical';

export interface ILxStepperItem {
	id: string,
	label: string,
	description?: string,
	disabled?: boolean,
}

export interface ILxStepperProps {
	items: ILxStepperItem[],
	orientation?: TLxStepperOrientation,
	linear?: boolean,
}
