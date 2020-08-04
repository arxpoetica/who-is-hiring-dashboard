import { config as who_is_hiring_config } from './config.js'
const rollup_vars = who_is_hiring_config.getAll()

import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import { set_env_path, preprocess } from '@sapper-dragon/postcss/tools'
set_env_path('.env')

const dev = process.env.NODE_ENV === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.server': false,
				...rollup_vars,
			}),
			svelte({
				dev,
				extensions: ['.html', '.svelte', '.svg'],
				hydratable: true,
				emitCss: true,
				preprocess: preprocess('client'),
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte', '.svg'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead',
					}],
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true,
					}],
				],
			}),
			!dev && terser({ module: true }),
		],
		watch: { chokidar: true },
		preserveSymlinks: true,
		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.server': true,
				...rollup_vars,
			}),
			svelte({
				dev,
				extensions: ['.html', '.svelte', '.svg'],
				generate: 'ssr',
				preprocess: preprocess('server'),
			}),
			resolve({ dedupe: ['svelte'] }),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),
		watch: { chokidar: true },
		preserveSymlinks: true,
		preserveEntrySignatures: false,
		onwarn,
	},

}
