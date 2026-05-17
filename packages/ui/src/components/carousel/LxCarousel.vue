<template>
	<section
		class="lx-carousel"
		aria-roledescription="carousel"
		:aria-label="props.ariaLabel"
	>
		<div class="lx-carousel__viewport">
			<div
				class="lx-carousel__track"
				:class="{ 'is-static': totalPages <= 1 }"
				:style="{
					transform: `translateX(-${currentPage * 100}%)`,
				}"
			>
				<div
					v-for="spacerIndex in leadingSpacerCount"
					:key="`leading-${spacerIndex}`"
					class="lx-carousel__spacer"
					aria-hidden="true"
				/>

				<div
					v-for="(page, renderedIndex) in renderedPages"
					:key="`page-${virtualStartPage + renderedIndex}`"
					class="lx-carousel__page"
					:aria-hidden="currentPage !== virtualStartPage + renderedIndex"
				>
					<figure
						v-for="(item, itemIndex) in page"
						:key="`${virtualStartPage + renderedIndex}-${itemIndex}-${item.src}`"
						class="lx-carousel__item"
					>
						<div class="lx-carousel__media">
							<img
								class="lx-carousel__image"
								:src="item.src"
								:alt="item.alt"
								:loading="getImageLoading(virtualStartPage + renderedIndex)"
								decoding="async"
							>

							<div v-if="$slots.overlay" class="lx-carousel__overlay">
								<slot
									name="overlay"
									:item="item"
									:index="getAbsoluteIndex(virtualStartPage + renderedIndex, itemIndex)"
									:page-index="virtualStartPage + renderedIndex"
								/>
							</div>
						</div>

						<figcaption v-if="item.title || $slots.title" class="lx-carousel__title">
							<slot
								v-if="$slots.title"
								name="title"
								:item="item"
								:index="getAbsoluteIndex(virtualStartPage + renderedIndex, itemIndex)"
								:page-index="virtualStartPage + renderedIndex"
							/>
							<template v-else>{{ item.title }}</template>
						</figcaption>
					</figure>
				</div>

				<div
					v-for="spacerIndex in trailingSpacerCount"
					:key="`trailing-${spacerIndex}`"
					class="lx-carousel__spacer"
					aria-hidden="true"
				/>
			</div>
		</div>

		<div v-if="showControls" class="lx-carousel__controls">
			<div v-if="props.showButtons" class="lx-carousel__buttons">
				<LxButton
					class="lx-carousel__button lx-carousel__button--prev"
					:variant="props.buttonVariant"
					:size="props.buttonSize"
					icon="chevron-left"
					aria-label="Show previous slides"
					:disabled="isPrevDisabled"
					@click="goToPrevious"
				/>

				<LxButton
					class="lx-carousel__button lx-carousel__button--next"
					:variant="props.buttonVariant"
					:size="props.buttonSize"
					icon="chevron-right"
					aria-label="Show next slides"
					:disabled="isNextDisabled"
					@click="goToNext"
				/>
			</div>

			<div v-if="props.showDots" class="lx-carousel__dots" role="tablist" aria-label="Carousel slide progress">
				<button
					v-for="pageIndex in totalPages"
					:key="`dot-${pageIndex - 1}`"
					class="lx-carousel__dot"
					:class="{ 'is-active': currentPage === pageIndex - 1 }"
					type="button"
					role="tab"
					:aria-selected="currentPage === pageIndex - 1"
					:aria-label="`Go to slide ${pageIndex} of ${totalPages}`"
					@click="goToPage(pageIndex - 1)"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts" generic="TItem extends TLxCarouselItemBase = TLxCarouselItemBase">
	import type { TLxCarouselItemBase, TLxCarouselProps } from './types';
	import { computed, ref, watch } from 'vue';
	import { LxButton } from '../button';

	const props = withDefaults(defineProps<TLxCarouselProps<TItem>>(), {
		itemsPerView: 1,
		gap: 'md',
		repeat: false,
		virtualize: undefined,
		showButtons: true,
		showDots: true,
		buttonVariant: 'primary',
		buttonSize: 'md',
		dotSize: 'md',
		motionDuration: 'normal',
		motionEasing: 'standard',
		ariaLabel: 'Image carousel',
	});
	defineSlots<{
		overlay?: (props: { item: TItem, index: number, pageIndex: number }) => any,
		title?: (props: { item: TItem, index: number, pageIndex: number }) => any,
	}>();

	const currentPage = ref(0);
	const resolvedItemsPerView = computed(() => Math.max(1, Math.floor(props.itemsPerView)));
	const pages = computed<TItem[][]>(() => {
		const chunked: TItem[][] = [];

		for (let index = 0; index < props.items.length; index += resolvedItemsPerView.value) {
			chunked.push(props.items.slice(index, index + resolvedItemsPerView.value));
		}

		return chunked;
	});

	const totalPages = computed(() => pages.value.length);
	const shouldVirtualize = computed(() => props.virtualize ?? props.items.length > 10);
	const virtualStartPage = computed(() => shouldVirtualize.value ? Math.max(0, currentPage.value - 1) : 0);
	const virtualEndPage = computed(() => shouldVirtualize.value ? Math.min(totalPages.value - 1, currentPage.value + 1) : Math.max(totalPages.value - 1, 0));
	const renderedPages = computed(() => {
		if (totalPages.value === 0) return [];
		return pages.value.slice(virtualStartPage.value, virtualEndPage.value + 1);
	});
	const leadingSpacerCount = computed(() => virtualStartPage.value);
	const trailingSpacerCount = computed(() => {
		if (totalPages.value === 0) return 0;
		return Math.max(0, totalPages.value - virtualEndPage.value - 1);
	});
	const showControls = computed(() => totalPages.value > 1 && (props.showButtons || props.showDots));
	const isPrevDisabled = computed(() => !props.repeat && currentPage.value === 0);
	const isNextDisabled = computed(() => !props.repeat && currentPage.value === totalPages.value - 1);
	const getAbsoluteIndex = (pageIndex: number, itemIndex: number) => (pageIndex * resolvedItemsPerView.value) + itemIndex;

	const clampPage = (page: number) => {
		if (totalPages.value === 0) return 0;
		return Math.min(Math.max(page, 0), totalPages.value - 1);
	};

	const goToPage = (page: number) => {
		currentPage.value = clampPage(page);
	};

	const goToPrevious = () => {
		if (totalPages.value === 0) return;
		if (currentPage.value === 0) {
			currentPage.value = props.repeat ? totalPages.value - 1 : 0;
			return;
		}

		currentPage.value -= 1;
	};

	const goToNext = () => {
		if (totalPages.value === 0) return;
		if (currentPage.value === totalPages.value - 1) {
			currentPage.value = props.repeat ? 0 : totalPages.value - 1;
			return;
		}

		currentPage.value += 1;
	};

	const getImageLoading = (pageIndex: number) => {
		if (!shouldVirtualize.value) return pageIndex === 0 ? 'eager' : 'lazy';
		return pageIndex === currentPage.value ? 'eager' : 'lazy';
	};

	watch(totalPages, (pageCount) => {
		if (pageCount === 0) {
			currentPage.value = 0;
			return;
		}

		currentPage.value = clampPage(currentPage.value);
	}, { immediate: true });

	const getGap = computed(() => `var(--lx-size-space-${props.gap})`);
	const getDotSize = computed(() => `var(--lx-size-control-icon-${props.dotSize})`);
	const getDotActiveWidth = computed(() => `calc(${getDotSize.value} * 2)`);
	const getDotColour = computed(() => `var(--lx-colour-${props.buttonVariant})`);
	const getDotInactiveColour = computed(() => `color-mix(in srgb, var(--lx-colour-${props.buttonVariant}) 24%, var(--lx-colour-surface-border))`);
	const getTitleLineHeight = computed(() => 'var(--lx-font-line-height-normal)');
	const getTrackTransition = computed(() => `transform var(--lx-motion-duration-${props.motionDuration}) var(--lx-motion-easing-${props.motionEasing})`);
</script>

<style scoped lang="scss">
	.lx-carousel {
		display: flex;
		flex-direction: column;
		gap: var(--lx-size-space-md);
		width: 100%;

		&__viewport {
			overflow: hidden;
			width: 100%;
		}

		&__track {
			display: flex;
			width: 100%;
			transition: v-bind(getTrackTransition);
			will-change: transform;

			&.is-static {
				transform: none !important;
			}
		}

		&__page,
		&__spacer {
			flex: 0 0 100%;
			min-width: 0;
		}

		&__page {
			display: grid;
			grid-template-columns: repeat(v-bind(resolvedItemsPerView), minmax(0, 1fr));
			gap: v-bind(getGap);
		}

		&__item {
			display: flex;
			flex-direction: column;
			gap: var(--lx-size-space-sm);
			margin: 0;
			min-width: 0;
		}

		&__media {
			position: relative;
		}

		&__image {
			display: block;
			width: 100%;
			aspect-ratio: 4 / 3;
			object-fit: cover;
			border-radius: var(--lx-size-radius-md);
			background-color: var(--lx-colour-surface-sunken);
		}

		&__overlay {
			position: absolute;
			inset: 0;
			padding: var(--lx-size-space-sm);
			box-sizing: border-box;
		}

		&__title {
			color: var(--lx-colour-text);
			font-size: var(--lx-font-size-md);
			line-height: v-bind(getTitleLineHeight);
		}

		&__controls {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--lx-size-space-md);
			flex-wrap: wrap;
		}

		&__buttons {
			display: inline-flex;
			align-items: center;
			gap: var(--lx-size-space-sm);
		}

		&__dots {
			display: inline-flex;
			align-items: center;
			gap: var(--lx-size-space-xs);
			flex-wrap: wrap;
		}

		&__dot {
			width: v-bind(getDotSize);
			height: v-bind(getDotSize);
			border: 0;
			border-radius: var(--lx-size-radius-pill);
			background-color: v-bind(getDotInactiveColour);
			cursor: pointer;
			padding: 0;
			transition:
				background-color var(--lx-motion-duration-fast) var(--lx-motion-easing-standard),
				width var(--lx-motion-duration-fast) var(--lx-motion-easing-standard);

			&.is-active {
				width: v-bind(getDotActiveWidth);
				background-color: v-bind(getDotColour);
			}

			&:focus-visible {
				outline: none;
				box-shadow: 0 0 0 var(--lx-size-border-width-thick) var(--lx-colour-accent);
			}
		}
	}
</style>
