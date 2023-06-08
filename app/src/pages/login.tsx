import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { supabaseLogin } from "@/common";
import { Toast, ToastType } from "@/components/Toast";
import { login, RootState } from "@/redux";
import { Button, ButtonContainer, Input, ModalContainer, Title, Wrapper } from "@/styles";

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => {
		state.auth.isLoggedIn, state.auth.username;
	});

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (auth) {
			router.push("/chat");
		}
	}, [isLoggedIn]);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const { accessToken, error } = await supabaseLogin(email, password);

		if (error || accessToken === null) {
			setError(error ?? "No access token present");
			return;
		}

		setError(null);
		dispatch(login({ accessToken }));
	};

	return (
		<>
			<title>Login | Tveeter</title>
			<Wrapper>
				<ModalContainer>
					<Title>Tveeter Login</Title>
					<Input
						onChange={handleEmailChange}
						value={email}
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
