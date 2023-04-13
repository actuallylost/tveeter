import React from "react";
import { StyledHeader } from "./style";

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
