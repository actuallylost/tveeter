import { Provider } from "react-redux";

import { store } from "@/redux";
import { GlobalStyles } from "@/styles";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<GlobalStyles />
			{children}
		</Provider>
	);
};
