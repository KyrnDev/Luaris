# LxCarousel

`LxCarousel` displays slides with optional autoplay, looping, animation modes, and direct index control via `v-model`.

It includes built-in previous/next controls, dot navigation, and a scoped `slide` slot for full custom slide rendering.

## Import

```ts
import { LxCarousel } from '@luaris/ui';
```

```ts
import { LxCarousel } from '@luaris/ui/components/carousel';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `ILxCarouselSlide[]` | `[]` | Slide data list. |
| `autoplay` | `boolean` | `false` | Enables automatic slide advance. |
| `interval` | `number` | `4500` | Autoplay interval in milliseconds. |
| `loop` | `boolean` | `true` | Wraps around when navigating past first/last slide. |
| `animation` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Transition mode between slides. |
| `id` | `string` | `''` | Accessible label fallback for the carousel region. |

`ILxCarouselSlide`:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string \| undefined` | Optional stable key per slide. |
| `title` | `string \| undefined` | Slide title. |
| `description` | `string \| undefined` | Slide description. |
| `image` | `string \| undefined` | Slide image URL. |

## Model

| Model | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `number` | `0` | Active slide index. |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `change` | `index: number` | Fired when active slide changes. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `slide` | `{ slide, index, active }` | Custom rendering for each slide item. |

## Theme Tokens Used

- `--lx-colour-surface-raised`
- `--lx-colour-surface-border`
- `--lx-colour-surface-base`
- `--lx-colour-primary`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-sm`
- `--lx-size-radius-md`
- `--lx-size-radius-pill`
- `--lx-size-space-xs`
- `--lx-size-space-sm`
- `--lx-size-space-lg`
- `--lx-motion-duration-fast`
- `--lx-motion-duration-normal`
- `--lx-motion-easing-standard`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxCarousel } from '@luaris/ui';

	const slides = [
		{ id: '1', title: 'First', description: 'First slide', image: '/images/slide-1.jpg' },
		{ id: '2', title: 'Second', description: 'Second slide', image: '/images/slide-2.jpg' },
		{ id: '3', title: 'Third', description: 'Third slide', image: '/images/slide-3.jpg' },
	];
</script>

<template>
	<LxCarousel :slides="slides" />
</template>
```

### Controlled with `v-model`

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { LxCarousel } from '@luaris/ui';

	const activeSlide = ref(0);
	const slides = [
		{ title: 'Overview' },
		{ title: 'Usage' },
		{ title: 'Examples' },
	];
</script>

<template>
	<LxCarousel v-model="activeSlide" :slides="slides" @change="(index) => console.log(index)" />
</template>
```

### Slide Animation + Autoplay

```vue
<script setup lang="ts">
	import { LxCarousel } from '@luaris/ui';

	const slides = [
		{ title: 'Card A', description: 'Fade or slide demo' },
		{ title: 'Card B', description: 'Autoplay enabled' },
	];
</script>

<template>
	<LxCarousel
		:slides="slides"
		autoplay
		:interval="3000"
		animation="slide"
		:loop="true"
	/>
</template>
```

### Custom Slide Slot

```vue
<script setup lang="ts">
	import { LxBadge, LxCarousel } from '@luaris/ui';

	const slides = [
		{ id: 'r1', title: 'Release 1', description: 'Stable' },
		{ id: 'r2', title: 'Release 2', description: 'Preview' },
	];
</script>

<template>
	<LxCarousel :slides="slides">
		<template #slide="{ slide, active }">
			<div class="release-slide">
				<h3>{{ slide.title }}</h3>
				<p>{{ slide.description }}</p>
				<LxBadge :variant="active ? 'success' : 'secondary'" :text="active ? 'Active' : 'Idle'" />
			</div>
		</template>
	</LxCarousel>
</template>
```

## Style Overrides

You can style the carousel shell or navigation dots with scoped overrides:

```vue
<template>
	<LxCarousel class="marketing-carousel" :slides="slides" />
</template>

<style scoped>
	.marketing-carousel :deep(.lx-carousel__dots button) {
		height: 0.7rem;
		width: 0.7rem;
	}

	.marketing-carousel :deep(.lx-carousel__dots button.is-active) {
		background: var(--lx-colour-accent);
	}
</style>
```
