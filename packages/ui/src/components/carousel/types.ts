export interface ILxCarouselSlide {
	id?: string,
	title?: string,
	description?: string,
	image?: string,
}

export interface ILxCarouselProps {
	slides?: ILxCarouselSlide[],
	autoplay?: boolean,
	interval?: number,
	loop?: boolean,
	animation?: 'fade' | 'slide' | 'none',
	id?: string,
}
