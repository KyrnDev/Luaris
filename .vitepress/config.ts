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
					{ text: 'Badge', link: '/components/badge/' },
					{ text: 'Button', link: '/components/button/' },
					{ text: 'Card', link: '/components/card/' },
					{ text: 'Flex', link: '/components/flex/' },
					{ text: 'Icon', link: '/components/icon/' },
					{ text: 'Page', link: '/components/page/' },
					{ text: 'Switch', link: '/components/switch/' },
					{ text: 'Tag', link: '/components/tag/' },
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
	],
});
