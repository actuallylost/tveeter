import React, { createContext, useContext, useState } from "react";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Title, Button, Container, Input, Wrapper, ButtonContainer } from "@/styles/modal.style";

const AccessToken = createContext<string>("");

const Login = () => {
	const router = useRouter();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const token = useContext(AccessToken);

	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
		router.push("/error");
	}

	const supabase: SupabaseClient = createClient(
		process.env.SUPABASE_URL as string,
		process.env.SUPABASE_API_KEY as string,
	);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error(error);
			router.push("/error");
		}

		if (data.user === null) {
			console.log(`User data: ${data.user}`);
			console.error("Failed to login user - Data is null");
			router.push("/error");
		}

		if (data.session === null || data.session.access_token === undefined) {
			console.log(`Session: ${data.session} | Session Token: ${data.session?.access_token}`);
			console.error("Failed to register user - Session is null");
			router.push("/error");
		}

		console.log(`Supabase access token: ${data.session?.access_token}`);
		router.push("/");

		return (
			<AccessToken.Provider
				value={token === "" ? (data.session?.access_token as string) : token}
			></AccessToken.Provider>
		);
	};

	return (
		<>
			<title>Tveeter Web | Login</title>
			<Wrapper>
				<Container>
					<Title>Tveeter Login</Title>
					<Input
						onChange={handleEmailChange}
						placeholder="Enter your email address..."
						required
					/>
					<Input
						onChange={handlePasswordChange}
						placeholder="Enter your password..."
						required
					/>
					<ButtonContainer>
						<Button onClick={handleSubmit}>Login</Button>
						<Button onClick={() => router.push("/register")}>Register</Button>
					</ButtonContainer>
				</Container>
			</Wrapper>
		</>
	);
};

export default Login;
