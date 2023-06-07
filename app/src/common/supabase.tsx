import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
	throw new Error("Missing SUPABASE_URL or SUPABASE_API_KEY");
}

const supabase: SupabaseClient = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_API_KEY,
);

// TODO: Implement error toasts for all of the below
export const supabaseRegister = async (
	username: string,
	email: string,
	password: string,
): Promise<{ user: User; error: null } | { user: null; error: string }> => {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			emailRedirectTo: "http://localhost:3001/redirect",
		},
	});

	if (error) {
		return { user: null, error: error.message };
	}

	if (!data || !data.user) {
		return { user: null, error: "User data is undefined" };
	}

	await fetch("http://localhost:3000/api/v1/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: username }),
	});

	console.log(data.user);
	return { user: data.user, error: null };
};

export const supabaseLogin = async (
	email: string,
	password: string,
): Promise<{ accessToken: string; error: null } | { accessToken: null; error: string }> => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		return { accessToken: null, error: error.message };
	}

	if (!data.session || !data.session.access_token) {
		return { accessToken: null, error: "Session validation failed" };
	}

	return { accessToken: data.session.access_token, error: null };
};

export const supabaseSessionCheck = async (): Promise<
	{ accessToken: string; error: null } | { accessToken: null; error: string }
> => {
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		return { accessToken: null, error: error.message };
	}

	if (!data.session || !data.session.access_token) {
		return { accessToken: null, error: "" };
	}

	return { accessToken: data.session.access_token as string, error: null };
};