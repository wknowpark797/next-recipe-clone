/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePath: [path.join(__dirname, 'styles')],
		prependData: `@import "styles/_variables.scss"`,
	},
	images: {
		domains: ['www.themealdb.com'],
	},
	compiler: { stylesComponents: true },
};

module.exports = nextConfig;
