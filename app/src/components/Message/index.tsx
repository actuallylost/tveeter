// import { useState } from "react";

import { StyledUsername, StyledMessage } from "./style";

interface MessageProps {
	username: string;
	children?: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ username, children }) => {
	return (
		<StyledMessage>
			<StyledUsername>{username}</StyledUsername>
			{children}
		</StyledMessage>
	);
};

export default Message;
