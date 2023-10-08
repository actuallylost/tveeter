import React from "react";

import { StyledHeader } from "./style";

interface HeaderProps {
	username: string;
	children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ username, children }) => {
	return (
		<>
			<StyledHeader>Tveeter | {username}</StyledHeader>
			{children}
		</>
	);
};
