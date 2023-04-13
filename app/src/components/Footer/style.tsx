import styled from "styled-components";
import { HStack } from "../common/Stack";

export const StyledFooter = styled(HStack)`
	align-items: center;
	padding: 16px;
	gap: 10px;

	width: 100%;
	height: 100px;

	background: #1c1c1c;
	border-radius: 16px 16px 0px 0px;
`;

export const StyledInput = styled.input`
	color: white;
	background: #272727;
	border-radius: 7px;

	&:focus {
		background-color: #3a3a3a;

		outline: none;

		transition: all 0.2s ease-in-out;
	}
`;

export const StyledButton = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 16px;
	gap: 10px;

	font-weight: 600;

	color: white;
	background: #272727;
	border-radius: 16px;

	&:hover {
		background-color: #3a3a3a;

		cursor: pointer;

		transition: all 0.3s ease-in-out;
	}
`;
