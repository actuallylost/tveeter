import styled from "styled-components";

import { VStack } from "../common/Stack";

export const StyledContent = styled(VStack)`
	background-color: #212121;
	// The god solution for all problems in life is flex-grow: 1
	display: flex;
	flex-direction: column;
	align-items: start;
	padding: 0px 8px;
	gap: 8px;

	flex: none;
	order: 0;
	flex-grow: 1;

	box-sizing: border-box;
	width: 100%;
`;
