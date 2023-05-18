import React, { useState } from "react";
import { useRouter } from "next/router";
import { Wrapper, Container, Input, ButtonContainer, Button } from "@/styles";
import { supabaseRegister } from "@/common";

const Register = () => {
	const router = useRouter();

	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

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

	return (
		<>
			<title>Tveeter Web | Register</title>
			<Wrapper>
				<Container>
					<Input
						onChange={handleUsernameChange}
						placeholder="Enter a username..."
						required
					></Input>
					<Input
						onChange={handleEmailChange}
						placeholder="Enter an email address..."
						required
					></Input>
					<Input
						onChange={handlePasswordChange}
						placeholder="Enter a strong password"
						required
					></Input>
				</Container>
				<ButtonContainer>
					<Button onClick={() => router.push("/login")}>Login</Button>
					<Button onClick={handleSubmit}>Register</Button>
				</ButtonContainer>
			</Wrapper>
		</>
	);
};

export default Register;
