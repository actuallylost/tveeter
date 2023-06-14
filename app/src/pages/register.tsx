import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { supabaseRegister, supabaseSessionCheck } from "@/common";
import { Toast, ToastType } from "@/components";
import { useAppSelector } from "@/redux";
import { Button, ButtonContainer, Input, ModalContainer, Title, Wrapper } from "@/styles";

const Register = () => {
	const router = useRouter();
	const { isLoggedIn } = useAppSelector((state) => state.auth);

	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		supabaseSessionCheck().then(({ accessToken, error }) => {
			if (accessToken !== null) {
				router.push("/chat");
			} else if (error !== null) {
				setError(error);
			}
		});
	}, []);

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await supabaseRegister(username, email, password);
	};

	// If the user is logged in, don't render anything
	if (isLoggedIn) {
		return null;
	}

	return (
		<>
			<title>Register | Tveeter</title>
			<Wrapper>
				<ModalContainer>
					<Title>Tveeter Register</Title>
					<Input
						value={username}
						onChange={handleUsernameChange}
						placeholder="Enter a username..."
						required
					/>
					<Input
						type="email"
						value={email}
						onChange={handleEmailChange}
						placeholder="Enter an email address..."
						required
					/>
					<Input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						placeholder="Enter a strong password..."
						required
					/>
					<ButtonContainer>
						<Button onClick={() => router.push("/login")}>Login</Button>
						<Button onClick={handleSubmit}>Register</Button>
					</ButtonContainer>
					{error != null && <Toast type={ToastType.Error} message={error} />}
				</ModalContainer>
			</Wrapper>
		</>
	);
};

export default Register;
