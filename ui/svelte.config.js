import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// kit: {
	// 	appDir: './ui',
	// 	adapter: adapter()
	// }
	preprocess: preprocess(),
	kit: {
		appDir: './ui',
		adapter: adapter()
	}
};

export default config;
