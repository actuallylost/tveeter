import { Provider } from "react-redux";
import { store } from "@/redux";
import { GlobalStyles } from "@/styles/common/GlobalStyles";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<GlobalStyles />
			<Component {...pageProps} />
		</Provider>
	);
}
