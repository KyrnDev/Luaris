import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Luaris Framework',
	description: 'Luaris is a Vue-first UI ecosystem that can grow into a full-stack application platform with a strongly typed component library and a protocol for building headless, but declarative, interfaces via a JSON-DSL.',
	rewrites: {
		'packages/ui/src/components/:component/index.md': 'components/:component/index.md',
		'packages/ui/src/components/index.md': 'components/index.md',
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Components', link: '/components/' },
		],

		sidebar: [
			{
				text: 'Components',
				items: [
					{ text: 'Badge', link: '/components/badge/' },
					{ text: 'Button', link: '/components/button/' },
					{ text: 'Card', link: '/components/card/' },
					{ text: 'Flex', link: '/components/flex/' },
					{ text: 'Icon', link: '/components/icon/' },
					{ text: 'Page', link: '/components/page/' },
					{ text: 'Tag', link: '/components/tag/' },
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
