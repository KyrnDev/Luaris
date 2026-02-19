import type { VNode } from 'vue';
import type { TLxTimelineMarkerType } from '../timeline-item';

export type TLxTimelineOrientation = 'vertical' | 'horizontal';

export interface ILxTimelineProps {
	orientation?: TLxTimelineOrientation,
	type?: TLxTimelineMarkerType,
}

export interface ILxTimelineItemInternal {
	id: string,
	marker: string,
	markerNote: string,
	title: string,
	subtitle: string,
	type: TLxTimelineMarkerType,
	markerSlot?: (() => VNode[] | undefined) | undefined,
	contentSlot?: (() => VNode[] | undefined) | undefined,
}
