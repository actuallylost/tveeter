// React
import { useState } from "react";

// Styled Components
import { Nav } from "../Nav";
import { StyledChat, StyledMessage, StyledButton, StyledInput } from "./style";
import { StyledFooter } from "../Footer/style";

const Chat = () => {
	const [msg, setMsg] = useState<string>("");
	const [messages, setMessages] = useState<string[]>([]);

	// Event Handlers
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMsg(event.target.value);
	};

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (msg === "") {
			return;
		}
		setMessages([...messages, msg]);
		setMsg("");
	};

	return (
		<>
			<Nav>Tveeter</Nav>
			<StyledChat>
				{messages.map((message, index) => (
					<StyledMessage key={index}>
						Message{index}: {message}
					</StyledMessage>
				))}
			</StyledChat>
			<StyledFooter>
				<StyledInput value={msg} onChange={handleChange} onKeyDown={handleKeyDown} />
				<StyledButton onClick={handleSubmit}>Send</StyledButton>
			</StyledFooter>
		</>
	);
};

export default Chat;
