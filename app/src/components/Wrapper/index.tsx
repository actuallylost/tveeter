// Styles
import { StyledWrapper } from "./style";

const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
