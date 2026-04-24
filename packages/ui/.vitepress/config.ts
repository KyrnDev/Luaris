import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	srcDir: 'src',
	title: 'Luaris UI',
	description: 'Clean, customisable token-based UI components.',
	themeConfig: {

		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' },
		],

		sidebar: [
			{
				text: 'Components',
				link: '/components/',
				items: [
					{ text: 'Button', link: '/components/button' },
					{ text: 'Icon', link: '/components/icon' },
					{ text: 'Page', link: '/components/page' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' },
		],
	},

	head: [
		[
			'link',
			{
				rel: 'stylesheet',
				href: 'https://kit.fontawesome.com/74330f543d.css',
			},
		],
	],
});
