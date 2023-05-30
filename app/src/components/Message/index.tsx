import { StyledMessage, StyledUsername } from "./style";

interface MessageProps {
	message: {
		username: string;
		content: string;
	};
}

export const Message: React.FC<MessageProps> = ({ message }) => {
	return (
		<>
			<StyledUsername>{message.username}</StyledUsername>
			<StyledMessage>{message.content}</StyledMessage>
		</>
	);
};
