// import { useState } from "react";

import { StyledMessage } from "./style";

const Message: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledMessage>{children}</StyledMessage>;
};

export default Message;
