import { StyledContainer, StyledMessage, StyledType } from "./style";

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

export const Toast: React.FC<ToastProps> = ({ type, message }) => {
	return (
		<StyledContainer>
			<StyledType>{type}</StyledType>
			<StyledMessage>{message}</StyledMessage>
		</StyledContainer>
	);
};
