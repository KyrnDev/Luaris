<script setup lang="ts">
	import LxCarousel from './LxCarousel.vue';
	import { ref } from 'vue';

	const carouselItems = [
		{ src: 'https://picsum.photos/seed/luaris-1/960/720', alt: 'Mountain lake at sunrise', title: 'Mountain lake' },
		{ src: 'https://picsum.photos/seed/luaris-2/960/720', alt: 'City skyline in golden hour', title: 'City skyline' },
		{ src: 'https://picsum.photos/seed/luaris-3/960/720', alt: 'Forest path with soft light', title: 'Forest path' },
		{ src: 'https://picsum.photos/seed/luaris-4/960/720', alt: 'Ocean cliffs with mist', title: 'Ocean cliffs' },
		{ src: 'https://picsum.photos/seed/luaris-5/960/720', alt: 'Desert dunes in evening light', title: 'Desert dunes' },
		{ src: 'https://picsum.photos/seed/luaris-6/960/720', alt: 'Snowy ridge under blue sky', title: 'Snowy ridge' },
	];

	const overlayItems = carouselItems.map((item, index) => ({
		...item,
		badge: index % 2 === 0 ? 'Featured' : 'New arrival',
		headline: [
			'Seasonal escape',
			'Urban stories',
			'Quiet trails',
			'Coastal air',
			'Desert light',
			'Winter horizon',
		][index],
		copy: [
			'Fresh destination photography for immersive landing sections.',
			'Editorial imagery blocks with strong contrast and copy support.',
			'Use softer scenes when the content needs a calmer visual tone.',
			'Layer short promotional messages without losing image focus.',
			'Highlight campaign themes with distinct atmosphere per slide.',
			'Rotate hero messaging while keeping controls and structure stable.',
		][index],
	}));

	const extendedItems = ref([
		...carouselItems,
		...carouselItems.map((item, index) => ({
			...item,
			src: `https://picsum.photos/seed/luaris-extra-${index + 1}/960/720`,
			title: `${item.title} ${index + 2}`,
		})),
	]);
</script>

# Carousel

The Carousel component presents a page-based sequence of images with optional titles, motion-token transitions, accessible controls, and lightweight virtualization for larger collections.

It also supports typed slide overlays through slots, so you can attach extra metadata to items and render custom badges, labels, or actions on top of each image.

[[toc]]

## Settings

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `TLxCarouselItemBase[]` or a typed extension | required | The carousel items to display. Each item accepts `src`, `alt`, and optional `title`, and can include any additional typed fields your app needs. |
| `itemsPerView` | `number` | `1` | How many items to show in a single page. |
| `gap` | [TSizes](/types/theme.html#type-tsizes) | `md` | The gap token used between visible items. |
| `repeat` | `boolean` | `false` | Whether navigating past the last page returns to the first page, and vice versa. |
| `virtualize` | `boolean` | auto for more than 10 items | Overrides the built-in lightweight virtualization behavior. When omitted, collections over 10 items only render the current page plus adjacent pages. |
| `showButtons` | `boolean` | `true` | Whether previous and next buttons are shown. |
| `showDots` | `boolean` | `true` | Whether progress dots are shown. |
| `buttonVariant` | [TColours](/types/theme.html#type-tcolours) | `primary` | The colour variant used for the navigation buttons and active dot. |
| `buttonSize` | [TSizes](/types/theme.html#type-tsizes) | `md` | The shared control size used for the navigation buttons. |
| `dotSize` | [TSizes](/types/theme.html#type-tsizes) | `md` | The token used to size the progress dots. |
| `motionDuration` | [TMotionDurations](/types/theme.html#type-tmotiondurations) | `normal` | The motion duration token used for page transitions. |
| `motionEasing` | [TMotionEasings](/types/theme.html#type-tmotioneasings) | `standard` | The motion easing token used for page transitions. |
| `ariaLabel` | `string` | `Image carousel` | Accessible label for the carousel region. |

## Usage

<LxCarousel :items="carouselItems" aria-label="Scenic image carousel" />

<details>
<summary>Show code</summary>

```html
<LxCarousel :items="carouselItems" aria-label="Scenic image carousel" />
```
</details>

## Overlay Slots

The `overlay` slot renders on top of each image and receives the full typed item object, plus its absolute `index` and `pageIndex`.

<LxCarousel :items="overlayItems" aria-label="Overlay scenic image carousel">
	<template #overlay="{ item }">
		<div style="display: flex; align-items: center; justify-content: center; height: 100%;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; background: rgb(15 23 42 / 0.68); color: white; padding: 1rem 1.25rem; border-radius: 0.75rem; text-align: center; max-width: 18rem;">
				<span style="display: inline-flex; align-items: center; background: rgb(255 255 255 / 0.16); color: white; padding: 0.375rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; line-height: 1;">
					{{ item.badge }}
				</span>
				<strong style="font-size: 1rem; line-height: 1.2;">{{ item.headline }}</strong>
				<span style="font-size: 0.875rem; line-height: 1.4;">
					{{ item.copy }}
				</span>
			</div>
		</div>
	</template>
</LxCarousel>

<details>
<summary>Show code</summary>

```html
<LxCarousel :items="overlayItems" aria-label="Overlay scenic image carousel">
	<template #overlay="{ item }">
		<div style="display: flex; align-items: center; justify-content: center; height: 100%;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; background: rgb(15 23 42 / 0.68); color: white; padding: 1rem 1.25rem; border-radius: 0.75rem; text-align: center; max-width: 18rem;">
				<span style="display: inline-flex; align-items: center; background: rgb(255 255 255 / 0.16); color: white; padding: 0.375rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; line-height: 1;">
					{{ item.badge }}
				</span>
				<strong style="font-size: 1rem; line-height: 1.2;">{{ item.headline }}</strong>
				<span style="font-size: 0.875rem; line-height: 1.4;">
					{{ item.copy }}
				</span>
			</div>
		</div>
	</template>
</LxCarousel>
```
</details>

## Generics

The component uses Vue generics so item extensions stay typed in slot props.

```vue
<script setup lang="ts">
	import { LxCarousel } from '@luaris/ui/components/carousel';

	type TGalleryItem = {
		src: string,
		alt: string,
		title?: string,
		badge: string,
		href: string,
	};

	const items: TGalleryItem[] = [
		{
			src: '/hero.jpg',
			alt: 'Hero image',
			title: 'Hero',
			badge: 'Featured',
			href: '/gallery/hero',
		},
	];
</script>

<template>
	<LxCarousel :items="items">
		<template #overlay="{ item }">
			<a :href="item.href">{{ item.badge }}</a>
		</template>
	</LxCarousel>
</template>
```

## Multiple Items Per View

<LxCarousel :items="carouselItems" :items-per-view="3" gap="lg" aria-label="Three-up scenic image carousel" />

<details>
<summary>Show code</summary>

```html
<LxCarousel :items="carouselItems" :items-per-view="3" gap="lg" aria-label="Three-up scenic image carousel" />
```
</details>

## Repeating Navigation

<LxCarousel :items="carouselItems" repeat button-variant="accent" aria-label="Repeating scenic image carousel" />

<details>
<summary>Show code</summary>

```html
<LxCarousel :items="carouselItems" repeat button-variant="accent" aria-label="Repeating scenic image carousel" />
```
</details>

## Accessible Controls

The button size and dot size are independent so sites with larger interaction targets can scale them up cleanly.

<LxCarousel
	:items="carouselItems"
	button-variant="secondary"
	button-size="2xl"
	dot-size="xl"
	aria-label="Large-control scenic image carousel"
/>

<details>
<summary>Show code</summary>

```html
<LxCarousel
	:items="carouselItems"
	button-variant="secondary"
	button-size="2xl"
	dot-size="xl"
	aria-label="Large-control scenic image carousel"
/>
```
</details>

## Virtualization

For more than 10 items, the carousel uses a lightweight virtual page window by default, rendering only the current page and its neighbors while still preserving smooth page motion.

<LxCarousel :items="extendedItems" :items-per-view="2" aria-label="Virtualized scenic image carousel" />

<details>
<summary>Show code</summary>

```html
<LxCarousel :items="extendedItems" :items-per-view="2" aria-label="Virtualized scenic image carousel" />
```
</details>
