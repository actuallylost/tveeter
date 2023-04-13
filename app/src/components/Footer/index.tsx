import React from "react";
import { StyledFooter } from "./style";

export const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledFooter>{children}</StyledFooter>;
};
