import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { supabaseLogin, supabaseSessionCheck } from "@/common";
import { Toast, ToastType } from "@/components/Toast";
import { login, useAppDispatch } from "@/redux";
import { Button, ButtonContainer, Input, ModalContainer, Title, Wrapper } from "@/styles";

const Login = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		supabaseSessionCheck()
			.then(({ accessToken, email, error }) => {
				if (accessToken === null) {
					throw error;
				}

				return fetch(`http://localhost:3000/api/v1/users?email=${email}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}).then(async (res) => ({ data: await res.json(), accessToken, email }));
			})
			.then(({ data, accessToken }) => {
				dispatch(login({ username: data["username"], accessToken }));
				router.push("/chat");
			})
			.catch((err) => {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(err);
				}
			});
	}, []);


	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const { username, accessToken, error } = await supabaseLogin(email, password);
		console.log("this runs after supabaseLogin");
		console.log(email);

		if (error) {
			setError(error);
			console.log(error);
			return;
		}

		if (accessToken === null || username === null) {
			setError("No access token or username present");
			console.log("Access token or username is null");
			return;
		}

		setError(null);
		console.log(username);
		console.log(accessToken);
		dispatch(login({ username, accessToken }));
	};

	return (
		<>
			<title>Login | Tveeter</title>
			<Wrapper>
				<ModalContainer>
					<Title>Tveeter Login</Title>
					<Input
						type="email"
						value={email}
						onChange={handleEmailChange}
						placeholder="Enter your email address..."
						required
					/>
					<Input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						placeholder="Enter your password..."
						required
					/>
					<ButtonContainer>
						<Button onClick={handleSubmit}>Login</Button>
						<Button onClick={() => router.push("/register")}>Register</Button>
					</ButtonContainer>
					{error != null && <Toast type={ToastType.Error} message={error} />}
				</ModalContainer>
			</Wrapper>
		</>
	);
};

export default Login;
