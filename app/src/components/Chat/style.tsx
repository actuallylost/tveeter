import styled from "styled-components";
import { Box } from "../common/Box";
import { VStack } from "../common/Stack";

export const StyledChat = styled(Box)`
	align-items: start;
`;

export const StyledMessage = styled(VStack)`
	background-color: white;
	align-items: start;
`;

export const StyledInput = styled.input`
	border-radius: 7px;
	margin-top: 5px;
`;

export const StyledButton = styled.button`
	border-radius: 7px;
`;
