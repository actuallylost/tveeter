import React, { useState } from "react";
import { useRouter } from "next/router";
import { Wrapper, Container, Input, ButtonContainer, Button } from "@/styles/modal.style";

const Register = () => {
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<>
			<title>Tveeter Web | Register</title>
			<Wrapper>
				<Container>
					<Input placeholder="Enter an email address..." required></Input>
					<Input placeholder="Enter a username..." required></Input>
					<Input placeholder="Enter a strong password" required></Input>
				</Container>
				<ButtonContainer>
					<Button onClick={() => router.push("/login")}>Login</Button>
					<Button>Register</Button>
				</ButtonContainer>
			</Wrapper>
		</>
	);
};

export default Register;
