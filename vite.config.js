import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@vercel/speed-insights/sveltekit': path.resolve(
				'node_modules/@vercel/speed-insights/dist/sveltekit/index.mjs'
			),
			'svelte/legacy': path.resolve('node_modules/svelte/src/legacy/legacy-server.js')
		}
	}
});
