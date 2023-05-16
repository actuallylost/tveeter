import React from "react";
import { StyledHeader } from "./style";

interface HeaderProps {
	children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
	return <StyledHeader>{children}</StyledHeader>;
};
