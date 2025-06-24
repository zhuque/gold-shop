import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	server: {
		// port: 3001,
		proxy: {
			'^/staff|uploads': {
				target: 'http://127.0.0.1:8888',
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/API/, ''),
			},

		},
	},
});