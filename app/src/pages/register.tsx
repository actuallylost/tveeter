import React, { useState } from "react";
import { useRouter } from "next/router";
import { RegisterContainer, RegisterInput, RegisterWrapper } from "@/styles/register.style";

const Register = () => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<>
			<title>Tveeter Web | Register</title>
			<RegisterWrapper>
				<RegisterContainer>
					<RegisterInput placeholder="Enter an email address..." required></RegisterInput>
					<RegisterInput placeholder="Enter a username..." required></RegisterInput>
					<RegisterInput placeholder="Enter a strong password" required></RegisterInput>
				</RegisterContainer>
			</RegisterWrapper>
		</>
	);
};

export default Register;
