import { Metadata } from "next";

import { RootProvider } from "./provider";

export const metadata: Metadata = {
	title: "Home | Tveeter",
	description: "A chat app made with Next.js, Supabase, and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
