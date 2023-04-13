import React from "react";
import { StyledNav } from "./style";

export const Nav: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledNav>{children}</StyledNav>;
};
