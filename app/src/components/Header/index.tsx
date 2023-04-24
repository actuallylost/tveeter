import React from "react";
import { StyledHeader } from "./style";

export const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledHeader>{children}</StyledHeader>;
};
