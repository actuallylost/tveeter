import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { supabaseRegister, supabaseSessionCheck } from "@/common";
import { register } from "@/redux";
import { Button, ButtonContainer, Input, ModalContainer, Title, Wrapper } from "@/styles";

const Register = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		supabaseSessionCheck().then(({ accessToken }) => {
			if (accessToken !== null) {
				router.push("/chat");
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
		dispatch(register({ username }));
	};

	return (
		<>
			<title>Register | Tveeter</title>
			<Wrapper>
				<ModalContainer>
					<Title>Tveeter Register</Title>
					<Input
						onChange={handleUsernameChange}
						placeholder="Enter a username..."
						required
					/>
					<Input
						onChange={handleEmailChange}
						placeholder="Enter an email address..."
						required
					/>
					<Input
						type="password"
						onChange={handlePasswordChange}
						placeholder="Enter a strong password..."
						required
					/>
					<ButtonContainer>
						<Button onClick={() => router.push("/login")}>Login</Button>
						<Button onClick={handleSubmit}>Register</Button>
					</ButtonContainer>
				</ModalContainer>
			</Wrapper>
		</>
	);
};

export default Register;
