import styled from "styled-components";

export const StyledLogin = styled.button`
	display: flex;
	align-content: flex-end;
	cursor: pointer;

	color: white;
	background: none;
	border: none;

	font-weight: 700;

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
