import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: {
				'index': resolve(__dirname, 'src/index.ts'),
				'components/button': resolve(__dirname, 'src/components/button/index.ts'),
				'components/flex': resolve(__dirname, 'src/components/flex/index.ts'),
				'components/icon': resolve(__dirname, 'src/components/icon/index.ts'),
				'components/page': resolve(__dirname, 'src/components/page/index.ts'),
				'composables': resolve(__dirname, 'src/composables/index.ts'),
				'directives': resolve(__dirname, 'src/directives/index.ts'),
			},
			formats: ['es'],
			cssFileName: 'styles',
			fileName: (_, entryName) =>
				entryName === 'index' ? 'index.js' : `${entryName}/index.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
			},
		},
		sourcemap: true,
		cssMinify: false,
		emptyOutDir: true,
		copyPublicDir: false,
	},
});
