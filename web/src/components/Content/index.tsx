// Styled Components
import { StyledContent } from "./style";

export const Content: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledContent>{children}</StyledContent>;
};
