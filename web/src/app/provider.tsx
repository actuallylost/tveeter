import { Provider } from "react-redux";

import { GlobalStyles } from "../../styles/common/GlobalStyles";
import { store } from "./src/redux";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<GlobalStyles />
			{children}
		</Provider>
	);
};
