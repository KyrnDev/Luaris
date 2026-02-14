import type { TLxIconStyle } from '../icon/types';
import type { TLxModalAnimation, TLxModalPosition } from '../modal/types';

export type TLxIconPickerLicence = 'free' | 'pro';
export type TLxIconPickerFamily = 'classic' | 'sharp' | 'brands';

export interface ILxIconPickerValue {
	name: string,
	style: TLxIconStyle,
}

export interface ILxIconRegistryEntry {
	name: string,
	keywords: string[],
	styles: TLxIconStyle[],
	families: TLxIconPickerFamily[],
	licences: TLxIconPickerLicence[],
	styleSources: Partial<Record<TLxIconStyle, TLxIconPickerLicence[]>>,
}

export interface ILxIconPickerProps {
	registry?: ILxIconRegistryEntry[],
	placeholder?: string,
	showSettings?: boolean,
	pageSize?: number,
	columns?: number,
	rows?: number,
	popup?: boolean,
	popupTitle?: string,
	popupPosition?: TLxModalPosition,
	popupAnimation?: TLxModalAnimation,
	popupWidth?: string,
	popupMaxWidth?: string,
	popupMaxHeight?: string,
	closeOnSelect?: boolean,
}
