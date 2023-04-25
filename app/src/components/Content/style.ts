import styled from "styled-components";

import { VStack } from "../common/Stack";

export const StyledContent = styled(VStack)`
	// The god solution for all problems in life is flex-grow: 1
	display: flex;
	background-color: #212121;
	flex-direction: column;
	align-items: start;
	padding: 0px 8px;
	gap: 8px;

	flex: none;
	flex-grow: 1;
	order: 0;

	box-sizing: border-box;
	width: 100%;
`;
