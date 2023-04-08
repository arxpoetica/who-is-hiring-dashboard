import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import svg from '@poppanator/sveltekit-svg'
import { plugins } from './svgo.config'

export default defineConfig({
	clearScreen: false,
	plugins: [
		sveltekit(),
		svg({
			includePaths: ['./src/lib/svg/svelte/'],
			svgoOptions: {
				multipass: true,
				plugins: plugins.svelte,
			},
		}),
		svg({
			includePaths: ['./src/lib/svg/static/'],
			svgoOptions: {
				multipass: true,
				plugins: plugins.static,
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
