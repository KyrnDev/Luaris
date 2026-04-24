<script setup lang="ts">
	import LxPageConfigurator from './LxPageConfigurator.vue';
	import { ref } from 'vue';

	const availableOptions = ref([
		'banner',
		'header',
		'sub-header',
		'navigation-header',
		'navigation',
		'navigation-footer',
		'main-header',
		'default',
		'main-footer',
		'aside',
		'footer',
	]);

	const selectedOptions = ref<string[]>([
		'banner',
		'header',
		'sub-header',
		'navigation-header',
		'navigation',
		'navigation-footer',
		'main-header',
		'default',
		'main-footer',
		'aside',
		'footer',
	]);
</script>

# Page

The Page component is a layout component that provides a consistent structure for your application's pages. It includes a header, main content area, and footer, and can be used to create a cohesive look and feel across your application.

## Settings

The Page component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `string` | `0` | The gap between the different sections of the page. This can be used to create more space between the sections or to create a more compact layout. |
| `asideWidth` | `string` | `250px` | The width of the aside section. This can be used to create a wider or narrower aside section depending on your design needs, this affects both navigation and aside sections. |
| `noFill` | `boolean` | `false` | If true, the page will not take up the full height of the viewport. This can be useful for pages that are meant to be embedded within other layouts or components. |

## Usage

The below configurator allows you to select which zones of the page you want to display, this is useful for testing the different slots and how they interact with each other.

<ul class="lx-bg--surface-base lx-rounded--md lx-padding--md" style="display: flex; gap: 0rem; flex-wrap: wrap;">
	<li style="list-style: none; width: 49%; margin-top: 0;" v-for="option in availableOptions" :key="option">
		<label>
			<input type="checkbox" :value="option" v-model="selectedOptions" />
			{{ option }}
		</label>
	</li>
</ul>

<LxPageConfigurator :zones="selectedOptions" style="max-height: 50vh;" />

## Slots

The Page component uses slots to position content with the page layout, you can use the above configurator to see the different layouts.

> [!NOTE]
> The next section will not show any examples due to the full-page nature of this, you can of course use the `no-fill` prop to prevent full height, but it's not great for showcasing the slots.

## Slot: Banner

The banner slot is typically used for a large, attention-grabbing section at the top of the page. It can be used to display a hero image, a call-to-action, or important information that you want to highlight.

<details>
<summary>Show code</summary>

```html
<LxPage>
	<template #banner>
		<p>
			This is the banner slot.
		</p>
	</template>
</LxPage>
```
</details>
