import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	LoginButton,
	LoginContainer,
	LoginInput,
	LoginWrapper,
	LoginButtonContainer,
} from "@/styles/login.style";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<>
			<title>Tveeter Web | Login</title>
			<LoginWrapper>
				<LoginContainer>
					<LoginInput placeholder="Enter your email address..." required></LoginInput>
					<LoginInput placeholder="Enter your password..." required></LoginInput>
					<LoginButtonContainer>
						<LoginButton>Login</LoginButton>
						<LoginButton>Register</LoginButton>
					</LoginButtonContainer>
				</LoginContainer>
			</LoginWrapper>
		</>
	);
};

export default Login;
