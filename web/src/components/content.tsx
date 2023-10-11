import styled from "styled-components";

import { VStack } from "@/styles";

const StyledContent = styled(VStack)`
	// The god solution for all problems in life is flex-grow: 1
	display: flex;
	background-color: #212121;
	flex-direction: column;
	align-items: start;
	padding: 0px 8px;
	gap: 8px;

	flex: none;
	flex-grow: 1;
	overflow-y: scroll;
	order: 0;

	box-sizing: border-box;
	width: 100%;
	max-height: 583px;

	div {
		margin: 0;
		padding: 0;
	}
`;

export const Content: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledContent>{children}</StyledContent>;
};
