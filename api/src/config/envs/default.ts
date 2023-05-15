export const config = {
	db: {
		dbProvider: process.env.DATABASE_PROVIDER,
		dbUrl: process.env.DATABASE_URL,
	},
	supabase: {
		apiUrl: process.env.SUPABASE_URL,
		apiKey: process.env.SUPABASE_API_KEY,
		jwtSecret: process.env.SUPABASE_JWT_SECRET,
	},
};
