import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const componentsDir = resolve(__dirname, 'src/components');

const componentEntries = existsSync(componentsDir)
	? Object.fromEntries(
			readdirSync(componentsDir, { withFileTypes: true })
				.filter((entry) => entry.isDirectory())
				.map((entry) => [
					`components/${entry.name}`,
					resolve(componentsDir, entry.name, 'index.ts'),
				]),
		)
	: {};

const optionalEntries = {
	...(existsSync(resolve(__dirname, 'src/directives/index.ts'))
		? { directives: resolve(__dirname, 'src/directives/index.ts') }
		: {}),
	...(existsSync(resolve(__dirname, 'src/register.ts'))
		? { register: resolve(__dirname, 'src/register.ts') }
		: {}),
};

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, 'src/index.ts'),
				...componentEntries,
				...optionalEntries,
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
