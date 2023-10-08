import { Metadata } from "next";
import React from "react";

import { H1, H3 } from "../../../styles";

export const metadata: Metadata = {
	title: "404 | Tveeter",
};

// TODO: Implement error page
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	// const router = useRouter();

	// const handleClick = async (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	router.push("/");
	// };

	return (
		<>
			<H1>Something went wrong - {error.message} :(</H1>
			<H3 onClick={() => reset()}>Reload</H3>
			{/* <H3 onClick={handleClick}>Click here to home!</H3> */}
		</>
	);
}
