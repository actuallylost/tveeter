"use client";

import { Provider } from "jotai";

import { authStore as store } from "@/lib/store";
import { GlobalStyles } from "@/styles";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<GlobalStyles />
			{children}
		</Provider>
	);
};
