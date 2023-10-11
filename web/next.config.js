/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "export",
	experimental: {
		swcPlugins: [["@swc-jotai/react-refresh", {}]],
	},
};

module.exports = nextConfig;
