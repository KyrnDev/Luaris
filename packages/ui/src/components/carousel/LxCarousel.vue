<template>
	<section class="lx-carousel" :aria-label="carouselId">
		<div class="lx-carousel__viewport">
			<article
				v-for="(slide, index) in props.slides"
				:key="slide.id || `${index}`"
				class="lx-carousel__slide"
				:class="[
					{ 'is-active': index === currentIndex },
					`is-${props.animation}`,
				]"
				:style="getSlideStyle(index)"
				:aria-hidden="index === currentIndex ? undefined : true"
			>
				<slot name="slide" :slide="slide" :index="index" :active="index === currentIndex">
					<div class="lx-carousel__content">
						<img v-if="slide.image" class="lx-carousel__image" :src="slide.image" :alt="slide.title || `Slide ${index + 1}`">
						<h4 v-if="slide.title">
							{{ slide.title }}
						</h4>
						<p v-if="slide.description">
							{{ slide.description }}
						</p>
					</div>
				</slot>
			</article>
		</div>

		<div class="lx-carousel__controls">
			<button type="button" aria-label="Previous slide" @click="previous">
				‹
			</button>
			<div class="lx-carousel__dots">
				<button
					v-for="(slide, index) in props.slides"
					:key="slide.id || `dot-${index}`"
					type="button"
					:class="{ 'is-active': index === currentIndex }"
					:aria-label="`Go to slide ${index + 1}`"
					@click="setIndex(index)"
				/>
			</div>
			<button type="button" aria-label="Next slide" @click="next">
				›
			</button>
		</div>
	</section>
</template>

<script setup lang='ts'>
	import type { ILxCarouselProps } from './types';
	import { computed, onMounted, onUnmounted, watch } from 'vue';

	const props = withDefaults(defineProps<ILxCarouselProps>(), {
		slides: () => [],
		autoplay: false,
		interval: 4500,
		loop: true,
		animation: 'fade',
		id: '',
	});

	const emit = defineEmits<{
		(event: 'change', index: number): void,
	}>();

	const model = defineModel<number>({
		default: 0,
	});

	let timer: number | null = null;

	const carouselId = computed(() => props.id || 'Carousel');
	const maxIndex = computed(() => Math.max(props.slides.length - 1, 0));
	const currentIndex = computed(() => Math.min(Math.max(model.value, 0), maxIndex.value));

	const setIndex = (index: number): void => {
		if (props.slides.length === 0) {
			model.value = 0;
			return;
		}

		let nextIndex = index;
		if (props.loop) {
			nextIndex = (index + props.slides.length) % props.slides.length;
		} else {
			nextIndex = Math.min(Math.max(index, 0), maxIndex.value);
		}

		model.value = nextIndex;
		emit('change', nextIndex);
	};

	const previous = (): void => {
		setIndex(currentIndex.value - 1);
	};

	const next = (): void => {
		setIndex(currentIndex.value + 1);
	};

	const getSlideStyle = (index: number): Record<string, string> => {
		if (props.animation === 'slide') {
			return {
				transform: `translateX(${(index - currentIndex.value) * 100}%)`,
			};
		}

		return {};
	};

	const clearTimer = (): void => {
		if (timer !== null) {
			window.clearInterval(timer);
			timer = null;
		}
	};

	const startTimer = (): void => {
		clearTimer();
		if (!props.autoplay || props.slides.length <= 1) {
			return;
		}

		timer = window.setInterval(() => {
			next();
		}, props.interval);
	};

	watch(() => props.autoplay, startTimer);
	watch(() => props.interval, startTimer);
	watch(() => props.slides.length, () => {
		setIndex(currentIndex.value);
		startTimer();
	});

	onMounted(startTimer);
	onUnmounted(clearTimer);
</script>

<style scoped lang='scss'>
	.lx-carousel {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-sm);
	}

	.lx-carousel__viewport {
		border-radius: var(--lx-size-radius-sm);
		min-height: 12rem;
		overflow: hidden;
		position: relative;
	}

	.lx-carousel__slide {
		inset: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		transition: opacity var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-carousel__slide.is-active {
		opacity: 1;
		pointer-events: auto;
	}

	.lx-carousel__slide.is-slide {
		opacity: 1;
		transition:
			transform var(--lx-motion-duration-normal) var(--lx-motion-easing-standard),
			opacity var(--lx-motion-duration-normal) var(--lx-motion-easing-standard);
	}

	.lx-carousel__slide.is-none {
		transition: none;
	}

	.lx-carousel__content {
		background: var(--lx-colour-surface-base);
		display: grid;
		gap: var(--lx-size-space-sm);
		height: 100%;
		padding: var(--lx-size-space-lg);
	}

	.lx-carousel__image {
		border-radius: var(--lx-size-radius-sm);
		height: 8rem;
		object-fit: cover;
		width: 100%;
	}

	.lx-carousel__controls {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
		justify-content: space-between;
	}

	.lx-carousel__controls button {
		appearance: none;
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		padding: 0.35rem 0.6rem;
	}

	.lx-carousel__dots {
		display: flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-carousel__dots button {
		background: var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-pill);
		height: 0.55rem;
		padding: 0;
		width: 0.55rem;
	}

	.lx-carousel__dots button.is-active {
		background: var(--lx-colour-primary);
	}
</style>
