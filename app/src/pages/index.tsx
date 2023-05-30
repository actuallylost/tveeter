import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Content, Footer, Header, Message, Wrapper } from "@/components";
import { StyledButton, StyledInput } from "@/components/Footer/style";

interface MessagePayload {
	username: string;
	content: string;
}

const Chat = () => {
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

	// Event Handlers
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMsg(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSubmit(event);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (msg !== "") {
			fetch("http://localhost:3000/api/v1/channels/3601644075925504/messages/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: msg }),
			}).catch((err) => console.log(err));
			setMsg("");
		}
	};
	return (
		<>
			<title>Tveeter Web | Chat</title>
			<Wrapper>
				<Header>Tveeter | UsernameValueHere</Header>
				<Content>
					{messages.map((message, index) => (
						<Message key={index} message={message} />
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
