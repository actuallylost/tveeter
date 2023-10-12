"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Toast, ToastType } from "@/components/toast";
import { authAtom, setAuthAtom, supabaseLogin, supabaseSessionCheck } from "@/lib";
import { Button, ButtonContainer, Input, ModalContainer, Title, Wrapper } from "@/styles";

export default function Page() {
	const router = useRouter();
	// const dispatch = useAppDispatch();
	// const { isLoggedIn } = useAppSelector((state) => state.auth);
	const { isLoggedIn } = useAtomValue(authAtom);
	const setAuth = useSetAtom(setAuthAtom);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		supabaseSessionCheck()
			.then(async ({ accessToken, email, error }) => {
				if (accessToken === null) {
					throw error;
				}

				const res = await fetch(`http://localhost:3000/api/v1/users?email=${email}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				return { data: await res.json(), accessToken, email };
			})
			.then(({ data, accessToken }) => {
				// dispatch(login({ username: data["username"], accessToken }));
				setAuth({ isLoggedIn: true, username: data["username"], accessToken });
				console.log(data["username"]);
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
			console.log(username);
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
		// dispatch(login({ username, accessToken }));
		setAuth({ isLoggedIn: true, username, accessToken });
	};

	// const handleKeyDown = (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	handleSubmit(event);
	// };

	// If the user is logged in, don't render anything
	if (isLoggedIn) {
		return null;
	}

	return (
		<>
			<Wrapper>
				<ModalContainer>
					<title>Login | Tveeter</title>
					<Title>Tveeter Login</Title>
					<Input
						type="email"
						value={email}
						onChange={handleEmailChange}
						// onKeyDown={handleKeyDown}
						placeholder="Enter your email address..."
						required
					/>
					<Input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						// onKeyDown={handleKeyDown}
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
}
