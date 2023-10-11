import styled from "styled-components";

import { VStack } from "@/styles";

const StyledWrapper = styled(VStack)`
	align-items: center;

	width: 506px;
	min-height: 100vh;
	max-height: 100%;

	background: #212121;
	border-radius: 0px;
`;

export const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};
