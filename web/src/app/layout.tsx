"use client";

import { RootProvider } from "./provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
