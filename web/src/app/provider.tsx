"use client";

import { Provider } from "jotai";

import { GlobalStyles } from "@/styles";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider>
			<GlobalStyles />
			{children}
		</Provider>
	);
};
