export type TLxTimelineMarkerType = 'date' | 'year' | 'number' | 'custom';

export interface ILxTimelineItemProps {
	id?: string,
	marker?: string,
	markerNote?: string,
	title?: string,
	subtitle?: string,
	type?: TLxTimelineMarkerType,
}
