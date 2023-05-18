import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

import { Title, Button, Container, Input, Wrapper, ButtonContainer } from "@/styles";
import { supabaseLogin } from "@/common";
import { login } from "@/redux";

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
		// TODO: Implement error toasts
		router.push("/error");
	}

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const { accessToken } = await supabaseLogin(email, password);
		dispatch(login({ accessToken }));
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
