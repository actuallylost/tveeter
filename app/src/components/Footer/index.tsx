import React from "react";
import { StyledFooter } from "./style";

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledFooter>{children}</StyledFooter>;
};

export default Footer;
