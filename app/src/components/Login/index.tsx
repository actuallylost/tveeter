import { StyledLogin } from "./style";

interface LoginProps {
	clickHandler: React.MouseEventHandler<HTMLButtonElement>;
	loggedIn: boolean;
}

// TODO: Implement
export const Login: React.FC<LoginProps> = ({ clickHandler, loggedIn }) => {
	return (
		<>
			<StyledLogin onClick={clickHandler}>{loggedIn ? "Logout" : "Login"}</StyledLogin>
		</>
	);
};
