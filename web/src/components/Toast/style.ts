import styled from "styled-components";

import { HStack, VStack } from "@/styles";

export const StyledContainer = styled(VStack)`
	position: absolute;
	bottom: 0;

	background: #f99;
	border: 1px solid #ccc;
	border-radius: 8px;

	padding: 1rem;

	transition: transform 0.6s ease-in-out;
	animation: toast-in-right;
`;

export const StyledType = styled(HStack)``;

export const StyledMessage = styled(HStack)``;
