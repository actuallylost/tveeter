import styled from "styled-components";

import { Box, BoxProps } from "./Box";

export type StackProps = {
	direction?: "row" | "column";
	spacing?: number;
	onClick?: () => void;
} & BoxProps;

const computeMarginRight = ({ direction, marginRight, spacing }: StackProps): string => {
	// prioritize spacing over marginRight
	if (direction === "row" && spacing !== undefined) {
		if (spacing === 0) {
			return "0px";
		}
		return `${Math.pow(4, spacing)}px`;
	}
	return marginRight !== undefined ? `${String(marginRight)}px` : "initial";
};

const computeMarginBottom = ({ direction, marginBottom, spacing }: StackProps): string => {
	// prioritize spacing over marginBottom
	if (direction === "column" && spacing !== undefined) {
		if (spacing === 0) {
			return "0px";
		}
		return `${Math.pow(4, spacing)}px`;
	}
	return marginBottom !== undefined ? `${String(marginBottom)}px` : "initial";
};

export const Stack = styled(Box)`
	display: flex;
	flex-direction: ${(props: StackProps) => props.direction ?? "row"};
	& > * {
		margin-right: ${computeMarginRight};
		margin-bottom: ${computeMarginBottom};
	}
`;

export const VStack: React.FC<{ children?: React.ReactNode } & Omit<StackProps, "direction">> = ({
	children,
	alignItems = "center",
	spacing = 2,
	...props
}) => (
	<Stack direction="column" alignItems={alignItems} spacing={spacing} {...props}>
		{children}
	</Stack>
);

export const HStack: React.FC<{ children?: React.ReactNode } & Omit<StackProps, "direction">> = ({
	children,
	alignItems = "center",
	spacing = 2,
	...props
}) => (
	<Stack direction="row" alignItems={alignItems} spacing={spacing} {...props}>
		{children}
	</Stack>
);

export const StackDivider: React.FC<{ direction: "row" | "column" } & BoxProps> = ({
	direction,
	...props
}) => {
	if (direction === "row") {
		return <Box background="#ccc" height="100%" width="1px" {...props} />;
	}
	return <Box background="#ccc" width="100%" height="1px" {...props} />;
};
