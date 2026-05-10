import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Luaris Framework',
	description: 'Luaris is a Vue-first UI ecosystem that can grow into a full-stack application platform with a strongly typed component library and a protocol for building headless, but declarative, interfaces via a JSON-DSL.',
	rewrites: {
		'packages/ui/src/components/:component/index.md': 'components/:component/index.md',
		'packages/ui/src/components/index.md': 'components/index.md',
		'packages/ui/src/types/:page': 'types/:page',
		'packages/ui/src/types/index.md': 'types/index.md',
		'packages/docs/design/index.md': 'design/index.md',
		'packages/docs/design/:page': 'design/:page',
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Design', link: '/design/index.md' },
			{ text: 'Components', link: '/components/index.md' },
			{ text: 'Compose', link: '#' },
			{ text: 'Server', link: '#' },
		],

		sidebar: [
			{
				text: 'Design System',
				link: '/design/index.md',
				items: [
					{ text: 'Colours', link: '/design/colours.md' },
					{ text: 'Sizing', link: '/design/sizing.md' },
					{ text: 'Typography', link: '/design/typography.md' },
					{ text: 'Motion', link: '/design/motion.md' },
				],
			},
			{
				text: 'Components',
				link: '/components/index.md',
				items: [
					{ text: '❌ Accordion', link: '/components/accordion/' },
					{ text: '❌ Alert', link: '/components/alert/' },
					{ text: '❌ App', link: '/components/app/' }, // Root layout component, used with accessibility controls built in for toasts, etc, will provide context/features down the tree.
					{ text: '❌ Avatar', link: '/components/avatar/' },
					{ text: '✅ Badge', link: '/components/badge/' },
					{ text: '❌ Breadcrumbs', link: '/components/breadcrumbs/' },
					{ text: '✅ Button', link: '/components/button/' },
					{ text: '❌ Calendar', link: '/components/calendar/' }, // Entirely custom calendar component with support for multiple views (month, year, decade) and range selection, and even support for calendar events.
					{ text: '✅ Card', link: '/components/card/' },
					{ text: '❌ Carousel', link: '/components/carousel/' },
					{ text: '❌ Checkbox', link: '/components/checkbox/' },
					{ text: '❌ Color Picker', link: '/components/colour-picker/' },
					{ text: '❌ Combobox', link: '/components/combobox/' },
					{ text: '❌ Command Palette', link: '/components/command-palette/' }, // A floating command palette that can be triggered with a hotkey, supports fuzzy search, and provides an interface for executing commands or navigating the app.
					{ text: '❌ Context Menu', link: '/components/context-menu/' }, // A right-click context menu that can be attached to any element, supports nested submenus, and is fully keyboard accessible.
					{ text: '❌ Data Table', link: '/components/data-table/' },
					{ text: '❌ Date Picker', link: '/components/date-picker/' },
					{ text: '❌ Date Range Picker', link: '/components/date-range-picker/' },
					{ text: '❌ Dialog', link: '/components/dialog/' }, // A modal dialog component that can be used for confirmations, forms, or any content that needs to be displayed in a layer above the main app content, including modal support.
					{ text: '❌ Divider', link: '/components/divider/' },
					{ text: '❌ Drawer', link: '/components/drawer/' },
					{ text: '❌ Dynamic Island', link: '/components/dynamic-island/' }, // Experimental component to mimic the iPhone's dynamic island floating container, MAYBE an alternative to toasts.
					{ text: '❌ File Input', link: '/components/file-input/' },
					{ text: '✅ Flex', link: '/components/flex/' }, // Might want to make special LxLayouts, i.e. LxSidebarLayout, LxClusterLayout, LxStackLayout, etc, that are just preconfigured flex containers with specific props for common layout patterns.
					{ text: '❌ Form', link: '/components/form/' },
					{ text: '❌ Form Field', link: '/components/form-field/' },
					{ text: '❌ Grid', link: '/components/grid/' },
					{ text: '❌ Hover Card', link: '/components/hover-card/' }, // A card that appears when hovering over an element, used for previews or additional info, supports rich content and is fully keyboard accessible.
					{ text: '✅ Icon', link: '/components/icon/' },
					{ text: '❌ Icon Picker', link: '/components/icon-picker/' },
					{ text: '❌ Image', link: '/components/image/' },
					{ text: '🚧 Input', link: '/components/input/' },
					{ text: '❌ Label', link: '/components/label/' },
					{ text: '❌ List', link: '/components/list/' },
					{ text: '❌ Markdown', link: '/components/markdown/' }, // A component that can render markdown content, with support for GitHub-flavored markdown features like tables, task lists, and syntax-highlighted code blocks, and built-in editor.
					{ text: '❌ Menu', link: '/components/menu/' },
					{ text: '❌ Media', link: '/components/media/' },
					{ text: '❌ Mentions Input', link: '/components/mentions-input/' }, // Expansion of the Combobox, an input that provides autocomplete suggestions for user mentions, supports @-style mentions and is fully keyboard accessible.
					{ text: '❌ Navigation', link: '/components/navigation/' },
					{ text: '❌ Number Input', link: '/components/number-input/' },
					{ text: '✅ Page', link: '/components/page/' }, // A root-level component that provides a consistent layout for each page of the app, with support for headers, footers, and sidebars.
					{ text: '❌ Pagination', link: '/components/pagination/' },
					{ text: '❌ Popover', link: '/components/popover/' },
					{ text: '❌ Progress', link: '/components/progress/' },
					{ text: '❌ Radio', link: '/components/radio/' },
					{ text: '❌ Rating', link: '/components/rating/' },
					{ text: '❌ Segmented Input', link: '/components/segmented-input/' }, // Pass a format, i.e. XX-XX-XX or XXX-XXX, or XXX-XXX (custom syntax) and it will render the right amount of inputs.
					{ text: '❌ Select', link: '/components/select/' },
					{ text: '❌ Skeleton', link: '/components/skeleton/' },
					{ text: '❌ Slider', link: '/components/slider/' },
					{ text: '❌ Sortable', link: '/components/sortable/' },
					{ text: '❌ Stat', link: '/components/stat/' },
					{ text: '❌ Stepper', link: '/components/stepper/' },
					{ text: '✅ Switch', link: '/components/switch/' },
					{ text: '❌ Table', link: '/components/table/' },
					{ text: '❌ Tabs', link: '/components/tabs/' },
					{ text: '✅ Tag', link: '/components/tag/' },
					{ text: '❌ Textarea', link: '/components/textarea/' },
					{ text: '❌ Time Picker', link: '/components/time-picker/' },
					{ text: '❌ Time Range Picker', link: '/components/time-range-picker/' },
					{ text: '❌ Timeline', link: '/components/timeline/' },
					{ text: '❌ Toast', link: '/components/toast/' },
					{ text: '❌ Tooltip', link: '/components/tooltip/' },
					{ text: '❌ Tree', link: '/components/tree/' },
					{ text: '❌ Virtual List', link: '/components/virtual-list/' },
				],
			},
			{
				text: 'TypeScript Types',
				link: '/types/index.md',
				items: [
					{ text: 'Theme', link: '/types/theme.md' },
					{ text: 'Units', link: '/types/units.md' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/KyrnDev/Luaris' },
		],
	},
	head: [
		['link', { rel: 'stylesheet', href: 'https://kit.fontawesome.com/74330f543d.css' }],
		['script', {}, `
			const observer = new MutationObserver(() => {
				const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
				document.documentElement.setAttribute('data-theme', theme);
			});
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
			document.documentElement.setAttribute('data-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
		`],
	],
});
