import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: 'jsdom',
		setupFiles: [fileURLToPath(new URL('./src/tests/setup.ts', import.meta.url))],
		coverage: {
			enabled: true,
			reporter: ['text', 'html'],
			exclude: [
				'**/*.d.ts',
				'**/dist/**',
				'**/src/main.ts',
				'**/src/App.vue',
				'**/src/styles/**',
				'**/src/components/kitchensink/**',
			],
		},
	},
});
