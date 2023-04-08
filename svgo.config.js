/* eslint-disable id-length */

// SEE: https://raw.githubusercontent.com/svg/svgo/master/.svgo.yml
// SEE: https://github.com/svg/svgo/blob/master/lib/svgo/js2svg.js#L6 for more config options

export const plugins = {
	svelte: [
		'removeDimensions',
		'removeRasterImages',
		'removeScriptElement',
		'removeStyleElement',
		{
			name: 'removeViewBox',
			active: false,
		},
		'removeXMLNS',
	],

	static: [
		{
			name: 'addClassesToSVGElement',
			params: { className: 'svg-static' },
		},
		'removeRasterImages',
		'removeScriptElement',
		'removeStyleElement',
	],
}
