import styled from "styled-components";

import { HStack, VStack } from "./";

export const Wrapper = styled(VStack)`
	width: 100vw;
	height: 100vh;

	justify-content: center;
	align-items: center;
`;

export const Title = styled.h2`
	margin-top: 16px;
	margin-bottom: 32px;

	font-size: 24px;
	font-weight: 600;

	color: white;
`;

export const ModalContainer = styled(VStack)`
	width: 275px;
	padding: 15px 15px 0;

	border-radius: 16px;
	background-color: rgba(28, 28, 28, 1);
`;

export const ButtonContainer = styled(HStack)`
	justify-content: center;
	align-items: center;
	border-radius: 16px;

	margin-top: 10px;

	background-color: rgba(28, 28, 28, 1);
`;

export const Input = styled.input`
	color: white;
	background: #272727;
	border-radius: 8px;
	flex-grow: 1;

	padding: 0 16px 0 16px;

	height: 35px;
	border: none;

	&:focus {
		background-color: #3a3a3a;

		outline: none;

		transition: all 0.2s ease-in-out;
	}
`;

export const Button = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px;
	margin-left: 8px;
	margin-right: 8px;

	width: 100px;
	height: 35px;
	border: none;

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
