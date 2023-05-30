import React from "react";

import { StyledHeader } from "./style";

interface HeaderProps {
	username: string;
}

export const Header: React.FC<HeaderProps> = ({ username }) => {
	return <StyledHeader>Tveeter | {username}</StyledHeader>;
};
