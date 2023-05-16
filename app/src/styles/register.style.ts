import styled from "styled-components";
import { VStack } from "@/styles";

export const RegisterWrapper = styled(VStack)`
	width: 100vw;
	height: 100vh;

	justify-content: center;
	align-items: center;
`;

export const RegisterContainer = styled(VStack)`
	padding: 15px 15px 0;
	gap: 10px;

	border-radius: 16px;
	background-color: rgba(28, 28, 28, 1);
`;

export const RegisterInput = styled.input`
	color: white;
	background: #272727;
	border-radius: 7px;
	flex-grow: 1;

	padding: 0 16px;

	height: 40px;
	border: none;

	&:focus {
		background-color: #3a3a3a;

		outline: none;

		transition: all 0.2s ease-in-out;
	}
`;
