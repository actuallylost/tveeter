import styled from "styled-components";

import { VStack } from "@/styles";

export const StyledUsername = styled.span`
	font-weight: bold;
	margin-bottom: 4px;
`;

export const StyledMessage = styled(VStack)`
	color: white;
	overflow-wrap: anywhere;

	flex-wrap: initial;

	align-items: start;
`;
