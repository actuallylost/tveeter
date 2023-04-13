import styled from "styled-components";
import { VStack } from "../common/Stack";

export const StyledContent = styled(VStack)`
	background-color: #212121;
	// The god solution for all problems in life is flex-grow: 1
	flex-grow: 1;
	overflow-y: scroll;
	align-items: start;
`;
