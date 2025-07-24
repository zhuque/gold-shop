import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import { PagesFaceRollupPlugin } from './pagesFace/plugin/esm'

export default defineConfig({
	plugins: [
		uni(),
		PagesFaceRollupPlugin(path.resolve(__dirname, './pagesFace'))
	],
	server: {
		// port: 3001,
		proxy: {
			'^/server|uploads': {
				target: 'http://127.0.0.1:8888',
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/API/, ''),
			},

		},
	},
});