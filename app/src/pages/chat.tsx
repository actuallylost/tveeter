import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { supabaseLogout } from "@/common";
import { Content, Footer, Header, Login, Message, Wrapper } from "@/components";
import { StyledButton, StyledInput } from "@/components/Footer/style";
import { logout, RootState } from "@/redux";

interface MessagePayload {
	username: string;
	content: string;
}

const Chat = () => {
	// Creates a reference for the browser to scroll to
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const router = useRouter();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const username = useSelector((state: RootState) => state.auth.username);

	const [msg, setMsg] = useState<string>("");
	const [authorId, setAuthorId] = useState<string>("");
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

		fetch("http://localhost:3000/api/v1/channels/14681145392246784/messages", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			signal: abortController.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				setMessages(data);
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
	}, [isLoggedIn]);

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
		dispatch(logout());
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (msg !== "") {
			await fetch(`http://localhost:3000/api/v1/users/${username}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data: string) => setAuthorId(data))
				.catch((err) => console.log(err));

			await fetch("http://localhost:3000/api/v1/channels/14681145392246784/messages/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// TODO: Send authorId and channelId alongside content in JSON object
				body: JSON.stringify({
					authorId: authorId,
					content: msg,
				}),
			}).catch((err) => console.log(err));
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
				<Header username={username ?? "UsernameValueHere"}></Header>
				<Login clickHandler={handleClick} loggedIn={isLoggedIn} />
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
};

export default Chat;
