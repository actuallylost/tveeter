import styled from "styled-components";

import { VStack } from "./common";

export const Container = styled(VStack)`
	width: 100vw;
	height: 100vh;
`;

export const H1 = styled.h1``;

export const H3 = styled.h3`
	display: inline-block;
	position: relative;

	:after {
		content: "";
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		transform-origin: bottom right;
		transition: transform 0.25s ease-out;
	}

	:hover:after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
`;
