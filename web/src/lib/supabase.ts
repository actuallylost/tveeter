import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_API_KEY) {
	throw new Error("Missing SUPABASE_URL or SUPABASE_API_KEY");
}

const supabase: SupabaseClient = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
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

	await fetch(`http://localhost:3000/api/v1/tempusers/${username}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email }),
	}).catch((err) => console.log(err));

	console.log(data.user);
	return { user: data.user, error: null };
};

export const supabaseLogin = async (
	email: string,
	password: string,
): Promise<
	| { username: string; accessToken: string; error: null }
	| { username: null; accessToken: null; error: string }
> => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		return { username: null, accessToken: null, error: error.message };
	}

	if (!data.session || !data.session.access_token) {
		return { username: null, accessToken: null, error: "Session validation failed" };
	}

	const username = await fetch(`http://localhost:3000/api/v1/users?email=${email}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		// TODO: Check if below has a different way of doing it
		// data["username"] is required to fetch the username of the user
		.then((data: any) => data["username"])
		.catch((err) => console.log(err));

	if (typeof username !== "string") {
		console.log(`${username}`);
		return { username: null, accessToken: null, error: "Username is not a string" };
	}

	return { username: username, accessToken: data.session.access_token, error: null };
};

export const supabaseLogout = async (): Promise<{ error: string } | { error: null }> => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return { error: error.message };
	}

	return { error: null };
};

export const supabaseSessionCheck = async (): Promise<
	| { accessToken: string; error: null; email: string }
	| { accessToken: null; error: string; email: null }
> => {
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		return { accessToken: null, error: error.message, email: null };
	}

	if (!data.session || !data.session.access_token || !data.session.user.email) {
		return { accessToken: null, error: "Session validation failed", email: null };
	}

	return { accessToken: data.session.access_token, email: data.session.user.email, error: null };
};
