"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import {
	Content,
	Footer,
	Header,
	Login,
	Message,
	StyledButton,
	StyledInput,
	Wrapper,
} from "@/components";

import { authAtom, setAuthAtom, supabaseLogout } from "@/lib";
import { authStore } from "@/lib/store";


interface MessagePayload {
	username: string;
	content: string;
}

export default function Page() {
	// Creates a reference for the browser to scroll to
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const router = useRouter();
	// const dispatch = useAppDispatch();
	// const { isLoggedIn, username } = useAppSelector((state) => state.auth);
	// const setAuth = useSetAtom(setAuthAtom);
	const { isLoggedIn, username } = useAtomValue(authAtom);

	const [msg, setMsg] = useState<string>("");
	const [messages, setMessages] = useState<MessagePayload[]>([]);

	useEffect(() => {
		const socket = io("http://localhost:3000/events", {
			transports: ["websocket"],
			// TODO: Change below to false when auth works
			autoConnect: true,
		});

		socket.on("connect", () => {
			console.log(`${socket.id} has connected to the server`);
		});

		socket.on("events", (message: MessagePayload) => {
			console.log(message);
			setMessages((messages) => [...messages, message]);
		});

		socket.on("disconnect", () => {
			console.log(`${socket.id} has disconnected from the server`);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		const abortController = new AbortController();

		fetch(
			`http://localhost:3000/api/v1/channels/${process.env.NEXT_PUBLIC_GLOBAL_CHANNEL_ID}/messages`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			},
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				return setMessages(data);
			})
			.catch((err) => console.log(err));

		return () => {
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/login");
		}
	}, [isLoggedIn, router]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Event Handlers
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMsg(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSubmit(event);
		}
	};

	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		await supabaseLogout();
		// dispatch(logout());
		// setAuth({ isLoggedIn: false, username: null, accessToken: null });
		authStore.set(setAuthAtom, { isLoggedIn: false, username: null, accessToken: null });
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(username);
		console.log(msg);
		if (msg !== "") {
			await fetch(
				`http://localhost:3000/api/v1/channels/${process.env.NEXT_PUBLIC_GLOBAL_CHANNEL_ID}/messages/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: username,
						content: msg,
					}),
				},
			).catch((err) => console.log(err));
			setMsg("");
		}
	};

	// If user isn't logged in, don't render anything
	if (!isLoggedIn) {
		return null;
	}

	return (
		<>
			<title>Chat | Tveeter</title>
			<Wrapper>
				<Header username={username ?? "UsernameValueHere"}>
					<Login clickHandler={handleClick} loggedIn={isLoggedIn} />
				</Header>
				<Content>
					{messages.map((message, index) => (
						<>
							<Message key={index} message={message} />
							<div ref={bottomRef} />
						</>
					))}
				</Content>
				<Footer>
					<StyledInput
						value={msg}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder="Your message here..."
					/>
					<StyledButton onClick={handleSubmit}>Send</StyledButton>
				</Footer>
			</Wrapper>
		</>
	);
}
