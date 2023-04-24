// React
import React, { useState } from "react";

// Styles
import { GlobalStyles } from "./components/common/GlobalStyles";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { StyledButton, StyledInput } from "./components/Footer/style";
import { Header } from "./components/Header";
import { Message } from "./components/Message";
// Components
import { Wrapper } from "./components/Wrapper";

const App = () => {
	const [msg, setMsg] = useState<string>("");
	const [messages, setMessages] = useState<string[]>([]);

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
			setMessages([...messages, msg]);
			setMsg("");
		}
	};
	return (
		<>
			<GlobalStyles />
			<Wrapper>
				<Header>Tveeter | Username</Header>
				<Content>
					{messages.map((message, index) => (
						<Message key={index}>{message}</Message>
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

export default App;
