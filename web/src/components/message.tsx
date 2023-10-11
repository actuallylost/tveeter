import styled from "styled-components";

import { VStack } from "@/styles";

interface MessageProps {
	message: {
		username: string;
		content: string;
	};
}

const StyledUsername = styled.span`
	font-weight: bold;
	margin-bottom: 4px;
`;

const StyledMessage = styled(VStack)`
	color: white;
	overflow-wrap: anywhere;

	flex-wrap: initial;

	align-items: start;
`;

export const Message: React.FC<MessageProps> = ({ message }) => {
	return (
		<>
			<StyledUsername>{message.username}</StyledUsername>
			<StyledMessage>{message.content}</StyledMessage>
		</>
	);
};
