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

[[toc]]

## Settings

The Page component accepts the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | [TLayoutsLength](/types/units.html#type-tlayoutslength) \| [TSizes](/types/theme.html#type-tsizes) | `0` | The gap between the different sections of the page. This can be used to create more space between the sections or to create a more compact layout. |
| `padding` | [TLayoutsLength](/types/units.html#type-tlayoutslength) \| [TSizes](/types/theme.html#type-tsizes) | `var(--lx-spacing-md)` | The padding around the content of the page. This can be used to create more space around the content or to create a more compact layout. |
| `asideWidth` | `string` | `250px` | The width of the aside section. This can be used to create a wider or narrower aside section depending on your design needs, this affects both navigation and aside sections. |
| `noFill` | `boolean` | `false` | If true, the page will not take up the full height of the viewport. This can be useful for pages that are meant to be embedded within other layouts or components. |

## Usage

The below configurator allows you to select which zones of the page you want to display, this is useful for testing the different slots and how they interact with each other.

> [!INFO]
> The Page component is designed to be flexible and can be used in a variety of ways, this means that as you add or remove slots, it will automatically adjust the layout to accommodate the available content.

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

The Page component provides the following slots for content placement:

- `banner`: A slot for displaying a banner at the top of the page, this is ideal for important announcements or promotions.
- `header`: A slot for the main header of the page, this is ideal for displaying the page title or other important information.
- `sub-header`: A slot for a secondary header, this is ideal for displaying additional information or context about the page.
- `navigation-header`: A slot for the header of the navigation section, this is ideal for displaying a title or other information about the navigation.
- `navigation`: A slot for the main navigation of the page, this is ideal for displaying links to other pages or sections of the application.
- `navigation-footer`: A slot for the footer of the navigation section, this is ideal for displaying additional links or information about the navigation.
- `main-header`: A slot for the header of the main content area, this is ideal for displaying a title or other information about the main content.
- `default`: The default slot for the main content of the page, this is where the main content of the page should be placed.
- `main-footer`: A slot for the footer of the main content area, this is ideal for displaying additional information or links related to the main content.
- `aside`: A slot for an aside section, this is ideal for displaying additional information or links that are related to the main content but not essential to the main flow of the page.
- `footer`: A slot for the footer of the page, this is ideal for displaying copyright information, links to terms of service, or other important information that should be available on every page.
