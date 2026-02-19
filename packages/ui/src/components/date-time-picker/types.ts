export type ILxDateTimePickerValue = Date | null;

export interface ILxDateTimePickerProps {
	dateMin?: string,
	dateMax?: string,
	timeMin?: string,
	timeMax?: string,
	timeStep?: number | string,
	disabled?: boolean,
}
