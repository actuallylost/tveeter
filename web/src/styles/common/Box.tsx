import styled from "styled-components";
import {
	background,
	BackgroundProps,
	border,
	BorderProps,
	flexbox,
	FlexboxProps,
	layout,
	LayoutProps,
	position,
	PositionProps,
	space,
	SpaceProps,
	typography,
	TypographyProps,
} from "styled-system";

export type BoxProps = TypographyProps &
	BackgroundProps &
	SpaceProps &
	PositionProps &
	FlexboxProps &
	LayoutProps &
	BorderProps;

export const Box = styled("div")<BoxProps>(
	typography,
	space,
	position,
	flexbox,
	layout,
	border,
	background,
);
