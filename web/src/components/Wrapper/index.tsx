// Styles
import { StyledWrapper } from "./style";

export const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};
