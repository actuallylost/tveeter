import { SupabaseClient, User, createClient } from "@supabase/supabase-js";

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
): Promise<{ user: User }> => {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
	});

	if (error) {
		console.log(error);
	}

	if (!data || !data.user) {
		console.log("No data returned");
	}

	await fetch("http://localhost:3000/api/v1/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, email }),
	})
		.then((res) => res.json())
		.then((res) => console.log(res));

	return { user: data?.user as User };
};

export const supabaseLogin = async (
	email: string,
	password: string,
): Promise<{ accessToken: string }> => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		console.log(error);
	}

	if (!data.session || !data.session.access_token) {
		console.log("No access token returned");
	}

	return { accessToken: data.session?.access_token as string };
};