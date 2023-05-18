/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
	},
};

module.exports = nextConfig;
