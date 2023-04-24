// import { useState } from "react";

import { StyledMessage } from "./style";

export const Message: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledMessage>{children}</StyledMessage>;
};
