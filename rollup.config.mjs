import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
	external: ['jquery'],
	output: {
		file: 'dist/bundle.js',
		format: 'iife',
		name: 'MapboxGLGlobeMinimap',
		globals: {
			d3: 'd3'
		},
		plugins: [terser()]
	},
	plugins: [
		nodeResolve(),
	]
};
