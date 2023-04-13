// Styled Components
import { StyledContent } from "./style";

const Content: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledContent>{children}</StyledContent>;
};

export default Content;
