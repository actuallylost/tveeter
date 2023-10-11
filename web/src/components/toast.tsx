import styled from "styled-components";

import { HStack, VStack } from "@/styles";

export enum ToastType {
	Success = "Success",
	Info = "Info",
	Warning = "Warning",
	Error = "Error",
}

interface ToastProps {
	type: ToastType;
	message: string;
}

// TODO: Change style to match the design
const StyledContainer = styled(VStack)`
	position: absolute;
	bottom: 0;

	background: #f99;
	border: 1px solid #ccc;
	border-radius: 8px;

	padding: 1rem;

	transition: transform 0.6s ease-in-out;
	animation: toast-in-right;
`;

const StyledType = styled(HStack)``;

const StyledMessage = styled(HStack)``;

export const Toast: React.FC<ToastProps> = ({ type, message }) => {
	return (
		<StyledContainer>
			<StyledType>{type}</StyledType>
			<StyledMessage>{message}</StyledMessage>
		</StyledContainer>
	);
};
