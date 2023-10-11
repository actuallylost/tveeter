import React from "react";
import styled from "styled-components";

import { HStack } from "@/styles";

interface HeaderProps {
	username: string;
	children?: React.ReactNode;
}

const StyledHeader = styled(HStack)`
	justify-content: center;
	width: 100%;
	min-height: 100px;
	font-weight: 700;
	color: white;
	background: rgb(28, 28, 28);
	border-radius: 0px 0px 16px 16px;
`;

export const Header: React.FC<HeaderProps> = ({ username, children }) => {
	return (
		<>
			<StyledHeader>Tveeter | {username}</StyledHeader>
			{children}
		</>
	);
};
