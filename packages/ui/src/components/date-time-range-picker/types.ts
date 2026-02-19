export type ILxDateTimeRangePickerValue = Date[];

export interface ILxDateTimeRangePickerProps {
	dateMin?: string,
	dateMax?: string,
	timeMin?: string,
	timeMax?: string,
	timeStep?: number | string,
	disabled?: boolean,
}
