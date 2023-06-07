import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { Content, Footer, Header, Message, Wrapper } from "@/components";
import { StyledButton, StyledInput } from "@/components/Footer/style";

import Login from "./login";

interface MessagePayload {
	username: string;
	content: string;
}

const Chat = () => {
	// Creates a reference for the browser to scroll to
	const bottomRef = useRef<null | HTMLDivElement>(null);

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

		fetch("http://localhost:3000/api/v1/channels/13596290973712384/messages", {
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
		// Below works fine
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (msg !== "") {
			await fetch("http://localhost:3000/api/v1/channels/13596290973712384/messages/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// TODO: Send username alongside content in JSON object
				body: JSON.stringify({ content: msg }),
			}).catch((err) => console.log(err));
			setMsg("");
		}
	};

	return (
		<>
			<title>Tveeter Web | Chat</title>
			<Login />
			<Wrapper>
				<Header username="UsernameValueHere" />
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
